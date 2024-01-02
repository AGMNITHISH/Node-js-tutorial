var apiKey = "726f39f6d6b57bc91ff3afa274ed9a19";
apiSecret = "90f7734ed1e5d19109e6298706d1ae95";
sailthru = require("sailthru-client").createSailthruClient(apiKey, apiSecret);

function triggerEmail() {
  var options = { vars: { color: "blue" }, schedule_time: "now" };
  sailthru.send(
    "New Template from September 15, 2023 at 11:34:12 AM",
    "rakesh.chotaliya@agilisium.com",
    options,
    function (err, response) {
      if (err) {
        console.log("err", err);
      }
      console.log("response", response);
    }
  );
}

function saveTemplate({ subject, content_html, templateName }) {
  var options = {
    content_html: content_html,
    subject: subject,
  };
  sailthru.saveTemplate(templateName, options, function (err, response) {
    if (err) {
      return err;
    }
    return response;
  });
}

function getTemplate() {
  sailthru.getTemplates(function (err, response) {
    if (err) {
      console.log("err", err);
    }
    console.log("response", response);
  });
}
const listName = "AGM userlist 6";
const emailsToAdd = "email1@example.com";

var data = {
  email: emailsToAdd,
  list: listName,
};
function createUserList() {
  sailthru.apiPost("list", data, (err, response) => {
    if (err) {
      console.error("Error creating user list:", err);
    } else {
      console.log("User list created:", response);
    }
  });
}

function getLists() {
  sailthru.getLists(function (err, response) {
    if (err) {
      console.error("Error creating user list:", err);
    } else {
      console.log("User list created:", response);
    }
  });
}

function addUsersIntoList() {
  const listName = "AGM userlist 5"; // Replace with your existing list name
  const emailsToAdd = [
    "email1@example.com",
    "email2@example.com",
    "email3@example.com",
  ];

  const data = {
    list: listName,
    emails: emailsToAdd,
  };

  sailthru.apiPost("list", data, (err, response) => {
    if (err) {
      console.error("Error adding emails to list:", err);
    } else {
      console.log("Emails added to list:", response);
    }
  });
}
module.exports = {
  triggerEmail,
  saveTemplate,
  getTemplate,
  createUserList,
  getLists,
  addUsersIntoList,
};
