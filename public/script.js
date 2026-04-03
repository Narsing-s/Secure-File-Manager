const REAL_PIN = "2580";
const DECOY_PIN = "0000";

function unlockApp() {
    const pin = document.getElementById("pinInput").value;
    const errorText = document.getElementById("errorText");

    if (pin === REAL_PIN) {
        showScreen("homeScreen");
        errorText.textContent = "";
    } else if (pin === DECOY_PIN) {
        alert("Decoy Vault Opened");
        showScreen("vaultScreen");
    } else {
        errorText.textContent = "Wrong PIN!";
    }

    document.getElementById("pinInput").value = "";
}

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });
    document.getElementById(screenId).classList.add("active");
}

function goHome() {
    showScreen("homeScreen");
}

function lockApp() {
    showScreen("lockScreen");
}
