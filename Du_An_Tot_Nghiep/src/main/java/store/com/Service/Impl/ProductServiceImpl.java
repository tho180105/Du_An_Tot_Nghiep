package store.com.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import store.com.DAO.ProductDAO;
import store.com.Entity.Product;
import store.com.Service.ProductService;



@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	ProductDAO productDao;

	@Override
	public List<Product> findAll() {
		return productDao.findAll();
	}

	@Override
	public Product findById(Integer id) {
		
		return productDao.findById(id).get();
	}

	@Override
	public Product create(Product product) {
		
		return productDao.save(product);
	}

	@Override
	public Product update(Product product) {
		
		return productDao.save(product);
	}

	@Override
	public void delete(Integer id) {
		productDao.deleteById(id);

	}

    @Override
    public List<Product> findByCategoryId(Integer cid) {
        return  productDao.findByCategoryId(cid);
    }

	
}
