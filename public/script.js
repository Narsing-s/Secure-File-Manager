let currentFolder = "";

/* ---------- APP START ---------- */
window.onload = () => {
    const savedPin = localStorage.getItem("userPin");
    if (!savedPin) {
        showScreen("setPinScreen");
    } else {
        showScreen("lockScreen");
    }
};

/* ---------- PIN SETUP ---------- */
function setPin() {
    const pin = document.getElementById("newPin").value;
    const confirm = document.getElementById("confirmPin").value;
    const error = document.getElementById("setPinError");

    if (pin.length < 4) {
        error.textContent = "PIN must be at least 4 digits";
        return;
    }
    if (pin !== confirm) {
        error.textContent = "PINs do not match";
        return;
    }

    localStorage.setItem("userPin", pin);
    showScreen("lockScreen");
}

/* ---------- UNLOCK ---------- */
function unlockApp() {
    const pin = document.getElementById("pinInput").value;
    const savedPin = localStorage.getItem("userPin");

    if (pin === savedPin) {
        showScreen("homeScreen");
    } else {
        document.getElementById("errorText").textContent = "Wrong PIN!";
    }

    document.getElementById("pinInput").value = "";
}

/* ---------- NAVIGATION ---------- */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s =>
        s.classList.remove("active")
    );
    document.getElementById(id).classList.add("active");
}

function goHome() {
    showScreen("homeScreen");
}

function lockApp() {
    showScreen("lockScreen");
}

/* ---------- FOLDERS ---------- */
function openFolder(folderName) {
    currentFolder = folderName;
    document.getElementById("folderTitle").textContent = folderName.toUpperCase();
    loadFiles();
    showScreen("folderScreen");
}

/* ---------- FILE UPLOAD ---------- */
function uploadFile() {
    const input = document.getElementById("fileInput");
    if (!input.files[0]) return;

    const file = input.files[0];
    const files = JSON.parse(localStorage.getItem(currentFolder)) || [];

    files.push({
        name: file.name,
        size: file.size
    });

    localStorage.setItem(currentFolder, JSON.stringify(files));
    input.value = "";
    loadFiles();
}

/* ---------- SHOW FILES ---------- */
function loadFiles() {
    const list = document.getElementById("fileList");
    list.innerHTML = "";

    const files = JSON.parse(localStorage.getItem(currentFolder)) || [];

    if (files.length === 0) {
        list.innerHTML = "<li>No files</li>";
        return;
    }

    files.forEach(f => {
        const li = document.createElement("li");
        li.textContent = `${f.name} (${Math.round(f.size/1024)} KB)`;
        list.appendChild(li);
    });
}
