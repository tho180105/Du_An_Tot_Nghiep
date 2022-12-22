package store.com.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import store.com.Service.SessionService;

@RestController
@RequestMapping("/rest/login")
public class LoginRestController {

    @Autowired
    SessionService se;

    @GetMapping()
    public Boolean alertLogin(){
        boolean check = false;
        if(se.get("LoginSuccess") != null){
            check = true;
            se.set("LoginSuccess", null);
        }
        return check;
    }
}
