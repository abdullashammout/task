const express = require("express");
const app = express();
const cors = require("cors");
const productRoutes = require("./routes/products");

app.use(express.json());
app.use(cors());
app.use(productRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
