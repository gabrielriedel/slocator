/**
 * Building prediction service.
 *
 * Calls the Gradio app that wraps the local OpenCLIP + SIFT-LightGlue ranker.
 * For local web development, run Gradio on port 7860. Set
 * EXPO_PUBLIC_GRADIO_BASE_URL if you need to point at a temporary gradio.live URL.
 */

import { Platform } from 'react-native';

export interface Prediction {
  buildingId: string | null;
  confidence: number;
  label?: string;
  noBuilding?: boolean;
  reason?: string;
  topK?: PredictionCandidate[];
}

export interface PredictionCandidate {
  buildingId: string;
  confidence: number;
}

interface UploadImageOptions {
  fileName?: string;
  mimeType?: string;
}

type GradioDataframe = {
  headers: string[];
  data: unknown[][];
};

const GRADIO_BASE_URL = process.env.EXPO_PUBLIC_GRADIO_BASE_URL ?? 'http://127.0.0.1:7860';
const GRADIO_RESULT_TIMEOUT_MS = 180000;

const EXACT_LABEL_TO_BUILDING_ID: Record<string, string> = {
  '0architectureuploadwithsubflowerrorhandling587undistortedimages': 'architecture-building',
  '0businesscotchettuploadwithsubflowerrorhandling587undistortedimages': 'business-building',
  '0constructioninnovationuploadwithsubflowerrorhandling587undistortedimages': 'construction-innovations-center',
  '0dexteruploadwithsubflowerrorhandling587undistortedimages': 'dexter-building',
  '0engineeringeastuploadwithsubflowerrorhandling587undistortedimages': 'engineering-building',
  '0frankepilinguploadwithsubflowerrorhandling587undistortedimages': 'frank-pilling',
  '1bakeruploadwithsubflowerrorhandling587undistortedimages': 'baker-science',
  '1frostuploadwithsubflowerrorhandling587undistortedimages': 'frost-center',
  '1reccenteruploadwithsubflowerrorhandling587undistortedimages': 'recreation-center',
  '2uuuploadwithsubflowerrorhandling587undistortedimages': 'university-union',
  '1901diningcomplex': 'dining-complex-1901',
  'administrationbuilding': 'administration-building',
  'agriculturalsciencesbuilding': 'agricultural-sciences',
  'architectureenvironmentaldesignbuilding': 'architecture-building',
  'bakercenterforscienceandmath': 'baker-science',
  'constructioninnovationscenter': 'construction-innovations-center',
  'dexterbuilding': 'dexter-building',
  'engineeringbuilding': 'engineering-building',
  'engineeringiv': 'engineering-iv',
  'erhartagriculturebuilding': 'erhart-agriculture',
  'frankepilingcomputersciencebuilding': 'frank-pilling',
  'graphicartsbuilding': 'graphic-arts-building',
  'julianamcpheeuniversityunion': 'university-union',
  'kennedylibrary': 'kennedy-library',
  'mathematicsandsciencebuilding': 'math-science-building',
  'mottathleticscenter': 'mott-athletics',
  'orfaleacollegeofbusinessbuilding': 'business-building',
  'performingartscenter': 'performing-arts-center',
  'recreationcenter': 'recreation-center',
  'sciencebuilding': 'science-building',
  'vistagrande': 'vista-grande',
  'williamandlindafrostcenterforresearchandinnovation': 'frost-center',
};

function canonical(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function mapModelLabelToBuildingId(label: string): string | null {
  const key = canonical(label);
  const exact = EXACT_LABEL_TO_BUILDING_ID[key];
  if (exact) return exact;

  if (key.includes('constructioninnovation')) return 'construction-innovations-center';
  if (key.includes('administration')) return 'administration-building';
  if (key.includes('agriculturalsciences')) return 'agricultural-sciences';
  if (key.includes('erhart')) return 'erhart-agriculture';
  if (key.includes('business') || key.includes('cotchett')) return 'business-building';
  if (key.includes('engineeringiv')) return 'engineering-iv';
  if (key.includes('engineeringeast') || key.includes('engineeringbuilding')) return 'engineering-building';
  if (key.includes('frankepiling') || key.includes('pilling')) return 'frank-pilling';
  if (key.includes('architecture')) return 'architecture-building';
  if (key.includes('performingarts') || key.includes('pac')) return 'performing-arts-center';
  if (key.includes('mott')) return 'mott-athletics';
  if (key.includes('diningcomplex') || key.includes('1901')) return 'dining-complex-1901';
  if (key.includes('graphicarts')) return 'graphic-arts-building';
  if (key.includes('dexter')) return 'dexter-building';
  if (key.includes('kennedy')) return 'kennedy-library';
  if (key.includes('mathematicsandscience') || key.includes('mathscience')) return 'math-science-building';
  if (key.includes('sciencebuilding')) return 'science-building';
  if (key.includes('vistagrande')) return 'vista-grande';
  if (key.includes('frost')) return 'frost-center';
  if (key.includes('baker')) return 'baker-science';
  if (key.includes('reccenter') || key.includes('recreation')) return 'recreation-center';
  if (key.includes('uu') || key.includes('universityunion')) return 'university-union';
  if (key.includes('nobuilding')) return null;

  return null;
}

function inferMimeType(uri: string, explicitMimeType?: string): string {
  if (explicitMimeType) return explicitMimeType;

  const dataUriMatch = uri.match(/^data:([^;,]+)/);
  if (dataUriMatch?.[1]) return dataUriMatch[1];

  const lower = uri.toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.heic')) return 'image/heic';
  if (lower.endsWith('.heif')) return 'image/heif';
  return 'image/jpeg';
}

function extensionFromMimeType(mimeType: string): string {
  const normalized = mimeType.toLowerCase();
  if (normalized.includes('png')) return 'png';
  if (normalized.includes('webp')) return 'webp';
  if (normalized.includes('heic')) return 'heic';
  if (normalized.includes('heif')) return 'heif';
  return 'jpg';
}

function hasAllowedExtension(fileName: string): boolean {
  return /\.(jpe?g|png|heic|heif|webp)$/i.test(fileName);
}

function safeUploadFileName(imageUri: string, options: UploadImageOptions = {}): string {
  const mimeType = inferMimeType(imageUri, options.mimeType);
  const explicitName = options.fileName?.trim();
  const cleanUri = imageUri.split('?')[0] ?? imageUri;
  const uriName = cleanUri.startsWith('data:') ? '' : cleanUri.substring(cleanUri.lastIndexOf('/') + 1);
  const rawName = explicitName || uriName;

  if (rawName && hasAllowedExtension(rawName)) {
    return rawName.replace(/[^\w.\-]/g, '_');
  }

  return `photo.${extensionFromMimeType(mimeType)}`;
}

async function uploadImageToGradio(imageUri: string, options: UploadImageOptions = {}): Promise<string> {
  const formData = new FormData();
  const fileName = safeUploadFileName(imageUri, options);
  const mimeType = inferMimeType(imageUri, options.mimeType);

  if (Platform.OS === 'web') {
    const imageResponse = await fetch(imageUri);
    if (!imageResponse.ok) {
      throw new Error(`Could not read selected image: ${imageResponse.status}`);
    }
    const imageBlob = await imageResponse.blob();
    const uploadBlob = imageBlob.type ? imageBlob : new Blob([imageBlob], { type: mimeType });
    formData.append('files', uploadBlob, fileName);
  } else {
    formData.append('files', {
      uri: imageUri,
      name: fileName,
      type: mimeType,
    } as any);
  }

  const response = await fetch(`${GRADIO_BASE_URL}/gradio_api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Gradio upload failed: ${response.status}`);
  }

  const json = await response.json();
  const uploadedPath = Array.isArray(json) ? json[0] : null;
  if (typeof uploadedPath !== 'string') {
    throw new Error('Gradio upload response did not include a file path.');
  }
  return uploadedPath;
}

function parseGradioSseText(sseText: string): unknown[] | null {
  const blocks = sseText.split(/\r?\n\r?\n/);

  for (const block of blocks) {
    const lines = block.split(/\r?\n/);
    const event = lines
      .find((line) => line.startsWith('event: '))
      ?.slice('event: '.length)
      .trim();
    const data = lines
      .filter((line) => line.startsWith('data: '))
      .map((line) => line.slice('data: '.length))
      .join('\n');

    if (event === 'error') {
      throw new Error(data || 'Gradio returned an error event.');
    }

    if (event === 'complete' && data) {
      return JSON.parse(data);
    }
  }

  return null;
}

async function readGradioResult(response: Response): Promise<unknown[]> {
  const stream = response.body;

  if (!stream || !('getReader' in stream)) {
    const parsed = parseGradioSseText(await response.text());
    if (!parsed) {
      throw new Error('Gradio result did not include a complete data event.');
    }
    return parsed;
  }

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (value) {
        buffer += decoder.decode(value, { stream: !done });
        const parsed = parseGradioSseText(buffer);
        if (parsed) {
          await reader.cancel();
          return parsed;
        }
      }
      if (done) break;
    }
  } finally {
    reader.releaseLock();
  }

  const parsed = parseGradioSseText(buffer);
  if (!parsed) {
    throw new Error('Gradio result stream ended without a complete data event.');
  }
  return parsed;
}

async function callGradioPredict(uploadedPath: string): Promise<unknown[]> {
  const callResponse = await fetch(`${GRADIO_BASE_URL}/gradio_api/call/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [
        {
          path: uploadedPath,
          meta: { _type: 'gradio.FileData' },
        },
      ],
    }),
  });

  if (!callResponse.ok) {
    throw new Error(`Gradio predict call failed: ${callResponse.status}`);
  }

  const callJson = await callResponse.json();
  if (!callJson.event_id) {
    throw new Error('Gradio predict response did not include an event id.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GRADIO_RESULT_TIMEOUT_MS);

  try {
    const resultResponse = await fetch(`${GRADIO_BASE_URL}/gradio_api/call/predict/${callJson.event_id}`, {
      signal: controller.signal,
    });
    if (!resultResponse.ok) {
      throw new Error(`Gradio result fetch failed: ${resultResponse.status}`);
    }

    return await readGradioResult(resultResponse);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Timed out waiting for Gradio prediction result.');
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

function numberFromCell(value: unknown, fallback: number): number {
  const numberValue = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function predictionsFromTable(table: GradioDataframe | null): PredictionCandidate[] {
  if (!table?.data) return [];

  const seen = new Set<string>();
  const candidates: PredictionCandidate[] = [];

  for (const row of table.data) {
    const label = String(row[0] ?? '');
    const buildingId = mapModelLabelToBuildingId(label);
    if (!buildingId || seen.has(buildingId)) continue;

    const confidenceCell = row.length > 5 ? row[5] : row[1];
    seen.add(buildingId);
    candidates.push({
      buildingId,
      confidence: Math.max(0, Math.min(1, numberFromCell(confidenceCell, 0))),
    });
  }

  return candidates;
}

export async function predictBuilding(imageUri: string, options: UploadImageOptions = {}): Promise<Prediction> {
  const uploadedPath = await uploadImageToGradio(imageUri, options);
  const result = await callGradioPredict(uploadedPath);

  const label = String(result[0] ?? '');
  const reason = String(result[1] ?? '');
  const table = result[2] as GradioDataframe | null;
  const buildingId = mapModelLabelToBuildingId(label);
  const topK = predictionsFromTable(table);

  if (!buildingId) {
    if (canonical(label) === 'nobuilding') {
      return {
        buildingId: null,
        confidence: topK[0]?.confidence ?? 0,
        label,
        noBuilding: true,
        reason,
        topK,
      };
    }

    throw new Error(`Model returned an unmapped building label: ${label}`);
  }

  const confidence = topK[0]?.buildingId === buildingId ? topK[0].confidence : 0.5;
  return { buildingId, confidence, label, noBuilding: false, reason, topK };
}
