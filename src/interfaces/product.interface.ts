import { Schema } from "mongoose";
import { User } from "./user.interface";

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  authorId: Schema.Types.ObjectId;
  vendor: string;
  isBlock: boolean;
}
