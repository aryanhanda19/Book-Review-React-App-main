import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetail.css';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch('http://localhost:5000/books');
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const data = await response.json();
                const selectedBook = data.find((book) => book.id === id);
                setBook(selectedBook);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    // Function to render stars based on rating
    const renderStars = (rating) => {
        const totalStars = 5; // Total number of stars
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            if (i <= rating) {
                stars.push(<span key={i} className="star filled">★</span>); // Filled star
            } else {
                stars.push(<span key={i} className="star empty">☆</span>); // Empty star
            }
        }
        return stars;
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModalOnBackgroundClick = (e) => {
        // Close modal if clicked outside the modal content
        if (e.target.className === 'modal') {
            setIsModalOpen(false);
        }
    };

    if (!book) {
        return <p>Loading book details...</p>;
    }

    return (
        <div className="bookdetailpage">
            <h1 className="bookdetailtitle">Book Detail</h1>
            <div className="bookdetailcontainer">
                <div className="bookimagebtn">
                    <img className="bookimage" src={book.image} alt={book.title} />
                    <button className="readbtn" onClick={toggleModal}>Free Preview</button>
                </div>
                <div className="bookdetails">
                    <h2 className="bookname">{book.title}</h2>
                    <p className="bookauthor">Author: {book.author}</p>
                    <p className="Readdatetext">Read Date: {book.readDate}</p>
                    <p className="Rating">
                        Your Given Rating:
                        <span>{renderStars(book.rating)}</span>
                    </p>
                    <div className="yourreviewtext">
                        <p className="yourreview">My take on the book:</p>
                        <div className="reviewtext">
                            <p className="reviewtitle">{book.review}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for PDF Preview */}
            {isModalOpen && (
                <div className="modal" onClick={closeModalOnBackgroundClick}>
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <iframe
                            src="/harrypotter.pdf"
                            width="100%"
                            height="500px"
                            title="PDF Preview"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetail;
