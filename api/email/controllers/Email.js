// File /api/email/controllers/Email.js
"use strict";

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  /**
   * Sends an email to the recipient in the body of the request
   */
  send: async (ctx) => {
    const { body } = ctx.request;
    const sendTo = process.env.EMAIL_ADDRESS_TO;
    strapi.log.debug(`Trying to send an email to ${sendTo}`);

    try {
      const emailOptions = {
        from: body.from,
        to: process.env.EMAIL_ADDRESS_TO,
        subject: body.subject,
        html: `<h1>${body.subject}</h1>
        <br/>
        <p>Od: ${body.from} - ${body.details.name}</p>
        <br/>
        <p>${body.details.message}.</p>`,
      };
      await strapi.plugins["email"].services.email.send(emailOptions);
      strapi.log.debug(`Email sent to ${sendTo}`);
      ctx.send({ message: "Email sent" });
    } catch (err) {
      console.log(err);
      strapi.log.error(`Error sending email to ${sendTo}`, err);
      ctx.send({ error: "Error sending email" });
    }
  },
};
