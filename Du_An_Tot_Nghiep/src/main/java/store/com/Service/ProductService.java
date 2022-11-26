package store.com.Service;

import java.util.List;

import store.com.Entity.Product;

public interface ProductService {
	public List<Product> findAll() ;
	
	public Product findById(Integer id) ;

	public List<Product> findByCategoryId(Integer cid) ;

	public Product create(Product product) ;

	public Product update(Product product) ;

	public void delete(Integer id) ;
}
