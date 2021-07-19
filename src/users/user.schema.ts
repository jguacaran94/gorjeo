import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import * as mongoose from 'mongoose'
import { Post } from '../posts/post.schema'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string

  @Prop()
  username: string

  @Prop()
  email: string

  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)

// export const UserSchema = new mongoose.Schema({
//   name: String,
//   username: String,
//   email: String,
//   password: String,
//   posts: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Post'
//     }
//   ],
//   // comments: [
//   //   {
//   //     type: mongoose.Schema.Types.ObjectId,
//   //     ref: 'Comment'
//   //   }
//   // ],
//   postLikes: [
//     {
//       like: Boolean,
//       post: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Post'
//       }
//     }
//   ],
//   commentLikes: [
//     {
//       like: Boolean,
//       comment: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Comment'
//       }
//     }
//   ]
// }, {
//   timestamps: true
// })

// export interface User extends mongoose.Document {
//   name: string
//   username: string
//   email: string
//   password: string
//   posts: []
//   postLikes: []
//   commentLikes: []
//   createdAt: Date
//   updatedAt: Date
// }