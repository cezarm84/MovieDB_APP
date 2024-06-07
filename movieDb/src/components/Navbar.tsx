import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import the logout icon
import styles from './styles/navbar.module.css';
import { useStore } from '../store/store';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const Navbar: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate(); // Initialize useNavigate

    const menuItems = [
        { name: 'Home', icon: faHome, route: '/' }, 
        { name: 'Favorites', icon: faHeart, route: '/favoritesPage' }, 
        { name: 'Logout', icon: faSignOutAlt }, 
    ];

    const handleClick = (index: number, route?: string) => {
        setActiveIndex(index);
        if (route) {
            navigate(route); 
        }
    };

    const logout = useStore((state) => state.logout); 

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };

    return (
        <div className={styles.navigation}>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index} className={`${styles.list} ${index === activeIndex ? styles.active : ''}`} onClick={() => handleClick(index, item.route)}>
                        <a href="#">
                            <span className={styles.icon}>
                                {item.name === 'Logout' ? ( 
                                    <FontAwesomeIcon icon={item.icon} onClick={handleLogout} /> 
                                ) : (
                                    <FontAwesomeIcon icon={item.icon} />
                                )}
                            </span>
                            <span className={styles.text}>{item.name}</span>
                            <span className={styles.circle}></span>
                        </a>
                    </li>
                ))}
               
            </ul>
        </div>
    );
};

export default Navbar;
