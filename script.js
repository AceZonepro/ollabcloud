// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA_OT62IGPCaueoFN7yQP1EmeR1Yem4FW8",
  authDomain: "collabcloud.firebaseapp.com",
  databaseURL: "https://collabcloud-default-rtdb.firebaseio.com",
  projectId: "collabcloud",
  storageBucket: "collabcloud.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const messageInput = document.getElementById('messageInput');
const usernameInput = document.getElementById('usernameInput');
const fileInput = document.getElementById('fileInput');
const messagesDiv = document.getElementById('messages');

// Theme toggle
document.getElementById('toggleTheme').onclick = () => {
  document.body.classList.toggle('dark');
};

function sendMessage() {
  const text = messageInput.value.trim();
  const user = usernameInput.value.trim();

  if (!user || !text) return alert("Enter your name and message");

  const file = fileInput.files[0];
  const reader = new FileReader();

  const newMessage = {
    user,
    text,
    timestamp: Date.now()
  };

  if (file) {
    reader.onload = function (e) {
      newMessage.file = e.target.result;
      db.ref("messages").push(newMessage);
    };
    reader.readAsDataURL(file);
  } else {
    db.ref("messages").push(newMessage);
  }

  messageInput.value = '';
  fileInput.value = '';
}

function renderMessage(data) {
  const msg = data.val();
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message';
  msgDiv.innerHTML = `<strong>${msg.user}</strong>: ${msg.text}`;
  if (msg.file) {
    const isImage = msg.file.startsWith("data:image");
    const isVideo = msg.file.startsWith("data:video");
    if (isImage) {
      msgDiv.innerHTML += `<img class="uploaded-file" src="${msg.file}" />`;
    } else if (isVideo) {
      msgDiv.innerHTML += `<video controls width="200"><source src="${msg.file}"></video>`;
    }
  }
  messagesDiv.appendChild(msgDiv);
}

// Listen for new messages
db.ref("messages").on("child_added", renderMessage);
