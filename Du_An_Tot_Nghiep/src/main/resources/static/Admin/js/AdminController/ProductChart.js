app.controller("productTotal", function ($rootScope, $http, $scope) {
  $http.get("/rest/style/count").then((resp) => {
    $rootScope.styleCount = resp.data;
  });
  $http.get("/rest/statistic/countCate").then((resp) => {
    $rootScope.cateCount = resp.data;
  });
  $http.get("/rest/product/count").then((resp) => {
    $rootScope.productCount = resp.data;
  });
  $http.get("/rest/detailorder").then((resp) => {
    $rootScope.detailOrders = resp.data;
    $scope.getYear()
  });


  $scope.getYear = function () {
    var dateF = new Date();
    var dateT = new Date();
    if (document.getElementById("dateSellForm").value === "") {
      dateF = new Date("1/1/0000");
    } else {
      var dateF = new Date(document.getElementById("dateSellForm").value);
    }
    if (document.getElementById("dateSellTo").value === "") {
      dateT = new Date();
    } else {
      dateT = new Date(document.getElementById("dateSellTo").value);
    }
    $scope.doneFilterDate = [];
    $rootScope.detailOrders.filter((element) => {
      if (
        new Date(element.orders.createdate) >= dateF &&
        new Date(element.orders.createdate) <= dateT
      ) {
        $scope.doneFilterDate.push(element);
      }
    });
    $scope.doneArrage = [];
    for (let i = 0; i < $scope.doneFilterDate.length - 1; i++) {
      let fakeArray = [];
      for (let j = i + 1; j < $scope.doneFilterDate.length; j++) {
        if (
          $scope.doneFilterDate[i].productrepository.product.productid ===  $scope.doneFilterDate[j].productrepository.product.productid   ) {
          fakeArray.push($scope.doneFilterDate[j]);
          $scope.doneFilterDate.splice(j, 1);
          j--;
        }
      }
      if(fakeArray.length==0){
        fakeArray.push($scope.doneFilterDate[i]);
      }
      let totalSold =0
      fakeArray.forEach(x=>{
        totalSold+=x.quantity
      })
      
      var element={};
      element.product=fakeArray[0].productrepository.product
      element.totalSold=totalSold;
      element.leftquantity = fakeArray[0].productrepository.quantity
      $scope.doneArrage.push(element);
    }
  };
/// Lưu Số lượng bao nhieu - Tháng đó là tháng mấy
//Xây dựng query  bên java lấy tổng sp bán được theo tháng
function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}
function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}
$scope.chartYear=new Date().getFullYear();
$scope.chartProductSellingByYear=function (){
  $http.get("/rest/statistic/countbydate?year="+$scope.chartYear).then((resp) => {
    $rootScope.productSellingInAYear = [];
    $rootScope.productSellingInAYear = resp.data;
    for (let index = 1; index < 13; index++) {
      removeData($scope.myChart)
    }
    for (let index = 1; index < 13; index++) {
      addData($scope.myChart,index.toString(),$rootScope.productSellingInAYear[index-1])
    }
  });
}
$scope.ctx = document.getElementById("productMainChart").getContext("2d");
  $scope.myChart = new Chart($scope.ctx, {
    data: {
      datasets: [
        {
          type: "line",
          label: "Số lượng bán - line",
          data:[],
          backgroundColor: "rgb(74, 74, 255)",
        },
        {
          type: "bar",
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(255, 205, 86, 0.8)",
            // "rgba(75, 192, 192, 0.8)",
            // "rgba(219, 68, 31,0.8)"
          ],
          
          label: "Số lượng bán - column",
           data: [],
        },
      ],
      // labels: ["1", "1", "2", "3", "4", "5", "6","7","8","9","10","11","12"],
    },
  });

  $scope.chartProductSellingByYear()



});
