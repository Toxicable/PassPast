using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using SendGrid;
using System.Configuration;

namespace OAuthAPI.WebApi.Api.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await SendViaSmtp(message);
        }

        public async Task SendViaSmtp(IdentityMessage message)
        {
            MailMessage mailMsg = new MailMessage();
            mailMsg.To.Add(new MailAddress(message.Destination));
            // From
            var t = ConfigurationManager.AppSettings["email:username"];
            MailAddress mailAddress = new MailAddress(ConfigurationManager.AppSettings["email:username"], "OAuth Api mailer");
            mailMsg.From = mailAddress;

            //Content
            mailMsg.Subject = message.Subject;
            mailMsg.Body = message.Body;
            mailMsg.IsBodyHtml = true;

            //SmtpClient
            SmtpClient smtpConnection = new SmtpClient("smtp-mail.outlook.com", 587);
            smtpConnection.Credentials = new NetworkCredential(
                ConfigurationManager.AppSettings["email:username"], ConfigurationManager.AppSettings["email:password"]);

            smtpConnection.EnableSsl = true;
            await smtpConnection.SendMailAsync(mailMsg);
        }
    }
}