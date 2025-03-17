const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static("public")); // Serve static files (HTML, CSS, JS)

app.post('/send-ngl', async (req, res) => {
    const { nglLink, message, count } = req.body;

    if (!nglLink || !message || !count || count <= 0) {
        return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const apiUrl = `https://api.only-awan.biz.id/api/tools/ngl?link=https://${encodeURIComponent(nglLink)}&text=${encodeURIComponent(message)}&apikey=C68xIhWt`;

    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < count; i++) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === 200) {
                successCount++;
            } else {
                failedCount++;
            }
        } catch {
            failedCount++;
        }
    }

    res.json({ success: true, sent: successCount, failed: failedCount });
});

app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;