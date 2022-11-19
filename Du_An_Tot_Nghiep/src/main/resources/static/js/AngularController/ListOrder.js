app.controller("ListOrder-ctrl", function ($rootScope, $scope, $http) {

	$http.get("/rest/ListOrder/order").then(resp => {
		
		$rootScope.order = resp.data;
		console.log($rootScope.order)
		$http.get("/rest/ListOrder/detail").then(resp => {
			$scope.listDetailOrder = resp.data;
			$scope.checkOrder($rootScope.order)
		})	
	})
	$http.get("/rest/ListOrder/order").then(resp => {
		$scope.tempOrder = resp.data;
	})

	$scope.checkOrder = function (order) {
		for (let i = 0; i < order.length; i++) {
			var item = [];
			var totalPrice = 0;
			for (let j = 0; j < $scope.listDetailOrder.length; j++) {
				if (order[i].orderid == $scope.listDetailOrder[j].orders.orderid) {
					item.push($scope.listDetailOrder[j]);
					totalPrice += $scope.listDetailOrder[j].productprice * $scope.listDetailOrder[j].quantity;
				}
			}
			order[i].totalmoneyFormat = new Intl.NumberFormat('de-DE').format(order[i].totalmoney);
			order[i].detailorder = item;
			order[i].totalPrice = totalPrice;
		}
	}

	$scope.link = function (item) {
		location.href = "/detailorder/" + item.orderid;
	}

	$scope.cancelOrder = function (item){
		var tempOrder =$scope.tempOrder.findIndex(x => x.orderid == item);
		$scope.tempOrder[tempOrder].orderstatus.orderstatusid=3;
		$scope.tempOrder[tempOrder].createdate = new Date($scope.tempOrder[tempOrder].createdate);
		console.log($scope.tempOrder[tempOrder]);
		var index = $scope.order.findIndex(x => x.orderid ==item);
		$scope.order[index].orderstatus.orderstatusid =3;
		$scope.order[index].orderstatus.orderstatustitle ="Đã hủy";
		$http.put("/rest/order",$scope.tempOrder[tempOrder]).then(resp =>{
			
			console.log($scope.order[index]);
		}).catch(error => {
			console.log("lỗi");
		})
	}

})

app.controller("DetailOrder-ctrl", function ($rootScope, $scope, $http) {
	var id = location.href.substring(location.href.lastIndexOf("/"), location.href.length);
	console.log(id);
	$http.get("/rest/ListOrder/detailOrder" + id).then(resp => {
		$scope.detailOrder = resp.data;
		// xử lý ngày tháng năm
		$scope.detailOrder[0].orders.createdate = new Date($scope.detailOrder[0].orders.createdate);
		// format tiền (10.000,00)
		$scope.detailOrder[0].orders.totalNoneDiscount = new Intl.NumberFormat('de-DE').format($scope.detailOrder[0].orders.shipfee + $scope.detailOrder[0].orders.productmoney);
		$scope.detailOrder[0].orders.productmoney = new Intl.NumberFormat('de-DE').format($scope.detailOrder[0].orders.productmoney);
		$scope.detailOrder[0].orders.totalmoneyFormat = new Intl.NumberFormat('de-DE').format($scope.detailOrder[0].orders.totalmoney);
		$scope.detailOrder[0].orders.shipfee = new Intl.NumberFormat('de-DE').format($scope.detailOrder[0].orders.shipfee);
		//
		for (let i = 0; i < $scope.detailOrder.length; i++) {
			$scope.detailOrder[i].totalprice = new Intl.NumberFormat('de-DE').format($scope.detailOrder[i].productprice * $scope.detailOrder[i].quantity);
			$scope.detailOrder[i].productprice = new Intl.NumberFormat('de-DE').format($scope.detailOrder[i].productprice);
		}
		console.log($scope.detailOrder);
	}).catch(error => {
		console.log(error);
	})
	$scope.test123="selected";
})


function Dann(x){
	var id = document.getElementById(x);
	document.querySelector('#'+x).selected  = true;
	console.log(document.querySelector('#'+x))
	window.history.pushState('page2', 'Title', '?lang='+x);
	location.href = "?lang="+x;

}
