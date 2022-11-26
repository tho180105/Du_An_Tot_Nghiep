
app.controller("indexCtrl-ctrl", function($http, $scope) {

	
	$scope.itemsall = [];
	$scope.itemscategory = [];
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

	$scope.FilterByPrice = function (){
		let minimum = document.querySelector('#minamount').value;
		let maximum = document.querySelector('#maxamount').value;
		let mini = minimum.substring(1, minimum.length) * 23000;
		let max = maximum.substring(1, maximum.length) * 23000;
		$scope.itemsall.find(function (item){
			return (item.sellingprice < 300000)
		})
		console.log(mini);
		console.log(max);
		console.log($scope.itemsall);
	}

	$scope.initialize = function(){
		$scope.currentPage = 1;
		$scope.pageSize = 9;
        //Load Product
        $http.get("/rest/product/list2").then(resp => {
            $scope.itemsall = resp.data;
            console.log($scope.itemsall);
          
        });
        
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
	    
    $scope.pager = {
		page : 0,
		size : 9,
		
		get items() {
			var start = this.page * this.size;
			var end = start + this.size;
			return $scope.itemsall.slice(start, end);
		},
		
		get count() {
			return Math.ceil(1.0 * $scope.itemsall.length / this.size);
		},
		
		first() {
			this.page = 0;
		},
		
		prev() {
			this.page--;
			if(this.page < 0) {
				this.last();
			}
		},
		
		next() {
			this.page++;
			if(this.page >= this.count){
				this.first();
			}
		},
		
		last(){
			this.page = this.count - 1;
		}
	}
  

});


 