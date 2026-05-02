// // // // server.js
// // // const express = require("express");
// // // const http = require("http");
// // // const { Server } = require("socket.io");
// // // const cors = require("cors");

// // // const app = express();
// // // app.use(cors());

// // // const server = http.createServer(app);
// // // const io = new Server(server, { cors: { origin: "*" } });

// // // let chats = [
// // //   { id: 1, name: "Renu Sharma", lastMsg: "Hey 👋" },
// // //   { id: 2, name: "Rahul Kumar", lastMsg: "How are you?" },
// // //   { id: 3, name: "Amit Singh", lastMsg: "No messages yet" },
// // // ];

// // // let messages = {
// // //   1: [{ senderId: 1, senderName: "Renu Sharma", text: "Hey 👋" }],
// // //   2: [{ senderId: 2, senderName: "Rahul Kumar", text: "How are you?" }],
// // //   3: [],
// // // };

// // // // 🟢 Unread count storage: { userId: { chatId: count } }
// // // let unreadCounts = {};

// // // io.on("connection", (socket) => {
// // //   console.log("🟢 User connected:", socket.id);

// // //   socket.on("join", ({ userId }) => {
// // //     socket.userId = userId;
// // //     if (!unreadCounts[userId]) unreadCounts[userId] = {};
// // //     socket.emit("chatList", chats);
// // //     socket.emit("updateUnread", unreadCounts[userId]);
// // //   });

// // //   socket.on("joinChat", ({ chatId, userId }) => {
// // //     socket.join(`chat_${chatId}`);
// // //     if (!unreadCounts[userId]) unreadCounts[userId] = {};
// // //     unreadCounts[userId][chatId] = 0; // reset unread
// // //     io.to(socket.id).emit("updateUnread", unreadCounts[userId]);
// // //     console.log(` User ${userId} joined chat_${chatId}`);
// // //   });

// // //   socket.on("sendMessage", ({ chatId, text, senderId, senderName }) => {
// // //     if (!chatId || !text || !senderId) return;

// // //     const chat = chats.find((c) => c.id === chatId);
// // //     if (!chat) return;

// // //     const msg = { chatId, senderId, senderName, text };
// // //     if (!messages[chatId]) messages[chatId] = [];
// // //     messages[chatId].push(msg);
// // //     chat.lastMsg = text;

// // //     // Move chat to top
// // //     chats = [chat, ...chats.filter((c) => c.id !== chatId)];

// // //     // 🟢 Increment unread for all users except sender
// // //    // connectedUsers = [{ socket, userId }]
// // // connectedUsers.forEach((user) => {
// // //   if (user.userId !== senderId) {
// // //     // increment unread count for this chat
// // //     user.unread = user.unread || {};
// // //     user.unread[chatId] = (user.unread[chatId] || 0) + 1;

// // //     // send update to that user only
// // //     user.socket.emit("updateUnread", user.unread);
// // //   }
// // // });


// // //     console.log(" Message received:", msg);
// // //     io.to(`chat_${chatId}`).emit("receiveMessage", msg);
// // //     io.emit("chatListUpdate", chats);
// // //     io.emit("updateUnreadAll", unreadCounts);
// // //   });

// // //   socket.on("disconnect", () => {
// // //     console.log("User disconnected:", socket.id);
// // //   });
// // // });

// // // server.listen(3000, () => console.log(" Server running on port 3000"));

// // // server.js
// // const { createServer } = require('http');
// // const { Server } = require('socket.io');
// // const { createClient } = require('@supabase/supabase-js');
// // const crypto = require('crypto');

// // const supabase = createClient(
// //   'https://YOUR_PROJECT.supabase.co',
// //   'YOUR_SERVICE_ROLE_KEY' // Service role key needed for inserts
// // );

// // const httpServer = createServer();
// // const io = new Server(httpServer, { cors: { origin: '*' } });

// // io.on('connection', (socket) => {
// //   console.log('User connected:', socket.id);

// //   // Join user-specific room
// //   socket.on('join_user', (userId) => {
// //     socket.join(`user_${userId}`);
// //   });

// //   // Join group-specific room
// //   socket.on('join_group', (groupId) => {
// //     socket.join(`group_${groupId}`);
// //   });

// //   // 1:1 chat
// //   socket.on('direct_message', async ({ senderId, receiverId, message }) => {
// //     try {
// //       const { data, error } = await supabase
// //         .from('chat1')
// //         .insert([{ sender_id: senderId, receiver_id: receiverId, status: message }])
// //         .select()
// //         .single();

// //       if (error) throw error;

// //       io.to(`user_${receiverId}`).emit('receive_message', data);
// //       io.to(`user_${senderId}`).emit('receive_message', data);
// //     } catch (err) {
// //       console.error(err.message);
// //     }
// //   });

// //   // Group message
// //   socket.on('group_message', async ({ groupId, senderId, message }) => {
// //     try {
// //       const { data, error } = await supabase
// //         .from('group_messages')
// //         .insert([
// //           { id: crypto.randomUUID(), group_id: groupId, sender_id: senderId, message_text: message },
// //         ])
// //         .select()
// //         .single();

// //       if (error) throw error;

// //       io.to(`group_${groupId}`).emit('receive_group_message', data);
// //     } catch (err) {
// //       console.error(err.message);
// //     }
// //   });

// //   socket.on('disconnect', () => {
// //     console.log('User disconnected:', socket.id);
// //   });
// // });

// // httpServer.listen(5000, () => console.log('Server running on port 5000'));
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const { createClient } = require('@supabase/supabase-js');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });
// // Supabase Configuration
// const supabase = createClient(
//   'https://vhmmfswotdneiljjpzqv.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZobW1mc3dvdGRuZWlsampwenF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDcyMTUsImV4cCI6MjA2ODIyMzIxNX0.aNH1n1Ae33w-1fB0wv68czbqBSQnERDDNqIDXzpwafA'
// );
// app.use(express.json());
// // ===============================
// // SOCKET.IO - REAL TIME MESSAGING
// // ===============================
// io.on('connection', (socket) => {
//   console.log(' User connected:', socket.id);
//   // Join Group Room
//   socket.on('join_group', (groupId) => {
//     socket.join(`group_${groupId}`);
//     console.log(`User ${socket.id} joined group_${groupId}`);
//   });
//   // Leave Group Room
//   socket.on('leave_group', (groupId) => {
//     socket.leave(`group_${groupId}`); 
//     console.log(`User ${socket.id} left group_${groupId}`);
//   });
//   // Send Message
//   socket.on('send_group_message', async (data) => {
//     try {
//       const { group_id, sender_id, message_text, message_type = 'TEXT' } = data;

//       // Save to database
//       const { data: messageData, error } = await supabase
//         .from('group_messages')
//         .insert({
//           group_id,
//           sender_id,
//           message_text,
//           message_type
//         })
//         .select(`
//           *,
//           sender:sender_id (
//             id,
//             username,
//             profile_image 
//           )
//         `)

//         .single();

//       if (error) throw error; 

//       // Broadcast to group
//       io.to(`group_${group_id}`).emit('new_group_message', messageData);
//       console.log(' Message sent to group:', group_id);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       socket.emit('message_error', { error: error.message });
//     }
//   }); 
//   // Typing Indicator
//   socket.on('typing', (data) => {
//     socket.to(`group_${data.group_id}`).emit('user_typing', {
//       user_id: data.user_id,
//       username: data.username
//     });
//   });
//   socket.on('stop_typing', (data) => {
//     socket.to(`group_${data.group_id}`).emit('user_stop_typing', {
//       user_id: data.user_id
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log(' User disconnected:', socket.id);
//   });
// });
// // Start Server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(` Socket.IO Server running on port ${PORT}`);
// });



const fs = require("fs");
const path = require("path");


// File create/write
// fs.writeFileSync("data.txt", "Hello Node");

// File read
// const data = fs.readFileSync("data.txt");
// console.log(data);
//<Buffer 48 65 6c 6c 6f 20 4e 6f 64 65>
//read file  return  buffer data   buffer is  data type  

//how  to  convert buffer data  to string

// const org_data=data.toString()
// console.log(org_data);


//edit  file
// fs.appendFileSync('data.txt','I am   learning   node js')
// fs.writeFileSync('data.txt','hello')



//asyn
//In asynchronous operations, callback functions are important because JavaScript does not wait for the task to finish. The callback is executed after completion to handle the result or error.
// callback esliye  imp h  kyu ki  js  wait ni krega  task complete hone ka  file  create ni hogi uske  phle  hi log ajayga  esme  callback se file  create hone  ke  bad  hi  log ayga 
// fs.writeFile("data1.txt", "Hello", () => {});
// console.log("Done");

//utf-8 binary ko text m  convert krta h 
// const read=fs.readFile("data1.txt", "utf-8", () => {});
// console.log(read); 
// //ye  undefine  diya  kyu ki  time  lga file  load hone   esliye  eska  output  callback m  ayga  

// fs.readFile("data1.txt", "utf-8", (err, data) => {
//   console.log(data); // yahin data milega
// });

// console.log("This runs first");



//=========================//path//==================//
//  console.log(path.dirname("C:/Users/ajeet sharma/OneDrive/Desktop/socket/server.js"));
//   console.log(path.extname("C:/Users/ajeet sharma/OneDrive/Desktop/socket/server.js"));
//    console.log(path.basename("C:/Users/ajeet sharma/OneDrive/Desktop/socket/server.js"));

//    //parse ye sab parse akele  hi  bta sakta h  root  ,dir,ext,basename
//    console.log(path.parse("C:/Users/ajeet sharma/OneDrive/Desktop/socket/server.js"));
  //   root: 'C:/',
  // dir: 'C:/Users/ajeet sharma/OneDrive/Desktop/socket',
  // base: 'server.js',
  // ext: '.js',
  // name: 'server'



  // const math = require("./own_module/file1"); // own module import
  
  // console.log(math.add(10, 5));       // 15
  // console.log(math.subtract(10, 5));  

//   const chalk= require( "chalk");

// console.log(chalk.green("Success message"));
// console.log(chalk.red("Error message"));
// console.log(chalk.yellow.underline.inverse("Warning message"));

// const http = require("http");

// // server create
// const server = http.createServer((req, res) => {

//   res.end("Hello Server is running ");
// });

// // server listen
// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
// const http = require("http");
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.end("Home Page");
//   } 
//   else if (req.url === "/about") {
//     res.end("About Page");
//   } 
//   else {
//     res.writeHead(404);
//     res.end("Page Not Found");
//   }
// });
// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// const express=require('express')
// const app=express()
// app.get('/',(req,res)=>{
//   res.send('hello')
// })
// app.get('/about',(req,res)=>{
//   res.send('This is  my about  page')
// })

// app.listen(3000,()=>{
//   console.log('running  app');
  
// })

// fs.readFile('data.txt','utf8',(err,data)=>{
//   console.log(data);
  
// })






   













