import {body} from "express-validator";
import {blogCollection} from "../../index";

export const CreatePostWithParamValidator = () => {
  return [
    body('title').trim().isString().isLength({min: 1, max: 15}),
    body('shortDescription').trim().isLength({min: 1, max: 100}),
    body('content').trim().isLength({min: 1, max: 1000})
  ];
}