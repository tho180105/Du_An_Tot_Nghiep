package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.RoleDAO;
import store.com.Entity.Role;

@RestController
@RequestMapping("/rest/role")
public class RoleRestController {
    @Autowired
    RoleDAO dao;

    @GetMapping()
    public List<Role> getAll(){
        return dao.findAll();
    }
}
