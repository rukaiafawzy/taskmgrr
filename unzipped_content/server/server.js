const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');
const app = express();
const port = 3000;

// 1. Path Matching the Bash Script (v14.1)
// This points to: /home/user/.taskmgrr_data/history_graph.json
const LOG_FILE = path.join(os.homedir(), '.taskmgrr_data', 'history_graph.json');

// Serve the HTML/JS files from the "public" folder
app.use(express.static('public'));

app.get('/api/data', (req, res) => {
    // 2. Check if file exists before trying to read
    if (!fs.existsSync(LOG_FILE)) {
        console.log("⚠️  Log file not found. Waiting for Bash script...");
        return res.json({ error: "No data yet. Run taskmgrr.sh first!" });
    }

    fs.readFile(LOG_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("❌ Error reading log file:", err);
            return res.status(500).json([]);
        }

        try {
            // 3. Process the Data (NDJSON format)
            const result = data
                .trim()
                .split('\n')
                // Optimization: Take only the last 60 entries (Last 1 Minute)
                // This keeps the graph fast even if the file has 11 hours of logs
                .slice(-60) 
                .map(line => {
                    try {
                        // Fix: Sometimes writing to file creates empty lines, handle gracefully
                        if (!line) return null; 
                        return JSON.parse(line);
                    } catch (e) {
                        return null; // Skip corrupted lines
                    }
                })
                .filter(item => item !== null); // Remove nulls

            res.json(result);
        } catch (e) {
            console.error("❌ Error parsing JSON:", e);
            res.json([]);
        }
    });
});

app.listen(port, () => {
    console.log(`=============================================`);
    console.log(`🚀 Task Manager Server v2.0 Running`);
    console.log(`🌐 Dashboard: http://localhost:${port}`);
    console.log(`📂 Tracking Log: ${LOG_FILE}`);
    console.log(`=============================================`);
});