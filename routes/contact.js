import express from 'express';

import { getcontact, updatecontact, getcontactbyid, editcontactbyid, deletecontactbyid } from '../Helper.js';

import { auth } from '../middleware/auth.js';
const router=express.Router();
router
.route("/")
.get(async(request,response)=>{
  const contact=await getcontact();
  const token=request.body.jwt;
   console.log(contact);
    response.send(contact);
    response.json({jwt: token});
})
.post(async(request,response)=>{
  const data=request.body;
  const token=request.body.jwt;
  const result=await updatecontact(data);
  response.send(result);
  response.json({jwt: token});
  {/*response.send(data)*/}
})


router
.route("/:id")
.get(async(request,response)=>{
    console.log(request.params)
    const {id}=request.params;
   const contact= await getcontactbyid(id);
    
    contact
    ?response.send(contact)
    :response.status(404).send({message:"No maching contact"});
    
})
.put(async(request,response)=>{
  const {id}=request.params;
  const data=request.body;
 const contactupdate=await editcontactbyid(id, data);
  response.send(contactupdate);
})
.delete(auth,async(request,response)=>{
  console.log(request.params)
  const {id}=request.params;
 const contact= await deletecontactbyid(id);
  
 contact
  ?response.send(contact)
  :response.status(404).send({message:"No maching contact"});
  
});

export const contactRouter=router;