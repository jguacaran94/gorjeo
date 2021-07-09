// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
// import { Document, Types, Schema as MongooseSchema } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from '../users/user.schema'
import { Comment } from './comment.schema'

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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
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

export interface Post extends mongoose.Document {
  body: string
  like: number
  repost: number
  user: {}
  comments: [{}]
}