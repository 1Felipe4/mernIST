import User from '../models/user';
import { sendEmailWithNodemailer } from "../helpers/email";
import jwt from 'jsonwebtoken';
import Role from '../models/role';



const signup = (req, res) => {
    const {first_name, last_name, email, password } = req.body;
 
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
 
    const token = jwt.sign(
      { first_name, last_name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );
 
    const emailData = {
      to: "1felipe4roblox@gmail.com",//email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: "ACCOUNT ACTIVATION LINK",
      html: `
                <h1>Please use the following link to activate your account</h1>
                <p>http://localhost:3000/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>http://localhost:3000</p>
            `,
    };
 
    sendEmailWithNodemailer(req, res, emailData);
    });

};

const accountActivation = (req, res) => {
    const {token} = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) =>{
        if (err) {
            console.log('JWT account verification error', err); 
            return res.status(401).json({
                error: 'Expired Link.  Signup again'
            });
            
        }
        const {first_name, last_name,  email, password} = jwt.decode(token);
        let index = email.indexOf('@') + 1;
        let domain = email.slice(index);
        let code = "student"
        if(domain == "costaatt.edu.tt"){
            code = "faculty"
        }

        Role.findOne({ role_code: code }).exec((err, role) => {
            if (err || !role) {
                return res.status(400).json({
                    error: 'Role Not Found'
                })
            }
            const user = new User({first_name, last_name, email, password});
            user.role = role;
            user.save((err, user) => {
                if(err) {
                    console.log('Error saving user during account activation');
                    return res.status(401).json({
                        error: 'Error saving user in database.  Try signing up again'
                    })
                }
                // return res.status(200).json({
                //     message: 'Signup success.  Please sign in'
                // });
                console.log(user)
                res.send({
                        message: 'Signup success.  Please sign in'
                    });
            });
        })
        
    });

    }else {
        return res.json({
            message: 'something went wrong'
        })
    }

}


/* ~ check if the user is trying to signin but hadn't signed up as yet
~  check if the password matches
~  if yes generate token with expiry
~  send token  and user info to the client
~  use this as jwt-based authentication system
~  we can allow users to access protected routes later if they have valid token (i.e. it is a pwd with expiry)

*/
const signin = (req, res) => {
    const {email, password} = req.body;
    //check if user exists
    User.findOne({email}).exec((err, user)=> {
        if (err || !user){
            return res.status(400).json({
                error:'User with that email does not exist'
            })
        }
        // authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email and password do not match'
            })
        }

        // generate a token and send to client
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        const {_id, first_name, last_name, email, role} = user;
        return res.json({
            token,
            user: {_id, first_name, last_name, email, role}
        })
    });
}

export {signup, accountActivation, signin };



// const signup = (req, res) => {
//     // console.log('data from request ', req.body);
//     // res.json({
//     //     data:'you hit the signup endpoint.. told ya!!'
//     // });

//     //create the user by destructuring the data in the request body
//     const { name, email, password } = req.body;

//     // check if the email already exists in the database
//     User.findOne({email}).exec((err, user) => {

//         if(user){
//             return res.status(400).json({
//                 error: 'Email is taken'
//             });
//         }
//     })

//     let newUser = new User({name, email, password });

//     // .save method inserts a new document in db
//     newUser.save((err, success) => {
//         if (err) {
//             console.log('SIGNUP ERROR', err.message.substring(1,50));
//             return res.status(400).json({
//                 error: err
//             });
//         }
//         res.status(200).json({
//             message: 'Signup success! Please signin'
//         })
//     } )


// }