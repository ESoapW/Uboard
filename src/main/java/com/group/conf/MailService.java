package com.group.conf;

import com.group.entity.MailEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    //Define the e-mail sender
    @Value("gd008524@163.com")
    private String from;

    //Invoke the third-party SimpleMailMessage service to automatically send emails
    public boolean sendMail(MailEntity mailEntity){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(from);
        simpleMailMessage.setTo(mailEntity.getTo());
        simpleMailMessage.setSubject(mailEntity.getSubject());
        simpleMailMessage.setText(mailEntity.getContent());
        javaMailSender.send(simpleMailMessage);
        return true;
    }
}
