const http = require("http");
const app = require("./main");
const port = process.env.PORT || 3005;
const server = http.createServer(app);

//Live Chat configuration
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
}); // This will emit the event to all connected sockets

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

//Port Connection
server.listen(port, () => {
  console.log("Listening on port: ", port);
});
