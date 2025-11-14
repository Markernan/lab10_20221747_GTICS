package com.example.lab10_20221747_gtics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Lab1020221747GticsApplication {

    public static void main(String[] args) {
        SpringApplication.run(Lab1020221747GticsApplication.class, args);
        app.setWebApplicationType(WebApplicationType.REACTIVE);
        SpringApplication.run(Web.class, args);
    }

}
