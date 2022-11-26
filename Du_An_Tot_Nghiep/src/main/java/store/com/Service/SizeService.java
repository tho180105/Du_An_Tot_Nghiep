package store.com.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import store.com.Entity.Size;

@Service
public interface SizeService {
    public List<Size> findAll() ;

    public Size findById(String id) ;

    public Size create(Size size) ;

    public Size update(Size size) ;

    public void delete(String id) ;
}
