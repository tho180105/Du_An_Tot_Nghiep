package store.com.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.Category;

public interface CategoryDAO extends JpaRepository<Category, Integer>{
    @Query("SELECT count(c.categoryid) FROM Category c ")
    Integer getCount();
}
