// import { FaTimes } from 'react-icons/fa';
const User = ({ user, onDelete }) => {
    return (
        <div>
            <h3>{ user.first_name } </h3>
            <p></p>
        </div>
    )
}

export default User
// {/* <FaTimes style={{ color:'red', cursor: 'pointer' }}  onClick={() => onDelete(user.id)}/> */}