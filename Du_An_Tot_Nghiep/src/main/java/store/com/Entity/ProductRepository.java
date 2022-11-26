package store.com.Entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name="Productrepository")
public class ProductRepository implements Serializable{
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	Integer productrepositoryid;
	Integer quantity;
	@JsonIgnore
	@OneToMany(mappedBy = "productrepository")
	List<DetailCart> detailCarts;
	@JsonIgnore
	@OneToMany(mappedBy = "productrepository")
	List<DetailOrder> detailOrders;
	
	@ManyToOne
	@JoinColumn(name = "sizeid")
	Size size;
	@ManyToOne
	@JoinColumn(name = "productid")
	Product product;
	public Integer getProductrepositoryid() {
		return productrepositoryid;
	}
	public void setProductrepositoryid(Integer productrepositoryid) {
		this.productrepositoryid = productrepositoryid;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	@JsonIgnore
	public List<DetailCart> getDetailCarts() {
		return detailCarts;
	}
	public void setDetailCarts(List<DetailCart> detailCarts) {
		this.detailCarts = detailCarts;
	}
	@JsonIgnore
	public List<DetailOrder> getDetailOrders() {
		return detailOrders;
	}
	public void setDetailOrders(List<DetailOrder> detailOrders) {
		this.detailOrders = detailOrders;
	}
	public Size getSize() {
		return size;
	}
	public void setSize(Size size) {
		this.size = size;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public ProductRepository(Integer productrepositoryid, Integer quantity, List<DetailCart> detailCarts,
			List<DetailOrder> detailOrders, Size size, Product product) {
		super();
		this.productrepositoryid = productrepositoryid;
		this.quantity = quantity;
		this.detailCarts = detailCarts;
		this.detailOrders = detailOrders;
		this.size = size;
		this.product = product;
	}
	public ProductRepository() {
		super();
	}
	
	
}
