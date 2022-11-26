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
public class Style implements Serializable{
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	Integer styleid;
	String stylename;
	@JsonIgnore
	@OneToMany(mappedBy = "style")
	List<Product> products;
	public Integer getStyleid() {
		return styleid;
	}
	public void setStyleid(Integer styleid) {
		this.styleid = styleid;
	}
	public String getStylename() {
		return stylename;
	}
	public void setStylename(String stylename) {
		this.stylename = stylename;
	}
	public List<Product> getProducts() {
		return products;
	}
	public void setProducts(List<Product> products) {
		this.products = products;
	}
	public Style() {
		super();
	}
	public Style(Integer styleid, String stylename, List<Product> products) {
		super();
		this.styleid = styleid;
		this.stylename = stylename;
		this.products = products;
	}
}
