import { Options } from 'rehype-pretty-code';

const rehypePrettyCodeOptions: Partial<Options> = {
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  keepBackground: false,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node) {
    if (node.properties?.className) {
      node.properties.className.push('highlighted');
    }
  },
  onVisitHighlightedChars(node) {
    if (node.properties) {
      node.properties.className = ['word'];
    }
  },
};

export { rehypePrettyCodeOptions };
