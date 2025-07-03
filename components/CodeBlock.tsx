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
    <div className='my-6 rounded-lg bg-gray-900 dark:bg-gray-800'>
      {title && (
        <div className='border-b border-gray-700 px-4 py-2 text-sm text-gray-300'>
          {title}
        </div>
      )}
      <pre className='overflow-x-auto p-4'>
        <code className={`language-${language} text-sm text-gray-100`}>
          {children}
        </code>
      </pre>
    </div>
  );
}
