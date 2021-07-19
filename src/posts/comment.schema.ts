import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from '../users/user.schema'
import { Post } from './post.schema'

export type CommentDocument = Comment & Document

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  body: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name })
  post: Post
}

export const CommentSchema = SchemaFactory.createForClass(Comment)

// export const CommentSchema = new mongoose.Schema({
//   body: String,
//   likes: [
//     {
//       like: Boolean,
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//       },
//       likedAt: Date
//     }
//   ],
//   repost: [
//     {
//       repost: Boolean,
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//       }
//     }
//   ],
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   post: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Post'
//   }
// }, {
//   timestamps: true
// })

// export interface Comment extends mongoose.Document {
//   body: string
//   like: number
//   repost: number
//   user: {}
//   post: {}
// }