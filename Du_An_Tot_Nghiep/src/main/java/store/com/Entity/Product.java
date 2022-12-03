package store.com.Entity;

import java.io.Serializable;
import java.util.List;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter
@Entity
public class Product implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer productid;
    String productname;
    Float listedprice;
    Float sellingprice;
    String describe;
    String mainproductimage;
    Double purchaseprice;
    Boolean productstatus;

    @ManyToOne
    @JoinColumn(name = "Styleid")
    Style style;

    @ManyToOne
    @JoinColumn(name = "Categoryid")
    Category category;

    @JsonIgnore
    @OneToMany(mappedBy = "product",fetch=FetchType.LAZY)
    List<AdditionalImages> additionalimagess;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    List<ProductRepository> productRepositories;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    List<ProductDiscount> productDiscounts;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    List<Rate> rates;

    public Product() {
        super();
    }
    public Product(Integer productid, String productname, Float listedprice, Float sellingprice, String describe, String mainproductimage,Boolean productstatus, Double purchaseprice, Style style, Category category, List<AdditionalImages> additionalimagess, List<ProductRepository> productRepositories, List<ProductDiscount> productDiscounts, List<Rate> rates) {
        this.productid = productid;
        this.productname = productname;
        this.listedprice = listedprice;
        this.sellingprice = sellingprice;
        this.describe = describe;
        this.mainproductimage = mainproductimage;
        this.productstatus = productstatus;
        this.purchaseprice = purchaseprice;
        this.style = style;
        this.category = category;
        this.additionalimagess = additionalimagess;
        this.productRepositories = productRepositories;
        this.productDiscounts = productDiscounts;
        this.rates = rates;
    }

    public Integer getProductid() {
        return productid;
    }

    public void setProductid(Integer productid) {
        this.productid = productid;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public Float getListedprice() {
        return listedprice;
    }

    public void setListedprice(Float listedprice) {
        this.listedprice = listedprice;
    }

    public Float getSellingprice() {
        return sellingprice;
    }

    public void setSellingprice(Float sellingprice) {
        this.sellingprice = sellingprice;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public String getMainproductimage() {
        return mainproductimage;
    }

    public void setMainproductimage(String mainproductimage) {
        this.mainproductimage = mainproductimage;
    }

    public Double getPurchaseprice() {
        return purchaseprice;
    }

    public void setPurchaseprice(Double purchaseprice) {
        this.purchaseprice = purchaseprice;
    }

    public Boolean getProductstatus() {
        return productstatus;
    }

    public void setProductstatus(Boolean productstatus) {
        this.productstatus = productstatus;
    }

    public Style getStyle() {
        return style;
    }

    public void setStyle(Style style) {
        this.style = style;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<AdditionalImages> getAdditionalimagess() {
        return additionalimagess;
    }

    public void setAdditionalimagess(List<AdditionalImages> additionalimagess) {
        this.additionalimagess = additionalimagess;
    }

    public List<ProductRepository> getProductRepositories() {
        return productRepositories;
    }

    public void setProductRepositories(List<ProductRepository> productRepositories) {
        this.productRepositories = productRepositories;
    }

    public List<ProductDiscount> getProductDiscounts() {
        return productDiscounts;
    }

    public void setProductDiscounts(List<ProductDiscount> productDiscounts) {
        this.productDiscounts = productDiscounts;
    }

    public List<Rate> getRates() {
        return rates;
    }

    public void setRates(List<Rate> rates) {
        this.rates = rates;
    }
}
