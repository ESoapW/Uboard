package com.group.type;

import com.group.entity.ApplicationEntity;
import lombok.Data;

@Data
public class Application {
    private Integer applicationId;
    private User applicant;
    private Integer applicantId;
    private Activity activity;
    private Integer activityId;
    private String comments;
    private String applicationStatus;

    public static Application fromApplicationEntity(ApplicationEntity applicationEntity){
        Application application = new Application();
        application.setApplicationId(applicationEntity.getApplicationId());
        application.setApplicantId(applicationEntity.getApplicantId());
        application.setActivityId(applicationEntity.getActivityId());
        application.setComments(applicationEntity.getComments());
        application.setApplicationStatus(applicationEntity.getApplicationStatus());
        return application;
    }
}
