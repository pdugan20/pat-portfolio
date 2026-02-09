import * as runtime from 'react/jsx-runtime';

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType<never>>;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const fn = new Function(code);
  const mdxModule = fn({ ...runtime });
  return mdxModule.default({ components });
}
