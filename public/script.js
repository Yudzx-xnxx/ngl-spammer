document.getElementById("sendButton").addEventListener("click", async () => {
    const nglLink = document.getElementById("nglLink").value.trim();
    const message = document.getElementById("message").value.trim();
    const count = parseInt(document.getElementById("count").value);

    if (!nglLink || !message || isNaN(count) || count <= 0 || count > 10) {
        document.getElementById("result").innerText = "⚠️ Harap isi semua data dengan benar!";
        return;
    }

    document.getElementById("result").innerText = "⏳ Mengirim...";

    const response = await fetch("/send-ngl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nglLink, message, count })
    });

    const data = await response.json();
    document.getElementById("result").innerText = `✅ Sukses: ${data.sent}, ❌ Gagal: ${data.failed}`;
});