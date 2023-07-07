import {IUser} from "../types/user.interface";
import {IComment, ICommentResponse} from "../types/comment.interface";

export const CommentUserMapping = (comment: IComment, author: IUser): ICommentResponse => {
  const { commentatorId, ...newComment} = comment;
  return {
    ...newComment,
    commentatorInfo: {
      userId: author!.id,
      userLogin: author!.login
    }
  }
}
