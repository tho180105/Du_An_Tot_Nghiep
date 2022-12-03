package store.com.Entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Data
@Getter
@Setter
@Entity 
@Table(name="Additionalimages") 
public class AdditionalImages implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer additionalimagesid;
	String imagepath;
	@ManyToOne
	@JoinColumn(name = "Productid")
	Product product;
	public Integer getAdditionalImagesId() {
		return additionalimagesid;
	}
	public void setAdditionalImagesId(Integer additionalimagesid) {
		this.additionalimagesid = additionalimagesid;
	}
	public String getImagePath() {
		return imagepath;
	}
	public void setImagePath(String imagePath) {
		this.imagepath = imagePath;
	}
	public AdditionalImages(Integer additionalimagesid, String imagepath, Product product) {
		super();
		this.additionalimagesid = additionalimagesid;
		this.imagepath = imagepath;
		this.product = product;
	}
	public AdditionalImages() {
		super();
	}
	public Integer getAdditionalimagesid() {
		return additionalimagesid;
	}
	public void setAdditionalimagesid(Integer additionalimagesid) {
		this.additionalimagesid = additionalimagesid;
	}
	public String getImagepath() {
		return imagepath;
	}
	public void setImagepath(String imagepath) {
		this.imagepath = imagepath;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}

}
