const auth = (req,res,next) => {
    if (!req.session.loggedIn) return res.status(401).send({message: 'You are not authorized'});
    next();
}

module.exports = auth