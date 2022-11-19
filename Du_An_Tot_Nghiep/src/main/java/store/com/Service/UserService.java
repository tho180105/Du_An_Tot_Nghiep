package store.com.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import store.com.Entity.Account;
@Service
public class UserService implements UserDetailsService{
	@Autowired
	AccountService accountService;
	@Autowired
	BCryptPasswordEncoder pe;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			Account account = accountService.findById(username);
			String password = account.getPassword();
			String role = account.getRole().getRoleid();
			return User.withUsername(username).password(password).roles(role).build();
		} catch (Exception e) {
			
			throw new UsernameNotFoundException(username+" not found");
		}
	}
	
	public  void loginFromOAuth2(OAuth2AuthenticationToken oauth2) {
		//String name = oauth2.getPrincipal().getAttribute("name");
		String email = oauth2.getPrincipal().getAttribute("email");
		String password = Long.toHexString(System.currentTimeMillis());
		UserDetails user  = User.withUsername(email).password(pe.encode(password))
				.roles("1").build();
		Authentication auth = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(auth);
	}
}
