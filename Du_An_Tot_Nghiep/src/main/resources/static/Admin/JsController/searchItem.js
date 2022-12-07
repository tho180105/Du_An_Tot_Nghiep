app.controller("menuHeader-ctrl", function ($http, $scope){

	$scope.itemscategorys = [];

	$scope.initialize = function (){
		$http.get("/rest/cate/findAll").then(resp => {
			$scope.itemscategorys = resp.data;
			console.log($scope.itemscategorys);
		});
	}

	$scope.getCategory = function (categoryid){
		window.localStorage.setItem("categoryid", categoryid);
		window.location = '/product/list';
	}

	$scope.initialize();
})

function searchItem(){
	let nameSearch = document.querySelector("#searchInput");
	window.localStorage.setItem("searchItem", nameSearch.value);
	window.location = '/product/list';
}