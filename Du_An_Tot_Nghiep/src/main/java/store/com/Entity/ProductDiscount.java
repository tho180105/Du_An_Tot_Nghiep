package store.com.Entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Data
@Getter
@Setter
@Entity 
@Table(name="Productdiscount")
public class ProductDiscount implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer productdiscountid;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "Startdate")
	Date startdate;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "Enddate")
	Date enddate;
	
	Float discount;

	@ManyToOne
	@JoinColumn(name = "Productid")
	Product product;
	
	@ManyToOne
	@JoinColumn(name = "Accountid")
	Account account;
	
	public ProductDiscount() {
        super();
    }
	
	public ProductDiscount(Integer productdiscountid, Date startdate, Date enddate, Float discount, Product product,
			Account account) {
		super();
		this.productdiscountid = productdiscountid;
		this.startdate = startdate;
		this.enddate = enddate;
		this.discount = discount;
		this.product = product;
		this.account = account;
	}

	

	public Integer getProductdiscountid() {
		return productdiscountid;
	}

	public void setProductdiscountid(Integer productdiscountid) {
		this.productdiscountid = productdiscountid;
	}

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getEnddate() {
		return enddate;
	}

	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}

	public Float getDiscount() {
		return discount;
	}

	public void setDiscount(Float discount) {
		this.discount = discount;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	
}
