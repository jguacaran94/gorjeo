import * as mongoose from 'mongoose'
import { User, UserSchema } from '../users/user.schema'
import { Post, PostSchema } from './post.schema'

export const CommentSchema = new mongoose.Schema({
  body: String,
  like: {
    type: Number,
    default: 0
  },
  repost: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
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

export interface Comment extends mongoose.Document {
  body: string
  like: number
  repost: number
  user: {}
  post: {}
}