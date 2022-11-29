package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.CategoryDAO;
import store.com.Entity.Category;
import store.com.Service.CategoryService;

@RestController
//@RequestMapping("/rest/cate")
public class CategoryRestController {
    @Autowired
    CategoryDAO categoryDAO;
    
    @GetMapping("/rest/cate/findAll")
    public List<Category> findAllCate(){
        return categoryDAO.findAll();
    }
    @GetMapping("/rest/cate/count")
    public Integer count(){
        return categoryDAO.getCount();
    }
    @Autowired
    CategoryService categoryService;
    
    @GetMapping("/rest/categorys/{id}")
    public Category getOne(@PathVariable("id") Integer id) {
        return categoryService.findById(id);
    }
    
    @GetMapping("/rest/categorys")
    public List<Category> getAll() {
        return categoryService.findAll();
    }
    
    @PostMapping("/rest/categorys")
    public Category save(@RequestBody Category category) {
        return categoryService.create(category);
    }
    
    @PutMapping("/rest/categorys/{id}")
    public Category update(@PathVariable("id") Integer id ,@RequestBody Category category) {
        return categoryService.update(category);
    }
    
    @DeleteMapping("/rest/categorys/{id}")
    public void delete(@PathVariable("id") Integer id) {
    	categoryService.delete(id);
    }

    
}
