import React, { useState } from 'react';
import './AddBook.css';
import HeroSection from '../../components/HeroSection/HeroSection';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(1);
    const [readDate, setReadDate] = useState(null);
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState({
        titleError: '',
        authorError: '',
        ratingError: '',
        readDateError: '',
        reviewError: ''
    });
    const [statusMessage, setStatusMessage] = useState(''); // To store success or error messages

    const validateTitle = (title) => {
        if (title.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, titleError: 'Title is required.' }));
            return false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, titleError: '' }));
            return true;
        }
    };

    const validateAuthor = (author) => {
        const authorRegex = /^[A-Za-z\s]+$/;

        if (author.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, authorError: 'Author name is required.' }));
            return false;
        }
        else if (!authorRegex.test(author)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                authorError: 'Author name should contain only alphabetic characters.'
            }));
            return false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, authorError: '' }));
            return true;
        }
    };

    const validateRating = (rating) => {
        if (rating < 1 || rating > 5) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ratingError: 'Rating must be between 1 and 5.'
            }));
            return false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, ratingError: '' }));
            return true;
        }
    };

    const validateReadDate = (date) => {
        const today = new Date().toISOString().split('T')[0];

        if (!date) {
            setErrors((prevErrors) => ({ ...prevErrors, readDateError: 'Read date is required.' }));
        }
        else if (date > today) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                readDateError: 'Read date cannot be in the future.'
            }));
            return false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, readDateError: '' }));
            return true;
        }
    };

    const validateReview = (review) => {
        if (review.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, reviewError: 'Review is required.' }));
            return false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, reviewError: '' }));
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid =
            validateTitle(title) &&
            validateAuthor(author) &&
            validateRating(rating) &&
            validateReadDate(readDate) &&
            validateReview(review);

        if (!isValid) return;

        const newBook = {
            id: crypto.randomUUID(),
            title,
            author,
            image: `https://picsum.photos/id/${Math.round(Math.random() * 300)}/652/1000`,
            rating: Number(rating),
            readDate,
            review,
        };

        try {
            const response = await fetch('http://localhost:5000/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok) {
                setTitle('');
                setAuthor('');
                setRating(1);
                setReview('');
                setReadDate(null);
                setErrors({
                    titleError: '',
                    authorError: '',
                    ratingError: '',
                    readDateError: '',
                    reviewError: ''
                });
                setStatusMessage('Book review added successfully!'); // Success message
            } else {
                setStatusMessage('Failed to add book review. Please try again.'); // Error message
            }
        } catch (error) {
            console.error('Error:', error);
            setStatusMessage('An error occurred. Please try again later.'); // Error message
        }
    };

    return (
        <div className="add-book-page">

            <HeroSection hero_text="Add Book" />

            <div className="add-book">
                <form className="add-form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                validateTitle(e.target.value);
                            }}
                            onBlur={() => validateTitle(title)}
                            required
                        />
                    </div>
                    {errors.titleError && <p className="error-message">{errors.titleError}</p>}

                    <div className="input-field">
                        <label>Author:</label>
                        <input
                            type="text"
                            name="author"
                            value={author}
                            onChange={(e) => {
                                setAuthor(e.target.value);
                                validateAuthor(e.target.value);
                            }}
                            onBlur={() => validateAuthor(author)}
                            required
                        />
                    </div>
                    {errors.authorError && <p className="error-message">{errors.authorError}</p>}

                    <div className="input-field">
                        <label>Rating (1-5):</label>
                        <input
                            type="number"
                            name="rating"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => {
                                setRating(e.target.value);
                                validateRating(e.target.value);
                            }}
                            onBlur={() => validateRating(rating)}
                            required
                        />
                    </div>
                    {errors.ratingError && <p className="error-message">{errors.ratingError}</p>}

                    <div className="input-field">
                        <label>Read Date:</label>
                        <input
                            type="date"
                            name="read-date"
                            max={new Date().toISOString().split('T')[0]}
                            value={readDate}
                            onChange={(e) => {
                                setReadDate(e.target.value);
                                validateReadDate(e.target.value);
                            }}
                            onBlur={() => validateReadDate(readDate)}
                            required
                        />
                    </div>
                    {errors.readDateError && <p className="error-message">{errors.readDateError}</p>}

                    <div className="review-textarea">
                        <label>Review:</label>
                        <textarea
                            name="review"
                            value={review}
                            rows={3}
                            onChange={(e) => {
                                setReview(e.target.value);
                                validateReview(e.target.value);
                            }}
                            onBlur={() => validateReview(review)}
                            required
                        ></textarea>
                    </div>
                    {errors.reviewError && <p className="error-message">{errors.reviewError}</p>}

                    <button className="add-btn" type="submit">Add Book</button>
                </form>

                {/* Display success or error message */}
                {statusMessage && <p className="status-message">{statusMessage}</p>}
            </div>
        </div>
    );
};

export default AddBook;
