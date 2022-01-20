import faker from "faker";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { User } from "src/interfaces/user.interface";

class UserService {
  users: User[];

  constructor() {
    this.users = [];
    this.generate(3);
  }

  generate(size: number): void {
    const MAX_SIZE = 100;
    const limit = Number(size) > MAX_SIZE ? MAX_SIZE : size || 10;

    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: bcrypt.hashSync(faker.internet.password(), 10),
        role: faker.random.arrayElement(["user", "admin"])
      });
    }

    this.users.push({
      id: faker.datatype.uuid(),
      name: "Angel Zaragoz",
      email: "zangelweb@gmail.com",
      avatar: faker.image.avatar(),
      password: bcrypt.hashSync("Ratona3695?", 10),
      role: "admin"
    });
  }

  emailExists(email: string): boolean {
    return this.users.some(user => user.email === email);
  }

  async create(user: User): Promise<User> {
    if (this.emailExists(user.email)) throw boom.conflict('Email already exists');
    const newUser = {
      ...user,
      id: faker.datatype.uuid(),
      password: bcrypt.hashSync(user.password, 10)
    };
    this.users.push({...newUser});

    delete newUser.password;
    return newUser;
  }

  async find(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          this.users.map(user => {
            const UserWithoutPassword = Object.assign({}, user);
            delete UserWithoutPassword.password;
            return UserWithoutPassword;
          })
        );
      }, 1000);
    });
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    if (!user) throw boom.notFound();

    const UserWithoutPassword = Object.assign({}, user);
    delete UserWithoutPassword.password;
    return UserWithoutPassword;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);
    if (!user) throw boom.notFound('User doesn`t exist');
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    return user;
  }
}

export const service = new UserService();
