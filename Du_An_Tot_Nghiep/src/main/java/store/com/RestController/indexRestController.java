package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.ProductDiscountDAO;
import store.com.Entity.ProductDiscount;

@CrossOrigin("*")
@RestController
public class indexRestController {
    
    @Autowired
    ProductDiscountDAO dao;
    
    @GetMapping("/rest/findProductDiscountByStyle/{id}")
    public List<ProductDiscount> getproductByStyle(@PathVariable("id") Integer styleid) {
        return dao.findProductDiscountByStyleId(styleid);
    }
}
