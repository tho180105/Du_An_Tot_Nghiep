package store.com.RestController;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import store.com.DAO.CategoryDAO;
import store.com.DAO.DetailOrderDAO;
import store.com.DAO.OrdersDAO;
import store.com.DAO.ProductDAO;
import store.com.DAO.ProductRepositoryDAO;
import store.com.DAO.StyleDAO;
import store.com.Entity.ReportModel;

@RestController
@RequestMapping("/rest/statistic")
public class StatisticRestController {
    @Autowired
    ProductDAO pdao;
    @Autowired
    OrdersDAO odao;
    @Autowired
    DetailOrderDAO dodao;
    @Autowired
    CategoryDAO cdao;
    @Autowired
    StyleDAO sdao;
    @Autowired
    ProductRepositoryDAO prdao;

    /**
     * @return
     */
    @GetMapping("/countStyle")
    public Integer getCountStyle() {
        return sdao.findAll().size();
    }

    @GetMapping("/countCate")
    public Integer count() {
        return cdao.getCount();
    }

    @GetMapping("/countbydate")
    public List<Double> countProductSelling(@RequestParam("year") String year) throws ParseException {
        Integer yearInt = Integer.parseInt(year);
        List<Double> productByMonth = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            try {
                Date df = new Date(yearInt - 1900, i, 1);
                Date dt = new Date(yearInt - 1900, i + 1, 1);
                List<Double> prefixProccess = dodao.getCountByDate(df, dt);
                Double productPerMonth = prefixProccess.stream().reduce((x, y) -> x + y).get();
                productByMonth.add(productPerMonth);
            } catch (Exception e) {
                productByMonth.add(0.0);
            }

        }
        return productByMonth;
    }

    @GetMapping("/profit")
    List<Double> getProfitAYear(@RequestParam("year") String year) {
        Integer yearInt = Integer.parseInt(year);
        List<Double> profitAYear = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            try {
                Date df = new Date(yearInt - 1900, i, 1);
                Date dt = new Date(yearInt - 1900, i + 1, 1);
                Double profitAMonth = odao.getSales(df, dt) - odao.getShipFee(df, dt) - odao.getPayProduct(df, dt);
                profitAYear.add(profitAMonth);
            } catch (Exception e) {
                profitAYear.add(0.0);
            }
        }
        return profitAYear;
    }

    @GetMapping("/payment")
    List<Double> getPaymentAYear(@RequestParam("year") String year) {
        Integer yearInt = Integer.parseInt(year);
        List<Double> paymentAYear = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            try {
                Date df = new Date(yearInt - 1900, i, 1);
                Date dt = new Date(yearInt - 1900, i + 1, 1);
                paymentAYear.add(odao.getShipFee(df, dt) + odao.getPayProduct(df, dt));
            } catch (Exception e) {
                paymentAYear.add(0.0);
            }
        }
        return paymentAYear;
    }

    @GetMapping("/sales")
    List<Double> getSalesAYear(@RequestParam("year") String year) {
        Integer yearInt = Integer.parseInt(year);
        List<Double> salesAYear = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            try {
                Date df = new Date(yearInt - 1900, i, 1);
                Date dt = new Date(yearInt - 1900, i + 1, 1);
                salesAYear.add(odao.getSales(df, dt));
            } catch (Exception e) {
                salesAYear.add(0.0);
            }
        }
        return salesAYear;
    }

    // Get index general by month year
    @GetMapping("/index")
    List<Double> getIndex(@RequestParam("year") String year, @RequestParam("month") String month) {
        Integer yearInt = Integer.parseInt(year);
        Integer monthInt = Integer.parseInt(month);
        int nextMonthInt = Integer.valueOf(month) + Integer.valueOf(1);
        List<Double> index = new ArrayList<>();
        Date df = new Date(yearInt - 1900, monthInt, 1);
        Date dt = new Date(yearInt - 1900, nextMonthInt, 1);
        try {
            index.add(odao.getSales(df, dt));
            index.add(odao.getShipFee(df, dt) + odao.getPayProduct(df, dt));
        } catch (Exception e) {
            index.add(0.0);
        }
        return index;
    }

    @GetMapping("/quantityOrder")
    List<ReportModel> getQuantityOrder(@RequestParam("year") String year, @RequestParam("month") String month){
        Integer yearInt = Integer.parseInt(year);
        Integer monthInt = Integer.parseInt(month);
        int nextMonthInt = Integer.valueOf(month) + Integer.valueOf(1);
        Date df = new Date(yearInt - 1900, monthInt, 1);
        Date dt = new Date(yearInt - 1900, nextMonthInt, 1);
        return odao.getReport(df,dt);
    }

}
