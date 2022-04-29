package com.group.entity;

import lombok.Data;

@Data
public class MailEntity {
    private String to;
    private String subject;
    private String content;
}
