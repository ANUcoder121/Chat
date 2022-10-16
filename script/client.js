// First we connect the client with server
const socket = io("http://localhost:8000");
// Now we fetch all the variables
const form = document.getElementById("main_form");
const messageInput = document.getElementById("messageInp");
const messageSend = document.getElementById("send_btn");
const messageContainer = document.getElementById("chats");
const bold = document.getElementById("bold");
const Name = prompt("Enter your name to join.");
// Now we use this ringtone
const ringtone = new Audio("../public/ring.mp3");

// Let's create an append function
const apend = (message, position) => {
  const messageElement = document.createElement("div");
  // console.log(messageElement.innertext);
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
  if (position == "left") ringtone.play();
};
// console.log(form);

// Now we capture the chat entered by user and emit it
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  apend(`You:  ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

socket.emit("new-user-joined", Name);
// Sending the new user joined chat
socket.on("user-joined", (name) => {
  console.log(name);
  apend(`${name} joined the chat`, "mid");
});
// Recieving the message
socket.on("recieve", (data) => {
  apend(`${data.name}:  ${data.message}`, "left");
});
// Sedning the user left chat
socket.on("User-left", (name) => {
  apend(`${name.name} left the chat`, "mid");
});
