package store.com.Entity;

import java.io.Serializable;

import javax.persistence.Entity;
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
@Table(name="kolvoucher")
public class KOLvoucher implements Serializable{
	@Id
	Integer kolvoucherid;

	@ManyToOne
	@JoinColumn(name = "kolid")
	KOL kol;
	
	@ManyToOne
	@JoinColumn(name = "Voucherid")
	Voucher voucher;

	
	public KOLvoucher() {
		super();
	}

	

	public KOLvoucher(Integer kolvoucherid, KOL kol, Voucher voucher) {
		super();
		this.kolvoucherid = kolvoucherid;
		this.kol = kol;
		this.voucher = voucher;
	}



	public Integer getKolvoucherid() {
		return kolvoucherid;
	}



	public void setKolvoucherid(Integer kolvoucherid) {
		this.kolvoucherid = kolvoucherid;
	}



	public KOL getKol() {
		return kol;
	}



	public void setKol(KOL kol) {
		this.kol = kol;
	}



	public Voucher getVoucher() {
		return voucher;
	}

	public void setVoucher(Voucher voucher) {
		this.voucher = voucher;
	}
}
