
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log('Authorization Token:', token); 

  if (token === 'your_secret_token') {
    next();
  } else {
    console.log('Forbidden: Invalid token'); 
    res.status(403).json({ error: 'Forbidden' });
  }
};

