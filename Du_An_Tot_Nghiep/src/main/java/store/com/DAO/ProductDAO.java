package store.com.DAO;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import store.com.Entity.AdditionalImages;
import store.com.Entity.Product;



public interface ProductDAO extends JpaRepository<Product, Integer>{
//	@Query("SELECT p FROM Product p WHERE p.category.categoryid = ?1 AND (p.sellingprice BETWEEN ?2 AND ?3)")
//	Page<Product> findByCategoryIdAndByPrice(Integer integer, float minPrice, float maxPrice, Pageable page);

//	@Query("SELECT p FROM Product p WHERE p.category.categoryid = ?1 order by p.productid asc")
//    Page<Product> findCategoryId(Integer integer ,Pageable page);
	
//	@Query("SELECT p FROM Product p WHERE p.category.categoryid = ?1")
//    List<Product> findByCategoryId1(Integer integer);
	
//	@Query(value="SELECT * FROM Product", nativeQuery = true)
//    List<Product> FindAll(Pageable page);

//	@Query("SELECT p FROM Product p ORDER BY ?1 ")
//	Page<Product> findAllSort(String string ,Pageable page);

//	@Query("SELECT p FROM Product p WHERE p.sellingprice BETWEEN ?1 AND ?2")
//    Page<Product> findAllByPrice(float minPrice, float maxPrice, Pageable page);

	@Query("SELECT p FROM AdditionalImages p WHERE p.product.productid = ?1")
	List<AdditionalImages> findByImage(Integer integer);
	
	@Query("SELECT count(p.productid) FROM Product p")
    Integer getCount();
	

	@Query("select p from Product p where p.category.categoryid = ?1")
    List<Product> findByCategoryId(Integer integer);
	
	
	//Count Comment
	@Query(value = "SELECT COUNT(RateId) FROM Rate WHERE ProductId = ?1", nativeQuery = true)
	Integer countCommentProduct (Integer productId);

	//Find Product By Price
	@Query("select p from Product p where p.sellingprice >= ?1 and p.sellingprice <= ?2")
	List<Product> findProductByPrice(float sellingprice1, float sellingprice2);

	@Query("select p from Product p where p.productname like ?1 ")
	List<Product> findProductByName(String name);
}
