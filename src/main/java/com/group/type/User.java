package com.group.type;

import com.group.entity.UserEntity;
import lombok.Data;

import java.util.List;

@Data
public class User {
    private Integer userId;
    private List<Activity> initializedActivityList;
    private List<Activity> participatedActivityList;
    private List<Application> applications;
    private String userName;
    private String userSchool;
    private String userGrade;
    private String email;
    private String phoneNumber;
    private String password;

    public static User fromUserEntity(UserEntity userEntity){
        User user = new User();
        user.setUserId(userEntity.getUserId());
        user.setUserName(userEntity.getUserName());
        user.setUserSchool(userEntity.getUserSchool());
        user.setUserGrade(userEntity.getUserGrade());
        user.setEmail(userEntity.getEmail());
        user.setPhoneNumber(userEntity.getPhoneNumber());
        user.setPassword(userEntity.getPassword());
        return user;
    }
}
