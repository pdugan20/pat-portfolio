import { describe, it, expect } from 'vitest';
import {
  getAssetPath,
  getPosterPath,
  assets,
  createAssetContext,
} from '../assets';

describe('getAssetPath', () => {
  it('returns image path by default', () => {
    expect(getAssetPath('my-post', '01.png')).toBe(
      '/assets/my-post/img/01.png'
    );
  });

  it('returns image path when type is img', () => {
    expect(getAssetPath('my-post', '01.jpg', 'img')).toBe(
      '/assets/my-post/img/01.jpg'
    );
  });

  it('returns video path when type is mov', () => {
    expect(getAssetPath('my-post', '01.mp4', 'mov')).toBe(
      '/assets/my-post/mov/01.mp4'
    );
  });
});

describe('getPosterPath', () => {
  it('converts .mp4 filename to .jpg poster path', () => {
    expect(getPosterPath('my-post', '01.mp4')).toBe(
      '/assets/my-post/mov/poster/01.jpg'
    );
  });

  it('handles filenames without .mp4 extension', () => {
    expect(getPosterPath('my-post', 'video.webm')).toBe(
      '/assets/my-post/mov/poster/video.webm'
    );
  });
});

describe('assets helpers', () => {
  it('image() returns correct path', () => {
    expect(assets.image('slug', 'photo.png')).toBe(
      '/assets/slug/img/photo.png'
    );
  });

  it('video() returns correct path', () => {
    expect(assets.video('slug', 'clip.mp4')).toBe('/assets/slug/mov/clip.mp4');
  });

  it('poster() returns correct path', () => {
    expect(assets.poster('slug', 'clip.mp4')).toBe(
      '/assets/slug/mov/poster/clip.jpg'
    );
  });
});

describe('createAssetContext', () => {
  it('returns bound helpers for a given slug', () => {
    const ctx = createAssetContext('building-an-ai-ready-design-system');

    expect(ctx.image('05.png')).toBe(
      '/assets/building-an-ai-ready-design-system/img/05.png'
    );
    expect(ctx.video('02.mp4')).toBe(
      '/assets/building-an-ai-ready-design-system/mov/02.mp4'
    );
    expect(ctx.poster('02.mp4')).toBe(
      '/assets/building-an-ai-ready-design-system/mov/poster/02.jpg'
    );
  });
});
