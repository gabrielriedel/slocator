/**
 * modelService.ts
 * ---------------
 * Building prediction service.
 *
 * CURRENTLY: Returns a mock prediction for UI development.
 *
 * TO PLUG IN YOUR REAL MODEL:
 * 1. Remove the mock implementation below
 * 2. Load your model (TensorFlow.js, ONNX Runtime, or call a remote API)
 * 3. Preprocess the image (resize to model input size, normalize)
 * 4. Run inference and return the top prediction as a Prediction object
 *
 * See README.md for detailed integration instructions.
 */

import { buildings } from '../data/buildings';

export interface Prediction {
  buildingId: string;    // matches Building.id in data/buildings.ts
  confidence: number;    // 0.0 – 1.0
  topK?: PredictionCandidate[];  // Optional: top-K predictions for display
}

export interface PredictionCandidate {
  buildingId: string;
  confidence: number;
}

// ─────────────────────────────────────────────────────────────
// MOCK IMPLEMENTATION — replace this function with your model
// ─────────────────────────────────────────────────────────────

/**
 * Predict which Cal Poly building is shown in the given image.
 *
 * @param imageUri - Local file URI of the image (from expo-image-picker)
 * @returns Prediction with buildingId and confidence score
 *
 * TODO: Replace mock body with real model inference
 */
export async function predictBuilding(imageUri: string): Promise<Prediction> {
  // ── MOCK: simulate model latency ──────────────────────────
  await new Promise((resolve) => setTimeout(resolve, 1800));

  // ── MOCK: rotate through buildings for demo purposes ──────
  const mockBuildings = [
    { buildingId: 'kennedy-library', confidence: 0.94 },
    { buildingId: 'engineering-iv', confidence: 0.89 },
    { buildingId: 'baker-science', confidence: 0.76 },
    { buildingId: 'dexter-building', confidence: 0.91 },
    { buildingId: 'performing-arts-center', confidence: 0.83 },
  ];

  // Pseudo-random pick based on imageUri string hash (demo only)
  const hash = imageUri.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pick = mockBuildings[hash % mockBuildings.length];

  // Build top-K mock candidates
  const others = buildings
    .filter((b) => b.id !== pick.buildingId)
    .slice(0, 3)
    .map((b, i) => ({
      buildingId: b.id,
      confidence: Math.max(0.05, pick.confidence - 0.15 - i * 0.08),
    }));

  return {
    buildingId: pick.buildingId,
    confidence: pick.confidence,
    topK: [{ buildingId: pick.buildingId, confidence: pick.confidence }, ...others],
  };
}

// ─────────────────────────────────────────────────────────────
// REAL MODEL INTEGRATION TEMPLATE (uncomment and adapt)
// ─────────────────────────────────────────────────────────────

/*
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';

let model: tf.LayersModel | null = null;

async function loadModel(): Promise<tf.LayersModel> {
  if (model) return model;
  // Load from bundled assets or remote URL:
  model = await tf.loadLayersModel('https://your-model-url/model.json');
  return model;
}

export async function predictBuilding(imageUri: string): Promise<Prediction> {
  const m = await loadModel();

  // Read image bytes
  const imgB64 = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const imgBuffer = tf.util.encodeString(imgB64, 'base64') as Uint8Array;
  const imageTensor = decodeJpeg(imgBuffer);

  // Preprocess: resize to model input size and normalize
  const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
  const normalized = resized.div(255.0).expandDims(0);

  // Run inference
  const output = m.predict(normalized) as tf.Tensor;
  const probabilities = await output.data();

  // Map to building IDs (index must match your training class order)
  const buildingIds = buildings.map((b) => b.id);
  const topIdx = Array.from(probabilities)
    .map((p, i) => ({ i, p }))
    .sort((a, b) => b.p - a.p)
    .slice(0, 5);

  tf.dispose([imageTensor, resized, normalized, output]);

  return {
    buildingId: buildingIds[topIdx[0].i],
    confidence: topIdx[0].p,
    topK: topIdx.map(({ i, p }) => ({ buildingId: buildingIds[i], confidence: p })),
  };
}
*/
