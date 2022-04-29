package com.group.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

//this package is the entity for database to access
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
}
