package com.group.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.group.type.ActivityCreateInput;
import lombok.Data;

import java.util.Date;
import com.group.util.*;

@Data
@TableName(value = "activity")
public class ActivityEntity {
    @TableId
    private Integer activityId;
    private Integer initializerId;
    private String activityName;
    private String imageUrl;
    private Date startTime;
    private Date endTime; //Date of java.util can be mapped directly to mysql timeStamp
    private String location;
    private String description;
    private Integer numOfParticipants;
    private Integer funds;
    private String requirements;

    //initializerId can be passed from frontend
    public static ActivityEntity fromActivityCreateInput(ActivityCreateInput activityCreateInput, Integer initializerId){
        ActivityEntity activityEntity = new ActivityEntity();
        activityEntity.setActivityId((int)((Math.random() * 9 + 1) * 1000000));//seven digits random number
        activityEntity.setInitializerId(initializerId);
        activityEntity.setActivityName(activityCreateInput.getActivityName());
        activityEntity.setImageUrl(activityCreateInput.getImageUrl());
        activityEntity.setStartTime(DateUtil.convertISOStringToDate(activityCreateInput.getStartTime()));
        activityEntity.setEndTime(DateUtil.convertISOStringToDate(activityCreateInput.getEndTime()));
        activityEntity.setLocation(activityCreateInput.getLocation());
        activityEntity.setDescription(activityCreateInput.getDescription());
        activityEntity.setNumOfParticipants(activityCreateInput.getNumOfParticipants());
        activityEntity.setFunds(activityCreateInput.getFunds());
        activityEntity.setRequirements(activityCreateInput.getRequirements());
        return activityEntity;
    }
}
