import { Router } from 'express';
const router = Router();

router.post('/', async (req,res)=>{
    try{
      res.status(200).json("success")
    } catch(err){
      res.status(500).json(err)
    }
})

export default router