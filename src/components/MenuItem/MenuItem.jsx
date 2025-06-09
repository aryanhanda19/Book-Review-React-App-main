import './MenuItem.css';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ item }) => {

    const navigate = useNavigate();

    return (
        <div key={item.path} className="menu-item" onClick={() => navigate(item.path)}>
            <img className="menu-image" src={item.image} alt={item.label} />
            <h2 className="menu-text">{item.label}</h2>
        </div>
    );
};

export default MenuItem;
