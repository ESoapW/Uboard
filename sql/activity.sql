-- use this to initialize the database and our example data

DROP TABLE IF EXISTS application;
DROP TABLE IF EXISTS activity;
DROP TABLE IF EXISTS tb_user;

CREATE TABLE tb_user (
    user_id Integer NOT NULL,
    user_name varchar(100) NOT NULL,
    user_school varchar(100) NOT NULL,
    user_grade varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    phone_number varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    primary key (user_id)
);

CREATE TABLE activity (
    activity_id Integer NOT NULL,
    initializer_id Integer NOT NULL,
    activity_name varchar(100) NOT NULL,
    image_url varchar(500) NOT NULL,
    start_time timestamp NOT NULL,
    end_time timestamp NOT NULL,
    location varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    num_of_participants INTEGER NOT NULL,
    funds INTEGER NOT NULL,
    requirements varchar(100) NOT NULL,
    primary key (activity_id),
    constraint fk_created_id foreign key (initializer_id) references tb_user(user_id)
);

CREATE TABLE application (
    application_id Integer PRIMARY KEY,
    applicant_id Integer NOT NULL,
    activity_id Integer NOT NULL,
    comments varchar(100) NOT NULL,
    application_status varchar(100) NOT NULL,
    constraint fk_user_id foreign key (applicant_id) references tb_user(user_id),
    constraint fk_activity_id foreign key (activity_id) references activity(activity_id)

);

insert into tb_user (user_id, user_name, user_school, user_grade, email, phone_number, password)
values (111111, 'IT5007 Grader', 'NUS', 'Graduate', 'adminTest@u.nus.edu', '12345678', 'admin');

insert into tb_user (user_id, user_name, user_school, user_grade, email, phone_number, password)
values (111113, 'Tom Cruise', 'Yale-NUS', 'Year 1', 'userTest3@u.nus.edu', '84387269', 'user');

insert into tb_user (user_id, user_name, user_school, user_grade, email, phone_number, password)
values (111114, 'Justin Trudeau', 'NUS', 'Year 3', 'userTest4@u.nus.edu', '83918244', 'user');

insert into tb_user (user_id, user_name, user_school, user_grade, email, phone_number, password)
values (111115, 'Guo Dan', 'NUS', 'Graduate', 'userTest5@u.nus.edu', '85325123', 'user');

insert into tb_user (user_id, user_name, user_school, user_grade, email, phone_number, password)
values (111116, 'Wei Yixin', 'NUS', 'Graduate', 'easonwei1998@gmail.com', '88849824', 'user');

insert into tb_user (user_id, user_name, user_school, user_grade, email, phone_number, password)
values (111118, 'Mike Pense', 'NUS', 'Year 4', 'userTest8@u.nus.edu', '81592241', 'user');

insert into tb_user (user_id, user_name, user_school, user_grade, email, phone_number, password)
values (111119, 'Mr. Unknown', 'NUS', 'Post Graduate', 'userTest9@u.nus.edu', '69812401', 'user');

insert into tb_user (user_id, user_name, user_school, user_grade, email, phone_number, password)
values (111120, 'Tan Enchye', 'NUS', 'Professor', 'userTest10@u.nus.edu', '64215311', 'user');

insert into tb_user (user_id, user_name, user_school, user_grade, email, phone_number, password)
values (111121, 'Prasanna Karthik', 'NUS', 'Professor', 'userTest11@u.nus.edu', '62535212', 'user');

insert into tb_user (user_id, user_name, user_school, user_grade, email, phone_number, password)
values (111122, 'Nobody', 'NUS', 'Year2', 'userTest12@u.nus.edu', '874125212', 'user');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111112, 111111 , 'Study IT5007', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Study IT5007.jpeg', '2022-04-01 9:00:01', '2022-04-01 21:00:00', 'Utown Starbuck', 'Looking for classmates to study together', 3, 20, 'MComp GT students');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111113, 111113 , 'Play basketball', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Play basketball.jpeg', '2022-04-27 14:00:01', '2022-04-27 15:00:00', 'PGP basketball ground', 'Come to play ball!', 10, 0, 'Can play basketball');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111114, 111114 , 'Malaysia trip', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Malaysia trip.jpeg', '2022-06-10 9:00:01', '2022-06-15 21:00:00', 'Johor, Malaysia', 'A 5-day trip to Johor', 5, 5000, 'Girls Only');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111115, 111115 , 'Play frisbee', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Play frisbee.jpeg', '2022-04-28 16:00:00', '2022-04-28 17:00:00', 'Utown lawn', 'Play frisbee', 2, 0, 'None');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111116, 111116 , 'Play soccer', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Play soccer.jpeg', '2022-04-29 19:00:00', '2022-04-29 21:00:00', 'USC', 'Play soccer', 22, 50, 'Professional soccer player');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111117, 111111 , 'Macritchie hiking', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Macritchie hiking.jpeg', '2022-05-04 9:00:00', '2022-05-04 17:00:00', 'MacRitchie Reservoir', 'Walk along Macritchie', 7, 200, 'Good at hiking');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111118, 111118 , 'Dicuss Ukraine situation', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Discuss Ukraine situation.jpeg', '2022-04-13 14:00:00', '2022-04-13 15:00:00', 'CLB', 'Looking for people interested in Ukraine situation', 5, 0, 'None');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111119, 111119 , 'Play baseball', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Play baseball.jpeg', '2022-04-27 9:00:00', '2022-04-27 12:00:00', 'USC', 'Play baseball', 9, 0, 'Baseball rookie');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111120, 111120 , 'Dinner at Orchard', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Dinner at Orchard.jpeg', '2022-05-10 18:00:00', '2022-05-10 20:00:00', 'Orchard', 'Explore some good restaurants', 4, 500, 'None');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111111, 111111 , 'Universal', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Universal.jpeg', '2022-05-06 9:00:00', '2022-05-06 21:00:00', 'Sentosa', 'Spend one day at Universal', 5, 1000, 'None');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111121, 111121 , 'Run along eastcoast', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Run along eastcoast.jpeg', '2022-05-07 19:00:01', '2022-05-07 22:00:00', 'East coast', 'Run together', 2, 0, 'Professional runner');

insert into activity (activity_id, initializer_id, activity_name, image_url, start_time, end_time, location, description, num_of_participants, funds, requirements)
values (1111122, 111122 , 'Watch Matrix 4', '/Users/guodan/Desktop/5007project/src/main/webapp/uploaded/Watch Matrix 4.jpeg', '2022-01-22 15:40:00', '2022-01-22 18:00:00', 'Golden Village Vivo City', 'Watch Matrix 4', 2, 50, 'Matrix fans');

insert into application (application_id, applicant_id, activity_id, comments, application_status)
values (11111111, 111115, 1111112, 'Also working on IT5007', 'approved');

insert into application (application_id, applicant_id, activity_id, comments, application_status)
values (11111112, 111116, 1111112, 'Me too', 'approved');

insert into application (application_id, applicant_id, activity_id, comments, application_status)
values (11111113, 111113, 1111117, 'Macritchie is great', 'applying');

insert into application (application_id, applicant_id, activity_id, comments, application_status)
values (11111114, 111114, 1111111, 'I love rollar-coaster!', 'approved');

insert into application (application_id, applicant_id, activity_id, comments, application_status)
values (11111115, 111118, 1111111, 'Want to make friendes', 'denied');

insert into application (application_id, applicant_id, activity_id, comments, application_status)
values (11111116, 111119, 1111117, 'Can I bring my mother?', 'denied');

insert into application (application_id, applicant_id, activity_id, comments, application_status)
values (11111117, 111120, 1111112, 'I can help you', 'denied');

insert into application (application_id, applicant_id, activity_id, comments, application_status)
values (11111118, 111121, 1111117, 'I am good at walking', 'approved');

insert into application (application_id, applicant_id, activity_id, comments, application_status)
values (11111119, 111116, 1111111, 'Can you take me?', 'applying');

insert into application (application_id, applicant_id, activity_id, comments, application_status)
values (11111120, 111111, 1111114, 'Malaysia is great!', 'approved');

insert into application (application_id, applicant_id, activity_id, comments, application_status)
values (11111121, 111111, 1111122, 'I love Matrix!','approved');



