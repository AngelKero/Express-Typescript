import faker from "faker";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { User } from "src/interfaces/user.interface";
import UserSchema from "./../db/models/user.model";

class UserService {

  constructor() {}

  async create(id: string,user: User): Promise<User> {
    try {
      delete user.email;
      delete user.password;
      const userCreated = await UserSchema.findOneAndUpdate(
        {_id: id}, user, {upsert: false, new: true, projection: {password: 0, recoveryToken: 0}}
      );
      return userCreated.toObject();
    } catch (error) {
      throw boom.conflict();
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await UserSchema.find({}, '-password -recoveryToken');
      return users.map(user => user.toObject());
    } catch (error) {
      throw boom.notFound();
    }
  }

  async findOne(params: Partial<User>): Promise<User> {
    try {
      const user = await UserSchema.findOne(params, '-password -recoveryToken');
      return user.toObject();
    } catch (error) {
      throw boom.notFound();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await UserSchema.findOne({email}, '-password -recoveryToken');
      return user.toObject();
    } catch (error) {
      throw boom.notFound();
    }
  }

  async findWithPassword(email: string): Promise<User> {
    try {
      const user = await UserSchema.findOne({email}, '-recoveryToken');
      return user.toObject();
    } catch (error) {
      throw boom.notFound();
    }
  }

  async findById(_id: string): Promise<User> {
    try {
      const user = await UserSchema.findById(_id, '-password -recoveryToken');
      return user.toObject();
    } catch (error) {
      throw boom.notFound();
    }
  }

  async findByIdComplete(_id: string): Promise<User> {
    try {
      const user = await UserSchema.findById(_id, '+password +recoveryToken');
      return user.toObject();
    } catch (error) {
      throw boom.notFound();
    }
  }

  async update(id: string, params: Partial<User>): Promise<User> {
    try {
      const userUpdated = await UserSchema.findByIdAndUpdate(
        id, params, {multi: true, new: true, projection: {password: 0, recoveryToken: 0}}
      );
      return userUpdated.toObject();
    } catch (error) {
      throw boom.notFound();
    }
  }

  async getRecoveryToken(id: string): Promise<string> {
    try {
      const user = await UserSchema.findOne({_id: id}, '-password -recoveryToken');
      return user.toObject().recoveryToken;
    } catch (error) {
      throw boom.notFound();
    }
  }
}

export const service = new UserService();
