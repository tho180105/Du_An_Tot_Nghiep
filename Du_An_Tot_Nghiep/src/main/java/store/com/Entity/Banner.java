package store.com.Entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
public class Banner implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer bannerid;
	String bannerpath;
	String position;
	@Temporal(TemporalType.DATE)
	@Column(name = "Startdate")
	Date startdate;
	@Temporal(TemporalType.DATE)
	@Column(name = "Enddate")
	Date enddate;
	public Integer getBannerid() {
		return bannerid;
	}
	public void setBannerid(Integer bannerid) {
		this.bannerid = bannerid;
	}
	public String getBannerpath() {
		return bannerpath;
	}
	public void setBannerpath(String bannerpath) {
		this.bannerpath = bannerpath;
	}
	public String getPosotion() {
		return position;
	}
	public void setPosotion(String posotion) {
		this.position = posotion;
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
	public Banner() {
		super();
	}
	public Banner(Integer bannerid, String bannerpath, String posotion, Date startdate, Date enddate) {
		super();
		this.bannerid = bannerid;
		this.bannerpath = bannerpath;
		this.position = posotion;
		this.startdate = startdate;
		this.enddate = enddate;
	}
}
