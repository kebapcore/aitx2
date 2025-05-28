import React from 'react';
import { GroundingChunk } from '../types';

interface GroundingAttributionProps {
  chunks: GroundingChunk[];
}

const GroundingAttribution: React.FC<GroundingAttributionProps> = ({ chunks }) => {
  if (!chunks || chunks.length === 0) {
    return null;
  }

  const validChunks = chunks.filter(chunk => (chunk.web && chunk.web.uri) || (chunk.retrievedContext && chunk.retrievedContext.uri));

  if (validChunks.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 pt-2 border-t border-white/20 text-xs">
      <p className="font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>
        Sources:
      </p>
      <ul className="list-disc list-inside space-y-0.5">
        {validChunks.map((chunk, index) => {
          const source = chunk.web || chunk.retrievedContext;
          if (!source) return null;
          
          return (
            <li key={index}>
              <a
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: 'rgba(200,220,255,0.9)' }}
                title={source.uri}
              >
                {source.title || source.uri}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroundingAttribution;