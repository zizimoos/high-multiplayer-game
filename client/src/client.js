const socket = io();

const writeEvent = (text) => {
  const parent = document.querySelector("#events");
  const el = document.createElement("li");
  el.innerHTML = text;
  parent.appendChild(el);
};
writeEvent("Welcome to RPS");

socket.on("message", writeEvent);

const onFormSubmitted = (e) => {
  e.preventDefault();
  const input = document.querySelector("#chat");
  const text = input.value;
  input.value = "";
  socket.emit("message", text);
};
document
  .querySelector("#chat-form")
  .addEventListener("submit", onFormSubmitted);
