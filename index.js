if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authMiddleware = require("./middleware/auth");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(authMiddleware.initialize);

// Routes
app.use([
  require("./routes/auth"),
  require("./routes/rooms"),
  require("./routes/validation"),
  require("./routes/messenger"),
  require("./routes/test"),
  require("./routes/clients/admin/employees"),
]);

// Error handling
app.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message,
    },
  });
});
const PORT = process.env.PORT || 7000;

// Read port and host from the configuration file
app.listen(PORT, () => console.log("Express listening on port ", PORT));
