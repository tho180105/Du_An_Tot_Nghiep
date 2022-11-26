package store.com.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import store.com.DAO.StyleDAO;
import store.com.Entity.Style;
import store.com.Service.StyleService;
@Service
public class StyleServiceImpl implements StyleService{
    @Autowired
    StyleDAO styleDAO;
    
    @Override
    public List<Style> findAll() {
        // TODO Auto-generated method stub
        return styleDAO.findAll();
    }

    @Override
    public Style findById(Integer id) {
        // TODO Auto-generated method stub
        return styleDAO.getById(id);
    }

    @Override
    public Style create(Style style) {
        // TODO Auto-generated method stub
        return styleDAO.save(style);
    }

    @Override
    public Style update(Style style) {
        // TODO Auto-generated method stub
        return styleDAO.save(style);
    }

    @Override
    public void delete(Integer id) {
        styleDAO.deleteById(id);
        
    }

   

}
