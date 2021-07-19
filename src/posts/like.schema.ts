import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from '../users/user.schema'
import { Post } from './post.schema'
import { Comment } from './comment.schema'

export type LikeDocument = Like & Document

@Schema({ timestamps: true })
export class Like {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name })
  post: Post

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Comment.name })
  comment: Comment
}

export const LikeSchema = SchemaFactory.createForClass(Like)