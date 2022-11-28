package store.com.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import store.com.Entity.Style;

@Service
public interface StyleService {
    public List<Style> findAll() ;

    public Style findById(Integer id) ;

    public Style create(Style style) ;

    public Style update(Style style) ;

    public void delete(Integer id) ;
}
