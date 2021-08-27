import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Layout from '../../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import React, { useState, useEffect, Component } from "react";
import jwt from 'jsonwebtoken';
import axios from "axios";
import { useHistory } from "react-router-dom";


const LogOut = () => {
    const history = useHistory();
    const [values, setValues] = useState({
        buttonText: 'Log Out'
    });

    const { buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            buttonText: "submitting"
        });

        const token = localStorage.removeItem('token');
        setTimeout(() => {
            history.push('/signin');
        }, 3000)
        
    }

    return (
        <Button variant="danger" onClick={handleSubmit}>
                    {buttonText}
        </Button>
    )
}








// const AddNotice = ({ onAdd, user }) => {
//     const [caption, setCaption] = useState('');
//     const [content, setContent] = useState('');


//     const onSubmit = (e) => {
//         e.preventDefault();

//         if(!content){
//             alert('Please add a content');
//             return;
//         }
//         onAdd({ caption:caption, content:content, author:user, date: new Date()});
//         setCaption('');// clear the field
//         setContent('');// clear day field
//     } 


//     return (
//         <>
//         <div >
//       <Form onSubmit={this.handleSubmit}>
//           <Form.Group controlId="addFormNoticeCaption">
//             <Form.Label>Caption</Form.Label>
//             <Form.Control name="student_id"
//               type="text"
//               value={this.state.student_id}
//               onChange={this.handleChange} />
//           </Form.Group>
//           {this.state.activate ? (<EmailInput email={this.state.email} handleChange={this.handleChange} />) : ('')}
//           <Form.Group controlId="formBasicPassword">
//             <Form.Label>Password:</Form.Label>
//             <Form.Control name="password"
//               type="password"
//               value={this.state.password}
//               onChange={this.handleChange} />
//           </Form.Group>
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//       </div>
//         <form className='add-form' onSubmit={onSubmit}>
//             <div className='form-control'>
//                 <label>Caption</label>
//                 <input type='text' placeholder='Caption' value={caption} onChange={(e) => setCaption(e.target.value)} />
//             </div>
//             <div className='form-control'>
//                 <label>Content</label>
//                 <textarea type='text' placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} > </textarea>
//             </div>
//             <input type='submit' value='Add Notice' className='btn btn-block' />
//         </form>
//         </>
//     )
// }

export default LogOut