import express, {Request, Response} from "express";
import { PostService } from '../service/post.service';
import {CreatePostValidator} from "./validator/create-post.validator";
import {InputValidationMiddleware} from "../middleware/inputValidationMiddleware";
import {AuthMiddleware} from "../middleware/auth.middleware";
import {IPaginationResponse} from "../types/blog-response.interface";
import {IPost} from "../types/post.interface";

const router = express.Router();
const service = new PostService();

router.get('/', async(req: Request, res: Response) => {
  const posts = await service.getAll(req.query);
  const {items, meta} = posts;
  const blogsResponse: IPaginationResponse<IPost[]>= {
    pageSize: meta.pageSize,
    page: meta.pageNumber,
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    totalCount: meta.totalCount,
    items: items
  }
  return res.status(200).send(blogsResponse);
});

router.post('/',CreatePostValidator(), InputValidationMiddleware, async(req: Request, res: Response) => {
  const post = await service.create(req.body, null);
  if(post === false) {
    return res.status(404).send()
  }
  res.status(201).send(post);
});

router.get('/:id', async(req: Request, res: Response) => {
  if(!req.params.id){
    return res.status(404).send();
  }
  const post = await service.getOne(req.params.id);
  if(!post) {
    return res.status(404).send('Not Found');
  }
  res.status(200).send(post);
});

router.put('/:id',CreatePostValidator(), InputValidationMiddleware, async(req: Request, res: Response) => {
  if(!req.params.id){
    return res.status(404).send();
  }
  const post = await service.update(req.params.id, req.body);
  return res.status(204).send(post);
});

router.delete('/:id',AuthMiddleware, service.delete, async(req: Request, res: Response) => {
  if(!req.params.id){
    return res.status(404).send();
  }
  const deleted = await service.delete(req.params.id);
  if(!deleted) {
    return res.status(404).send();
  }
  res.status(204).send();
});
export default router;