package store.com.Entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@SuppressWarnings("serial")

@Entity 
@Table(name="Detailorder")
public class DetailOrder implements Serializable{
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	Integer detailorderid;
	Float productprice;
	Integer quantity;
	@ManyToOne
	@JoinColumn(name = "productrepositoryid")
	ProductRepository productrepository;
	@ManyToOne
	@JoinColumn(name = "Orderid")
	Orders orders;
	public DetailOrder() {
		super();
	}
	
	

	public Integer getDetailorderid() {
		return detailorderid;
	}



	public void setDetailorderid(Integer detailorderid) {
		this.detailorderid = detailorderid;
	}



	public Float getProductprice() {
		return productprice;
	}



	public void setProductprice(Float productprice) {
		this.productprice = productprice;
	}



	public ProductRepository getProductrepository() {
		return productrepository;
	}

	public void setProductrepository(ProductRepository productrepository) {
		this.productrepository = productrepository;
	}

	
	public DetailOrder(Integer detailorderid, Float productprice, Integer quantity, ProductRepository productrepository,
			Orders orders) {
		super();
		this.detailorderid = detailorderid;
		this.productprice = productprice;
		this.quantity = quantity;
		this.productrepository = productrepository;
		this.orders = orders;
	}



	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	public Orders getOrders() {
		return orders;
	}
	public void setOrders(Orders orders) {
		this.orders = orders;
	}
}
