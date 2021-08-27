import User from '../models/user';
import Notice from '../models/notice';
import Role from '../models/role';
import Group from '../models/group';
import Permission from '../models/permission';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// import { sendEmailWithNodemailer } from "../helpers/email";
// import jwt from 'jsonwebtoken';



const addNotice = async (req, res) => {
    var notice = req.body.notice
    let token = req.body.token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            //console.log(err)
            console.log("fail")
        }
        const { _id, first_name, last_name, email, password } = jwt.decode(token);
        let tokenuser = { _id, first_name, last_name, email, password };
        const id = tokenuser._id
        user = User.findOne({ _id: mongoose.Types.ObjectId(id) }).exec((err, user) => {
            if (err || !user) {
                res.status(400).json({
                    error: 'User Not Found'
                })
            }
            Role.findOne({ _id: user.role }).exec((err, role) => {
                if (err || !role) {
                    res.status(400).json({
                        error: 'User Role Not Found'
                    })
                }
                const role_code = role.toJSON().role_code
                console.log(role_code)

                if (role_code === "student_leader" || role_code === "faculty" ) {
                    const { caption, content } = notice
                    notice = new Notice({ caption: caption, content: content, author: user })
                    notice.save();
                    res.json(notice)
                } else {
                    res.status(400).json({
                        error: 'You cannot Post'
                    })
                }

            })

            // generate a token and send to client
            
            return user
        });
        let error = "";
        if (!user) {
            error = "User Not Found"
        }
        //res.json({user: user})

    });

};

const applyLeader = async (req, res) => {
    let token = req.body.token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            //console.log(err)
            console.log("fail")
        }
        const { _id, first_name, last_name, email, password } = jwt.decode(token);
        let tokenuser = { _id, first_name, last_name, email, password };
        const id = tokenuser._id
        const user = User.findOne({ _id: mongoose.Types.ObjectId(id) }).exec((err, user) => {
            if (err || !user) {
                res.status(400).json({
                    error: 'User Not Found'
                })
            }
            Role.findOne({ _id: user.role }).exec((err, role) => {
                if (err || !role) {
                    res.status(400).json({
                        error: 'User Role Not Found'
                    })
                }
                const role_code = role.toJSON().role_code
                console.log(role_code)

                if (role_code === "student") {
                    Role.findOne({ role_code: "pending_leader" }).exec((err, role) => {
                        if (err || !role) {
                            res.status(400).json({
                                error: 'Role Not Found'
                            })
                        }
                        console.log(role)

                        user.role = role;
                        user.save();
                        res.json({ user: user, message: "Applied Succesfully" })
                    })
                } else {
                    res.status(400).json({
                        error: 'You are not a Student'
                    })
                }

            })

            return user

        });

        let error = "";
        if (!user) {
            error = "User Not Found"
        }
        //res.json({user: user})

    });

};

const approveLeader = async (req, res) => {
    let token = req.body.token
    let approvedID = req.body.id
    console.log(approvedID)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            //console.log(err)
            console.log("fail")
        }
        const { _id, first_name, last_name, email, password } = jwt.decode(token);
        let tokenuser = { _id, first_name, last_name, email, password };
        const id = tokenuser._id
        const user = User.findOne({ _id: mongoose.Types.ObjectId(id) }).exec((err, user) => {
            if (err || !user) {
                res.status(400).json({
                    error: 'User Not Found'
                })
            }
            Role.findOne({ _id: user.role }).exec((err, role) => {
                if (err || !role) {
                    res.status(400).json({
                        error: 'User Role Not Found'
                    })
                }
                const role_code = role.toJSON().role_code
                console.log(role_code)

                if (role_code === "faculty") {
                    User.findOne({ _id: mongoose.Types.ObjectId(approvedID) }).exec((err, user) => {
                        if (err || !user) {
                            res.status(400).json({
                                error: 'User Not Found'
                            })
                        }
                        Role.findOne({ role_code: "student_leader" }).exec((err, role) => {
                            if (err || !role) {
                                res.status(400).json({
                                    error: 'Role Not Found'
                                })
                            }
                            console.log(role)

                            user.role = role;
                            user.save();
                            res.json({ user: user, message: "Approved Succesfully" })
                        })
                    })
                } else {
                    res.status(400).json({
                        error: 'You are not in Faculty'
                    })
                }

            })

            return user

        });

        let error = "";
        if (!user) {
            error = "User Not Found"
        }
        //res.json({user: user})

    });

};

const deleteNotice = async (req, res) => {
    let token = req.body.token
    let noticeID = req.body.noticeID
    console.log(noticeID)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            //console.log(err)
            console.log("fail")
        }
        const { _id, first_name, last_name, email, password } = jwt.decode(token);
        let tokenuser = { _id, first_name, last_name, email, password };
        const id = tokenuser._id
        const user = User.findOne({ _id: mongoose.Types.ObjectId(id) }).populate("role").exec((err, user) => {
            if (err || !user) {
                res.status(400).json({
                    error: 'User Not Found'
                })
            }
            const notice = Notice.findOne({ _id: mongoose.Types.ObjectId(noticeID) }).exec((err, notice) => {
                if (err || !notice) {
                    res.status(400).json({
                        error: 'Notice Not Found'
                    })
                    return notice;
                }
                const role = user.role.toJSON()
                console.log(role.role_code)
                console.log(user._id)
                console.log(notice.author._id)
                if(user._id.equals(notice.author._id)){
                    console.log("isOwner")
                    Notice.deleteOne({_id: notice._id}).exec((err) => {
                        if(err){
                            res.status(400).json({
                                error: 'Problem Deleting Notice'
                            })
                        }else{
                            res.json({
                                message: 'Notice Deleted'
                            })
                        }
                    })
                }else if(role.role_code === "faculty"){
                    notice.content = "Deleted By " + user.first_name + " " + user.last_name
                    notice.save()
                    res.json({
                        notice: notice,
                        message: 'Notice Deleted'
                    })
                }else{
                    res.status(400).json({
                        error: 'Problem Deleting Notice'
                    })
                }


            })

            return user

        });

        let error = "";
        if (!user) {
            error = "User Not Found"
        }
        //res.json({user: user})

    });

};

const hasPerm = async (user, code) => {
    const req = Permission.findOne({ permission_code: code }).exec((err, perm) => {
        if (err || !perm) {
            return false
        }
        console.log(perm)
        return perm
    })
    for await (perm of user.permissions) {

        if (perm.id == req.id) {
            return true;
        }
    }
}


const getNotices = async (req, res) => {
    Notice.find({}).sort({date: "-1"}).populate("author").exec((err, notices) => {
        res.json({
            notices: notices
        })
        console.log(notices)
        return notices
    })
}

const getRoles = async (req, res) => {
    Role.find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
}

const getRole = async (req, res) => {
    let id = req.body.id
    console.log(id)
    await Role.findOne({ _id: ObjectId(id) }, async function (err, result) {
        if (err) throw err;
        console.log(result);
        const role = result
        res.json(role)
    })
}

const getUserRoles = async (req, res) => {
    let id = req.params['id']
    console.log('params ' + id)
    console.log(id)
    await db.collection('users').findOne({ _id: ObjectId(id) }, async function (err, result) {
        if (err) throw err;
        console.log(result);
        const user = result
        let roles = [];
        if (user.roles) {
            for (const role of user.roles) {
                console.log("role" + role)
                let r = await db.collection('roles').findOne({
                    _id: ObjectId(role), async function(err, res) {
                        if (err) throw err;
                        console.log(res)
                        return res
                    }
                })
                roles.push(r)
            }
        }
        if (user.group_roles) {
            for (const g_role of user.group_roles) {
                let r = await db.collection('roles').findOne({ _id: ObjectId(g_role.role_id) })
                roles.push(r)
            }
        }

        res.json(roles)
    })
}

const getGroups = async (req, res) => {
    Group.find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
}

const getPermissions = async (req, res) => {
    Permission.find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
}

const getUsers = async (req, res) => {
    User.find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
}

const getPending = async (req, res) => {
    Role.findOne({ role_code: "pending_leader" }).exec((err, role) => {
        if (err || !role) {
            res.status(400).json({
                error: 'Role Not Found'
            })
        }
        console.log(role)
        User.find({ role: role }).exec((err, users) => {
            res.json({
                users: users
            })
            console.log(users)
            return users
        })
    })

}

const getUserByID = async (req, res) => {
    const id = req.body.id;
    const user = User.findOne({ _id: mongoose.Types.ObjectId(id) })
    let error = "";
    if (!user) {
        error = "User Not Found"
    }
    res.json({ user: user, error: error })

}

const getUserByTokenReq = async (req, res) => {
    const token = req.body.token;
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            //console.log(err)
            console.log("fail")

            res.json({ error: "Session Ended, Please Login Again" })
        }
        const { _id, first_name, last_name, email, password } = jwt.decode(token);
        let tokenuser = { _id, first_name, last_name, email, password };
        const id = tokenuser._id
        const user = User.findOne({ _id: mongoose.Types.ObjectId(id) }).populate("role").exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User with that id does not exist'
                })
            }

            // generate a token and send to client
            const { _id, first_name, last_name, email, role } = user;
            return res.json({
                user: { _id, first_name, last_name, email, role }
            })
        });
        let error = "";
        if (!user) {
            error = "User Not Found"
        }
        console.log(user)
        //res.json({user: user})

    });


}

const getUserByToken = async (token) => {
    var user = null
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            //console.log(err)
            console.log("fail")
        }
        const { _id, first_name, last_name, email, password } = jwt.decode(token);
        let tokenuser = { _id, first_name, last_name, email, password };
        const id = tokenuser._id
        user = User.findOne({ _id: mongoose.Types.ObjectId(id) }).exec((err, res) => {
            if (err || !res) {

            }

            // generate a token and send to client
            console.log(res)

            return res
        });
        let error = "";
        if (!user) {
            error = "User Not Found"
        }
        //res.json({user: user})

    });

    console.log("here")
    console.log(user)
    return user


}

const getCurrUser = async (req, res) => {
    console.log(req.user)
    //res.setHeader('Access-Control-Allow-Headers', 'Set-Cookie')
    res.json(req.user)
}




export {
    addNotice, getNotices, getRoles,
    getUserRoles, getRole, getGroups,
    getPermissions, getUsers, getCurrUser,
    getUserByID, getUserByTokenReq, applyLeader,
    getPending, approveLeader, deleteNotice
};

