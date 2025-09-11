import { Options } from 'rehype-pretty-code';
import { createHighlighter } from 'shiki';
import { promptTemplateLang } from './prompt-template-lang';

const rehypePrettyCodeOptions: Partial<Options> = {
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  keepBackground: false,
  getHighlighter: async () => {
    return await createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: [
        'javascript',
        'typescript',
        'json',
        'bash',
        'text',
        promptTemplateLang,
      ],
    });
  },
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
