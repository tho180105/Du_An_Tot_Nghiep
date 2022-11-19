
app.controller("checksize-ctrl", function($http, $scope){
	
	/**
		QUẢN LÝ CHECKSIZE
	 */
	$scope.sizeName = "";
	$scope.message = "";
	$scope.message1 = "";
	$scope.check = false;
	$scope.itemProduct = {};
	$scope.items = [];
	$scope.starNumber = 0;
	$scope.rate = {};
	$scope.sumQuantity = '';
	$scope.product = {};
	 
	 $scope.getSumProductRepo = function(){
		var x = location.href;
		var item = Number(x.slice(x.lastIndexOf('/')+1, x.length));
		$http.get(`/rest/productrepository/${item}`).then(resp => {
			$scope.sumQuantity = resp.data;
			if($scope.sumQuantity>0?$scope.sumQuantity: $scope.sumQuantity = 0)
			console.log($scope.sumQuantity);
		}).catch(error => {
			console.log("Error", error);
		});	
	} 
	 
	 $scope.getSumProductRepo();
	 
	 $scope.getOneProduct = function(){
		var x = location.href;
		var item = Number(x.slice(x.lastIndexOf('/')+1, x.length));
		$http.get(`/rest/product/${item}`).then(resp => {
			$scope.product = resp.data;
		});
	 }
	 $scope.getOneProduct();
	 
	 $scope.getSizegetItem = function(size) {
		var x = location.href;
		var item = Number(x.slice(x.lastIndexOf('/')+1, x.length));
		$scope.sizeName = size;
		
		$http.get(`/rest/productrepository/${item}/${size}`).then(resp => {
			$scope.itemProduct = resp.data;
			if ($scope.itemProduct.quantity != 0 && $scope.itemProduct.quantity != null && $scope.itemProduct.quantity != undefined) {
				$scope.message = "Có sẵn : "+$scope.itemProduct.quantity;
				$scope.check = false;
				var disabled = document.querySelector(".pd-cart");
            	disabled.style.backgroundColor = '#e7ab3c'
				console.log($scope.check);
			}else{
				$scope.message = "Tạm thời hết hàng";
				$scope.check = true;
				var disabled = document.querySelector(".pd-cart");
            	disabled.style.backgroundColor = '#808080'
				console.log($scope.check);
			}
			
		}).catch(error => {
			console.log("Error", error);
		});
		
			console.log(item);
			console.log(size);
			console.log($scope.itemProduct.quantity);
	}
	
	$scope.checkStars =  function(item){
        $scope.starNumber = item;
        console.log($scope.starNumber);
    }
	
	//Comment
	$scope.comment = function() {
		var comment = document.getElementById("comment").value;
		var x = location.href;
		var item = Number(x.slice(x.lastIndexOf('/')+1, x.length));
		if(comment.length == 0 && $scope.starNumber == 0){
			$scope.message1 = "Vui lòng chọn đánh giá hoặc nhập bình luận";
			return false;
		}
        $scope.rate = {
			content : comment,
			ratedate: new Date(),
			starnumber: $scope.starNumber,
			picture1: '',
			picture2: '',
			picture3: '',
			picture4: '',
			account: {
				accountid: 'anh'
			},
			product: {
				productid: item
			}
		}
        console.log($scope.rate);
        $http.post("/rest/Rate", $scope.rate).then(resp => {
			resp.data.ratedate = new Date(resp.data.ratedate);
			alert('Bình luận thành công');
			window.location= location.href;
		}).catch(error => {
			alert('Bình luận thất bại');
			console.log('Error', error);
		})
        
	}
	
	//Submit Add to Cart
	$scope.SubmitAddToCart = function() {
		var x = location.href;
		var item = Number(x.slice(x.lastIndexOf('/')+1, x.length));
		if($scope.sizeName == ''){
			$scope.message = 'Vui lòng chọn Size bạn mong muốn';
			return;
		}
		window.location.href='/cart/'+item;
	}
});
 
 