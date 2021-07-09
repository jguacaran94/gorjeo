import * as mongoose from 'mongoose'
import { User, UserSchema } from '../users/user.schema'
import { Post, PostSchema } from './post.schema'

export const CommentSchema = new mongoose.Schema({
  body: String,
  likes: [
    {
      like: Boolean,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  repost: [
    {
      repost: Boolean,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
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