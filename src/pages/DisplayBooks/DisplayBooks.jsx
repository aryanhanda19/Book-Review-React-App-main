import React, { useEffect, useState } from 'react';
import './DisplayBooks.css';
import HeroSection from '../../components/HeroSection/HeroSection';
import BookItem from '../../components/BookItem/BookItem';

const DisplayBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooksData = async () => {
            try {
                const response = await fetch('http://localhost:5000/books'); // Ensure this path is correct
                if (!response.ok) {
                    throw new Error('Failed to fetch books data');
                }
                const data = await response.json();
                console.dir(data)
                setBooks(data); // Extract the books array
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooksData();
    }, []);

    return (
        <div className="books-page">

            <HeroSection hero_text="Books" />

            <div className="books-container">
                {books.map((book) => (
                    <BookItem key={book.id} book={book} setBooks={setBooks} />
                ))}
            </div>
        </div>
    );
};

export default DisplayBooks;
