package store.com.Entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")

@Entity 
public class Account implements Serializable{
	@Id
	@NotBlank(message = "không bỏ trống tài khoản")
	String accountid;
	@NotBlank(message = "Không được bỏ trống mật khẩu")
	String password;
	@NotBlank(message = "Không được bỏ trống email")
	@Email(message = "Email không đúng định dạng")
	String email;
	String avatar;
	Integer coin;
	String name;
	String phonenumber;
	@Temporal(TemporalType.DATE)
	@Column(name = "Createdate")
	Date createdate = new Date();
	String status;
	@ManyToOne
	@JoinColumn(name="Roleid")
	Role role;
	@JsonIgnore
	@OneToMany(mappedBy="account")
	List<Rate> rates ;
	@JsonIgnore
	@OneToMany(mappedBy="account")
	List<Response> responses ;
	@JsonIgnore
	@OneToMany(mappedBy="account")
	List<DetailCart> detailCarts ;
	@JsonIgnore
	@OneToMany(mappedBy="account")
	List<Address>  addresses ;
	@JsonIgnore
	@OneToMany(mappedBy="account")
	List<Orders>  orders ;
	@JsonIgnore
	@OneToMany(mappedBy = "account")
	List<ProductDiscount>  productDiscounts ;
    public String getAccountid() {
        return accountid;
    }
    public void setAccountid(String accountid) {
        this.accountid = accountid;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getAvatar() {
        return avatar;
    }
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    public Integer getCoin() {
        return coin;
    }
    public void setCoin(Integer coin) {
        this.coin = coin;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPhonenumber() {
        return phonenumber;
    }
    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }
    public Date getCreatedate() {
        return createdate;
    }
    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public List<Rate> getRates() {
        return rates;
    }
    public void setRates(List<Rate> rates) {
        this.rates = rates;
    }
    public List<Response> getResponses() {
        return responses;
    }
    public void setResponses(List<Response> responses) {
        this.responses = responses;
    }
    public List<DetailCart> getDetailCarts() {
        return detailCarts;
    }
    public void setDetailCarts(List<DetailCart> detailCarts) {
        this.detailCarts = detailCarts;
    }
    public List<Address> getAddresses() {
        return addresses;
    }
    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }
    public List<Orders> getOrders() {
        return orders;
    }
    public void setOrders(List<Orders> orders) {
        this.orders = orders;
    }
    public List<ProductDiscount> getProductDiscounts() {
        return productDiscounts;
    }
    public void setProductDiscounts(List<ProductDiscount> productDiscounts) {
        this.productDiscounts = productDiscounts;
    }
    public Account() {
        super();
    }
    public Account( String accountid,
             String password,
             String email, String avatar, Integer coin, String name,
            String phonenumber, Date createdate, String status, Role role, List<Rate> rates, List<Response> responses,
            List<DetailCart> detailCarts, List<Address> addresses, List<Orders> orders,
            List<ProductDiscount> productDiscounts) {
        super();
        this.accountid = accountid;
        this.password = password;
        this.email = email;
        this.avatar = avatar;
        this.coin = coin;
        this.name = name;
        this.phonenumber = phonenumber;
        this.createdate = createdate;
        this.status = status;
        this.role = role;
        this.rates = rates;
        this.responses = responses;
        this.detailCarts = detailCarts;
        this.addresses = addresses;
        this.orders = orders;
        this.productDiscounts = productDiscounts;
    }

	
	
}
