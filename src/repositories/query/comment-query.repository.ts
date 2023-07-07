import {commentCollection} from "../../index";
import {CommentUserMapping} from "../../helpers/comment-user-mapping";
import {UserRepository} from "../user.repository";

const userRepository = new UserRepository();

type Props = {
  query: any,
  postId: string
}
export const CommentQueryRepository = async({query, postId}: Props) => {
  const {sortDirection, pageSize, pageNumber, sortBy,} = query;
  const sortOptions: { [key: string]: any } = {};
  sortOptions[sortBy as string] = sortDirection;

  const total = await commentCollection.countDocuments({postId: postId});
  const data = await commentCollection
    .find({postId: postId}, {projection: { postId: 0, _id: 0}})
    .sort(sortOptions)
    .skip(+pageSize * (pageNumber - 1))
    .limit(+pageSize)
    .toArray();
  const commentWithUsers = await Promise.all(data.map(async(comment) => {
    const author = await userRepository.findOneById(comment.commentatorId);
    return CommentUserMapping(comment, author!);
  }));
  return {data: commentWithUsers, totalCount: total}
}