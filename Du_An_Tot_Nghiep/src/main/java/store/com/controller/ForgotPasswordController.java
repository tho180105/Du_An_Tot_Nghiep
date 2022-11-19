package store.com.controller;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import store.com.Entity.Account;
import store.com.Service.AccountService;
import store.com.Service.MailerService;

@Controller
public class ForgotPasswordController {
    private static final String alpha = "abcdefghijklmnopqrstuvwxyz"; // a-z
    private static final String alphaUpperCase = alpha.toUpperCase(); // A-Z
    private static final String digits = "0123456789"; // 0-9
    private static final String ALPHA_NUMERIC = alpha + alphaUpperCase + digits;
    private static Random generator = new Random();

    @Autowired
	MailerService mailer;
    @Autowired
	AccountService accService;
    
    @RequestMapping("/forgotpassword/form")
    public String forgot(){
        System.out.println("random: "+randomAlphaNumeric());
        return "security/forgot-password";
    }

    @RequestMapping("/forgotpassword/check")
    public String check(Model model, @RequestParam("username") Optional<String> username, @RequestParam("email") Optional<String> email){
        boolean flag = true;
        if(username.orElse("").equals("")){
            model.addAttribute("checkUsername","Vui lòng nhập username");
            flag = false;
        }
        if(email.orElse("").equals("")){
            model.addAttribute("checkEmail","Vui lòng nhập email");
            flag = false;
        }
        if(!flag){
            return "security/forgot-password";
        }
        Account account;
        try {
            account = accService.findById(username.get());
            if(!account.getEmail().equals(email.get())){
                model.addAttribute("checkEmail","Email của bạn không chính xác!");
                return "security/forgot-password";
            }
            String passwordNew = randomAlphaNumeric();
            mailer.send(account.getEmail(), "Xác nhận Email ","Mật khẩu mới của bạn là :"+ passwordNew);
            account.setPassword(passwordNew);
            accService.update(account);
            model.addAttribute("message","Vui lòng kiểm tra Email của bạn!");
            return "security/forgot-password";
        } catch (Exception e) {
            model.addAttribute("checkUsername","Username không tồn tại");
            return "security/forgot-password";
        }
    }

    // code random
    public String randomAlphaNumeric() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int number = randomNumber(0, ALPHA_NUMERIC.length() - 1);
            char ch = ALPHA_NUMERIC.charAt(number);
            sb.append(ch);
        }
        return sb.toString();
    }

    public static int randomNumber(int min, int max) {
        return generator.nextInt((max - min) + 1) + min;
    }



    // xem list đơn hàng đã đặt
    @RequestMapping("/listorder")
    public String listOrder(Model model){

        return "/order/ListOrder";
    }

     // xem list đơn hàng đã đặt
     @RequestMapping("/detailorder/{id}")
     public String detailOrder(Model model,@PathVariable("id") String id){
 
         return "/order/DetailOrder";
     }
}
