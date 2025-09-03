// Abstraction: Notification strategy
class Notification {
  send(message) {
    throw new Error("send() must be implemented");
  }
}

// Concrete implementations

class EmailNotification extends Notification {
  constructor(emailAddress) {
    super();
    this.emailAddress = emailAddress;
  }

  send(message) {
    if (!this.emailAddress) throw new Error("Email required");
    console.log(`Sending EMAIL to ${this.emailAddress}: ${message}`);
  }
}

class SMSNotification extends Notification {
  constructor(phoneNumber) {
    super();
    this.phoneNumber = phoneNumber;
  }

  send(message) {
    if (!this.phoneNumber) throw new Error("Phone number required");
    console.log(`Sending SMS to ${this.phoneNumber}: ${message}`);
  }
}

class TelegramNotification extends Notification {
  constructor(telegramId) {
    super();
    this.telegramId = telegramId;
  }

  send(message) {
    if (!this.telegramId) throw new Error("Telegram ID required");
    console.log(`Sending TELEGRAM to ${this.telegramId}: ${message}`);
  }
}

// Usage (dependency inversion: depend on abstraction)
const notifications = [
  new EmailNotification("nexus@email.com"),
  new SMSNotification("1234567890"),
  new TelegramNotification("telegram_user_42")
];

notifications.forEach(n => n.send("Hello from SOLID refactor!"));
