package store.com.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.Style;

public interface StyleDAO extends JpaRepository<Style, Integer>{
    @Query("SELECT count(c.styleid) FROM Style c ")
    Integer getCount();
}
