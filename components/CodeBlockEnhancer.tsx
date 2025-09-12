'use client';

import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import CopyButton from './CopyButton';

export default function CodeBlockEnhancer() {
  useEffect(() => {
    // Function to add copy buttons to code blocks
    const enhanceCodeBlocks = () => {
      // Find all figures with code titles
      const figures = document.querySelectorAll('.mdx-content figure');

      figures.forEach(figure => {
        const titleElement = figure.querySelector(
          'figcaption[data-rehype-pretty-code-title]'
        );
        const preElement = figure.querySelector('pre');

        if (
          titleElement &&
          preElement &&
          !titleElement.querySelector('.copy-button-container')
        ) {
          // Get the code text
          const codeElement = preElement.querySelector('code');
          const codeText = codeElement?.textContent || '';

          // Wrap existing content in a title-text span if not already wrapped
          if (!titleElement.querySelector('.title-text')) {
            const titleText = titleElement.textContent;
            titleElement.innerHTML = `<span class="title-text">${titleText}</span>`;
          }

          // Create container for the copy button
          const buttonContainer = document.createElement('div');
          buttonContainer.className = 'copy-button-container';

          // Create React root and render the copy button
          const root = createRoot(buttonContainer);
          root.render(<CopyButton text={codeText} />);

          // Append the button container to the title element
          titleElement.appendChild(buttonContainer);
        }
      });
    };

    // Enhance code blocks when component mounts
    enhanceCodeBlocks();

    // Also enhance when content changes (for dynamic content)
    const observer = new MutationObserver(() => {
      enhanceCodeBlocks();
    });

    // Observe changes to the MDX content
    const mdxContent = document.querySelector('.mdx-content');
    if (mdxContent) {
      observer.observe(mdxContent, {
        childList: true,
        subtree: true,
      });
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything visible
}
