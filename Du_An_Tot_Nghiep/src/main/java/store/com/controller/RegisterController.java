package store.com.controller;

import java.time.LocalDateTime;
import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import store.com.DAO.RegistrationDAO;
import store.com.Entity.Account;
import store.com.Entity.Registration;
import store.com.Entity.Role;
import store.com.Service.AccountService;
import store.com.Service.MailerService;
import store.com.Service.RegistrationService;
import store.com.Service.SessionService;

@Controller
public class RegisterController {
    @Autowired
    BCryptPasswordEncoder pe;
	
	@Autowired
	AccountService accService;
	@Autowired
	MailerService mailer;
	Account acc;
	@Autowired
	SessionService session;
	
	@Autowired
	RegistrationDAO rdao;
	@Autowired
	RegistrationService registrationService;
	
	@RequestMapping("register/form")
	public String form(Model model) {
	    List<Account> list123;
		acc= new Account();
		model.addAttribute("sv", acc);
		return "security/register";
	}
	
	
	@PostMapping("register/check")
	public String success(Model model, @Validated @ModelAttribute("sv") Account account, Errors errors, @RequestParam("confirmpass") String confirmPass) throws MessagingException {
		if (errors.hasErrors()) {
			return "security/register";
		}
		try {
			Account checkAcc = accService.findById(account.getAccountid());
			model.addAttribute("message", "Tài khoản đã tồn tại");
			return "forward:/register/form";
		} catch (Exception e) {
			if(!account.getPassword().equals(confirmPass)) {
				model.addAttribute("message", "Xác nhận mật khẩu không chính xác!");
				return "forward:/register/form";
			}
			List<Account> checkAcc = accService.findAll();
			for(Account listAcc: checkAcc){
				if(listAcc.getEmail() ==null){
					listAcc.setEmail("");
				}
				if(listAcc.getEmail().equals(account.getEmail())){
					model.addAttribute("message", "Email đã tồn tại");
					return "forward:/register/form";
				}
			}
			account.setPassword(pe.encode(confirmPass));
			registrationService.register(account);
            return "redirect:/check";
		}
	}

	@RequestMapping("check")
	public String test() {
	    return "security/checkEmail";
	}
	
	@GetMapping("registration/confirm")
    public String confirm(@RequestParam("token") String token,Model model) {
	    Registration registration = rdao.findByToken(token).orElse(null);
	    if(registration==null) {
	        return "redirect:/registration/fail1";
	    }
	    
	    LocalDateTime expiredAt = registration.getExpiresat();
	    if(expiredAt.isBefore(LocalDateTime.now())) {
	        return "redirect:/registration/fail2";
	    }else {
	        System.out.println("đúng");
	    }
	    Account acc = new Account();
	    acc.setEmail(registration.getEmail());
	    acc.setPassword(registration.getPassword());
	    acc.setAccountid(registration.getAccountid());
	    Role role = new Role();
	    role.setRoleid("1");
	    acc.setRole(role);
	    accService.create(acc);
	    rdao.delete(registration);
        return "redirect:/registration/success";
    }
	
	
	@RequestMapping("registration/fail1")
	public String fail1(Model model) {
	    model.addAttribute("message", "Đăng ký thất bại");
	    return "security/confirm-Email";
	}
	
	@RequestMapping("registration/fail2")
    public String fail2(Model model) {
        model.addAttribute("message", "Đã hết thời gian kích hoạt tài khoản vui lòng đăng ký lại");
        return "security/confirm-Email";
    }
	
	@RequestMapping("registration/success")
    public String success(Model model) {
        model.addAttribute("message", "Đăng ký thành công");
        return "security/confirm-Email";
    }
	
	
	@RequestMapping("/account")
	public String account(Model model,Authentication auth) {
	    model.addAttribute("sv", accService.findById(auth.getName()));
	    return "user/account";
	}
	
	
}
