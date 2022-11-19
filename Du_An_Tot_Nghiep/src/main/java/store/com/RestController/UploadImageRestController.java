package store.com.RestController;

import java.io.File;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import store.com.Service.UploadService;


@CrossOrigin("*")
@RestController
public class UploadImageRestController {

    @Autowired
    UploadService uploadService;
    
    @PostMapping("/rest/uploadImage/{folder}")
    public JsonNode save(@PathParam("file") MultipartFile file, 
            @PathVariable("folder") String folder) {
        File saveFile = uploadService.save(file, "/banner/"+folder);
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        node.put("name", saveFile.getName());
        node.put("size", saveFile.length());
        
        return node;
    }
    
    @PostMapping("/rest/uploadImageVoucher/{folder}")
    public JsonNode saveVoucher(@PathParam("file") MultipartFile file, 
            @PathVariable("folder") String folder) {
        File saveFile = uploadService.save(file, "/voucher/"+folder);
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        node.put("name", saveFile.getName());
        node.put("size", saveFile.length());
        
        return node;
    }
}
