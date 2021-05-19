import * as mongoose from 'mongoose';
import validator from 'validator';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    validate: (value: number) => {
      if (!((value > 1) && (value < 100)) && (value - Math.floor(value) == 0)) {
        throw new Error('Age must be a positive integer');
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value: string) => {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email format');
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
});
