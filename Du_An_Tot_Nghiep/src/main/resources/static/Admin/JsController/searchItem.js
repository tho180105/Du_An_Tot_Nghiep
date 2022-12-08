app.controller("menuHeader-ctrl", function ($http, $scope){

	$scope.itemscategorys = [];

	$scope.initialize = function (){
		$http.get("/rest/cate/findAll").then(resp => {
			$scope.itemscategorys = resp.data;
		});
	}
	$scope.initialize();
	$scope.getCategory = function (categoryid){
		window.localStorage.setItem("categoryid", categoryid);
		window.location.href = '/product/list';
	}
})

function searchItem(){
	let nameSearch = document.querySelector("#searchInput");
	window.localStorage.setItem("searchItem", nameSearch.value);
	window.location.href = '/product/list';
}