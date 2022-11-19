package store.com.Entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Data
@Getter
@Setter
@Entity
@Table(name="Detailcart")
public class DetailCart implements Serializable {
	@Id
	 @GeneratedValue (strategy = GenerationType.IDENTITY)
	Integer detailcartid;
	Integer quantity;	
	@ManyToOne
	@JoinColumn(name = "productrepositoryid")
	ProductRepository productrepository;
	@ManyToOne
	@JoinColumn(name = "Accountid")
	Account account;
	
	

	public ProductRepository getProductrepository() {
		return productrepository;
	}

	public void setProductrepository(ProductRepository productrepository) {
		this.productrepository = productrepository;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}



	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}
	
	public Integer getDetailcartid() {
		return detailcartid;
	}

	public void setDetailcartid(Integer detailcartid) {
		this.detailcartid = detailcartid;
	}

	public DetailCart( Integer quantity, ProductRepository productRepository, Account account) {
		super();
		this.quantity = quantity;
		this.productrepository = productRepository;
		this.account = account;
	}

	public DetailCart() {
		super();
	}

	public DetailCart(Integer quantity, ProductRepository productrepository) {
		super();
		this.quantity = quantity;
		this.productrepository = productrepository;
	}
	
}
