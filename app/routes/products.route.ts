import express from "express";
import faker from "faker";

const router = express.Router();

router.get('/', (_req, res) => {
  let { size } = _req.query;

  const MAX_SIZE = 100;
  const limit = Number(size) > MAX_SIZE ? MAX_SIZE : size || 10;

  const products = [];
  for (let i = 0; i < limit; i++) {
    products.push({
      id: i,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.nature(1920, 1080),
      author: faker.animal.cat(),
      description: faker.lorem.lines(3),
      vendor: faker.company.companyName()
    });
  }

  res.json({
    totalProducts: products.length,
    products
  });
});

// Los endpoints espesificos van arriba de los dinamicos
router.get('/filter', (req, res) => {
  res.send('Filtered products');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: `Product ${id}`,
    price: 100 * Number(id)
  });
});

export default router;
