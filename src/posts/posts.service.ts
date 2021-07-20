import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Post, PostDocument } from './post.schema'
import { Comment, CommentDocument } from './comment.schema'
import { UsersService } from '../users/users.service'
import { Like, LikeDocument } from './like.schema'
import { Repost, RepostDocument } from './repost.schema'

@Injectable()
export class PostsService {
  private posts: Post[] = []
  private comments: Comment[] = []
  private likes: Like[] = []
  private reposts: Repost[] = []

  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Like.name) private readonly likeModel: Model<LikeDocument>,
    @InjectModel(Repost.name) private readonly repostModel: Model<RepostDocument>,
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
    const toDelete = await this.postModel.deleteOne({ _id: id }).exec()
    if (toDelete.n === 0) throw new NotFoundException('Could not find post.')
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
    const toDelete = await this.commentModel.deleteOne({ _id: id }).exec()
    if (toDelete.n === 0) {
      throw new NotFoundException('Could not find comment.')
    }
    return {
      message: 'Comment deleted successfully!'
    }
  }

  async likePost(id: ObjectId, params: any) {
    const user = await this.usersService.findUser(params.userId)
    const post = await this.findPostById(id)
    const findLike = await this.likeModel.findOne({ user: user._id, post: post._id })
    if (findLike) return findLike.id
    const setLike = new this.likeModel({
      user: user._id,
      post: post._id
    })
    const result = await setLike.save()
    return {
      message: `${user.username} liked post!`,
      result
    }
  }

  async likeComment(id: ObjectId, params: any) {
    const user = await this.usersService.findUser(params.userId)
    const comment = await this.findCommentById(id)
    const findLike = await this.likeModel.findOne({ user: user._id, comment: comment._id })
    if (findLike) return findLike.id
    const setLike = new this.likeModel({
      user: user._id,
      comment: comment._id
    })
    const result = await setLike.save()
    return {
      message: `${user.username} liked comment!`,
      result
    }
  }

  async totalPostLikes(id: ObjectId, params: any) {
    const likes = await this.findPostLikes(id, params.string)
    return {
      total: likes.length,
      likes
    }
  }

  async totalCommentLikes(id: ObjectId, params: any) {
    const likes = await this.findCommentLikes(id, params.string)
    return {
      total: likes.length,
      likes
    }
  }

  async unlike(id: ObjectId) {
    const toDelete = await this.likeModel.deleteOne({ _id: id }).exec()
    if (toDelete.n === 0) throw new NotFoundException('Could not find like.')
    return {
      message: 'Like deleted successfully!'
    }
  }

  async repost(id: ObjectId, params: any) {
    const user = await this.usersService.findUser(params.userId)
    const post = await this.findPostById(id)
    const findRepost = await this.repostModel.findOne({ user: user._id, post: post._id })
    if (findRepost) return findRepost.id
    const setRepost = new this.repostModel({
      user: user._id,
      post: post._id
    })
    const result = await setRepost.save()
    return {
      message: `${user.username} reposted "${post.body.substr(0, 10)}..." successfully!`,
      result
    }
  }

  async unrepost(id: ObjectId) {
    const toDelete = await this.repostModel.deleteOne({ _id: id }).exec()
    if (toDelete.n === 0) throw new NotFoundException('Could not find repost.')
    return {
      message: 'Repost deleted successfully!'
    }
  }

  private async findPostById(id: ObjectId) {
    let post
    try {
      post = await this.postModel.findById(id).exec()
    } catch(err) {
      throw new NotFoundException(`Could not find post, because: ${err}`)
    }
    if (!post) throw new NotFoundException(`Could not find post, because post is ${post}`)
    return post
  }

  private async findCommentById(id: ObjectId) {
    let comment
    try {
      comment = await this.commentModel.findById(id).exec()
    } catch(err) {
      throw new NotFoundException(`Could not find comment, because: ${err}`)
    }
    if (!comment) throw new NotFoundException(`Could not find comment, because comment is ${comment}`)
    return comment
  }

  private async findPostLikes(id: ObjectId, params: any) {
    let like
    try {
      const obj = {}
      obj[params] = id
      if (params === 'post') like = await this.likeModel.find(obj).exec()
    } catch(err) {
      throw new NotFoundException(`Could not find like, because: ${err}`)
    }
    if (!like) throw new NotFoundException(`Could not find like, because like is ${like}`)
    return like
  }

  private async findCommentLikes(id: ObjectId, params: any) {
    let like
    try {
      const obj = {}
      obj[params] = id
      if (params === 'comment') like = await this.likeModel.find(obj).exec()
    } catch(err) {
      throw new NotFoundException(`Could not find comment, because: ${err}`)
    }
    if (!like) throw new NotFoundException(`Could not find like, because like is ${like}`)
    return like
  }
}
