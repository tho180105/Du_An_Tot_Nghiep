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
@Table(name = "Orderstatus")
public class OrderStatus implements Serializable{
	@Id
	Integer orderstatusid; 
	String orderstatustitle;
	@JsonIgnore
	@OneToMany(mappedBy="orderstatus")
	List<Orders> orders;


	public OrderStatus(Integer orderstatusid, String orderstatustitle, List<Orders> orders) {
		super();
		this.orderstatusid = orderstatusid;
		this.orderstatustitle = orderstatustitle;
		this.orders = orders;
	}
	public Integer getOrderstatusid() {
		return orderstatusid;
	}
	public void setOrderstatusid(Integer orderstatusid) {
		this.orderstatusid = orderstatusid;
	}
	public String getOrderstatustitle() {
		return orderstatustitle;
	}
	public void setOrderstatustitle(String orderstatustitle) {
		this.orderstatustitle = orderstatustitle;
	}
	public List<Orders> getOrders() {
		return orders;
	}
	public void setOrders(List<Orders> orders) {
		this.orders = orders;
	}
	
	public OrderStatus() {
		super();
	}
	
}
