package store.com.controller;



import javax.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import store.com.DAO.AccountDAO;
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
	@RequestMapping("/security/login/form")
	public String login(Model model) {
		return "security/login";
	}
	
	@RequestMapping("/security/login/success")
	public String success(Model model,Authentication auth){
		if(cookie.get("remember-me")!=null) {
			Cookie acc = cookie.get("JSESSIONID");
			cookie.add("JSESSIONID", acc.getValue(), 24*30);
			cookie.remove("remember-me");
		}
		model.addAttribute("message", "Đăng nhập thành công");
		return "security/login";
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
		return "security/login";
	}
	
	@RequestMapping("/admin/test") 
	public String test(Model model) {
		return "home/home";
	}
	
}
