import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Books from '../../books_reviews.json';
import './book.css';

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const book = Books.find((b) => b.ID === parseInt(id));

  if (!book) {
    return <div>Book not found</div>;
  }

  const handleReviewClick = () => {
    if (book.reviews && book.reviews.length > 0) {
      const reviewsText = book.reviews
        .map(
          (review, index) =>
            `Review ${index + 1}:\nReviewer: ${review.reviewer}\nRating: ${review.rating}/5\nComment: ${review.comment}\n`
        )
        .join('\n\n');
      setModalContent(reviewsText);
      setIsModalOpen(true); // Open the modal
    } else {
      alert(`No reviews available for "${book.title}".`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="book-container">
      <h1 className="book-title">{book.title}</h1>
      <h3 className="book-author">By {book.author}</h3>
      <img className="book-cover" src={book.cover} alt={book.title} />
      <p className="book-summary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{book.summary}</p>
      <p className="book-details">
        <strong>Price:</strong> ${book.price}
      </p>
      <p className="book-details">
        <strong>Stock:</strong> {book.stock} available
      </p>
      <button className="review-button" onClick={handleReviewClick}>
        View Reviews
      </button>
      <button className="back-button" onClick={handleBackClick}>
        Back to Home
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Reviews from Others</h2>
            <pre>{modalContent}</pre>
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
      <footer className="footer">
        <p>© 2025 Bookstore. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Book;