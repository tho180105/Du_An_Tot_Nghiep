package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import store.com.DAO.AccountDAO;
import store.com.Entity.Account;
import store.com.Entity.UserLogin;
import store.com.Service.AccountService;
import store.com.Service.UserService;
import store.com.controller.LoginController;

@RestController
@RequestMapping("/rest/account")
public class AccountRestController {
    @Autowired
    AccountService accountService;
    @Autowired
    AccountDAO dao;
//    @Autowired
//    AuthenticationManager authen1;
    BCryptPasswordEncoder pe = new BCryptPasswordEncoder();

    
    @GetMapping("/getone")
    public Account getOne(Authentication auth) {
        return accountService.findById(auth.getName());
    }

    @PutMapping()
    public Account update(@RequestBody Account account){
        return accountService.update(account);
    }

    @GetMapping()
    public List<Account> getAll() {
        return accountService.findAll();
    }

    @GetMapping("{id}")
    public List<Account> getAllByRoleId(@PathVariable("id") String roleId) {
        return dao.findbyRoleid(roleId);
    }

    @GetMapping("/authorities")
    public List<Account> getAll(Authentication auth) {
//        Account acc = accountService.findById(auth.getName());
//        UserService userService = new UserService();
//        UserDetails userDetails = userService .loadUserByUsername(auth.getName());
//        UsernamePasswordAuthenticationToken authReq
//                = new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword());
//        Authentication auth1 = authen1.authenticate(authReq);
//        SecurityContext sc = SecurityContextHolder.getContext();
//        sc.setAuthentication(auth1);
        return accountService.findAll();
    }

    @GetMapping("/check")
    public boolean check(Authentication auth) {
        Account acc = accountService.findById(auth.getName());
        System.out.println(acc.getRole().getRoleid());
        if(acc.getRole().getRoleid().equals("3")){
            return true;
        }
       return false;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        dao.deleteById(id);
    }
    
    @PutMapping("/Change-Pass/{passwordNew}")
    public boolean changePass(@RequestBody Account account,@PathVariable("passwordNew") String passwordNew) {
        boolean flag = false;
        System.err.println(account.getPassword());
        System.err.println(passwordNew);
        Account check = accountService.findById(account.getAccountid());
        if(pe.matches(account.getPassword(), check.getPassword())) {
            account.setPassword(pe.encode(passwordNew));
            accountService.update(account);
            flag = true;
            System.err.println(account.getPassword());
        }else {
            flag = false;
        }
        return flag;
    }

    @GetMapping("/findAll")
    public List<Account> findAll(){return dao.findAll();}

    @PostMapping("/authority")
    public Account authority(@RequestBody Account account){
        account.setPassword(pe.encode(account.getPassword()));
        return accountService.update(account);
    }

    @GetMapping("/userLogin")
    public Account userLogin(){
        if (UserLogin.account == null){
            return new Account();
        }
        String username = UserLogin.account.getAccountid();
        return accountService.findById(username);
    }

}
