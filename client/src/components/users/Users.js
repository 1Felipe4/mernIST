import User from './User.js';

const Users = ({ users, onDelete }) => {
    if (users) {
            return (
                <>
                    {users.map((user) => (
                        <div key={user._id}>
                            <User key={user.id} user={user} onDelete={onDelete} />
                        </div>
                    ))}
                </>
            )
      }else{
        return (
            <div>
            here
            </div>
        )
      }
    
}

export default Users
