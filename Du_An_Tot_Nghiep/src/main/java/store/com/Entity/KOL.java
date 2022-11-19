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
@Table(name="Kol")
public class KOL implements Serializable{
	@Id
	Integer kolid;
	String kolfullname;
	String phonenumber;
	String email;
	@JsonIgnore
	@OneToMany(mappedBy = "kol")
	List<KOLvoucher> kolvouchers;
	public KOL() {
		super();
	}
	
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}


	public KOL(Integer kolid, String kolfullname, String phonenumber, String email, List<KOLvoucher> kolvouchers) {
		super();
		this.kolid = kolid;
		this.kolfullname = kolfullname;
		this.phonenumber = phonenumber;
		this.email = email;
		this.kolvouchers = kolvouchers;
	}


	public Integer getKolid() {
		return kolid;
	}


	public void setKolid(Integer kolid) {
		this.kolid = kolid;
	}


	public String getKolfullname() {
		return kolfullname;
	}


	public void setKolfullname(String kolfullname) {
		this.kolfullname = kolfullname;
	}


	public String getPhonenumber() {
		return phonenumber;
	}


	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}


	public List<KOLvoucher> getKolvouchers() {
		return kolvouchers;
	}


	public void setKolvouchers(List<KOLvoucher> kolvouchers) {
		this.kolvouchers = kolvouchers;
	}
	
}
