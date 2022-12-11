
app.controller("indexCtrl-ctrl", function($http, $scope, $rootScope) {

	$scope.itemsall = [];
	$scope.itemscategory = [];
	$scope.searchData = window.localStorage.getItem("searchItem");
	$scope.categoryid = window.localStorage.getItem("categoryid");

	$scope.data = {
	    availableOptions: [
	      {id: '1', name: 'Mặc định'},
	      {id: '2', name: 'Từ A-Z'},
	      {id: '3', name: 'Từ Z-A'},
	      {id: '4', name: 'Giảm dần theo giá'},
	      {id: '5', name: 'Tăng dần theo giá'},
	    ],
	    selectedOption: {id: '1', name: 'Mặc định'} 
	    
    };

	$scope.setCurrent = function(num) {
		window.scrollTo(0 ,0);
		if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
			num = parseInt(num, 10);
			paginationService.setCurrentPage(paginationId, num);
		}
	};
	$scope.onchangeSearch = function(){
     	var x = $scope.data.selectedOption

		if(x.id == 2){
			$scope.itemsall.sort(function (a, b){
				if(a.productname.toLowerCase() < b.productname.toLowerCase()){
					return -1;
				}
			})
		}else if(x.id == 3){
			$scope.itemsall.sort(function (a, b){
				if(a.productname.toLowerCase() > b.productname.toLowerCase()){
					return -1;
				}
			})
		} else if(x.id == 4) {
			$scope.itemsall.sort(function (a,b){
				return b.sellingprice - a.sellingprice;
			})
		}else if(x.id == 5){
			$scope.itemsall.sort(function (a,b){
				return a.sellingprice - b.sellingprice;
			})
		}else{
			$scope.itemsall.sort(function (a,b){
				return b.productid - a.productid;
			})
		}
	}

	$scope.initialize = function(){
		$scope.currentPage = 1;
		$scope.pageSize = 9;

		if($scope.searchData.length > 0){
			$http.get(`/rest/product/searchData/${$scope.searchData}`).then(resp => {
				$scope.itemsall = resp.data;
				console.log($scope.itemsall);
			});
			window.localStorage.setItem("searchItem", '');
			$scope.searchData = '';
		}else  if($scope.categoryid > 0){
			$http.get(`/rest/product/category/${$scope.categoryid}`).then(resp => {
				$scope.itemsall = resp.data;
				console.log($scope.itemsall);
			});
			window.localStorage.setItem("categoryid", 0);
			$scope.categoryid = 0;
		}else{
			//Load Product
			$http.get("/rest/product/list2").then(resp => {
				$scope.itemsall = resp.data;
				console.log($scope.itemsall);
			});
		}

        $http.get("/rest/cate/findAll").then(resp => {
            $scope.itemscategory = resp.data;
            console.log($scope.itemscategory);
          
        });

	}
    
    $scope.getProductByCategory = function(categoryid) {
        $http.get(`/rest/product/category/${categoryid}`).then(resp => {
            $scope.itemsall = resp.data;
            console.log($scope.itemsall);
        });
	}

    //Start-------------------------------------------------------------------------//
    $scope.initialize();

	$scope.FilterByPrice = function (){
		let minimum = document.querySelector('#minamount').value;
		let maximum = document.querySelector('#maxamount').value;
		$http.get(`/rest/product/findByPrice/${minimum}/${maximum}`).then(resp => {
			$scope.itemsall = resp.data
		}).catch( error => {
			console.log('Error', error);
		})
	}

    $scope.pager = {
		page : 0,
		size : 9,

		get items() {
			var start = this.page * this.size;
			var end = start + this.size;
			return $scope.itemsall.slice(start, end);
		},
		get count() {
			return Math.ceil(1.0 * $scope.itemsall.length);
		}
	}
});





 