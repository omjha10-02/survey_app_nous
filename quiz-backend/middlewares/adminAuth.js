const adminAuth = (req, res, next) => {
    const { isAdmin } = req.body; // Assume admin status is sent in the request body
  
    // Check if the user is an admin
    if (!isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
  
    next(); // If authorized, proceed to the next middleware/controller
  };
  
  module.exports = adminAuth;
  