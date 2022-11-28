package store.com.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import store.com.DAO.SizeDAO;
import store.com.DAO.StyleDAO;
import store.com.Entity.Size;
import store.com.Entity.Style;
import store.com.Service.SizeService;
import store.com.Service.StyleService;
@Service
public class SizeServiceImpl implements SizeService{
    @Autowired
    SizeDAO sizeDAO;

    @Override
    public List<Size> findAll() {
        // TODO Auto-generated method stub
        return sizeDAO.findAll();
    }

    @Override
    public Size findById(String id) {
        // TODO Auto-generated method stub
        return sizeDAO.getById(id);
    }

    @Override
    public Size create(Size size) {
        // TODO Auto-generated method stub
        return sizeDAO.save(size);
    }

    @Override
    public Size update(Size size) {
        // TODO Auto-generated method stub
        return sizeDAO.save(size);
    }

    @Override
    public void delete(String id) {
       sizeDAO.deleteById(id);
        
    }
    

}
