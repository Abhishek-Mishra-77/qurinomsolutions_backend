const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const Message = require("./models/Message"); 

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Socket.IO
io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id);

  // User joins their own room
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`👤 ${userId} joined`);
  });

  // Handle sending messages
  socket.on("send-message", async ({ to, from, content }) => {
    try {
      // ✅ Save to MongoDB
      const newMessage = new Message({
        sender: from,
        receiver: to,
        content,
      });
      await newMessage.save();

      // ✅ Emit to receiver
      io.to(to).emit("receive-message", newMessage);

      // ✅ Emit back to sender (so both have synced copy)
      io.to(from).emit("receive-message", newMessage);
    } catch (err) {
      console.error("❌ Message Save Error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
