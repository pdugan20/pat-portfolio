/**
 * Content-aware asset path resolution
 */

export function getAssetPath(
  slug: string,
  filename: string,
  type: 'img' | 'mov' = 'img'
): string {
  return `/assets/${slug}/${type}/${filename}`;
}

export function getPosterPath(slug: string, filename: string): string {
  // Convert video filename to poster path
  const posterFilename = filename.replace('.mp4', '.jpg');
  return `/assets/${slug}/mov/poster/${posterFilename}`;
}

/**
 * Helper for common asset types
 */
export const assets = {
  image: (slug: string, filename: string) =>
    getAssetPath(slug, filename, 'img'),
  video: (slug: string, filename: string) =>
    getAssetPath(slug, filename, 'mov'),
  poster: (slug: string, filename: string) => getPosterPath(slug, filename),
};

/**
 * Asset context for use in MDX components
 */
export function createAssetContext(slug: string) {
  // Create bound functions that MDX can call directly
  const image = (filename: string) => assets.image(slug, filename);
  const video = (filename: string) => assets.video(slug, filename);
  const poster = (filename: string) => assets.poster(slug, filename);

  return {
    image,
    video,
    poster,
  };
}
