import type { LanguageRegistration } from 'shiki';

// Custom language definition for prompt templates with variable highlighting
export const promptTemplateLang: LanguageRegistration = {
  name: 'prompt-template',
  scopeName: 'source.prompt-template',
  repository: {
    variable: {
      begin: '\\$\\{',
      end: '\\}',
      beginCaptures: {
        '0': { name: 'punctuation.definition.variable.begin' }
      },
      endCaptures: {
        '0': { name: 'punctuation.definition.variable.end' }
      },
      patterns: [
        {
          match: '[<>?:{}()\\[\\]]',
          name: 'keyword.operator'
        },
        {
          match: '[a-zA-Z_][a-zA-Z0-9_]*',
          name: 'support.variable'
        }
      ]
    },
    header: {
      match: '^([A-Z][A-Z\\s]+):',
      captures: {
        '1': { name: 'keyword.control' }
      }
    },
    bullet: {
      match: '^\\s*-\\s+',
      name: 'punctuation.definition.list'
    },
    string: {
      match: '"[^"]*"',
      name: 'string.quoted.double'
    },
  },
  patterns: [
    { include: '#variable' },
    { include: '#header' },
    { include: '#bullet' },
    { include: '#string' }
  ]
};