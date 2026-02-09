import MDXLink from '@/components/MDXLink';
import PullQuote from '@/components/PullQuote';
import {
  ColorSwatch,
  FontSizeSwatch,
  TextStyleSwatch,
  TextSwatch,
} from '@/components/swatches';
import PostImage from '@/components/PostImage';
import PostMovie from '@/components/PostMovie';
import { createAssetContext } from './assets';

export function getMDXComponents(slug: string) {
  const assetContext = createAssetContext(slug);

  return {
    a: MDXLink,
    PullQuote,
    ColorSwatch,
    FontSizeSwatch,
    TextStyleSwatch,
    TextSwatch,
    PostImage,
    PostMovie,
    ...assetContext,
  };
}
