let currentFolder = "";

/* APP START */
window.onload = () => {
    const pin = localStorage.getItem("userPin");
    showScreen(pin ? "lockScreen" : "setPinScreen");
};

/* SET PIN */
function setPin() {
    if (newPin.value.length < 4) {
        setPinError.textContent = "PIN must be at least 4 digits";
        return;
    }
    if (newPin.value !== confirmPin.value) {
        setPinError.textContent = "PINs do not match";
        return;
    }
    localStorage.setItem("userPin", newPin.value);
    showScreen("lockScreen");
}

/* UNLOCK */
function unlockApp() {
    if (pinInput.value === localStorage.getItem("userPin")) {
        showScreen("homeScreen");
        errorText.textContent = "";
    } else {
        errorText.textContent = "Wrong PIN!";
    }
    pinInput.value = "";
}

/* NAVIGATION */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s =>
        s.classList.remove("active")
    );
    document.getElementById(id).classList.add("active");
}

function goHome() { showScreen("homeScreen"); }
function lockApp() { showScreen("lockScreen"); }

/* OPEN FOLDER */
function openFolder(folder) {
    currentFolder = folder;
    folderTitle.textContent = folder.toUpperCase();
    loadFiles();
    showScreen("filesScreen");
}

/* UPLOAD FILE */
function uploadFile() {
    const file = fileInput.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const files = JSON.parse(localStorage.getItem(currentFolder)) || [];

    files.push({
        name: file.name,
        size: file.size,
        url: url
    });

    localStorage.setItem(currentFolder, JSON.stringify(files));
    fileInput.value = "";
    loadFiles();
}

/* LOAD FILES */
function loadFiles() {
    fileList.innerHTML = "";

    const files = JSON.parse(localStorage.getItem(currentFolder)) || [];

    if (!files.length) {
        fileList.innerHTML = "<li>No files</li>";
        return;
    }

    files.forEach((f, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = `${f.name} (${Math.round(f.size / 1024)} KB)`;
        span.className = "file-name";
        span.onclick = () => window.open(f.url, "_blank");

        const del = document.createElement("button");
        del.textContent = "✕";
        del.className = "delete-btn";
        del.onclick = () => deleteFile(index);

        li.appendChild(span);
        li.appendChild(del);
        fileList.appendChild(li);
    });
}

/* DELETE FILE ✅ */
function deleteFile(index) {
    const files = JSON.parse(localStorage.getItem(currentFolder)) || [];
    files.splice(index, 1);
    localStorage.setItem(currentFolder, JSON.stringify(files));
    loadFiles();
}
