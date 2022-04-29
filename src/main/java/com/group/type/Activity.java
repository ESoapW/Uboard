package com.group.type;

import com.group.entity.ActivityEntity;
import com.group.util.DateUtil;
import lombok.Data;

import java.util.List;
@Data
public class Activity {
    private Integer activityId;
    private User initializer;
    private Integer initializerId;
    private List<Application> applications;
    private List<User> participants;
    private String activityName;
    private String imageUrl;
    private String startTime;
    private String endTime;
    private String location;
    private String description;
    private int numOfParticipants;
    private int funds;
    private String requirements;

    public static Activity fromActivityEntity(ActivityEntity activityEntity){
        Activity activity = new Activity();
        activity.setActivityId(activityEntity.getActivityId());
        activity.setInitializerId(activityEntity.getInitializerId());
        activity.setActivityName(activityEntity.getActivityName());
        activity.setImageUrl(activityEntity.getImageUrl());
        activity.setStartTime(DateUtil.formatDateInISOString(activityEntity.getStartTime()));
        activity.setEndTime(DateUtil.formatDateInISOString(activityEntity.getEndTime()));
        activity.setLocation(activityEntity.getLocation());
        activity.setDescription(activityEntity.getDescription());
        activity.setNumOfParticipants(activityEntity.getNumOfParticipants());
        activity.setFunds(activityEntity.getFunds());
        activity.setRequirements(activityEntity.getRequirements());
        return activity;
    }
}
