import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onAddClick, showAdd } ) => {
    return (
        <header className="header">
           <h1>{title}</h1>
           <Button 
            color={showAdd ? 'red' : 'green'} 
            text={showAdd ? 'close' : 'Add'} 
            btnClick={onAddClick} />
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker",
}    

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
