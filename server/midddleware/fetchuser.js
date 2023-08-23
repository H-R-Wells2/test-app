var jwt = require('jsonwebtoken');
const JWT_SECRET = 'testApp';


const fetchuser = (req, res, next) => {
   const token = req.header('auth-token');
   if (!token) {
     return res.status(401).json({ error: 'No auth token found, please login.' });
   }
 
   try {
     const data = jwt.verify(token, JWT_SECRET);
     req.user = data.user;
     next();
   } catch (error) {
     console.error(error);
     res.status(401).json({ error: 'Invalid auth token, please login again.' });
   }
 };
 

module.exports = fetchuser;