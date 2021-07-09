import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Post } from './post.schema'
import { Comment } from './comment.schema'
import { UsersService } from '../users/users.service'

@Injectable()
export class PostsService {
  private posts: Post[] = []
  private comments: Comment[] = []

  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
    private readonly usersService: UsersService
  ) {}

  async createPost(params: any) {
    if (!params.body || !params.userId) {
      return {
        message: 'Post body and user info must be supplied!'
      }
    }
    const user = await this.usersService.findUser(params.userId)
    const setPost = new this.postModel({
      body: params.body,
      user: user._id
    })
    const updateUser = await this.usersService.update(user._id, user, setPost, undefined)
    const result = await setPost.save()
    return {
      message: `${user.username} created a post successfully!`,
      result
    }
  }

  async findAllPosts() {
    const posts = await this.postModel.find().exec()
    return posts as Post[]
  }

  async findPost(id?: ObjectId, params?: any) {
    let post
    if (id) {
      post = await this.findPostById(id)
    }
    if (params) {
      post = await this.postModel.findOne({ body: params.body }).exec()//.populate({ path: 'comments' }).exec((err, post) => {
        // post
      // })
    }
    return post
  }

  async updatePost(id: ObjectId, params?: Post, comment?: Comment) {
    const post = await this.findPostById(id)
    Object.assign(post, params)
    if (comment) {
      post.comments.push(comment)
    }
    const result = await post.save()
    return {
      message: 'Post updated successfully!',
      result
    }
  }

  async removePost(id: ObjectId) {
    const post = await this.findPostById(id)
    const toDelete = await this.postModel.deleteOne({ _id: id }).exec()
    if (toDelete.n === 0) {
      throw new NotFoundException('Could not find post.')
    }
    return {
      message: 'Post deleted successfully!'
    }
  }

  async createComment(postId: ObjectId, params: any) {
    if (!params.body || !params.userId || !postId) {
      return {
        message: 'Comment body, user and post info must be supplied!'
      }
    }
    const user = await this.usersService.findUser(params.userId)
    const post = await this.findPostById(postId)
    const setComment = new this.commentModel({
      body: params.body,
      user: user._id,
      post: post._id
    })
    const updateUser = await this.usersService.update(user._id, user, post, setComment)
    const updatePost = await this.updatePost(postId, undefined, setComment)
    const result = await setComment.save()
    return {
      message: `${user.username} commented "${params.body.substr(0, 10)}..." on "${post.body.substr(0, 10)}..." post successfully!`,
      result
    }
  }

  async updateComment(id: ObjectId, params: Comment) {
    const comment = await this.findCommentById(id)
    Object.assign(comment, params)
    const result = await comment.save()
    return {
      message: 'Comment updated successfully!',
      result
    }
  }

  async removeComment(id: ObjectId) {
    const comment = await this.findCommentById(id)
    const toDelete = await this.commentModel.deleteOne({ _id: id }).exec()
    if (toDelete.n === 0) {
      throw new NotFoundException('Could not find comment.')
    }
    return {
      message: 'Comment deleted successfully!'
    }
  }

  async likePost(params: any) {
    const user = await this.usersService.findUser(params.userId)
    const post = await this.findPostById(params.postId)

    console.log('params: ', params)
    console.log('user: ', user)
    console.log('post: ', post)
  }

  async likeComment(params: any) {
    const user = await this.usersService.findUser(params.userId)
    const post = await this.findPostById(params.postId)
    const comment = await this.findCommentById(params.commentId)

    console.log('params: ', params)
    console.log('user: ', user)
    console.log('post: ', post)
    console.log('comment: ', comment)
  }

  private async findPostById(id: ObjectId) {
    let post
    try {
      post = await this.postModel.findById(id).exec()//.populate({ path: 'comments' }).exec((err, post) => {
        // post
      // })
    } catch(err) {
      throw new NotFoundException('Could not find post.')
    }
    if (!post) {
      throw new NotFoundException('Could not find post.')
    }
    return post
  }

  private async findCommentById(id: ObjectId) {
    let comment
    try {
      comment = await this.commentModel.findById(id).exec()
    } catch(err) {
      throw new NotFoundException('Could not find comment.')
    }
    if (!comment) {
      throw new NotFoundException('Could not find comment.')
    }
    return comment
  }
}
