package store.com.Entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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
@Table(name="voucher")
public class Voucher implements Serializable{
	@Id
	String voucherid;
	String vouchertitle;
	String vouchercontent;
	Float minimunmoney;
	Float percentdiscount;
	Float moneydiscount;
	Integer quantity;
	@Temporal(TemporalType.DATE)
	@Column(name = "Startdate")
	Date startdate;
	@Temporal(TemporalType.DATE)
	@Column(name = "Enddate")
	Date enddate;
	
	@JsonIgnore
	@OneToMany(mappedBy = "voucher")
	List<KOLvoucher> KOLvouchers;
	@JsonIgnore
	@OneToMany(mappedBy = "voucher")
	List<Orders> Orders;
	public Voucher() {
		super();
	}
	public String getVoucherid() {
		return voucherid;
	}
	public void setVoucherid(String voucherid) {
		this.voucherid = voucherid;
	}
	public String getVouchertitle() {
		return vouchertitle;
	}
	public void setVouchertitle(String vouchertitle) {
		this.vouchertitle = vouchertitle;
	}
	public String getVouchercontent() {
		return vouchercontent;
	}
	public void setVouchercontent(String vouchercontent) {
		this.vouchercontent = vouchercontent;
	}
	public Float getMinimunmoney() {
		return minimunmoney;
	}
	public void setMinimunmoney(Float minimunmoney) {
		this.minimunmoney = minimunmoney;
	}
	public Float getPercentdiscount() {
		return percentdiscount;
	}
	public void setPercentdiscount(Float percentdiscount) {
		this.percentdiscount = percentdiscount;
	}
	public Float getMoneydiscount() {
		return moneydiscount;
	}
	public void setMoneydiscount(Float moneydiscount) {
		this.moneydiscount = moneydiscount;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
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
	public List<KOLvoucher> getKOLvouchers() {
		return KOLvouchers;
	}
	public void setKOLvouchers(List<KOLvoucher> kOLvouchers) {
		KOLvouchers = kOLvouchers;
	}
	@JsonIgnore
	public List<Orders> getOrders() {
		return Orders;
	}
	public void setOrders(List<Orders> orders) {
		Orders = orders;
	}
	public Voucher(String voucherid, String vouchertitle, String vouchercontent, Float minimunmoney,
			Float percentdiscount, Float moneydiscount, Integer quantity, Date startdate, Date enddate,
			List<KOLvoucher> kOLvouchers, List<store.com.Entity.Orders> orders) {
		super();
		this.voucherid = voucherid;
		this.vouchertitle = vouchertitle;
		this.vouchercontent = vouchercontent;
		this.minimunmoney = minimunmoney;
		this.percentdiscount = percentdiscount;
		this.moneydiscount = moneydiscount;
		this.quantity = quantity;
		this.startdate = startdate;
		this.enddate = enddate;
		KOLvouchers = kOLvouchers;
		Orders = orders;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Voucher voucher = (Voucher) o;
		return Objects.equals(voucherid, voucher.voucherid);
	}

	@Override
	public String toString() {
		return "Voucher{" +
				"voucherid='" + voucherid + '\'' +
				", vouchertitle='" + vouchertitle + '\'' +
				", vouchercontent='" + vouchercontent + '\'' +
				", minimunmoney=" + minimunmoney +
				", percentdiscount=" + percentdiscount +
				", moneydiscount=" + moneydiscount +
				", quantity=" + quantity +
				", startdate=" + startdate +
				", enddate=" + enddate +
				", KOLvouchers=" + KOLvouchers +
				", Orders=" + Orders +
				'}';
	}

	@Override
	public int hashCode() {
		return Objects.hash(voucherid);
	}
}
