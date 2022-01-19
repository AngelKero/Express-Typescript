import express from "express";
import faker from "faker";
const router = express.Router();

router.get("/", (_req, res) => {
  const { size } = _req.query;

  const MAX_SIZE = 100;
  const limit = Number(size) > MAX_SIZE ? MAX_SIZE : size || 10;

  const users = [];
  for (let i = 0; i < limit; i++) {
    users.push({
      id: i,
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar()
    });
  }

  res.json({
    totalUsers: users.length,
    users
  });
});

router.get("/:id", (_req, res) => {
  const { id } = _req.params;

  const user = {
    id,
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar()
  };

  res.json(user);
});

export default router;
