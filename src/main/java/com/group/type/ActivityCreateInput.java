package com.group.type;

import lombok.Data;

@Data
public class ActivityCreateInput {
    private String activityName;
    private String imageUrl;
    private String startTime;
    private String endTime;
    private String location;
    private String description;
    private int numOfParticipants;
    private int funds;
    private String requirements;
}
