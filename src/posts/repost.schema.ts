import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from '../users/user.schema'
import { Post } from './post.schema'

export type RepostDocument = Repost & Document

@Schema({ timestamps: true })
export class Repost {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name })
  post: Post
}

export const RepostSchema = SchemaFactory.createForClass(Repost)