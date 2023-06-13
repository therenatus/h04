import express, { Request, Response } from 'express';
import {AuthService} from "../service/auth.service";

const router = express.Router();
const service = new AuthService();

router.post('/login', async(req:Request, res: Response) => {
  const data = await service.login(req.body);
  if(!data){
    return res.status(401).send('Password or login incorrect')
  }
  res.status(204).send()
})

export default router;