package com.group.fetcher;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.group.entity.ActivityEntity;
import com.group.entity.ApplicationEntity;
import com.group.entity.UserEntity;
import com.group.mapper.ActivityEntityMapper;
import com.group.mapper.ApplicationEntityMapper;
import com.group.mapper.UserEntityMapper;
import com.group.type.*;
import com.netflix.graphql.dgs.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.stream.Collectors;

@DgsComponent
@RequiredArgsConstructor
public class UserDataFetcher {
    private final UserEntityMapper userEntityMapper;
    private final PasswordEncoder passwordEncoder;
    private final ActivityEntityMapper activityEntityMapper;
    private final ApplicationEntityMapper applicationEntityMapper;


    @DgsQuery
    public User login(@InputArgument LoginInput loginInput) {
        UserEntity userEntity = this.findUserByEmail(loginInput.getEmail());
        if (userEntity == null) {
            throw new RuntimeException("The user doesn't exist");
        }
        boolean match = passwordEncoder.matches(loginInput.getPassword(), userEntity.getPassword());
        if (!match) {
            throw new RuntimeException("The password is not correct");
        }
        return User.fromUserEntity(userEntity);
    }

    @DgsQuery
    public List<User> user(){
        List<UserEntity> userEntityList = userEntityMapper.selectList(new QueryWrapper<>());
        List<User> userList = userEntityList.stream().map(User::fromUserEntity).collect(Collectors.toList());
        return userList;
    }

    @DgsQuery
    public User userWithUserId(Integer userId){
        UserEntity userEntity = userEntityMapper.selectById(userId);
        User user = User.fromUserEntity(userEntity);
        return user;
    }


    @DgsMutation
    public User registerUser(@InputArgument UserRegisterInput userRegisterInput){
        // The password can not be stored in clear text, so instead of using fromUserRegisterInput, use the following set definition
        // initializedActivityList through data resolver implementation without definition
        userIsExist(userRegisterInput);
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId((int)((Math.random() * 9 + 1) * 100000));//6 digits random number
        userEntity.setUserName(userRegisterInput.getUserName());
        userEntity.setEmail(userRegisterInput.getEmail());
        userEntity.setPassword(passwordEncoder.encode(userRegisterInput.getPassword()));
        userEntity.setUserSchool(userRegisterInput.getUserSchool());
        userEntity.setUserGrade(userRegisterInput.getUserGrade());
        userEntity.setPhoneNumber(userRegisterInput.getPhoneNumber());
        userEntityMapper.insert(userEntity);

        User user = User.fromUserEntity(userEntity);
        user.setPassword("");

        return user;
    }



    @DgsData(parentType = "User", field = "initializedActivityList")
    public List<Activity> getInitializedActivityList(DgsDataFetchingEnvironment dfe){
        User user = dfe.getSource();
        QueryWrapper<ActivityEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda().eq(ActivityEntity::getInitializerId, user.getUserId());
        List<ActivityEntity> activityEntityList = activityEntityMapper.selectList(queryWrapper);
        List<Activity> activityList = activityEntityList.stream().map(Activity::fromActivityEntity).collect(Collectors.toList());
        return activityList;
    }

    @DgsData(parentType = "User", field = "applications")
    public List<Application> getApplicationsToUser(DgsDataFetchingEnvironment dfe){
        User user = dfe.getSource();
        QueryWrapper<ApplicationEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda().eq(ApplicationEntity::getApplicantId, user.getUserId());
        List<ApplicationEntity> applicationEntityList = applicationEntityMapper.selectList(queryWrapper);
        List<Application> applicationList = applicationEntityList.stream().map(Application::fromApplicationEntity).collect(Collectors.toList());
        return applicationList;
    }

    @DgsData(parentType = "User", field = "participatedActivityList")
    public List<Activity> getParticipatedActivityList(DgsDataFetchingEnvironment dfe){
        User user = dfe.getSource();
        QueryWrapper<ApplicationEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda().eq(ApplicationEntity::getApplicantId, user.getUserId()).and(i -> i.eq(ApplicationEntity::getApplicationStatus, "approved"));
        List<ApplicationEntity> applicationEntityList = applicationEntityMapper.selectList(queryWrapper);
        List<Application> applicationList = applicationEntityList.stream().map(
                applicationEntity -> {
                    Application application = Application.fromApplicationEntity(applicationEntity);
                    getActivity(application, applicationEntity.getActivityId());
                    return application;
                }).collect(Collectors.toList());
        List<Activity> activityList = applicationList.stream().map(e -> e.getActivity()).collect(Collectors.toList());
        return activityList;
    }

    // Check whether user's email is registered
    private void userIsExist(UserRegisterInput userRegisterInput){
        QueryWrapper<UserEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda().eq(UserEntity::getEmail, userRegisterInput.getEmail());
        if (userEntityMapper.selectCount(queryWrapper) >= 1){
            throw new RuntimeException("this email has been registered");
        }
    }

    private void getActivity(Application application, Integer activityId){
        ActivityEntity activityEntity = activityEntityMapper.selectById(activityId);
        Activity activity = Activity.fromActivityEntity(activityEntity);
        application.setActivity(activity);
    }

    private UserEntity findUserByEmail(String email) {
        QueryWrapper<UserEntity> queryWrapper = new QueryWrapper();
        queryWrapper.lambda().eq(UserEntity::getEmail, email);
        return userEntityMapper.selectOne(queryWrapper);
    }
}
