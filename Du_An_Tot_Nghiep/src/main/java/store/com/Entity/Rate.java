package store.com.Entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Data
@Getter
@Setter
@Entity 
public class Rate implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer rateid;
	String content;
	@Temporal(TemporalType.DATE)
	@Column(name = "Ratedate")
	Date ratedate;
	Float starnumber;
	String picture1;
	String picture2;
	String picture3;
	String picture4;
	@ManyToOne
	@JoinColumn(name = "Accountid")
	Account account;
	@ManyToOne
	@JoinColumn(name = "Productid")
	Product product;
	@JsonIgnore
	@OneToMany(mappedBy="rate")
	List<Response> responses;
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

	public String getPicture1() {
		return picture1;
	}
	public void setPicture1(String picture1) {
		this.picture1 = picture1;
	}
	public String getPicture2() {
		return picture2;
	}
	public void setPicture2(String picture2) {
		this.picture2 = picture2;
	}
	public String getPicture3() {
		return picture3;
	}
	public void setPicture3(String picture3) {
		this.picture3 = picture3;
	}
	public String getPicture4() {
		return picture4;
	}
	public void setPicture4(String picture4) {
		this.picture4 = picture4;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public List<Response> getResponses() {
		return responses;
	}
	public void setResponses(List<Response> responses) {
		this.responses = responses;
	}
	public Rate() {
		super();
	}
	public Rate(Integer rateid, String content, Date ratedate, Float starnumber, String picture1, String picture2,
			String picture3, String picture4, Account account, Product product, List<Response> responses) {
		super();
		this.rateid = rateid;
		this.content = content;
		this.ratedate = ratedate;
		this.starnumber = starnumber;
		this.picture1 = picture1;
		this.picture2 = picture2;
		this.picture3 = picture3;
		this.picture4 = picture4;
		this.account = account;
		this.product = product;
		this.responses = responses;
	}
	public Integer getRateid() {
		return rateid;
	}
	public void setRateid(Integer rateid) {
		this.rateid = rateid;
	}
	public Date getRatedate() {
		return ratedate;
	}
	public void setRatedate(Date ratedate) {
		this.ratedate = ratedate;
	}
	public Float getStarnumber() {
		return starnumber;
	}
	public void setStarnumber(Float starnumber) {
		this.starnumber = starnumber;
	}
	
}
