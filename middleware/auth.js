const authMiddleware = (req, res, next) => {
  const authToken = req.headers["authorization"];
  console.log("Authorization Token:", authToken); // добавьте логирование
  if (authToken === "xxx") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden authorization svdvvsdv" });
  }
};

module.exports = authMiddleware;
