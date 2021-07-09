import * as mongoose from 'mongoose'
import { Post } from '../posts/post.schema'

export const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now
  // }
}, {
  timestamps: true
})

export interface User extends mongoose.Document {
  name: string
  username: string
  email: string
  password: string
  posts: []
  comments: []
  createdAt: Date
  updatedAt: Date
}