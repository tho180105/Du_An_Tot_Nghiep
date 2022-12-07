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

import store.com.DAO.DetailCartDAO;
import store.com.DAO.ProductRepositoryDAO;
import store.com.Entity.DetailCart;
import store.com.Entity.ProductRepository;
import store.com.Service.ProductService;
import store.com.Service.RepositoryService;

@RestController
//@RequestMapping("/rest/productrepository")
public class ProductRepositoryRestController {
	@Autowired
	ProductRepositoryDAO dao;

	@GetMapping("/rest/productrepository")
	public List<ProductRepository> getDetailCart() {
		return dao.findAll();
	}
	
	@Autowired
    RepositoryService repositoryService;
    
    @GetMapping("/rest/repositorys/{id}")
    public ProductRepository getOne(@PathVariable("id") Integer id) {
        return repositoryService.findById(id);
    }
    
    @GetMapping("/rest/repositorys")
    public List<ProductRepository> getAll() {
        return repositoryService.findAll();
    }
    
    @PostMapping("/rest/repositorys")
    public ProductRepository save(@RequestBody ProductRepository product) {
        return repositoryService.create(product);
    }
    
    @PutMapping("/rest/repositorys/{id}")
    public ProductRepository update(@PathVariable("id") Integer id ,@RequestBody ProductRepository product) {
        return repositoryService.update(product);
    }
    
    @DeleteMapping("/rest/repositorys/{id}")
    public void delete(@PathVariable("id") Integer id) {
        repositoryService.delete(id);
    }

    @GetMapping("/rest/productrepository/{productid}/{sizeid}")
    public ProductRepository getQtyProductRepository(@PathVariable("productid") Integer productid, @PathVariable("sizeid") String sizeid) {
        return dao.getQtyProductRepository(productid, sizeid);
    }

    @GetMapping("/rest/productrepository/{productid}")
    public Integer sumQuantity(@PathVariable("productid") Integer productid) {
        return dao.sumQuantity(productid);
    }

    @GetMapping("/rest/findproductrepository/{productid}/{sizeid}")
    public ProductRepository getOneProductRepo(@PathVariable("productid") Integer productid, @PathVariable("sizeid") String sizeid) {
        return dao.findProductRepositoriesByProductId(productid, sizeid);
    }
}
