require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

app.listen(3000, () => {
  console.log("🚀 Serveur lancé sur http://localhost:3000");
});
