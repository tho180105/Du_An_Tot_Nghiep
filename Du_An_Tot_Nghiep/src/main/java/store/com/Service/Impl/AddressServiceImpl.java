package store.com.Service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import store.com.DAO.AddressDAO;
import store.com.Entity.Address;
import store.com.Service.AddressService;
@Service
public class AddressServiceImpl implements AddressService{
    @Autowired
    AddressDAO dao;

    @Override
    public Address findByAccountId(String id) {
       return dao.findByAccountId(id);
    }

    @Override
    public Address create(Address address) {
        return dao.save(address);
    }

    @Override
    public Address update(Address address) {
        return dao.save(address);
    }
    
}
