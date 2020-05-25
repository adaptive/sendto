/**
 * Send message to Slack users or users
 * @param {(number|string[])} users - users receiving the message
 * @param {string} emoji_icon - emoji for message
 * @param {string} message - string containing the message to be sent
 * @param {string} token - token
 * @version 0.1.0
 */

const sendSlack = async (users, emoji_icon, message, token) => {
  const send = async (user, emoji_icon, message, token) => {
    await fetch(`https://hooks.slack.com/services/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        text: message,
        emoji_icon: emoji_icon,
      }),
    });
  };

  if (Array.isArray(users)) {
    for (let user of users) {
      await send(user, emoji_icon, message, token);
    }
  } else {
    await send(users, emoji_icon, message, token);
  }
  return true;
};

/**
 * Send message to Telegram users or users
 * @param {(number|string[])} users - users receiving the message
 * @param {string} message - string containing the message to be sent
 * @param {string} token - token
 * @version 0.1.0
 */

const sendTelegram = async (users, message, token) => {
  const send = async (user, message, token) => {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: user,
        text: message,
      }),
    });
    return true;
  };

  if (Array.isArray(users)) {
    for (let user of users) {
      await send(user, message, token);
    }
  } else {
    await send(users, message, token);
  }
  return true;
};

module.exports = {
  sendSlack,
  sendTelegram,
};
