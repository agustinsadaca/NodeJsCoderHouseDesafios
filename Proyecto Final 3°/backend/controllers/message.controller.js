import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io';
import { Socket } from 'dgram';
import Message from '../services/message.js'
import { MessageModel } from "../models/messages.model.js";
import express from 'express'
import emoji from 'node-emoji'

export default function(io){

	io.on('connection',async (socket) => {
	 console.log(emoji.get('pizza'), 'Usuario conectado')
	 socket.emit('connectionMessage', 'Bienvenido a el chat socket')
	 const mess = new Message()
	 const messGetAll = await mess.getAll()
	
	 socket.emit('messageBackend', messGetAll)
	
	 socket.emit('prodChangeBack',false)
	
	 socket.on('disconnect', (data) => {
	
		 console.log(emoji.get('fire'), 'Usuario desconectado')
	
	 })
	
	 socket.on('messageFront',async (data) => {
		 const mess = new Message()
		 const id_user =await mess.readOne(email,data.user)
		 const messSave = await mess.save({email:data.user,message:data.message,date:date,timestamp_message:Date.now()})
		 
		 io.sockets.emit('messageBackend', messGetAll)
	 })
	 
	 socket.on('prodChange',async (data) => {	
		 const file = new Contenedor()
		 const guardar = await file.save({
		 title: data.title ,
		 price: data.price,
		 thumbnail: data.thumbnail,
		 })
		 io.sockets.emit('prodChangeBack', false)
	 })
	
	})
}


