﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace OAuthAPI.WebApi.Api.Services
{
    public class EmailService
    {
        //public async Task SendAsync(IdentityMessage message)
        //{
        //    await SendViaSmtp(message);
        //}

        //public async Task SendViaSmtp(IdentityMessage message)
        //{
        //    //MailMessage mailMsg = new MailMessage();
            //mailMsg.To.Add(new MailAddress(message.Destination));
            //// From
            //var t = ConfigurationService.AppSettings["email:username"];
            //MailAddress mailAddress = new MailAddress(ConfigurationService.AppSettings["email:username"], "OAuth Api mailer");
            //mailMsg.From = mailAddress;

            ////Content
            //mailMsg.Subject = message.Subject;
            //mailMsg.Body = message.Body;
            //mailMsg.IsBodyHtml = true;

            ////SmtpClient
            //SmtpClient smtpConnection = new SmtpClient("smtp-mail.outlook.com", 587);
            //smtpConnection.Credentials = new NetworkCredential(
            //    ConfigurationService.AppSettings["email:username"], ConfigurationService.AppSettings["email:password"]);

            //smtpConnection.EnableSsl = true;
            //await smtpConnection.SendMailAsync(mailMsg);
        
    }
}