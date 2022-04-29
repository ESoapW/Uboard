package com.group.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.group.type.ApplicationCreateInput;
import lombok.Data;

@Data
@TableName(value = "application")
public class ApplicationEntity {
    @TableId
    private Integer applicationId;
    private Integer applicantId;
    private Integer activityId;
    private String comments;
    private String applicationStatus;

    public static ApplicationEntity fromApplicationCreateInput(ApplicationCreateInput applicationCreateInput, Integer applicantId, Integer activityId){
        ApplicationEntity applicationEntity = new ApplicationEntity();
        applicationEntity.setApplicationId((int)((Math.random() * 9 + 1) * 10000000));//8 digits random number
        applicationEntity.setApplicantId(applicantId); //fetch from login state
        applicationEntity.setActivityId(activityId); //fetch from activity
        applicationEntity.setComments(applicationCreateInput.getComments());
        applicationEntity.setApplicationStatus("applying"); //initialize the state of application
        return applicationEntity;
    }

}
