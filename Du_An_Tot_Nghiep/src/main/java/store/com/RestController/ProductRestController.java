package store.com.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import store.com.DAO.CategoryDAO;
import store.com.DAO.ProductDAO;
import store.com.Entity.Product;

@RestController
@RequestMapping("/rest/product")
public class ProductRestController {
    @Autowired
    ProductDAO pd;

    @Autowired
    CategoryDAO cateDAO;

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

    @GetMapping("/list2")
    public List<Product> list1(Model model, @RequestParam("cid") Optional<Integer> cid , @RequestParam("p") Optional<Integer> p) {
        model.addAttribute("cates", cateDAO.findAll());
        if(cid.isPresent()){
            return pd.findByCategoryId(cid.get());
        }
        return pd.findAll();
    }

}
