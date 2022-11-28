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
import store.com.Entity.Style;
import store.com.Service.StyleService;

@RestController
//@RequestMapping("/rest/style")
public class StyleRestController {
//    @Autowired
//    StyleDAO sd;
//    @GetMapping("/count")
//    public Integer count() {
//        return sd.getCount();
//    }
    @Autowired
    StyleService styleService;
    
    @GetMapping("/rest/styles/{id}")
    public Style getOne(@PathVariable("id") Integer id) {
        return styleService.findById(id);
    }
    
    @GetMapping("/rest/styles")
    public List<Style> getAll() {
        return styleService.findAll();
    }
    
    @PostMapping("/rest/styles")
    public Style save(@RequestBody Style style) {
        return styleService.create(style);
    }
    
    @PutMapping("/rest/styles/{id}")
    public Style update(@PathVariable("id") Integer id ,@RequestBody Style style) {
        return styleService.update(style);
    }
    
    @DeleteMapping("/rest/styles/{id}")
    public void delete(@PathVariable("id") Integer id ) {
        styleService.delete(id);
    }
}
