package store.com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import store.com.Service.UserService;

@ConditionalOnBean(UserService.class)
@Configuration
@EnableWebSecurity
public class SecurityConfig  extends WebSecurityConfigurerAdapter{
	@Autowired
	UserService userService;
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService).passwordEncoder(getPasswordEncoder());
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.authorizeRequests()
			.antMatchers("/order/**","/account/**","/listorder/**").authenticated()
			.antMatchers("/admin/**").hasAnyRole("2","3")
			.antMatchers("/rest/account/authorities").hasRole("3")
			.anyRequest().permitAll();
		
		http.formLogin()
			.loginPage("/security/login/form")
			.loginProcessingUrl("/security/login")
			.defaultSuccessUrl("/security/login/success",false)
			.failureUrl("/security/login/error");
		
		
		http.exceptionHandling()
		.accessDeniedPage("/security/unauthoried");
		
		http.logout()
			.logoutUrl("/logoff")
			.logoutSuccessUrl("/security/logoff/success");
		

		http.rememberMe().key("uniqueAndSecret").tokenValiditySeconds(30*24*60*60);
		
		http.oauth2Login()
		.loginPage("/security/login/form")
		.defaultSuccessUrl("/oauth2/login/success",true)
		.failureUrl("/security/login/error")
		.authorizationEndpoint()
			.baseUri("/oauth2/authorization");
	}
	
	@Bean
	public BCryptPasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder(); 
	}
	
}
