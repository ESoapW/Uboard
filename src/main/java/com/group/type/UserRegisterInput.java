package com.group.type;

import lombok.Data;

@Data
public class UserRegisterInput {
    private String userName;
    private String userSchool;
    private String userGrade;
    private String email;
    private String phoneNumber;
    private String password;
}
