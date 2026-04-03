let currentFolder = "";

/* APP START */
window.onload = () => {
    const pin = localStorage.getItem("userPin");
    showScreen(pin ? "lockScreen" : "setPinScreen");
};

/* SET PIN */
function setPin() {
    const pin = newPin.value;
    const confirm = confirmPin.value;
    if (pin.length < 4) return setPinError.textContent = "PIN must be 4 digits";
    if (pin !== confirm) return setPinError.textContent = "PINs do not match";
    localStorage.setItem("userPin", pin);
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

/* NAV */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function goHome() { showScreen("homeScreen"); }
function lockApp() { showScreen("lockScreen"); }

/* OPEN FOLDER */
function openFolder(folder) {
    currentFolder = folder;
    folderTitle.textContent = folder.toUpperCase();
    loadFiles();
    showScreen("folderScreen");
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
        url: url,
        type: file.type
    });

    localStorage.setItem(currentFolder, JSON.stringify(files));
    fileInput.value = "";
    loadFiles();
}

/* SHOW FILES + OPEN ON CLICK ✅ */
function loadFiles() {
    fileList.innerHTML = "";

    const files = JSON.parse(localStorage.getItem(currentFolder)) || [];

    if (!files.length) {
        fileList.innerHTML = "<li>No files</li>";
        return;
    }

    files.forEach(f => {
        const li = document.createElement("li");
        li.textContent = `${f.name} (${Math.round(f.size / 1024)} KB)`;
        li.onclick = () => window.open(f.url, "_blank");
        fileList.appendChild(li);
    });
}
