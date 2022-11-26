package store.com.Entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Data
@Getter
@Setter
@Entity 
@Table(name="Category")
public class Category implements Serializable{
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	Integer categoryid; 
	String categoryname;
	
	@JsonIgnore
	@OneToMany(mappedBy = "category")
	List<Product> products;
	
	public Integer getCategoryid() {
		return categoryid;
	}
	public void setCategoryid(Integer categoryid) {
		this.categoryid = categoryid;
	}
	public String getCategoryname() {
		return categoryname;
	}
	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}
	public List<Product> getProducts() {
		return products;
	}
	public void setProducts(List<Product> products) {
		this.products = products;
	}
	public Category() {
		super();
	}
	public Category(Integer categoryid, String categoryname, List<Product> products) {
		super();
		this.categoryid = categoryid;
		this.categoryname = categoryname;
		this.products = products;
	}
}
