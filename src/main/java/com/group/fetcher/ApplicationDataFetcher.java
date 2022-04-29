package com.group.fetcher;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.group.conf.MailService;
import com.group.entity.ActivityEntity;
import com.group.entity.ApplicationEntity;
import com.group.entity.MailEntity;
import com.group.entity.UserEntity;
import com.group.mapper.ActivityEntityMapper;
import com.group.mapper.ApplicationEntityMapper;
import com.group.mapper.UserEntityMapper;
import com.group.type.Activity;
import com.group.type.Application;
import com.group.type.ApplicationCreateInput;
import com.group.type.User;
import com.netflix.graphql.dgs.*;

import java.util.List;
import java.util.stream.Collectors;

@DgsComponent
public class ApplicationDataFetcher {

    private final ApplicationEntityMapper applicationEntityMapper;
    private final UserEntityMapper userEntityMapper;
    private final ActivityEntityMapper activityEntityMapper;
    private final MailService mailService;

    public ApplicationDataFetcher(ApplicationEntityMapper applicationEntityMapper, UserEntityMapper userEntityMapper, ActivityEntityMapper activityEntityMapper, MailService mailService) {
        this.applicationEntityMapper = applicationEntityMapper;
        this.userEntityMapper = userEntityMapper;
        this.activityEntityMapper = activityEntityMapper;
        this.mailService = mailService;
    }

    //query application
    @DgsQuery
    public List<Application> application(){
        List<ApplicationEntity> applicationEntityList = applicationEntityMapper.selectList(new QueryWrapper<>());
        List<Application> applicationList = applicationEntityList.stream().map(Application::fromApplicationEntity).collect(Collectors.toList());
        return applicationList;
    }

    //create application
    @DgsMutation
    public Application createApplication(@InputArgument ApplicationCreateInput applicationCreateInput, Integer applicantId, Integer activityId){
        ApplicationEntity applicationEntity = ApplicationEntity.fromApplicationCreateInput(applicationCreateInput, applicantId, activityId);
        applicationEntityMapper.insert(applicationEntity);

        return Application.fromApplicationEntity(applicationEntity);
    }

    //approve application and send email to the applicant
    @DgsMutation
    public Application applicationApprove(@InputArgument Integer applicationId){
        ApplicationEntity applicationEntity = applicationEntityMapper.selectById(applicationId);
        applicationEntity.setApplicationStatus("approved");
        applicationEntityMapper.updateById(applicationEntity);
        // Get the email address of the applicant from application
        UserEntity userEntity = userEntityMapper.selectById(applicationEntity.getApplicantId());
        String email = userEntity.getEmail();
        // Get the requested activity from application
        ActivityEntity activityEntity = activityEntityMapper.selectById(applicationEntity.getActivityId());
        String activityName = activityEntity.getActivityName();
        // Set the mail sending service
        MailEntity mailEntity = new MailEntity();
        mailEntity.setTo(email);
        mailEntity.setSubject("Application in ActivitySystem");
        mailEntity.setContent("Hi " + userEntity.getUserName() +"," + "\nYour application for " + activityName + " is approved. You can log in the website to check the status. \n\nThank you." );
        mailService.sendMail(mailEntity);
        return Application.fromApplicationEntity(applicationEntity);
    }

    //deny application and send email to the applicant
    @DgsMutation
    public Application applicationDeny(@InputArgument Integer applicationId){
        ApplicationEntity applicationEntity = applicationEntityMapper.selectById(applicationId);
        applicationEntity.setApplicationStatus("denied");
        applicationEntityMapper.updateById(applicationEntity);
        // Get the email address of the applicant from application
        UserEntity userEntity = userEntityMapper.selectById(applicationEntity.getApplicantId());
        String email = userEntity.getEmail();
        // Get the requested activity from application
        ActivityEntity activityEntity = activityEntityMapper.selectById(applicationEntity.getActivityId());
        String activityName = activityEntity.getActivityName();
        // Set the mail sending service
        MailEntity mailEntity = new MailEntity();
        mailEntity.setTo(email);
        mailEntity.setSubject("Application in ActivitySystem");
        mailEntity.setContent("Hi " + userEntity.getUserName() + "," + "\nYour application for " + activityName + " is denied. You can log in the website to check the status. \n\nThank you." );
        mailService.sendMail(mailEntity);
        return Application.fromApplicationEntity(applicationEntity);
    }



    @DgsData(parentType = "Application", field = "applicant")
    public User getApplicant(DgsDataFetchingEnvironment dfe){
        Application application = dfe.getSource();
        UserEntity userEntity = userEntityMapper.selectById(application.getApplicantId());
        User user = User.fromUserEntity(userEntity);
        return user;
    }

    @DgsData(parentType = "Application", field = "activity")
    public Activity getActivity(DgsDataFetchingEnvironment dfe){
        Application application = dfe.getSource();
        ActivityEntity activityEntity = activityEntityMapper.selectById(application.getActivityId());
        Activity activity = Activity.fromActivityEntity(activityEntity);
        return activity;
    }
}
