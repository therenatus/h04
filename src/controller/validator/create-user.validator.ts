import {body} from "express-validator";

export const CreateUserValidator = () => {
  return [
    body('login').trim().isString().isLength({min: 3, max: 10}),
    body('password').trim().isLength({min: 6, max: 20}),
    body('email').trim().notEmpty().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  ]
}