const express = require("express");
const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config();

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");

const Account_SID = process.env.Account_SID;
const Auth_Token = process.env.Auth_Token;
const client = twilio(Account_SID, Auth_Token);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.render("index"); 
});

app.post("/send-sms", async (req, res) => {
    const { message } = req.body;

    const MSoptions = {
        from: process.env.Phone_Number,
        to: process.env.TARGET_NUMBER,
        body: message,
    };

    try {
        const sentMessage = await client.messages.create(MSoptions);
        res.status(200).json({ success: true, data: sentMessage });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
