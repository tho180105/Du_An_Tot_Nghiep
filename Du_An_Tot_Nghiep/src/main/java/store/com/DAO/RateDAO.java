package store.com.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.Rate;

public interface RateDAO extends JpaRepository<Rate, Integer>{
    
    @Query(value = "SELECT TOP 5 * FROM Rate WHERE ProductId = ?1 order by RateDate desc", nativeQuery = true)
    List<Rate> findTop5ByProduct(Integer product);
    
    @Query("SELECT r FROM Rate r WHERE r.product.productid = ?1 order by ratedate desc")
    List<Rate> findByProduct(Integer product);
}
