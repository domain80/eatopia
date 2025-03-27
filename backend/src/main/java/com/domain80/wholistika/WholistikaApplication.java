package com.domain80.wholistika;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;


@SpringBootApplication
public class WholistikaApplication {


	@Bean
	public static CommandLineRunner logApplicationProps(ApplicationContext ctx) {
		return args -> {
			System.out.printf(""" 
                            
                            ------------------------------------------------
                            Application:\t %s
                            started on: \t http://%s:%s
                            with DB_Url:\t %s
                            
                            active Profile:\t %s
                            ------------------------------------------------ 
                            
                            """,
					ctx.getEnvironment().getProperty("spring.application.name"),
					ctx.getEnvironment().getProperty("server.address"),
					ctx.getEnvironment().getProperty("server.port"),
					ctx.getEnvironment().getProperty("spring.datasource.url"),
					Arrays.stream(ctx.getEnvironment().getActiveProfiles()).toList().getLast()
			);
		};
	}


	public static void main(String[] args) {
		SpringApplication.run(WholistikaApplication.class, args);
	}

}
