package store.com.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.ProductDiscount;

public interface ProductDiscountDAO extends JpaRepository<ProductDiscount, Integer>{
    
//    @Query(value = "SELECT * FROM ProductDiscount WHERE GETDATE() BETWEEN StartDate AND EndDate", nativeQuery = true)
//    List<ProductDiscount> findByDate();
    
    @Query(value = "SELECT *\r\n"
            + "FROM ProductDiscount \r\n"
            + "WHERE CAST(REPLACE(CONVERT(date, GETDATE()),'-','') AS INT) BETWEEN CAST(REPLACE(CONVERT(date, StartDate),'-','') AS INT) AND CAST(REPLACE(CONVERT(date, EndDate),'-','') AS INT)", nativeQuery = true)
    List<ProductDiscount> findByDate();
    
    @Query("SELECT p FROM ProductDiscount p WHERE p.productdiscountid = ?1")
    List<ProductDiscount> findByProductId(Integer integer);
    
    @Query("SELECT p FROM ProductDiscount p where p.product.style.styleid = ?1")
    List<ProductDiscount> findProductDiscountByStyleId(Integer integer);
}
