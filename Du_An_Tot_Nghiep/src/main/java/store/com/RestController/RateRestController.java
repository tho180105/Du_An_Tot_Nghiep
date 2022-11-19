package store.com.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.RateDAO;
import store.com.Entity.Rate;

@CrossOrigin("*")
@RestController
public class RateRestController {
    
    @Autowired
    RateDAO dao;
    
    @PostMapping("/rest/Rate")
    public Rate save(@RequestBody Rate rate) {
        return dao.save(rate);
    }
}
