'use client';

import { useState } from 'react';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      style={{
        padding: '8px 16px',
        background: liked ? '#e74c3c' : '#eee',
        color: liked ? 'white' : '#333',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {liked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
    </button>
  );
}