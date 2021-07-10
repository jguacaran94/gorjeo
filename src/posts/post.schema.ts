import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from '../users/user.schema'
import { Comment } from './comment.schema'

export type PostDocument = Post & Document

@Schema({ timestamps: true })
export class Post {
  @Prop()
  body: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User

  @Prop()
  comments: []
}

export const PostSchema = SchemaFactory.createForClass(Post)

// export const PostSchema = new mongoose.Schema({
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
//   comments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Comment'
//     }
//   ],
// }, {
//   timestamps: true
// })

// export interface Post extends mongoose.Document {
//   body: string
//   like: number
//   repost: number
//   user: {}
//   comments: [{}]
// }