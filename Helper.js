import { ObjectId } from 'mongodb';
import { client } from './index.js';
import bcrypt from 'bcrypt';

export async function editcontactbyid(id, data) {
  return await client.db("contact")
    .collection("people")
    .updateOne({ _id: id }, { $set: data });
}
export async function getcontact() {
  return await client
    .db("contact")
    .collection("people")
    .find({}).toArray();
}
export async function deletecontactbyid(id) {
  return await client
    .db("contact")
    .collection("people")
    .deleteOne({ _id: id });
}
export async function getcontactbyid(id) {
  console.log("***",id)
  return await client
    .db("contact")
    .collection("people")
    .findOne({ _id:ObjectId(id)});
}
export async function updatecontact(data) {
  return await client
    .db("contact")
    .collection("people")
    .insertMany(data);
}
export async function createUser(data) {
  return await client
    .db("contact")
    .collection("people")
    .insertOne(data);
}
export async function getUserByName(username) {
  return await client
    .db("contact")
    .collection("people")
    .findOne({username:username});
}
async function genPassword(password){
  const NO_OF_ROUNDS=10;
  const salt=await bcrypt.genSalt(NO_OF_ROUNDS);
  console.log("salt",salt);
  const hashpassword= await bcrypt.hash(password,salt);
  console.log(hashpassword);
  return hashpassword;
}
export {genPassword};