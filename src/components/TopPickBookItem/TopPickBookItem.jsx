import './TopPickBookItem.css';

/**
 * Represents a single book item in the Top Picks section.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.book - The book object containing details.
 * @param {Function} props.onClick - The function to call when the book is clicked.
 * @returns {JSX.Element} The rendered TopPickBookItem component.
 */
const TopPickBookItem = ({ book, onClick }) => {
    const imageUrl =
        book.volumeInfo.imageLinks?.extraLarge ||
        book.volumeInfo.imageLinks?.large ||
        book.volumeInfo.imageLinks?.medium ||
        book.volumeInfo.imageLinks?.thumbnail;

    return (
        <div className="book-item" onClick={onClick}>
            <img className="book-cover" src={imageUrl} alt={book.volumeInfo.title} />
            <h3 className="book-title">{book.volumeInfo.title}</h3>
            <p className="book-author">{book.volumeInfo.authors?.join(', ')}</p>
        </div>
    );
};

export default TopPickBookItem;
