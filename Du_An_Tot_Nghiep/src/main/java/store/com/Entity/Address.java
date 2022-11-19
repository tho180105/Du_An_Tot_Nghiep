	package store.com.Entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Data
@Getter
@Setter
@Entity 
public class Address implements Serializable{
	@Id
	Integer addressid;
	Integer province;
	Integer district;
	Integer ward;
	String detailaddress;
	Boolean defaultaddress;

	@ManyToOne
	@JoinColumn(name = "Accountid")
	Account account;



	
}
