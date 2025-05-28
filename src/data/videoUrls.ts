// Firebase Storage Video URLs
// Replace these with your actual Firebase Storage download URLs after uploading

export const firebaseVideoUrls = {
  // Hero section video
  hero: "https://firebasestorage.googleapis.com/v0/b/video-portfolio-8ea31.firebasestorage.app/o/videos%2FBoat%202.mp4?alt=media&token=ecdc4bd2-1647-4ec0-80c0-ced2812ebe9d",
  
  // FPV Videos
  fpv: {
    boat1: "https://firebasestorage.googleapis.com/v0/b/video-portfolio-8ea31.firebasestorage.app/o/videos%2FBoat%202.mp4?alt=media&token=ecdc4bd2-1647-4ec0-80c0-ced2812ebe9d",
    boat2: "https://firebasestorage.googleapis.com/v0/b/video-portfolio-8ea31.firebasestorage.app/o/videos%2FBoat%201.mp4?alt=media&token=d9c9cdbd-c50f-49bb-9027-d9f122ad3eb3",
    jetski1: "https://firebasestorage.googleapis.com/v0/b/video-portfolio-8ea31.firebasestorage.app/o/videos%2FJetski%201.mp4?alt=media&token=f1b7f009-4402-4541-a91d-6bab8856d7ba",
    barge1: "https://firebasestorage.googleapis.com/v0/b/video-portfolio-8ea31.firebasestorage.app/o/videos%2FBarge%201.mp4?alt=media&token=f1849275-a28e-4c5b-a80b-2083d0220a8b",
    barge2: "https://firebasestorage.googleapis.com/v0/b/video-portfolio-8ea31.firebasestorage.app/o/videos%2FBarge%202.mp4?alt=media&token=131f70e3-cff8-4cb9-8a42-da47c430907e",
  }
};

// Helper function to generate poster/thumbnail URLs
export const generatePosterUrl = (videoUrl: string): string => {
  // For now, we'll use a placeholder or you can generate thumbnails
  // You can later add thumbnail generation or use video frames
  return videoUrl.replace('.mp4', '_poster.jpg');
}; 