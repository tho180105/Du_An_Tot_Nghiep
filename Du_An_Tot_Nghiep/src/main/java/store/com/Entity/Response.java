package store.com.Entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
public class Response implements Serializable{
	@Id
	Integer responseid;
	String content;
	@Temporal(TemporalType.DATE)
	@Column(name = "Responsedate")
	Date responsedate;
	@ManyToOne
	@JoinColumn(name = "Rateid")
	Rate rate;
	@ManyToOne
	@JoinColumn(name = "Accountid")
	Account account;
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public Rate getRate() {
		return rate;
	}
	public void setRate(Rate rate) {
		this.rate = rate;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public Response() {
		super();
	}
	public Integer getResponseid() {
		return responseid;
	}
	public void setResponseid(Integer responseid) {
		this.responseid = responseid;
	}
	public Date getResponsedate() {
		return responsedate;
	}
	public void setResponsedate(Date responsedate) {
		this.responsedate = responsedate;
	}
	public Response(Integer responseid, String content, Date responsedate, Rate rate, Account account) {
		super();
		this.responseid = responseid;
		this.content = content;
		this.responsedate = responsedate;
		this.rate = rate;
		this.account = account;
	}
	
}
