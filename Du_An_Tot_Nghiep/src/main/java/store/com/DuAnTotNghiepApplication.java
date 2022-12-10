package store.com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

import store.com.Service.UserService;
@EnableScheduling
@SpringBootApplication
public class DuAnTotNghiepApplication {

	public static void main(String[] args) {
	 SpringApplication.run(DuAnTotNghiepApplication.class, args);

	}

}

