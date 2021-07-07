import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

export interface User extends mongoose.Document {
  name: string
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}