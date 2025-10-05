"use client";
export function YouTubeBackgroundDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-red-500/10 to-pink-500/10 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl" />
    </div>
  );
}
