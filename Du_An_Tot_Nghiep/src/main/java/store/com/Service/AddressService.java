package store.com.Service;

import store.com.Entity.Address;

public interface AddressService {
    public Address findByAccountId(String id);
    public Address create(Address address);
    public Address update(Address address);
}
