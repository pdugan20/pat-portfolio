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
      'An open-source linting tool for Claude Code configuration files.',
    url: 'https://github.com/pdugan20/claudelint',
  },
  {
    name: 'claudenotes',
    description:
      'Claude covers its own beat — a self-published newsletter and podcast.',
    url: 'https://github.com/pdugan20/claudenotes',
  },
  {
    name: 'nextup',
    description: 'A TV tracking app with AI-powered recommendations.',
    url: 'https://nextup.tv',
  },
  {
    name: 'e-ink-scoreboard',
    description: 'A live MLB scoreboard on an e-ink display.',
    url: 'https://github.com/pdugan20/e-ink-scoreboard',
  },
  {
    name: 'chat-builder-plugin',
    description: 'A generative AI Figma plugin powered by Anthropic.',
    url: 'https://github.com/pdugan20/chat-builder-plugin',
  },
] as const;

export const EXPERIENCE = [
  {
    company: 'Google',
    role: 'Senior Interaction Designer',
    period: '2022 — Present',
    description:
      'Designing core product experiences across Google Search and AI surfaces. Leading design for new generative AI features and cross-functional collaboration with engineering and research teams.',
  },
  {
    company: 'Meta',
    role: 'Product Designer',
    period: '2020 — 2022',
    description:
      'Designed product experiences across Facebook and Instagram. Led design for key social features, working closely with engineering, data science, and research to ship at scale.',
  },
  {
    company: 'Quora',
    role: 'Product Designer',
    period: '2019 — 2020',
    description:
      'Owned design for content discovery and creator tools. Shipped features that improved engagement and content quality across the platform.',
  },
  {
    company: 'Chan Zuckerberg Initiative',
    role: 'Product Designer',
    period: '2018 — 2019',
    description:
      'Designed tools for education technology initiatives. Worked on personalized learning software used by schools and districts nationwide.',
  },
  {
    company: 'Nextdoor',
    role: 'Product Designer',
    period: '2016 — 2018',
    description:
      'Designed neighborhood-level social features and local business tools. Contributed to the core product experience during a period of rapid growth.',
  },
] as const;
