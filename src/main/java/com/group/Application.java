package com.group;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@EnableAutoConfiguration // Enable automatic configuration. Initialize the Spring environment
@ComponentScan // The package and subpackages of the current entry class (com.group and its subpackages)
public class Application {
    public static void main(String[] args) {
        // Used to start the SpringBoot application
        // Parameter 1: the entry class object parameter 2: the main function parameter
        SpringApplication.run(Application.class, args);

    }
}
