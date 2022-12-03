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
	Float listedprice;
	@ManyToOne
	@JoinColumn(name = "productrepositoryid")
	ProductRepository productrepository;
	@ManyToOne
	@JoinColumn(name = "Orderid")
	Orders orders;
	public DetailOrder() {
		super();
	}


	public DetailOrder(Integer detailorderid, Float productprice, Integer quantity, Float listedprice, ProductRepository productrepository, Orders orders) {
		this.detailorderid = detailorderid;
		this.productprice = productprice;
		this.quantity = quantity;
		this.listedprice = listedprice;
		this.productrepository = productrepository;
		this.orders = orders;
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

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Float getListedprice() {
		return listedprice;
	}

	public void setListedprice(Float listedprice) {
		this.listedprice = listedprice;
	}

	public ProductRepository getProductrepository() {
		return productrepository;
	}

	public void setProductrepository(ProductRepository productrepository) {
		this.productrepository = productrepository;
	}

	public Orders getOrders() {
		return orders;
	}

	public void setOrders(Orders orders) {
		this.orders = orders;
	}
}
