import express, { Request, Response } from "express";
import {BlogService} from '../service/blog.service'
import {CreateBlogValidator} from "./validator/create-blog.validator";
import {InputValidationMiddleware} from "../middleware/inputValidationMiddleware";
import {AuthMiddleware} from "../middleware/auth.middleware";
import {IPaginationResponse} from "../types/blog-response.interface";
import {IBlog} from "../types/blog.interface";
import {IPost} from "../types/post.interface";
import {CreatePostWithParamValidator} from "./validator/create-post-with-param.validator";
import {PostService} from "../service/post.service";

const router = express.Router();
const service = new BlogService();
const postService = new PostService();

router.get('/',async(req: Request, res: Response) => {
  const data = await service.getAll(req.query);
  const {items, meta} = data;
  const blogsResponse: IPaginationResponse<IBlog[]> = {
    pageSize: meta.pageSize,
    page: meta.pageNumber,
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    totalCount: meta.totalCount,
    items: items
  }
  return res.status(200).send(blogsResponse);
});

router.post('/',CreateBlogValidator(), InputValidationMiddleware,async(req: Request, res: Response) => {
  const blog = await service.create(req.body);
  return res.status(201).send(blog);
});

router.get('/:id', async(req: Request, res: Response) => {
  if(!req.params.id){
    return res.status(404).send();
  }
  const blog = await service.getOne(req.params.id);
  if(!blog) {
    return res.status(404).send();
  }
  res.status(200).send(blog);
});

router.get('/:id/posts', async(req: Request, res: Response) => {
  if(!req.params.id) {
    return res.status(404).send('Not Found');
  }
  const posts = await service.findBlogsPost(req.params.id, req.query);
  if(typeof posts === "boolean") {
    return res.status(404).send('Not found')
  }
  const {items, meta} = posts;
  const blogsResponse: IPaginationResponse<IPost[]> = {
    pageSize: meta.pageSize,
    page: meta.pageNumber,
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    totalCount: meta.totalCount,
    items: items
  }
  res.status(200).send(blogsResponse);
})

router.post('/:id/posts', CreatePostWithParamValidator(), InputValidationMiddleware, async(req: Request, res: Response) => {
  if(!req.params.id){
    return res.status(404).send();
  }
  const post = await postService.create(req.body, req.params.id);
  console.log('pooost', post)
  if(post === false) {
    return res.status(404).send()
  }
  res.status(201).send();
})

router.put('/:id',CreateBlogValidator(), InputValidationMiddleware, async(req: Request, res: Response) => {
  if(!req.params.id){
    return res.status(404).send();
  }
  const post = await service.update(req.params.id, req.body);
  if(!post) {
    return res.status(404).send();
  }
  res.status(204).send(post);
});

router.delete('/:id',AuthMiddleware, async(req: Request, res: Response) => {
  if(!req.params.id){
    return res.status(404).send();
  }
  const blog = await service.delete(req.params.id);
  if(!blog) {
    return res.status(404).send();
  }
  res.status(204).send();
});

router.post(':id/posts')

export default router;