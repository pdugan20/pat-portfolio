import dynamic from 'next/dynamic';
import { getBlogPost } from './mdx';
import { createAssetContext } from './assets';
import MDXLink from '@/components/MDXLink';
import PullQuote from '@/components/PullQuote';

// Component map for dynamic imports
const COMPONENT_MAP = {
  ColorSwatch: () => import('@/components/swatches/ColorSwatch'),
  FontSizeSwatch: () => import('@/components/swatches/FontSizeSwatch'),
  TextStyleSwatch: () => import('@/components/swatches/TextStyleSwatch'),
  TextSwatch: () => import('@/components/swatches/TextSwatch'),
  PostImage: () => import('@/components/PostImage'),
  PostMovie: () => import('@/components/PostMovie'),
} as const;

// Base components that are always loaded (lightweight)
const BASE_COMPONENTS = {
  a: MDXLink,
  PullQuote,
};

export async function getMDXComponents(slug: string) {
  const post = getBlogPost(slug);
  if (!post) return BASE_COMPONENTS;

  // Create asset context for this post
  const assetContext = createAssetContext(slug);

  // Parse content to find used components
  const usedComponents = Object.keys(COMPONENT_MAP).filter(componentName =>
    post.content.includes(`<${componentName}`)
  );

  // If no dynamic components are used, return base components only
  if (usedComponents.length === 0) {
    return {
      ...BASE_COMPONENTS,
      ...assetContext,
    };
  }

  // Dynamically import only used components
  const componentPromises = usedComponents.map(async name => {
    const componentKey = name as keyof typeof COMPONENT_MAP;
    const Component = await COMPONENT_MAP[componentKey]();
    return [name, Component.default || Component];
  });

  const dynamicComponents = await Promise.all(componentPromises);
  const loadedComponents = Object.fromEntries(dynamicComponents);

  // Combine base components with dynamically loaded ones and asset context
  return {
    ...BASE_COMPONENTS,
    ...loadedComponents,
    ...assetContext,
  };
}

export function getDynamicMDXComponents(slug: string) {
  const post = getBlogPost(slug);
  if (!post) return BASE_COMPONENTS;

  // Create asset context for this post
  const assetContext = createAssetContext(slug);

  // Parse content to find used components
  const usedComponents = Object.keys(COMPONENT_MAP).filter(componentName =>
    post.content.includes(`<${componentName}`)
  );

  // Create dynamic components with loading states
  const dynamicComponents = Object.fromEntries(
    usedComponents.map(name => {
      const componentKey = name as keyof typeof COMPONENT_MAP;
      // @ts-expect-error - Dynamic component loading with mixed component types
      const DynamicComponent = dynamic(COMPONENT_MAP[componentKey], {
        loading: () => null,
        ssr: true,
      });
      return [name, DynamicComponent];
    })
  );

  return {
    ...BASE_COMPONENTS,
    ...dynamicComponents,
    ...assetContext,
  };
}
