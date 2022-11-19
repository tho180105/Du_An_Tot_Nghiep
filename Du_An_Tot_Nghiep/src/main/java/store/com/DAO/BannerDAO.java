package store.com.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.Banner;



public interface BannerDAO extends JpaRepository<Banner, Integer>{
    
    @Query(value = "SELECT * FROM Banner WHERE GETDATE() BETWEEN StartDate AND EndDate", nativeQuery = true)
    List<Banner> findBannerByDate();
    
    @Query("SELECT p FROM Banner p WHERE p.bannerid = ?1")
    List<Banner> findByBannerId(Integer integer);
}
