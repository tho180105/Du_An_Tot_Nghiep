package store.com.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import store.com.DAO.CategoryDAO;
import store.com.Entity.Category;
import store.com.Service.CategoryService;
@Service
public class CategoryServiceImpl implements CategoryService{
    
    @Autowired
    CategoryDAO dao;
     
    @Override
    public List<Category> findAll() {
        // TODO Auto-generated method stub
        return dao.findAll();
    }

    @Override
    public Category findById(Integer id) {
        // TODO Auto-generated method stub
        return dao.findById(id).get();
    }

    @Override
    public Category create(Category category) {
        // TODO Auto-generated method stub
        return dao.save(category);
    }

    @Override
    public Category update(Category category) {
        // TODO Auto-generated method stub
        return dao.save(category);
    }

    @Override
    public void delete(Integer id) {
        // TODO Auto-generated method stub
        dao.deleteById(id);
    }



}
