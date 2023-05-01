const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (error, decodedToken) => {
         if (error) {
            res.status(401).json({ error: "Token invalide" });
         }
         else {
            const userId = decodedToken.id;
            const role = decodedToken.role;
            req.auth = { userId, role };
            if (req.body.id && req.body.id !== userId) {
               throw new Error("ID utilisateur invalide");
            } 
            else {
               next();
            }
         }
      });
   } catch (error) {
      res.status(403).json({ error: "unauthorized request !" });
   }
};