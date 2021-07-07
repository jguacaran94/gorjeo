import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Post } from './post.model'

@Injectable()
export class PostsService {
  private posts: Post[] = []

  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>
  ) {}

  async create(params: Post) {
    if (!params.body) {
      return {
        message: 'Please send a post body!'
      }
    }
    const setPost = new this.postModel({
      body: params.body
    })
    const result = await setPost.save()
    return {
      message: `Post created successfully!`,
      result
    }
  }

  async findAll() {
    const posts = await this.postModel.find().exec()
    return posts as Post[]
  }

  async findPost(id?: ObjectId, params?: any) {
    let post
    if (id) {
      post = await this.findPostById(id)
    }
    if (params) {
      post = await this.postModel.findOne({ body: params.body })
    }
    return post
  }

  async update(id: ObjectId, params: Post) {
    const post = await this.findPostById(id)
    Object.assign(post, params)
    if (params.body) {
      post.updatedAt = Date.now()
    }
    const result = await post.save()
    return {
      message: 'Post updated successfully!',
      result
    }
  }

  async remove(id: ObjectId) {
    const post = await this.findPostById(id)
    const toDelete = await this.postModel.deleteOne({ _id: id }).exec()
    if (toDelete.n === 0) {
      throw new NotFoundException('Could not find post.')
    }
    return {
      message: 'Post deleted successfully!'
    }
  }

  private async findPostById(id: ObjectId) {
    let post
    try {
      post = await this.postModel.findById(id).exec()
    } catch(error) {
      throw new NotFoundException('Could not find post.')
    }
    if (!post) {
      throw new NotFoundException('Could not find post.')
    }
    return post
  }
}
