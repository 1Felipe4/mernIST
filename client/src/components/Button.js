// use rafce to get component boilerplate due to ES7 snippets package/plugin
import PropTypes from 'prop-types';

const Button = ({ color, text, btnClick }) => {
   
    return (
        <button style={{backgroundColor: color}} className='btn' onClick={btnClick}>{text}</button>

    )
}

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    btnClick: PropTypes.func,
}

export default Button
