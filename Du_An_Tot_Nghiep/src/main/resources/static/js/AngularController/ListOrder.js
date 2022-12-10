app.controller("ListOrder-ctrl", function ($rootScope, $scope, $http) {
//thông báo
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})

	$http.get("/rest/ListOrder/order").then(resp => {
		
		$rootScope.order = resp.data;
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
					$scope.listDetailOrder[j].totalPrice = new Intl.NumberFormat('de-DE').format($scope.listDetailOrder[j].productprice * $scope.listDetailOrder[j].quantity);
					item.push($scope.listDetailOrder[j]);

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
		var index = $scope.order.findIndex(x => x.orderid ==item);
		$scope.order[index].orderstatus.orderstatusid =3;
		$scope.order[index].orderstatus.orderstatustitle ="Đã hủy";
		$http.put("/rest/order",$scope.tempOrder[tempOrder]).then(resp =>{
			Swal.fire({
				icon: 'success',
				title: 'Thông báo',
				text: 'Hủy đơn hàng thành công!',
			})
		}).catch(error => {
		})
	}

})

app.controller("DetailOrder-ctrl", function ($rootScope, $scope, $http) {
	$scope.test = "";
	var id = location.href.substring(location.href.lastIndexOf("/"), location.href.length);
	$http.get("/rest/ListOrder/detailOrder" + id).then(resp => {
		$scope.detailOrder = resp.data;
		// xử lý ngày tháng năm
		$scope.detailOrder[0].orders.createdate = new Date($scope.detailOrder[0].orders.createdate);
		// format tiền (10.000,00)
		// $scope.detailOrder[0].orders.totalNoneDiscount = new Intl.NumberFormat('de-DE').format($scope.detailOrder[0].orders.shipfee + $scope.detailOrder[0].orders.productmoney);
		$scope.detailOrder[0].orders.totalmoneyFormat = new Intl.NumberFormat('de-DE').format($scope.detailOrder[0].orders.totalmoney);
		$scope.detailOrder[0].orders.shipfee = new Intl.NumberFormat('de-DE').format($scope.detailOrder[0].orders.shipfee);
		//
		$scope.detailOrder[0].orders.totalNoneDiscount = 0;
		for (let i = 0; i < $scope.detailOrder.length; i++) {
			var sum = $scope.detailOrder[i].listedprice * $scope.detailOrder[i].quantity;
			$scope.detailOrder[i].totalprice = new Intl.NumberFormat('de-DE').format($scope.detailOrder[i].listedprice * $scope.detailOrder[i].quantity);
			$scope.detailOrder[i].discountDetail = new Intl.NumberFormat('de-DE').format($scope.detailOrder[i].listedprice - $scope.detailOrder[i].productprice);
			$scope.detailOrder[i].listedprice = new Intl.NumberFormat('de-DE').format($scope.detailOrder[i].listedprice);
			$scope.detailOrder[0].orders.totalNoneDiscount += sum;
		}
		$scope.detailOrder[0].orders.discountPrice = new Intl.NumberFormat('de-DE').format($scope.detailOrder[0].orders.totalNoneDiscount - $scope.detailOrder[0].orders.productmoney);
		$scope.detailOrder[0].orders.totalNoneDiscount = new Intl.NumberFormat('de-DE').format($scope.detailOrder[0].orders.totalNoneDiscount);
	}).catch(error => {
	})
	$scope.test123="selected";
	$scope.mangdangonngu = 
		[	
			{
				"name":"vi",
				"image":"/img/flag-1.jpg"
			},
			{
				"name":"en",
				"image":"/img/flag-1.jpg"
			}
		];
	$scope.nn=$scope.mangdangonngu[0].value;
	$scope.ann = function (){
		alert("test");
		/*var id = document.getElementById(x);
		document.querySelector('#'+x).selected  = true;
		console.log(document.querySelector('#'+x))
		
		window.history.pushState('page2', 'Title', '?lang='+x);
		location.href = "?lang="+x;*/
	
	}
	
})

function startDNN(){
	var nn =localStorage.getItem('nn');


	
	if(!nn){
		nn='en'
	}
	if(nn!=='vi'){
		document.getElementById("vnoption").removeAttribute("selected")
		document.getElementById("enoption").selected ='selected'
		
	}else{
		document.getElementById("enoption").removeAttribute("selected")
		document.getElementById("vnoption").selected ='selected'
	}
		
	
	}
	function Dann(x){

	if(x!=='vi'){
		localStorage.setItem('nn', 'en');
		document.getElementById("vnoption").removeAttribute("selected")
		document.getElementById("enoption").selected
		
	}else{
		localStorage.setItem('nn', 'vi');
		document.getElementById("enoption").removeAttribute("selected")
		document.getElementById("vnoption").selected
	}
		/*var id = document.getElementById(x);
		document.querySelector('#'+x).selected  = true;
		console.log(document.querySelector('#'+x))
		
		window.history.pushState('page2', 'Title', '?lang='+x);*/
	location.href = "?lang="+x;
	
	}
startDNN()
