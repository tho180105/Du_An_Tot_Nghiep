package store.com.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.AdditionalImages;

public interface AdditionalImagesDAO extends JpaRepository<AdditionalImages, Integer>{

	@Query("SELECT a FROM AdditionalImages a WHERE a.product.productid = ?1")
	List<AdditionalImages> findByImagePath(Integer productid);
}
