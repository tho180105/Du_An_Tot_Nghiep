package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.CategoryDAO;
import store.com.DAO.ProductDAO;
import store.com.DAO.ProductDiscountDAO;
import store.com.Entity.Category;
import store.com.Entity.Product;
import store.com.Entity.ProductDiscount;

@CrossOrigin("*")
@RestController
public class ProductDiscountRestcontroller {
    
    @Autowired
    ProductDiscountDAO pdDAO;
    
    @Autowired
    CategoryDAO cateDAO;
    
    @Autowired
    ProductDAO proDAO;
    
    @GetMapping("/rest/productdiscount")
    public List<ProductDiscount> getAll() {
        return pdDAO.findByDate();
    }
    
    @GetMapping("/rest/productdiscount/{id}")
    public List<ProductDiscount> getOne(@PathVariable("id") Integer productdiscountid) {
        return pdDAO.findByProductId(productdiscountid);
    }
    
    @PostMapping("/rest/productdiscount")
    public ProductDiscount save(@RequestBody ProductDiscount productdiscount) {
        System.out.println(productdiscount);
        return pdDAO.save(productdiscount);
    }
    
    
    @PutMapping("/rest/productdiscount/{id}")
    public ProductDiscount update(@PathVariable("id") Integer productdiscountid, @RequestBody ProductDiscount productdiscount) {
        return pdDAO.save(productdiscount);
    }
    
    @DeleteMapping("/rest/productdiscount/{id}")
    public void delete(@PathVariable("id") Integer productdiscountid) {
        pdDAO.deleteById(productdiscountid);
    }
    
    @GetMapping("/rest/categoryAll")
    public List<Category> getAllCategory() {
        return cateDAO.findAll();
    }
    
    @GetMapping("/rest/searchByCategory/{id}")
    public List<Product> getproductByCategory(@PathVariable("id") Integer categoryid) {
        return proDAO.findByCategoryId(categoryid);
    }
    
    
    
    
}
