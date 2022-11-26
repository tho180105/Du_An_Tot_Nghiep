package store.com.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import store.com.DAO.ProductRepositoryDAO;
import store.com.Entity.ProductRepository;
import store.com.Service.RepositoryService;




@Service
public class RepositoryServiceImpl implements RepositoryService {

    @Autowired
    ProductRepositoryDAO dao;
    @Override
    public List<ProductRepository> findAll() {
        // TODO Auto-generated method stub
        return dao.findAll();
    }

    @Override
    public ProductRepository findById(Integer id) {
        // TODO Auto-generated method stub
        return dao.getById(id);
    }

    @Override
    public ProductRepository create(ProductRepository repository) {
        // TODO Auto-generated method stub
        return dao.save(repository);
    }

    @Override
    public ProductRepository update(ProductRepository repository) {
        // TODO Auto-generated method stub
        return dao.save(repository);
    }

    @Override
    public void delete(Integer id) {
        dao.deleteById(id);
        
    }

  
	
	
}
