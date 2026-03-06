export const SITE_CONFIG = {
  author: 'Pat Dugan',
  title: 'Product Designer',
  description:
    'A product designer with a technical background and experience working across a variety of mediums and problem spaces.',
  aboutAuthor:
    'is a product designer with a technical background and experience working across a variety of mediums and problem spaces. He has previously worked at companies like Google, Meta, Quora, Nextdoor, and the Chan Zuckerberg Initiative.',
  url: 'https://patdugan.me',
  feedDescription:
    'Thoughts, tutorials, and insights about web development and technology',
} as const;

export const SOCIAL_LINKS = {
  x: 'https://x.com/doog',
  github: 'https://github.com/pdugan20',
  figma: 'https://figma.com/@patdugan',
  email: 'dugan.pat@gmail.com',
} as const;

export const WORK_HISTORY = [
  { name: 'Google', url: 'https://google.com' },
  { name: 'Meta', url: 'https://meta.com' },
  { name: 'Quora', url: 'https://quora.com' },
  { name: 'Nextdoor', url: 'https://nextdoor.com' },
  {
    name: 'Chan Zuckerberg Initiative',
    url: 'https://chanzuckerberg.com',
  },
] as const;

export const PROJECTS = [
  {
    name: 'claudelint',
    description:
      'An open-source linting tool for Claude Code configuration files',
    url: 'https://github.com/pdugan20/claudelint',
  },
  {
    name: 'claudenotes',
    description:
      'Claude covers its own beat — a self-published newsletter and podcast',
    url: 'https://github.com/pdugan20/claudenotes',
  },
  {
    name: 'nextup',
    description: 'A TV tracking app with AI-powered recommendations',
    url: 'https://nextup.tv',
  },
  {
    name: 'e-ink-scoreboard',
    description: 'A live MLB scoreboard on an e-ink display',
    url: 'https://github.com/pdugan20/e-ink-scoreboard',
  },
  {
    name: 'chat-builder-plugin',
    description: 'A generative AI Figma plugin powered by Anthropic',
    url: 'https://github.com/pdugan20/chat-builder-plugin',
  },
] as const;

export const EXPERIENCE = [
  {
    company: 'Meta',
    url: 'https://meta.com',
    role: 'Staff Product Designer',
    period: '2021 — 2025',
  },
  {
    company: 'CZI',
    url: 'https://chanzuckerberg.com',
    role: 'Staff Product Designer',
    period: '2019 — 2021',
  },
  {
    company: 'Quora',
    url: 'https://quora.com',
    role: 'Product Design Lead',
    period: '2015 — 2019',
  },
  {
    company: 'Nextdoor',
    url: 'https://nextdoor.com',
    role: 'Product Designer',
    period: '2014 — 2015',
  },
  {
    company: 'Google',
    url: 'https://google.com',
    role: 'Interaction Designer',
    period: '2011 — 2013',
  },
] as const;
