const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

// first check request headers has authrization or not
const authorization=req.headers.authorization;
if(!authorization) return res.status(401).json({ error: "Token not found"});

    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET );
        
        // Attach user information to the request object
        // u can use any name for user or payLoad,etc
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};


// Function to Genrate JWT token
const genrateToken=(userData)=> {
    // Genrate a new JWT token using user data
    return jwt.sign(userData , process.env.JWT_SECRET)
    // return jwt.sign(userData , process.env.JWT_SECRET, {expiresIn: 25})
};

module.exports = {jwtAuthMiddleware,genrateToken};