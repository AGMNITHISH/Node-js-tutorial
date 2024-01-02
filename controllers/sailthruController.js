const asyncHandler = require("express-async-handler");

const createTemplate = asyncHandler(async (req, res) => {
  const { subject, content_html, templateName } = req.body;
  console.log("triggered here", req, subject, content_html, templateName);
  try {
    const result = await createTemplate({
      subject: subject,
      content_html: content_html,
      templateName: templateName,
    });
    res.status(200).json({ doc: result });
  } catch (error) {
    res.status(500);
    throw new Error("something went wrong");
  }
});

module.exports = {
  createTemplate,
};
