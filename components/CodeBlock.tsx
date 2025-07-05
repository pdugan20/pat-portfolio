interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  title?: string;
}

export default function CodeBlock({
  children,
  language = 'javascript',
  title,
}: CodeBlockProps) {
  return (
    <div className='bg-code-dark-bg dark:bg-bg-dark-secondary my-6 rounded-lg'>
      {title && (
        <div className='border-border-dark-primary text-code-dark-text border-b px-4 py-2 text-sm'>
          {title}
        </div>
      )}
      <pre className='overflow-x-auto p-4'>
        <code className={`language-${language} text-code-dark-text text-sm`}>
          {children}
        </code>
      </pre>
    </div>
  );
}
