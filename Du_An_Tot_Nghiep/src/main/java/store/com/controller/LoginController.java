package store.com.controller;



import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import store.com.DAO.AccountDAO;
import store.com.Entity.Account;
import store.com.Entity.UserLogin;
import store.com.Service.CookieService;
import store.com.Service.SessionService;
import store.com.Service.UserService;

@Controller
public class LoginController {
	
	@Autowired
	AccountDAO dao;
	@Autowired
	CookieService cookie;
	@Autowired
	SessionService se;
	@Autowired
	BCryptPasswordEncoder getPasswordEncoder;

	@Autowired
	private ServletContext servletContext;

	UserLogin userLogin;
	
	@RequestMapping("/security/login/form")
	public String login(Model model,Authentication auth) {
	    if(auth == null) {
	        return "security/login";
	    }
	    return "redirect:/home";
	}
	
	@RequestMapping("/security/login/success")
	public String success(Model model,Authentication auth){
		if(auth == null) {
			return "redirect:/security/login/form";
		}
		if(cookie.get("remember-me")!=null) {
			Cookie acc = cookie.get("JSESSIONID");
			cookie.add("JSESSIONID", acc.getValue(), 24*30);
			cookie.remove("remember-me");
		}
		UserLogin.account = dao.getById(auth.getName());
		model.addAttribute("message", "Đăng nhập thành công");
		se.set("LoginSuccess", "Thành công");
		return "redirect:/home";
	}
	
	@RequestMapping("/security/login/error")
	public String error(Model model){
		model.addAttribute("message", "Sai thông tin đăng nhập");
		return "security/login";
	}
	@Autowired
	UserService userService;
	@RequestMapping("/oauth2/login/success")
	public String success2(OAuth2AuthenticationToken oauth2) {
		userService.loginFromOAuth2(oauth2);
		return "forward:/security/login/success";
	}
	
	@RequestMapping("/security/logoff/success")
	public String logoff(Model model) {
		model.addAttribute("message", "Đăng xuất thành công!");
		return "forward:/security/login/form";
	}
	
	@RequestMapping("/security/unauthoried")
	public String denied(Model model) {
		model.addAttribute("message", "Bạn không có quyển truy xuất!");
		return "security/confirm-Email";
	}
	
	@RequestMapping("/admin/test") 
	public String test(Model model) {
		return "home/home";
	}

}
