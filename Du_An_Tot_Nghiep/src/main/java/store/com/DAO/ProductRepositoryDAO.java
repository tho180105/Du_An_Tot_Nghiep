package store.com.DAO;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.ProductRepository;

public interface ProductRepositoryDAO extends JpaRepository<ProductRepository, Integer>{
    
    @Query("Select pr from ProductRepository pr where pr.product.productid = ?1 and pr.size.sizeid = ?2")
    ProductRepository getQtyProductRepository(Integer productid, String sizeid);
    
    @Query("select p from ProductRepository p where p.product.productid = ?1")
    List<ProductRepository> findByProductId(Integer productid);
    
    @Query("select sum(p.quantity) from ProductRepository p where p.product.productid = ?1")
    Integer sumQuantity(Integer productid);
}
