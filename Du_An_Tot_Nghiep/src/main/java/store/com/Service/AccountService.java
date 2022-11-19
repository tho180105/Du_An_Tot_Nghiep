package store.com.Service;

import java.util.List;

import store.com.Entity.Account;

public interface AccountService {
	public List<Account> findAll() ;
	public Account findById(String username) ;
	public Account create(Account account);
	public Account update(Account account);
}
