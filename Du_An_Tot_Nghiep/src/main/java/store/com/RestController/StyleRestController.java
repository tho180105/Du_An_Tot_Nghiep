package store.com.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.StyleDAO;

@RestController
@RequestMapping("/rest/style")
public class StyleRestController {
    @Autowired
    StyleDAO sd;
    @GetMapping("/count")
    public Integer count() {
        return sd.getCount();
    }
}
