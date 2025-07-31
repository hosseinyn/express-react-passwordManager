import jwt from "jsonwebtoken"


const verifyJwtToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
        try {
            const decoded = jwt.verify(token, 'your-secret-key'); // Change secret key in real project
            req.username = decoded.username;
        next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    };


export {verifyJwtToken}