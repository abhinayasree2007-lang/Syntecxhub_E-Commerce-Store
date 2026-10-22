import React from 'react';
import { Star } from 'lucide-react';

export const Rating = ({ value = 0, numReviews, showCount = true }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((index) => {
          const isFull = value >= index;
          const isHalf = value >= index - 0.5 && value < index;

          return (
            <Star
              key={index}
              size={14}
              style={{
                color: isFull || isHalf ? '#fbbf24' : '#475569',
                fill: isFull ? '#fbbf24' : isHalf ? 'url(#half-star)' : 'none',
              }}
            />
          );
        })}
      </div>
      {showCount && numReviews !== undefined && (
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
          ({numReviews})
        </span>
      )}
    </div>
  );
};

export default Rating;
