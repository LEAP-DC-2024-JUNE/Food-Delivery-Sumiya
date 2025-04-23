export const authorizeUser = (roles) => {
  return (req, res, next) => {
    if (!req.body.user || !req.body.user.role) {
      return res.status(403).json({ message: "USER ALGAGA" });
    }

    if (roles.includes(req.body.user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "Authorization failed" });
    }
  };
};
