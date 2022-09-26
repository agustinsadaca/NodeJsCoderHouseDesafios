import "../db.js";
import { UserModel } from "../models/user.model.js";
import { v4 as uuidv4 } from 'uuid';


/* -------------------------------------------------------------------------- */
/*                                  User                                 */
/* -------------------------------------------------------------------------- */
class User {
  constructor() {}
  async createUser(user) {
    try {
      const id = uuidv4().replace(/-/g, "")

      if (user.email.includes("admin")){
        user.admin = true
      }else{
        user.admin = false
      }
      const response = await UserModel.create({...user,_id:id});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // createUser()

  async readAll() {
    try {
      const response = await UserModel.find();
      console.log(response);
      return(response);
    } catch (error) {
      console.log(error);
    }
  }

  // readAll()

  async update(id,user) {
    const {username,password,firsname,lastname,email} = user
    try {
      const response = await UserModel.updateOne(
        { _id:id },
        {username:username,password:password,firsname:firsname,lastname:lastname,email:email}
      );
      console.log(response);
      return 
    } catch (error) {
      console.log(error);
    }
  }
  // update()

  async readOne(id) {
    try {
      const response = await UserModel.findOne({ _id:id });
      console.log(response);
      return response
    } catch (error) {
      console.log(error);
    }
  }
  async readOneByEmail(email) {
    try {
      const response = await UserModel.findOne({ email:email });
      console.log(response);
      return response
    } catch (error) {
      console.log(error);
    }
  }

  // readOne()

  async deleteUser(id) {
    try {
      const response = await UserModel.deleteOne({ _id:id });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

 
}
export default User

