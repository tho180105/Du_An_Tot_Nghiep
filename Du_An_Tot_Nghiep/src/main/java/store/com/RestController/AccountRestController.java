package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.AccountDAO;
import store.com.Entity.Account;
import store.com.Service.AccountService;
import store.com.controller.LoginController;

@RestController
@RequestMapping("/rest/account")
public class AccountRestController {
    @Autowired
    AccountService accountService;
    @Autowired
    AccountDAO dao;
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
    public List<Account> getAll(Authentication auth) {
        return accountService.findAll();
    }

    @GetMapping("{id}")
    public List<Account> getAllByRoleId(@PathVariable("id") String roleId) {
        return dao.findbyRoleid(roleId);
    }

    @GetMapping("/authorities")
    public List<Account> getAll() {
        return accountService.findAll();
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

}
