package store.com.RestController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.ApplicationScope;
//import store.com.Service.AddressService;
@RestController
@RequestMapping("/rest/address")
@ApplicationScope
public class AddressRestController {
//   @Autowired
//   AddressService addressService;
//
//    @GetMapping
//    public Address getone(Authentication au){
//        return addressService.findByAccountId(au.getName());
//    }
//
//    @PutMapping
//    public Address update(@RequestBody Address address){
//        return addressService.update(address);
//    }
//
//    @PostMapping
//    public Address create(@RequestBody Address address){
//        return addressService.create(address);
//    }
}
