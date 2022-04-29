package com.group.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

//该包为数据库访问实体
@Data
@TableName(value = "tb_user")
public class UserEntity {

    @TableId
    private Integer userId;
    private String userName;
    private String userSchool;
    private String userGrade;
    private String email;
    private String phoneNumber;
    private String password;

//    public static UserEntity fromUserRegisterInput(UserRegisterInput userRegisterInput){
//        UserEntity userEntity = new UserEntity();
//        //    private List<Activity> initializedActivityList;
////    private List<Activity> participatedActivityList;
////    private List<Application> applications; 缺这三项
//        userEntity.setUserId(Integer.parseInt(String.valueOf(System.currentTimeMillis()).substring(0, 6)));
//        userEntity.setUserName(userRegisterInput.getUserName());
//        userEntity.setUserSchool(userRegisterInput.getUserSchool());
//        userEntity.setUserGrade(userRegisterInput.getUserGrade());
//        userEntity.setEmail(userRegisterInput.getEmail());
//        userEntity.setPhoneNumber(userRegisterInput.getPhoneNumber());
//        userEntity.setPassword(userRegisterInput.getPassword());
//        return userEntity;
//    }
}
