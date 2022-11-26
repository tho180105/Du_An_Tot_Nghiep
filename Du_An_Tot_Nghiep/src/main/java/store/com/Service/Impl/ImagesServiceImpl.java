package store.com.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import store.com.DAO.AdditionalImagesDAO;
import store.com.Entity.AdditionalImages;
import store.com.Service.ImagesService;
@Service
public class ImagesServiceImpl implements ImagesService{
    
    @Autowired
    AdditionalImagesDAO dao;
     
    @Override
    public List<AdditionalImages> findAll() {
        // TODO Auto-generated method stub
        return dao.findAll();
    }

    @Override
    public AdditionalImages findById(Integer id) {
        // TODO Auto-generated method stub
        return dao.findById(id).get();
    }

    @Override
    public AdditionalImages create(AdditionalImages img) {
        // TODO Auto-generated method stub
        return dao.save(img);
    }

    @Override
    public AdditionalImages update(AdditionalImages img) {
        // TODO Auto-generated method stub
        return dao.save(img);
    }

    @Override
    public void delete(Integer id) {
        // TODO Auto-generated method stub
        dao.deleteById(id);
    }

    @Override
    public List<AdditionalImages> findByImagePath(Integer id) {
        // TODO Auto-generated method stub
        return dao.findByImagePath(id);
    }




}
