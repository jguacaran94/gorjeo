import * as mongoose from 'mongoose'

export const PostSchema = new mongoose.Schema({
  body: String,
  like: {
    type: Number,
    default: 0
  },
  repost: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

export interface Post extends mongoose.Document {
  body: string
  like: number
  repost: number
  createdAt: Date
  updatedAt: Date
}