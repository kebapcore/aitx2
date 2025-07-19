export const parseAdvancedImageSyntax = (
  link: string,
  alt?: string,
  alignment?: string,
  size?: string,
  caption?: string
): string => {
  const cleanLink = link.trim();
  const cleanAlt = alt?.trim() || 'Image';
  const cleanAlignment = alignment?.trim().toLowerCase() || 'center';
  const cleanSize = size?.trim() || 'auto';
  const cleanCaption = caption?.trim() || '';

  // Parse size (can be width, width x height, or percentage)
  let sizeStyle = '';
  if (cleanSize && cleanSize !== 'auto') {
    if (cleanSize.includes('x')) {
      const [width, height] = cleanSize.split('x').map(s => s.trim());
      sizeStyle = `width: ${width}; height: ${height};`;
    } else if (cleanSize.includes('%')) {
      sizeStyle = `width: ${cleanSize}; height: auto;`;
    } else if (cleanSize.includes('px')) {
      sizeStyle = `width: ${cleanSize}; height: auto;`;
    } else {
      // Assume it's a width value, add px if no unit
      const sizeValue = cleanSize.match(/\d+/) ? cleanSize : `${cleanSize}px`;
      sizeStyle = `width: ${sizeValue}; height: auto;`;
    }
  }

  // Parse alignment
  let alignmentClass = 'custom-md-img-center';
  let containerStyle = '';
  
  switch (cleanAlignment) {
    case 'left':
      alignmentClass = 'custom-md-img-left';
      containerStyle = 'float: left; margin-right: 1em; margin-bottom: 0.5em;';
      break;
    case 'right':
      alignmentClass = 'custom-md-img-right';
      containerStyle = 'float: right; margin-left: 1em; margin-bottom: 0.5em;';
      break;
    case 'center':
    default:
      alignmentClass = 'custom-md-img-center';
      containerStyle = 'margin: 1em auto; display: block;';
      break;
  }

  const fullStyle = `${containerStyle} ${sizeStyle}`.trim();
  
  let imageHtml = `<img src="${cleanLink}" alt="${cleanAlt}" class="custom-md-img ${alignmentClass}" style="${fullStyle}" loading="lazy"/>`;
  
  if (cleanCaption) {
    imageHtml = `
      <figure class="custom-md-img-figure ${alignmentClass}" style="${containerStyle}">
        <img src="${cleanLink}" alt="${cleanAlt}" class="custom-md-img" style="${sizeStyle}" loading="lazy"/>
        <figcaption class="custom-md-img-caption">${cleanCaption}</figcaption>
      </figure>
    `;
  }

  // Add clear div for floating elements
  if (cleanAlignment === 'left' || cleanAlignment === 'right') {
    imageHtml += '<div style="clear: both;"></div>';
  }

  return imageHtml;
};