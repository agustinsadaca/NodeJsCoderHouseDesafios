import Message from "../services/message.js";
import emoji from "node-emoji";

export default function (io) {
  io.on("connection", async (socket) => {
    console.log(emoji.get("pizza"), "Usuario conectado");
    socket.emit("connectionMessage", "Bienvenido a el chat socket");
    const mess = new Message();
    let messGetAll = await mess.getAll();
	console.log(messGetAll);
	
    socket.on("disconnect", (data) => {
		console.log(emoji.get("fire"), "Usuario desconectado");
    });
    socket.on("messageFront", async (data) => {
		const mess = new Message();
		const messSave = await mess.save({
			email: data.user,
			message: data.message,
			timestamp_message: Date.now(),
		});
		messGetAll = await mess.getAll();
		
		io.sockets.emit("messageBackend", messGetAll);
		
    });
	socket.emit("messageBackend", messGetAll);
});
}
