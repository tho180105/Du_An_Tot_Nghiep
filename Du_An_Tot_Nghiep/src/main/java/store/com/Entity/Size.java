package store.com.Entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
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
public class Size implements Serializable{
	@Id
	String sizeid;
	String describe;
	@JsonIgnore
	@OneToMany(mappedBy = "size")
	List<ProductRepository> productRepositories;
	public Size(String sizeid, String describe) {
		super();
//		, List<ProductRepository> productRepositories
		this.sizeid = sizeid;
		this.describe = describe;
//		ProductRepositories = productRepositories;
	}
	public Size() {
		super();
	}
	public String getSizeid() {
		return sizeid;
	}
	public void setSizeid(String sizeid) {
		this.sizeid = sizeid;
	}
	public String getDescribe() {
		return describe;
	}
	public void setDescribe(String describe) {
		this.describe = describe;
	}
//	public List<ProductRepository> getProductRepositories() {
//		return ProductRepositories;
//	}
//	public void setProductRepositories(List<ProductRepository> productRepositories) {
//		ProductRepositories = productRepositories;
//	}
	
	
}
