package store.com.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import store.com.Entity.AdditionalImages;
@Service
public interface ImagesService {
    public List<AdditionalImages> findAll() ;

    public AdditionalImages findById(Integer id) ;
    
    public  List<AdditionalImages> findByImagePath(Integer id) ;

    public AdditionalImages create(AdditionalImages img) ;

    public AdditionalImages update(AdditionalImages img) ;

    public void delete(Integer id) ;
}
