const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// هنا ضع الـ API Token الخاص بالبوت
const token = '7443158315:AAFpzzGdez00G16YrRvRh4LmxqONAsGIw_0';
const bot = new TelegramBot(token, { polling: true });
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText) {
        bot.forwardMessage(chatId, '@my2bot5files', messageText)
            .then(() => {
                bot.sendMessage(chatId, 'تم إرسال الرسالة بنجاح.');
            })
            .catch((error) => {
                console.error('Error:', error);
                bot.sendMessage(chatId, 'حدث خطأ عند إرسال الرسالة.');
            });
    } else {
        bot.sendMessage(chatId, 'يرجى إرسال معرف الرسالة.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
