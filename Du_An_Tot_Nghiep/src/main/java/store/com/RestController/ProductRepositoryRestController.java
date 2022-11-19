package store.com.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.ProductDAO;
import store.com.DAO.ProductRepositoryDAO;
import store.com.Entity.Product;
import store.com.Entity.ProductRepository;

@RestController
@RequestMapping("/rest/productrepository")
public class ProductRepositoryRestController {
    @Autowired
    ProductDAO productDAO;
    
	@Autowired
	ProductRepositoryDAO dao;

	@GetMapping
	public List<ProductRepository> getDetailCart() {
		return dao.findAll();
	}
	
//	@PutMapping
//	public DetailCart updateDetailCart(@RequestBody DetailCart detailCart) {
//		return dao.save(detailCart);
//	}
//	@DeleteMapping("/{id}")
//	public void deleteDetailCart(@PathVariable("id") int detailCartId) {
//		 dao.delete(dao.findById(detailCartId).get());
//	}
	
	@GetMapping("/{productid}/{sizeid}")
	public ProductRepository getQtyProductRepository(@PathVariable("productid") Integer productid, @PathVariable("sizeid") String sizeid) {
	    System.out.println(productid);

	    return dao.getQtyProductRepository(productid, sizeid);
	}
	
	@GetMapping("/rest/productRepository/{id}")
	public Product getOneProduct(@PathVariable("id") Integer productid) {
	    return productDAO.getById(productid);
	}
	
	@GetMapping("/{productid}")
    public Integer sumQuantity(@PathVariable("productid") Integer productid) {
        return dao.sumQuantity(productid);
    }
}
