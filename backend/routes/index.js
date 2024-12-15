const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");
const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "This is service" });
});

router.use("/users", userRoutes);
router.use("/products", productRoutes);

module.exports = router;
