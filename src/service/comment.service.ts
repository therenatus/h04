import {ICommentResponse} from "../types/comment.interface";
import {CommentUserMapping} from "../helpers/comment-user-mapping";
import {CommentRepository} from "../repositories/comment.repository";
import {UserRepository} from "../repositories/user.repository";
import {StatusEnum} from "../types/status.enum";

const commentRepository = new CommentRepository();
const userRepository = new UserRepository();

export class CommentService {
  async  createComment(postId: string, body: any, userId: string): Promise<ICommentResponse | boolean> {
    const author = await userRepository.findOneById(userId);
    if(!author){
      return false;
    }
    body.id = (+new Date).toString();
    body.createdAt = new Date;
    body.postId = postId;
    body.commentatorId = userId;
    const comment = await commentRepository.create(body);
    if(!comment){
      return false;
    }
    const commentWithUser = CommentUserMapping(comment, author);
    if(!commentWithUser){
      return false;
    }
    return commentWithUser;
  }

  async update(body: any, id: string, userId: string): Promise<StatusEnum>{
    const comment = await commentRepository.findOne(id);
    if(!comment){
      return StatusEnum.NOT_FOUND;
    }
    if(comment.commentatorId !== userId){
      return StatusEnum.FORBIDDEN;
    }
    return await commentRepository.update(id, body);
  }

  async getOne(id: string): Promise<ICommentResponse | StatusEnum> {
    const comment = await commentRepository.findOne(id);
    if(comment === null){
      return StatusEnum.NOT_FOUND;
    }
    const user = await userRepository.findOneById(comment.commentatorId);
    if(user === null){
      return StatusEnum.NOT_FOUND;
    }
    const commentWithUser = CommentUserMapping(comment, user);
    return commentWithUser;
  }

  async deleteOne(id: string, userId: string): Promise<StatusEnum> {
    const comment = await commentRepository.findOne(userId);
    if(comment === null){
      return StatusEnum.NOT_FOUND;
    }
    if(comment.commentatorId === userId){
      return StatusEnum.FORBIDDEN;
    }
    const deletedComment = await commentRepository.deleteComment(id);
    if(deletedComment === StatusEnum.NOT_FOUND){
      return StatusEnum.NOT_FOUND;
    }
    return StatusEnum.NOT_CONTENT;
  }
}