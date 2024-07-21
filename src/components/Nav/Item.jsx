import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

function NavItem({ link, title, display }){
    return (display===undefined || display) && (
        <>
            <li className="nav-item">
                <NavLink to={link} className="nav-link text-white">{ title }</NavLink>
            </li>
        </>
    )
}

NavItem.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool
}

export default NavItem;