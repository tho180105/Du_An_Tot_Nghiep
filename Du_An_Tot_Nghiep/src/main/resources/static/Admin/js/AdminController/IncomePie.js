app.controller("IncomeTotal", function ($rootScope, $http, $scope, $timeout) {
    $scope.chartYear = new Date().getFullYear();
    $scope.getProfitByAPI = function (year) {
        $http.get("/rest/statistic/profit?year=" + year).then((resp) => {
            $rootScope.profitAYear = resp.data;
            console.log($rootScope.profitAYear)
        });
    }
    $scope.getProfitByAPI(new Date().getFullYear())
    // 
    // $http.get("/rest/statistic/payment?year="+new Date().getFullYear()).then((resp) => {
    //     $rootScope.paymentYear = resp.data;
    //     console.log($rootScope.paymentYear)
    // });

    // $http.get("/rest/statistic/sales?year="+new Date().getFullYear()).then((resp) => {
    //     $rootScope.salesYear = resp.data;
    //     console.log($rootScope.salesYear)
    // });


    $scope.indexGeneralDate = new Date();
    $scope.chartPieProfit = function () {
        $scope.getProfitByAPI($scope.chartYear)
        $timeout($scope.changeChart
            , 800);
    }
    $scope.changeChart = function () {
        {
            for (let i = 1; i < 13; i++) {
                removeData(myChart)
            }
            for (let i = 1; i < 13; i++) {
                addData(myChart, i.toString(), $rootScope.profitAYear[i - 1]);
            }
        }
    }
    $scope.changeIndexGeneralDate = function () {
        let year = $scope.indexGeneralDate.getFullYear();
        let month = $scope.indexGeneralDate.getMonth();
        $http.get("/rest/statistic/quantityOrder?year=" + year + "&month=" + month).then((resp) => {
            $rootScope.quantityOrders = resp.data
            let allOrder = {};
            allOrder.quantity = 0
            $rootScope.quantityOrders.forEach(x => {
                    allOrder.quantity += x.quantity
                }
            )
            allOrder.orderStatusTitle = "Tổng đơn"
            $rootScope.quantityOrders.push(allOrder)
        });
        $http.get("/rest/statistic/index?year=" + year + "&month=" + month).then((resp) => {
            $rootScope.indexMonthYear = resp.data;
            console.log($rootScope.indexMonthYear)
            $scope.salesShow = $rootScope.indexMonthYear[0]
            $scope.paymentShow = $rootScope.indexMonthYear[1]
            $scope.profitShow = $scope.salesShow - $scope.paymentShow
            $scope.profitPercentShow = $scope.profitShow / $scope.salesShow * 100
            $scope.paymentPercentShow = 100 - $scope.profitPercentShow;

        });
    }


// Load category- Tên
// Load lợi nhuận và % mỗi loại

// Load profit by date và cate

    $scope.changeIndexGeneralDate()
    $scope.chartPieProfit()

    // $http.get("/rest/statistic/quantityOrder?year="+year+"&month="+month).then((resp) => {
    //    console.log(resp.data)
    // });


    ctx = document.getElementById('productMainChart').getContext('2d');
// setup
    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [{
            label: 'Weekly Sales',
            data: [],
            backgroundColor: [
                'rgba(232, 59, 56,0.3)',
                'rgba(247, 143, 57, 0.3)',
                'rgba(255, 205, 66, 0.3)',
                'rgba(242, 255, 59, 0.3)',
                'rgba(165, 255, 61, 0.3)',
                'rgba(53, 199, 34, 0.3)',
                'rgba(43, 186, 141, 0.3)',
                'rgba(31, 191, 196, 0.3)',
                'rgba(12, 106, 168, 0.3)',
                'rgba(139, 12, 168, 0.3)',
                'rgba(191, 10, 137, 0.3)',
                'rgba(50, 3, 161, 0.3)'
            ],
            borderColor: [
                'rgba(232, 59, 56,1)',
                'rgba(247, 143, 57, 1)',
                'rgba(255, 205, 66, 1)',
                'rgba(242, 255, 59, 1)',
                'rgba(165, 255, 61, 1)',
                'rgba(53, 199, 34, 1)',
                'rgba(43, 186, 141, 1)',
                'rgba(31, 191, 196, 1)',
                'rgba(12, 106, 168, 1)',
                'rgba(139, 12, 168, 1)',
                'rgba(191, 10, 137, 1)',
                'rgba(50, 3, 161, 1)',
                'rgba(0, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    };

// config 
    const config = {
        type: 'pie',
        data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    enable: false
                },
                datalabels: {
                    formatter: (value, context) => {
                        const datapoints = context.chart.data.datasets[0].data;

                        function totalSum(total, datapoint) {
                            return total + datapoint;
                        }

                        const totalvalue = datapoints.reduce(totalSum, 0)
                        const percentageValue = (value / totalvalue * 100).toFixed(1)
                        // const display =[value,percentageValue]
                        const display = [value, percentageValue]
                        // return value + " - " + percentageValue + "%"
                        return percentageValue + "%"
                    },
                    font: {
                        size: 15
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    };

    var myChart = new Chart(
        ctx,
        config
    );

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


})
  
  