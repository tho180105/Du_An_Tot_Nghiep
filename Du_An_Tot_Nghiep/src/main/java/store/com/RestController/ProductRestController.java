package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.ProductDAO;
import store.com.Entity.Product;

@RestController
@RequestMapping("/rest/product")
public class ProductRestController {
    @Autowired
    ProductDAO pd;

    @GetMapping("/count")
    public Integer count() {
        return pd.getCount();
    }
    
    @GetMapping("/{productid}")
    public Product getOne(@PathVariable("productid") Integer productid) {
        return pd.findById(productid).get();
    }
    
    @GetMapping
    public List<Product> findAll() {
        return pd.findAll();
    }
    
    @GetMapping("/category/{categoryid}")
    public List<Product> findAllByCategory(@PathVariable("categoryid") Integer categoryid) {
        return pd.findByCategoryId1(categoryid);
    }
}
