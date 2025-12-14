const jwt = require("jsonwebtoken");

//Student AuthMiddleware
exports.verifyStudent = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "No Token Provided" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid Token" });

    if (decoded.role !== "student") {
      return res.status(403).json({ message: "Access denied: Not a Student" });
    }

    req.user = decoded;
    next();
  });
};

// COORDINATOR AuthMiddleware
exports.verifyCoordinator = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "No Token Provided" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid Token" });

    if (decoded.role !== "coordinator") {
      return res.status(403).json({ message: "Access denied: Not a Coordinator" });
    }

    req.user = decoded;
    next();
  });
};

// DIRECTOR AUTHMiddleware
exports.verifyDirector = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "No Token Provided" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid Token" });

    if (decoded.role !== "director") {
      return res.status(403).json({ message: "Access denied: Not a Director" });
    }

    req.user = decoded;
    next();
  });
};
