const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// هنا ضع الـ API Token الخاص بالبوت
const token = '7443158315:AAFpzzGdez00G16YrRvRh4LmxqONAsGIw_0';

// إنشاء كائن البوت
const bot = new TelegramBot(token, { polling: true });
const app = express();
const port = 3000;

// استخدام body-parser للتعامل مع بيانات JSON
app.use(bodyParser.json());

// معرف القناة التي ترغب في سحب الرسائل منها
const channelId = '@my2bot5files';

// معالجة الطلبات المرسلة من الموقع
app.post('/sendCommand', (req, res) => {
    const messageId = req.body.messageId;

    bot.forwardMessage(req.body.chatId, channelId, messageId)
        .then(() => {
            res.json({ status: 'success' });
        })
        .catch((error) => {
            console.error(`Error forwarding message ${messageId}:`, error);
            res.status(500).json({ status: 'error', message: error.message });
        });
});

// بدء الخادم
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
