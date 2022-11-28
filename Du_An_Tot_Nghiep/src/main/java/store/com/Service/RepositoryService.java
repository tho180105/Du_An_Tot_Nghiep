package store.com.Service;

import java.util.List;

import store.com.Entity.ProductRepository;

public interface RepositoryService {
	public List<ProductRepository> findAll() ;
	
	public ProductRepository findById(Integer id) ;

	public ProductRepository create(ProductRepository repository) ;

	public ProductRepository update(ProductRepository productRepository) ;

    public void delete(Integer id) ;

}
