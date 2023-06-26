import React from 'react';

function ReviewCard({ review }) {
  return (
    <div>
      {/* This is where you'll display review details */}
      <p>{review.text}</p> {/* The text of the review */}
      <p>Rating: {review.rating}</p> {/* The rating given in the review */}
      {/* and so on */}
    </div>
  );
}

export default ReviewCard; // This makes the ReviewCard component importable in other files
