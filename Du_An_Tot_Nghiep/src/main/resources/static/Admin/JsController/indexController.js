
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
     	console.log(x);
	}
	$scope.initialize = function(){
        //Load Product
        $http.get("/rest/product").then(resp => {
            $scope.itemsall = resp.data;
            console.log($scope.itemsall);
          
        });
        
        $http.get("/rest/categoryfindAll").then(resp => {
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
	
	$scope.onChangeCombobox = function() {
		var search = document.querySelector(".search");
		console.log(search.value);
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
 