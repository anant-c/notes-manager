import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: "User not valid." });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adjust key according to JWT payload - you used _id in your sign
    if (decoded._id) {
      req.userId = decoded._id;  
      next();
    } else {
      return res.status(403).json({ message: "Invalid token payload." });
    }
  } catch (err) {
    const msg =
      err.name === 'TokenExpiredError'
        ? 'Session expired. Please sign in again.'
        : 'Invalid authentication token.';
    return res.status(401).json({ message: msg });
  }
};
