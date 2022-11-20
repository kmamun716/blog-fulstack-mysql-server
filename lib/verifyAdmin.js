const db = require("../modles");
const verifyAdmin = async (req, res, next) => {
  const user = req.user;
  const isAdmin = await db.users.findOne({
    where: { email: user.email },
    attributes: ["role"],
  });
  if (isAdmin === "admin") {
    next();
  }
};

module.exports = verifyAdmin;
