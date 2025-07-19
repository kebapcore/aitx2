import { PDFExportOptions } from '../components/PDFExportModal';

export const exportToPDF = async (content: string, options: PDFExportOptions): Promise<void> => {
  try {
    // Create a new window for PDF generation
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Could not open print window. Please allow popups for this site.');
    }

    // Get current theme variables
    const computedStyle = getComputedStyle(document.documentElement);
    const themeVars = {
      bgPage: computedStyle.getPropertyValue('--theme-bg-page').trim(),
      bgContent: computedStyle.getPropertyValue('--theme-bg-content-area').trim(),
      textPrimary: computedStyle.getPropertyValue('--theme-text-primary').trim(),
      textSecondary: computedStyle.getPropertyValue('--theme-text-secondary').trim(),
      textAccent: computedStyle.getPropertyValue('--theme-text-accent').trim(),
      borderPrimary: computedStyle.getPropertyValue('--theme-border-primary').trim(),
    };

    // Generate background style
    let backgroundStyle = '';
    switch (options.background.type) {
      case 'color':
        backgroundStyle = `background-color: ${options.background.value};`;
        break;
      case 'image':
        backgroundStyle = `background-image: url('${options.background.value}'); background-size: cover; background-position: center;`;
        break;
      case 'theme':
        backgroundStyle = `background-color: ${themeVars.bgPage}; color: ${themeVars.textPrimary};`;
        break;
    }

    // Convert markdown to HTML (basic conversion)
    const htmlContent = convertMarkdownToHTML(content);

    // Generate the HTML for PDF
    const htmlDocument = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Exported Document</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            @page {
              size: ${options.orientation === 'landscape' ? 'landscape' : 'portrait'};
              margin: ${options.margins.top}mm ${options.margins.right}mm ${options.margins.bottom}mm ${options.margins.left}mm;
            }
            
            * {
              box-sizing: border-box;
            }
            
            body {
              font-family: '${options.fontFamily}', sans-serif;
              font-size: ${options.fontSize}pt;
              line-height: 1.6;
              margin: 0;
              padding: 20px;
              ${backgroundStyle}
              ${options.background.type === 'theme' ? `color: ${themeVars.textPrimary};` : ''}
            }
            
            h1, h2, h3, h4, h5, h6 {
              margin-top: 1.5em;
              margin-bottom: 0.5em;
              font-weight: 600;
              ${options.background.type === 'theme' ? `color: ${themeVars.textPrimary};` : ''}
            }
            
            h1 { font-size: 2em; }
            h2 { font-size: 1.5em; }
            h3 { font-size: 1.25em; }
            h4 { font-size: 1.1em; }
            
            p {
              margin-bottom: 1em;
              ${options.background.type === 'theme' ? `color: ${themeVars.textPrimary};` : ''}
            }
            
            ul, ol {
              margin-bottom: 1em;
              padding-left: 2em;
            }
            
            li {
              margin-bottom: 0.25em;
            }
            
            blockquote {
              margin: 1em 0;
              padding: 0.5em 1em;
              border-left: 4px solid ${options.background.type === 'theme' ? themeVars.textAccent : '#3b82f6'};
              background-color: ${options.background.type === 'theme' ? 'rgba(59, 130, 246, 0.1)' : '#f8fafc'};
              font-style: italic;
            }
            
            code {
              background-color: ${options.background.type === 'theme' ? 'rgba(0, 0, 0, 0.1)' : '#f1f5f9'};
              padding: 0.2em 0.4em;
              border-radius: 3px;
              font-family: 'Courier New', monospace;
              font-size: 0.9em;
            }
            
            pre {
              background-color: ${options.background.type === 'theme' ? 'rgba(0, 0, 0, 0.1)' : '#f1f5f9'};
              padding: 1em;
              border-radius: 6px;
              overflow-x: auto;
              margin: 1em 0;
            }
            
            pre code {
              background: none;
              padding: 0;
            }
            
            img {
              max-width: 100%;
              height: auto;
              margin: 1em 0;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 1em 0;
            }
            
            th, td {
              border: 1px solid ${options.background.type === 'theme' ? themeVars.borderPrimary : '#e2e8f0'};
              padding: 0.5em;
              text-align: left;
            }
            
            th {
              background-color: ${options.background.type === 'theme' ? 'rgba(0, 0, 0, 0.1)' : '#f8fafc'};
              font-weight: 600;
            }
            
            a {
              color: ${options.background.type === 'theme' ? themeVars.textAccent : '#3b82f6'};
              text-decoration: none;
            }
            
            a:hover {
              text-decoration: underline;
            }
            
            .page-break {
              page-break-before: always;
            }
            
            /* Custom formatting styles */
            .text-center { text-align: center; }
            .text-left { text-align: left; }
            .text-right { text-align: right; }
            .text-justify { text-align: justify; }
            
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    // Write the HTML to the new window
    printWindow.document.write(htmlDocument);
    printWindow.document.close();

    // Wait for fonts and images to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
    };

  } catch (error) {
    console.error('Error exporting PDF:', error);
    alert('Error exporting PDF: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};

// Basic markdown to HTML converter
const convertMarkdownToHTML = (markdown: string): string => {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // Inline code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Images (including advanced syntax)
  html = html.replace(/image:([^:\n]+)(?::([^:\n]*))?(?::([^:\n]*))?(?::([^:\n]*))?(?::([^:\n]*))?/g, 
    (match, link, alt, alignment, size, caption) => {
      const cleanAlt = alt?.trim() || 'Image';
      const cleanAlignment = alignment?.trim().toLowerCase() || 'center';
      const cleanSize = size?.trim() || 'auto';
      const cleanCaption = caption?.trim() || '';

      let style = '';
      if (cleanSize && cleanSize !== 'auto') {
        if (cleanSize.includes('x')) {
          const [width, height] = cleanSize.split('x').map(s => s.trim());
          style = `width: ${width}; height: ${height};`;
        } else {
          style = `width: ${cleanSize}; height: auto;`;
        }
      }

      let alignClass = '';
      switch (cleanAlignment) {
        case 'left': alignClass = 'text-left'; break;
        case 'right': alignClass = 'text-right'; break;
        case 'center': alignClass = 'text-center'; break;
      }

      let imageHtml = `<img src="${link.trim()}" alt="${cleanAlt}" style="${style}" class="${alignClass}">`;
      
      if (cleanCaption) {
        imageHtml = `<figure class="${alignClass}">
          <img src="${link.trim()}" alt="${cleanAlt}" style="${style}">
          <figcaption style="font-style: italic; font-size: 0.9em; margin-top: 0.5em;">${cleanCaption}</figcaption>
        </figure>`;
      }

      return imageHtml;
    }
  );

  // Regular markdown images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Unordered lists
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');

  // Wrap in paragraphs
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[1-6]>)/g, '$1');
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<blockquote>)/g, '$1');
  html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');

  return html;
};