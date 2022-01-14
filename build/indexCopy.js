import env from "dotenv";
import express from "express";

// ----- Load environment variables from .env file, where API keys and passwords are configured
env.config();

// ----- Create Express server
const app = express();

// ----- Express configuration
const PORT = process.env.PORT || 3000;


// ----- API endpoints
app.get("/", (_req, res) => {
  res.send("Hello world");
});

app.get("/pepe", (_req, res) => {
  res.send("El pepe");
});

app.get('/categories/:category/products/:product', (req, res) => {
  const { category, product } = req.params;
  res.json({
    category,
    name: `Product ${product}`,
    price: 100,
  });
})

app.get('/users', (req, res) => {
  let { limit, offset } = req.query;
  limit = Number(limit || 10);
  offset = Number(offset || 0);

  res.json({limit, offset});
});


// ----- Start the Express server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

// ----- Export the Express server
export default app;
