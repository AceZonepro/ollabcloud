const currentUser = localStorage.getItem("username") || "Anonymous";

// Inside the loadMessages() function:
Object.entries(messages).sort((a, b) => a[1].timestamp - b[1].timestamp).forEach(([id, m]) => {
  const div = document.createElement("div");
  div.className = "message";

  let actionsHTML = "";
  if (m.username === currentUser) {
    actionsHTML = `
      <div class="actions">
        <button onclick="editMessage('${topic}','${id}','${(m.text || '').replace(/'/g, "\\'")}')">Edit</button>
        <button onclick="deleteMessage('${topic}','${id}')">Delete</button>
      </div>
    `;
  }

  div.innerHTML = `
    <strong>${m.username}</strong>: ${m.text || ""}
    ${m.mediaUrl ? (
      m.mediaType === "image"
        ? `<img src="${m.mediaUrl}" class="attached"/>`
        : `<video src="${m.mediaUrl}" controls class="attached"></video>`
    ) : ""}
    ${actionsHTML}
  `;

  container.appendChild(div);
});
