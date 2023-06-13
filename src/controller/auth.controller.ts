import express, { Request, Response } from 'express';
import {AuthService} from "../service/auth.service";
import {LoginValidator} from "./validator/login.validator";
import {InputValidationMiddleware} from "../middleware/inputValidationMiddleware";

const router = express.Router();
const service = new AuthService();

router.post('/login', LoginValidator(), InputValidationMiddleware, async(req:Request, res: Response) => {
  const data = await service.login(req.body);
  if(!data){
    return res.status(401).send('Password or login incorrect')
  }
  res.status(204).send()
})

export default router;