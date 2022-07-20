import "../db.js";
import { MessageModel } from "../models/messages.model.js";

/* -------------------------------------------------------------------------- */
/*                                  messages                                 */
/* -------------------------------------------------------------------------- */
class Message {
  constructor() {}
  async save(message) {
    try {
      const response = await MessageModel.create(message);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // createUser()

  async getAll() {
    try {
      const response = await MessageModel.find();
      console.log(response);
      return(response);
    } catch (error) {
      console.log(error);
    }
  }

  // readAll()

  async update(id,messages) {
    const {timestamp_message, email, message, id_user} = messages
    try {
      const response = await MessageModel.updateOne(
        { _id:id },
        { timestamp_message:timestamp_message, email:email, messages:{message:message}, id_user:id_user}
      );
      console.log(response);
      return 
    } catch (error) {
      console.log(error);
    }
  }
  // update()

  async readOne(field, value) {
    try {
      const response = await MessageModel.findOne({ field:value});
      console.log(response);
      return response
    } catch (error) {
      console.log(error);
    }
  }

  // readOne()

  async deleteMessage(id) {
    try {
      const response = await MessageModel.deleteOne({ _id:id });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

 
}
export default Message

