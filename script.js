// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA_OT62IGPCaueoFN7yQP1EmeR1Yem4FW8",
  authDomain: "collabcloud-f0ed5.firebaseapp.com",
  databaseURL: "https://collabcloud-f0ed5-default-rtdb.firebaseio.com",
  projectId: "collabcloud-f0ed5",
  storageBucket: "collabcloud-f0ed5.appspot.com",
  messagingSenderId: "490023921099",
  appId: "1:490023921099:web:example"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const nameInput = document.getElementById("nameInput");
const profilePicInput = document.getElementById("profilePicInput");
const profilePicPreview = document.getElementById("profilePicPreview");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messagesDiv = document.getElementById("messages");
const toggleTheme = document.getElementById("toggleTheme");

// LocalStorage load
nameInput.value = localStorage.getItem("username") || "";
messageInput.value = localStorage.getItem("draftMessage") || "";
const savedPic = localStorage.getItem("profilePic");
if (savedPic) profilePicPreview.src = savedPic;

// Theme toggle
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Save on change
nameInput.addEventListener("input", () => {
  localStorage.setItem("username", nameInput.value);
});
messageInput.addEventListener("input", () => {
  localStorage.setItem("draftMessage", messageInput.value);
});
profilePicInput.addEventListener("change", () => {
  const file = profilePicInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem("profilePic", reader.result);
    profilePicPreview.src = reader.result;
  };
  if (file) reader.readAsDataURL(file);
});

// Send message
sendButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const text = messageInput.value.trim();
  const pic = localStorage.getItem("profilePic") || "";

  if (!name || !text) return alert("Name and message required");

  const msg = {
    name,
    text,
    pic,
    timestamp: Date.now()
  };

  db.ref("messages").push(msg);
  messageInput.value = "";
  localStorage.setItem("draftMessage", "");
});

// Listen to DB
db.ref("messages").on("value", (snapshot) => {
  messagesDiv.innerHTML = "";
  const data = snapshot.val();
  for (let id in data) {
    const msg = data[id];
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${msg.pic}" style="width:24px;height:24px;border-radius:50%;vertical-align:middle;">
      <strong>${msg.name}:</strong> ${msg.text}
    `;
    messagesDiv.appendChild(div);
  }
});
