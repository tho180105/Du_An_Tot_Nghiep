package store.com.Entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ReportModel {
    @Id
    private String orderStatusTitle;
    private Long quantity;


    public ReportModel(String orderStatusTitle, Long quantity) {
        this.orderStatusTitle = orderStatusTitle;
        this.quantity = quantity;
    }

    public ReportModel() {
    }

    public String getOrderStatusTitle() {
        return orderStatusTitle;
    }

    public void setOrderStatusTitle(String orderStatusTitle) {
        this.orderStatusTitle = orderStatusTitle;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }





}
