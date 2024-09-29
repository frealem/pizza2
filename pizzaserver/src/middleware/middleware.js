const jwt=require('jsonwebtoken')


const permissions = {
    superadmin: ['create', 'read', 'update', 'delete'],
    customer: ['create', 'read', 'update', 'delete'],
    manager: ['read', 'update','create','delete'],
};

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
const authorize = (action) => {
    return (req, res, next) => {
        const userRole = req.user.role; 

        if (!permissions[userRole] || !permissions[userRole].includes(action)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

module.exports={authMiddleware,authorize}