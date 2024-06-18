import { io } from "socket.io-client";
import { deleteGame, fetchData, insertData, updateGame } from "./DataProviders/Axioslogic";

const socket = io(import.meta.env.VITE_BACKEND_URL);

let gametitle = "";
let data = [];
let counter = 0;

const count = document.createElement("h5");

const updateDataList = async () => {
  observer.disconnect();
  data = await fetchData();
  counter = data.filter((element ,index)=>!element.isdone).length;
  count.innerHTML = `Nombre de jeux incomplete : ${counter}`; 
  renderDataList();
  observer.observe(document.body, { childList: true, subtree: true });
  socket.on("connect", ()=>{
    console.log("connected")
  })
};

const renderDataList = () => {
  const listContainer = document.getElementById('data-list');
  listContainer.innerHTML = '';
  
  const ul = document.createElement('ul');
  ul.style.listStyleType = 'none';
  ul.style.padding = '0';
  ul.style.margin = '0';
  
  data.forEach((item, index) => {
      const li = document.createElement('li');
      li.style.padding = '10px 0';
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.style.marginLeft = '10px';

      deleteButton.addEventListener("click", async (e) => {
        e.stopPropagation();
        await deleteGame(item.id);
        updateDataList();
      });

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.checked = item.isdone;

      checkBox.addEventListener("change", async(e)=>{
        e.stopPropagation();
        await updateGame(item.id ,  !item.isdone);
        updateDataList();
      });
      li.style.textDecoration = item.isdone?"line-through" :"none";
      li.appendChild(checkBox);
      li.appendChild(document.createTextNode(`${index + 1} ${item.gametitle}`));
      li.appendChild(deleteButton);     
      
      ul.appendChild(li);
  });

  listContainer.appendChild(ul);
};


const inputElement = document.createElement("input");
inputElement.setAttribute("type", "text");
inputElement.setAttribute("placeholder", "Intitulé de votre match");

inputElement.addEventListener("input", (e) => {
    const newTitle = e.target.value;
    gametitle = newTitle || "";
});

const ButtonElement = document.createElement("button");
ButtonElement.innerHTML = "Ajouter le match";

ButtonElement.addEventListener("click", async () => {
    await insertData(gametitle);
    updateDataList();
});

const observer = new MutationObserver(() => {
    updateDataList();
    socket.emit('get messages'); 
});

const container = document.querySelector('#app');  
const chatHTML = `
  <div id="chat-section" style="float: right; width: 50%;">
      <h3>T Chat</h3>
      <div id="messages" style="height: 300px; border: 1px solid #000; padding: 10px; overflow-y: scroll;"></div>
      <input type="text" id="nickname" placeholder="Entrer votre Pseudo">
      <input type="text" id="message" placeholder="Entrer votre message">
      <button id="send">Envoyer</button>
  </div>
`;
container.innerHTML = chatHTML;

function sendChatMessage() {
  const nickname = document.getElementById('nickname').value;
  const message = document.getElementById('message').value;
  socket.emit('send message', { nickname, message });
}
document.getElementById('send').addEventListener('click', sendChatMessage);

document.getElementById('message').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

socket.on('message sent', () => {
    document.getElementById('message').value = ''; 
    socket.emit('get messages');
});

socket.on('all messages', (messages) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; 
    messages.forEach((message) => {
        const p = document.createElement('p');
        p.textContent = `${message.nickname}: ${message.message}`;
        messagesDiv.appendChild(p);
    });
});

const title = document.createElement("h3");
title.innerHTML = "les parties";

document.body.appendChild(inputElement);
document.body.appendChild(ButtonElement);

const listContainer = document.createElement('div');
listContainer.id = 'data-list';

document.body.appendChild(title);
document.body.appendChild(count);
document.body.appendChild(listContainer);

observer.observe(document.body, { childList: true, subtree: true });

socket.emit('get messages');

updateDataList();



const style = document.createElement('style');
style.textContent = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
  }
  #chat-section {
    border-left: 1px solid #000;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
  }
  #messages {
    margin-bottom: 20px;
    background-color: #e0e0e0;
    border-radius: 10px;
  }
  #nickname, #message {
    margin-bottom: 10px;
    display: block;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
  }
  #send {
    padding: 10px 20px;
    cursor: pointer;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    padding: 10px 0;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  button {
    margin-left: 10px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
  }
`;
document.head.appendChild(style);

