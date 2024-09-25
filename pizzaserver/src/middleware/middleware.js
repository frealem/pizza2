const jwt=require('jsonwebtoken')
const { defineAbilitiesFor }=require('./caslMiddleware')


const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token required.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });
        req.user = user; // Attach user information to the request
        next();
    });
};

// Authorization middleware
const authorize = (action, subject) => {
    return (req, res, next) => {
        const abilities = defineAbilitiesFor(req.user.role); // Define abilities based on user role

        if (!abilities.can(action, subject)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

module.exports={authMiddleware,authorize}