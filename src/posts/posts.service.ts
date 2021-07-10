import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Post, PostDocument } from './post.schema'
import { Comment } from './comment.schema'
import { UsersService } from '../users/users.service'

@Injectable()
export class PostsService {
  private posts: Post[] = []
  private comments: Comment[] = []

  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
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

  async findPost(id: ObjectId, params: any) {
    const post = await this.findPostById(id)
    const user = await this.usersService.findUser(post.user)
    post.user = user
    if (params.commentId) {
      const comments = await this.findCommentById(params.commentId)
      post.comments = comments
    } else {
      return post
    }
    return post
  }

  async updatePost(id: ObjectId, params?: Post, comment?: Comment, like?: any) {
    const post = await this.findPostById(id)
    Object.assign(post, params)
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
    const result = await setComment.save()
    return {
      message: `${user.username} commented "${params.body.substr(0, 10)}..." on "${post.body.substr(0, 10)}..." post successfully!`,
      result
    }
  }

  async updateComment(id: ObjectId, params?: Comment, like?: any) {
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
    const setLike = {
      like: true,
      user: user._id,
      likedAt: Date.now()
    }
    const updatePost = await this.updatePost(post._id, undefined, undefined, setLike)
    const updateUser = await this.usersService.update(user._id, undefined, post, undefined, setLike)
    return {
      message: `${user.username} liked post!`
    }
  }

  async likeComment(params: any) {
    const user = await this.usersService.findUser(params.userId)
    const comment = await this.findCommentById(params.commentId)
    const setLike = {
      like: true,
      user: user._id,
      likedAt: Date.now()
    }
    const updateComment = await this.updateComment(comment._id, undefined, setLike)
    const updateUser = await this.usersService.update(user._id, undefined, undefined, comment, setLike)
    return {
      message: `${user.username} liked comment!`
    }
  }

  async totalPostLikes(id: ObjectId) {
    const post = await this.findPostById(id)
    const totalLikes = post.likes.length
    return totalLikes
  }

  private async findPostById(id: ObjectId) {
    let post
    try {
      post = await this.postModel.findById(id).populate('user').exec()
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
