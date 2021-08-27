import { useState } from 'react';

const AddUser = ({ onAdd }) => {
    const [student_id, setStudent_ID] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if(!student_id){
            alert('Please add a Student ID');
            return;
        }

        if(!password){
            alert('Please add a Password');
            return;
        }
        onAdd({ student_id, password});
        setStudent_ID('');// clear the field
        setPassword('');// clear day field
    } 

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Student ID</label>
                <input type='text' placeholder='000XXXXX' value={student_id} onChange={(e) => setStudent_ID(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type='password' placeholder='' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div> 
            <input type='submit' value='Add User' className='btn btn-block' />
        </form>
    )
}

export default AddUser
