# 🐴 SLocator

**Cal Poly SLO Building Identifier** — point your camera at any campus building and get instant facts, history, and info.

Built with React Native (Expo) · Cal Poly Green & Gold themed · iOS & Android

---

## Screenshots

```
Home Screen          Analyze Screen         Result Screen
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  🐴           │    │  [Photo]     │    │  [Photo]     │
│  SLocator    │    │              │    │ ✅ Identified │
│              │    │  🏛️ Identify  │    │              │
│ [📷 Camera]  │    │  This Bldg   │    │  Kennedy Lib │
│ [🖼️ Library] │    │              │    │  94% match   │
│              │    │  [Analyze]   │    │              │
│  Cal Poly    │    │              │    │  Fun facts…  │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS or Android)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/gabrielriedel/slocator.git
cd slocator

# Install dependencies
npm install

# Start the dev server
npx expo start

# Scan the QR code with Expo Go on your phone
```

---

## Project Structure

```
slocator/
├── app/
│   ├── _layout.tsx        # Navigation + Cal Poly theme
│   ├── index.tsx          # Home screen
│   ├── analyze.tsx        # Photo preview + model trigger
│   ├── result.tsx         # Building result display
│   └── about.tsx          # About screen (modal)
│
├── components/
│   ├── CalPolyButton.tsx  # Reusable green/gold button
│   ├── BuildingCard.tsx   # Scrollable building info card
│   └── LoadingSpinner.tsx # Animated Cal Poly spinner
│
├── services/
│   └── modelService.ts    # ← PLUG YOUR MODEL IN HERE
│
├── data/
│   └── buildings.ts       # Building database (add entries here)
│
└── constants/
    └── theme.ts           # Cal Poly colors, typography, spacing
```

---

## Plugging In Your Model

Open `services/modelService.ts`. The function you need to replace is:

```typescript
export async function predictBuilding(imageUri: string): Promise<Prediction>
```

### Option A: TensorFlow.js (on-device)

```bash
npm install @tensorflow/tfjs @tensorflow/tfjs-react-native expo-file-system
```

Then replace the mock in `modelService.ts` with the TFLite template already in the file (commented out at the bottom).

Your model output must map to building IDs matching `Building.id` in `data/buildings.ts`. The order of your class labels must match the order of buildings in the array, or you can use a label map.

### Option B: Remote API

```typescript
export async function predictBuilding(imageUri: string): Promise<Prediction> {
  const formData = new FormData();
  formData.append('image', { uri: imageUri, name: 'photo.jpg', type: 'image/jpeg' } as any);

  const response = await fetch('https://your-api.com/predict', {
    method: 'POST',
    body: formData,
  });
  const json = await response.json();
  return { buildingId: json.building_id, confidence: json.confidence };
}
```

### Option C: ONNX Runtime

```bash
npm install onnxruntime-react-native
```

---

## Adding Buildings

Open `data/buildings.ts` and add a new entry to the `buildings` array:

```typescript
{
  id: 'my-new-building',      // must match model's class label
  name: 'My Building Name',
  shortName: 'Short Name',
  number: '42',               // Cal Poly building number
  department: 'College of...',
  location: 'Near the quad',
  yearBuilt: 2001,
  description: 'A great building...',
  funFacts: [
    'Fact one about this building.',
    'Fact two.',
    'Fact three.',
  ],
  coordinates: { latitude: 35.3000, longitude: -120.6630 },
  learnMoreUrl: 'https://calpoly.edu/...',
},
```

That's it — the app will automatically display it when the model returns that `id`.

---

## Cal Poly Brand Colors

| Name | Hex |
|---|---|
| Kelly Green (primary) | `#154734` |
| Gold (accent) | `#C69214` |
| Light Green | `#1E6B4F` |
| Dark Green | `#0F3527` |
| White | `#FFFFFF` |

All colors live in `constants/theme.ts`.

---

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure your project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React Native + Expo | Cross-platform mobile framework |
| Expo Router | File-based navigation |
| expo-image-picker | Camera & library access |
| TypeScript | Type safety throughout |
| Custom components | No third-party UI library |

---

*Learn By Doing — Cal Poly San Luis Obispo 🌿*
