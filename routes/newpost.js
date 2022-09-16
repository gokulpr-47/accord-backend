const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    try{
      res.status(200).json("success")
    } catch(err){
      res.status(500).json(err)
    }
})

module.exports = router