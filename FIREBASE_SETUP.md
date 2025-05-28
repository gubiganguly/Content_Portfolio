# 🔥 Firebase Storage Setup Guide

## Step 1: Firebase Console Setup

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Create a new project** or select existing project
3. **Enable Firebase Storage:**
   - Click "Storage" in left sidebar
   - Click "Get started"
   - Choose "Start in production mode"
   - Select storage location (choose closest to your users)

## Step 2: Configure Storage Rules

1. **Go to Storage → Rules**
2. **Replace the rules with:**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{allPaths=**} {
      allow read: if true; // Public read access
      allow write: if false; // No public write
    }
  }
}
```

3. **Click "Publish"**

## Step 3: Upload Your Videos

1. **In Storage tab, click "Upload file" or drag & drop**
2. **Create folder structure:**
   ```
   videos/
   ├── Boat_1.mp4
   ├── Boat_2.mp4
   ├── Jetski_1.mp4
   ├── Barge_1.mp4
   └── Barge_2.mp4
   ```

3. **Upload your MP4 files** (keep original quality)

## Step 4: Get Download URLs

1. **Click each uploaded video**
2. **Copy the download URL** (looks like this):
   ```
   https://firebasestorage.googleapis.com/v0/b/your-project.appspot.com/o/videos%2FBoat_1.mp4?alt=media&token=abc123...
   ```

## Step 5: Get Firebase Config

1. **Go to Project Settings** (gear icon)
2. **Scroll to "Your apps"**
3. **Click "Web app" icon** (</>) 
4. **Register your app**
5. **Copy the config object:**

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Step 6: Update Code Files

### 1. Update `src/config/firebase.ts`
Replace the placeholder config with your actual Firebase config.

### 2. Update `src/data/videoUrls.ts`
Replace all the placeholder URLs with your actual Firebase Storage URLs:

```typescript
export const firebaseVideoUrls = {
  hero: "https://firebasestorage.googleapis.com/v0/b/YOUR-PROJECT.appspot.com/o/videos%2FBoat_2.mp4?alt=media&token=YOUR-TOKEN",
  
  fpv: {
    boat1: "https://firebasestorage.googleapis.com/v0/b/YOUR-PROJECT.appspot.com/o/videos%2FBoat_1.mp4?alt=media&token=YOUR-TOKEN",
    boat2: "https://firebasestorage.googleapis.com/v0/b/YOUR-PROJECT.appspot.com/o/videos%2FBoat_2.mp4?alt=media&token=YOUR-TOKEN",
    jetski1: "https://firebasestorage.googleapis.com/v0/b/YOUR-PROJECT.appspot.com/o/videos%2FJetski_1.mp4?alt=media&token=YOUR-TOKEN",
    barge1: "https://firebasestorage.googleapis.com/v0/b/YOUR-PROJECT.appspot.com/o/videos%2FBarge_1.mp4?alt=media&token=YOUR-TOKEN",
    barge2: "https://firebasestorage.googleapis.com/v0/b/YOUR-PROJECT.appspot.com/o/videos%2FBarge_2.mp4?alt=media&token=YOUR-TOKEN",
  }
};
```

### 3. Update `index.html` (Optional)
Add preload for hero video:
```html
<link rel="preload" as="video" href="YOUR-HERO-VIDEO-URL" type="video/mp4">
```

## Benefits of Firebase Storage

✅ **Better Performance**: Direct CDN delivery  
✅ **No Compression**: Your original video quality preserved  
✅ **Reliable Loading**: No transformation processing delays  
✅ **Global CDN**: Fast delivery worldwide  
✅ **Cost Effective**: Pay only for storage and bandwidth used  
✅ **Easy Management**: Simple upload/delete interface  

## Video Optimization Tips

- **Keep original quality**: Firebase serves exactly what you upload
- **Use H.264 codec**: Best browser compatibility
- **Optimize before upload**: Use tools like HandBrake if needed
- **Consider file sizes**: Balance quality vs loading speed

## Next Steps

1. Complete Firebase setup
2. Upload videos
3. Update the URLs in code
4. Test all video playback
5. Add thumbnail generation (optional)

Let me know when you've completed the Firebase setup and I'll help with any issues! 