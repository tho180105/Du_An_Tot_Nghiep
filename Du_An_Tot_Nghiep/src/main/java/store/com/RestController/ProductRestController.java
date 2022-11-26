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

import store.com.DAO.ProductDAO;
import store.com.Entity.Product;
import store.com.Service.ProductService;

@RestController
//@RequestMapping("/rest/product")
public class ProductRestController {
    @Autowired
    ProductDAO pd;

    @GetMapping("/count")
    public Integer count() {
        return pd.getCount();
    }
    
    @Autowired
    ProductService productService;
    
    @GetMapping("/rest/products/{id}")
    public Product getOne(@PathVariable("id") Integer id) {
        return productService.findById(id);
    }
    
    @GetMapping("/rest/products")
    public List<Product> getAll() {
        return productService.findAll();
    }
    
    @PostMapping("/rest/products")
    public Product save(@RequestBody Product product) {
        return productService.create(product);
    }
    
    @PutMapping("/rest/products/{id}")
    public Product update(@PathVariable("id") Integer id ,@RequestBody Product product) {
        return productService.update(product);
    }
    
    @DeleteMapping("/rest/products/{id}")
    public void delete(@PathVariable("id") Integer id) {
        pd.deleteById(id);
    }
}
