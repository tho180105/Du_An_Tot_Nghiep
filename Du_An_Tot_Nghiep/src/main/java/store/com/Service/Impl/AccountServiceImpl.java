package store.com.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import store.com.DAO.AccountDAO;
import store.com.Entity.Account;
import store.com.Service.AccountService;


@Service
public class AccountServiceImpl implements AccountService{

	@Autowired
	AccountDAO dao;
	
	@Override
	public List<Account> findAll() {
		return dao.findAll();
	}

	@Override
	public Account findById(String username) {
		// TODO Auto-generated method stub
		return dao.findById(username).get();
	}

	@Override
	public Account create(Account account) {
		return dao.save(account);
	}

	@Override
	public Account update(Account account) {
		return dao.save(account);
	}

}
