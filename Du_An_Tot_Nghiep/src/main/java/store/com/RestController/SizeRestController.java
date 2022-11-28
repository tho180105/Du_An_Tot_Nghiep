package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.StyleDAO;
import store.com.Entity.Size;
import store.com.Service.SizeService;
import store.com.Service.StyleService;

@RestController
public class SizeRestController {

    @Autowired
    SizeService service;
    
    @GetMapping("/rest/sizes/{id}")
    public Size getOne(@PathVariable("id") String id) {
        return service.findById(id);
    }
    
    @GetMapping("/rest/sizes")
    public List<Size> getAll() {
        return service.findAll();
    }
    
    @PostMapping("/rest/sizes")
    public Size save(@RequestBody Size size) {
        return service.create(size);
    }
    
    @PutMapping("/rest/sizes/{id}")
    public Size update(@PathVariable("id") String id ,@RequestBody Size size) {
        return service.update(size);
    }
    
    @DeleteMapping("/rest/sizes/{id}")
    public void delete(@PathVariable("id") String id ) {
        service.delete(id);
    }
}
