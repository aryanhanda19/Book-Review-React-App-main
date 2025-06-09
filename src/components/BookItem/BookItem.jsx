import './BookItem.css';
import { useNavigate } from 'react-router-dom';

const BookItem = ({ book, setBooks }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        console.log('Delete review for book:', book.title);

        if (!window.confirm('Are you sure you want to delete this review?')) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/books/' + book.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete book');
            }

            setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));

            console.log('Book deleted successfully');
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div key={book.id} className="book-item">
            <div onClick={() => navigate(`/books/${book.id}`)}>
                <img src={book.image} alt={book.title} className="book-cover" />
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author"><i>{book.author}</i></p>
            </div>
            <button className="delete-button" onClick={handleDelete}>Delete Review</button>
        </div>
    );
}

export default BookItem;
