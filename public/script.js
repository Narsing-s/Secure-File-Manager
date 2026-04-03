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

    if (pin.length < 4) {
        setPinError.textContent = "PIN must be at least 4 digits";
        return;
    }
    if (pin !== confirm) {
        setPinError.textContent = "PINs do not match";
        return;
    }

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

/* NAVIGATION */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function goHome() {
    showScreen("homeScreen");
}

function lockApp() {
    showScreen("lockScreen");
}

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
        url: url
    });

    localStorage.setItem(currentFolder, JSON.stringify(files));
    fileInput.value = "";
    loadFiles();
}

/* LOAD & OPEN FILE */
function loadFiles() {
    fileList.innerHTML = "";

    const files = JSON.parse(localStorage.getItem(currentFolder)) || [];

    if (files.length === 0) {
        fileList.innerHTML = "<li>No files</li>";
        return;
    }

    files.forEach(file => {
        const li = document.createElement("li");
        li.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
        li.onclick = () => window.open(file.url, "_blank");
        fileList.appendChild(li);
    });
}
