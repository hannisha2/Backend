const TelegramBot = require('node-telegram-bot-api');
require('dotenv' ).config()
const schedule = require('node-schedule' );
const token = process.env.TOKEN;
console.log("my token",  token)
const bot = new TelegramBot(token,{polling : true})
 //environment variable 
 //Development dependency and dependency
bot.on('polling_error', (error) => {
  console.log(`[polling_error] ${error.code}: ${error.message}`);});
const reminders = {};
const jobs = {}; // to keep track of scheduled jobs

// /daily command
bot.onText(/\/daily (\d{1,2}:\d{2}) (.+)/, (msg, match) => {
  const chatID = msg.chat.id;
  const time = match[1];   // format HH:MM
  const reminderText = match[2];

  // Save reminder for this user
  if (!reminders[chatID]) reminders[chatID] = [];
  if (!jobs[chatID]) jobs[chatID] = [];

  // Save reminder 
  reminders[chatID].push({ time, text: reminderText });

  bot.sendMessage(chatID, `✅ Daily reminder set at ${time} → "${reminderText}"`);

  // Schedule job
  const [hour, minute] = time.split(':').map(Number);
  schedule.scheduleJob({ hour, minute, tz: 'Etc/GMT-3' }, () => {
    bot.sendMessage(chatID, `🔔 Daily Reminder: ${reminderText}`);
  });
});

// Show all reminders
bot.onText(/\/myreminders/, (msg) => {
  const chatID = msg.chat.id;
  if (!reminders[chatID] || reminders[chatID].length === 0) {
    return bot.sendMessage(chatID, "You don't have any reminders yet. Add one with /daily <HH:MM> <message>");
  }

  let reminderList = reminders[chatID]
    .map((r, i) => `${i + 1}. ${r.time} → ${r.text}`)
    .join("\n");

  bot.sendMessage(chatID, `📅 Your daily reminders:\n${reminderList}`);
});

// Delete one reminder
bot.onText(/\/deletereminder (\d+)/, (msg, match) => {
  const chatID = msg.chat.id;
  const index = parseInt(match[1]) - 1; // user uses 1-based index

  if (!reminders[chatID] || index < 0 || index >= reminders[chatID].length) {
    return bot.sendMessage(chatID, "⚠️ Invalid reminder number.");
  }

  // Cancel scheduled job
  const job = jobs[chatID][index];
  if (job) job.cancel();

  // Remove from arrays
  const removed = reminders[chatID].splice(index, 1)[0];
  jobs[chatID].splice(index, 1);

  bot.sendMessage(chatID, `🗑 Deleted reminder: ${removed.time} → "${removed.text}"`);
});

// Help message
bot.on("message", (msg) => {
  const chatID = msg.chat.id;

  if (!msg.text.startsWith("/daily") && !msg.text.startsWith("/myreminders") && !msg.text.startsWith("/deletereminder")) {
    bot.sendMessage(chatID,
      "📌 Commands:\n" +
      "/daily <HH:MM> <message> → Add a daily reminder\n" +
      "/myreminders → Show your reminders\n" +
      "/deletereminder <number> → Delete a reminder"
    );
  }
});
