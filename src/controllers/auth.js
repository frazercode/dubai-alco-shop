const getAuth = (req,res) => {
    res.send({loggedIn: req.session.loggedIn});
}

const postAuth = (req,res) => {
    const {username, password} = req.body;
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) return res.status(401).send({message:'Incorrect credentials'});
    req.session.loggedIn = true;
    req.session.save();
    res.send({loggedIn: true});
}

const deleteAuth = (req,res) => {
    req.session.destroy();
    res.send({loggedIn: false});
}

module.exports = {
    getAuth,
    postAuth,
    deleteAuth
}
