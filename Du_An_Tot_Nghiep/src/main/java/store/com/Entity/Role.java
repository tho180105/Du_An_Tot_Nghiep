package store.com.Entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Data
@Getter
@Setter
@Entity 
public class Role implements Serializable{
	@Id
	String roleid;
	String rolename;
	@JsonIgnore
	@OneToMany(mappedBy = "role")
	List<Account> accounts;
	public Role(String roleid, String rolename, List<Account> accounts) {
		super();
		this.roleid = roleid;
		this.rolename = rolename;
		this.accounts = accounts;
	}
	public String getRoleid() {
		return roleid;
	}
	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	public List<Account> getAccounts() {
		return accounts;
	}
	public void setAccounts(List<Account> accounts) {
		this.accounts = accounts;
	}
	public Role() {
		super();
	}
}
