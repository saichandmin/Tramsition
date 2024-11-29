const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json()); // To parse JSON requests

// Validation middleware using code1 data
const validateInput = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("age").isInt({ min: 18 }).withMessage("Age must be at least 18"),
];

app.post("/submit", validateInput, (req, res) => {
  const errors = validationResult(req);

  // If validation fails, return error details
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If validation passes, return success message
  res.status(200).json({
    message: "Data successfully validated and submitted!",
    data: req.body,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
