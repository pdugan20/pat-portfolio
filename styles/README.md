# MDX Styles Structure

This directory contains the organized CSS styles for MDX content rendering.

## Structure

```
styles/
├── mdx.css              # Main file that imports all styles
├── README.md            # This documentation file
├── content/             # Content element styles
│   ├── typography.css   # Heading, paragraph, and text styles
│   ├── lists.css        # Ordered and unordered list styles
│   └── code.css         # Inline code and code block styles
└── components/          # Custom component styles
    └── swatches.css     # Color, font-size, and text-style swatch components
```

## Adding New Styles

### Content Elements

When adding new content element styles (typography, lists, etc.):

1. Create a new CSS file in `content/` (e.g., `content/tables.css`)
2. Add the import to `mdx.css`:
   ```css
   @import './content/tables.css';
   ```

### Custom Components

When adding new MDX components that need custom styling:

1. Create a new CSS file in `components/` (e.g., `components/new-component.css`)
2. Add the import to `mdx.css`:
   ```css
   @import './components/new-component.css';
   ```

## File Organization

### Content Elements (`content/`)

- **typography.css**: All text-related styles (h1-h4, p, li, blockquote)
- **lists.css**: List container and list item styles
- **code.css**: Inline code and code block styles

### Custom Components (`components/`)

- **swatches.css**: Custom swatch components for design tokens

## Benefits

- **Scalable**: Easy to add new component styles
- **Maintainable**: Clear separation of concerns
- **Organized**: Related styles are grouped together
- **Performance**: CSS imports are resolved at build time
