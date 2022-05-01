package com.group.fetcher;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.group.entity.ActivityEntity;
import com.group.entity.ApplicationEntity;
import com.group.entity.UserEntity;
import com.group.mapper.ActivityEntityMapper;
import com.group.mapper.ApplicationEntityMapper;
import com.group.mapper.UserEntityMapper;
import com.group.type.Activity;
import com.group.type.ActivityCreateInput;
import com.group.type.Application;
import com.group.type.User;
import com.netflix.graphql.dgs.*;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@DgsComponent
@RequiredArgsConstructor //自动注入constructor
public class ActivityDataFetcher {
    private final ActivityEntityMapper activityEntityMapper;
    private final UserEntityMapper userEntityMapper;
    private final ApplicationEntityMapper applicationEntityMapper;


    //query for all activity
    @DgsQuery
    public List<Activity> activity(){
        List<ActivityEntity> activityEntityList = activityEntityMapper.selectList(new QueryWrapper<>());
        List<Activity> activityList = activityEntityList.stream()
                .map(Activity::fromActivityEntity).collect(Collectors.toList());
        return activityList;
    }

    //query for one activity with activityId
    @DgsQuery
    public Activity activityWithActivityId(Integer activityId){
        ActivityEntity activityEntity = activityEntityMapper.selectById(activityId);
        Activity activity = Activity.fromActivityEntity(activityEntity);
        return activity;
    }

    //create activity
    @DgsMutation
    public Activity createActivity(@InputArgument ActivityCreateInput activityCreateInput, Integer initializerId){
        ActivityEntity activityEntity = ActivityEntity.fromActivityCreateInput(activityCreateInput, initializerId);
        activityEntityMapper.insert(activityEntity);
        //convert activityEntity to activity
        Activity activity = Activity.fromActivityEntity(activityEntity);

        return activity;
    }

    //Get data from child nodes by resolver and call it if the front end needs it
    @DgsData(parentType = "Activity", field = "initializer")
    public User getInitializer(DgsDataFetchingEnvironment dfe){
        Activity activity = dfe.getSource();
        UserEntity userEntity = userEntityMapper.selectById(activity.getInitializerId());
        User user = User.fromUserEntity(userEntity);
        return user;
    }

    @DgsData(parentType = "Activity", field = "applications")
    public List<Application> getApplications(DgsDataFetchingEnvironment dfe){
        Activity activity = dfe.getSource();
        QueryWrapper<ApplicationEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda().eq(ApplicationEntity::getActivityId, activity.getActivityId());
        List<ApplicationEntity> applicationEntityList = applicationEntityMapper.selectList(queryWrapper);
        List<Application> applicationList = applicationEntityList.stream().map(Application::fromApplicationEntity).collect(Collectors.toList());
        return applicationList;
    }

    @DgsData(parentType = "Activity", field = "participants")
    public List<User> getParticipants(DgsDataFetchingEnvironment dfe){
        Activity activity = dfe.getSource();
        QueryWrapper<ApplicationEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda().eq(ApplicationEntity::getActivityId, activity.getActivityId()).and(i -> i.eq(ApplicationEntity::getApplicationStatus, "approved"));
        List<ApplicationEntity> applicationEntityList = applicationEntityMapper.selectList(queryWrapper);
        List<Application> applicationList = applicationEntityList.stream().map(
                applicationEntity -> {
                    Application application = Application.fromApplicationEntity(applicationEntity);
                    getUser(application, applicationEntity.getApplicantId());
                    return application;
                }).collect(Collectors.toList());
        List<User> userList = applicationList.stream().map(e -> e.getApplicant()).collect(Collectors.toList());
        return userList;
    }

    private void getUser(Application application, Integer applicantId){
        UserEntity userEntity = userEntityMapper.selectById(applicantId);
        User user = User.fromUserEntity(userEntity);
        application.setApplicant(user);
    }

}
