package store.com.Entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@SuppressWarnings("serial")

@Entity
public class Registration implements Serializable{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String token;
    private LocalDateTime createdat;
    private LocalDateTime expiresat;
    private String accountid;
    private String password;
    private String email;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public LocalDateTime getCreatedat() {
        return createdat;
    }
    public void setCreatedat(LocalDateTime createdat) {
        this.createdat = createdat;
    }
    public LocalDateTime getExpiresat() {
        return expiresat;
    }
    public void setExpiresat(LocalDateTime expiresat) {
        this.expiresat = expiresat;
    }
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
    public Registration(String token, LocalDateTime createdat, LocalDateTime expiresat, String accountid,
            String password, String email) {
        super();
        this.token = token;
        this.createdat = createdat;
        this.expiresat = expiresat;
        this.accountid = accountid;
        this.password = password;
        this.email = email;
    }
    public Registration() {
        super();
    }
    
    
    
    
}
