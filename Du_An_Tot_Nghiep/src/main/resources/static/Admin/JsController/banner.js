
app.controller("banner-ctrl", function($http, $scope) {

	$scope.items = [];
	$scope.itemsall = [];
	$scope.form = {};

	
	$scope.initialize = function(){
        //Load Product
        $http.get("/rest/banner").then(resp => {
            $scope.items = resp.data;
            //Chuyển ngày về date JavaScript
            $scope.items.forEach(item => {
                item.startdate = new Date(item.startdate);
                item.enddate = new Date(item.enddate);
            })
        });
        
        $http.get("/rest/bannerall").then(resp => {
            $scope.itemsall = resp.data;
            //Chuyển ngày về date JavaScript
            $scope.itemsall.forEach(item => {
                item.startdate = new Date(item.startdate);
                item.enddate = new Date(item.enddate);
            })
        });
        
    }
    

    //Start---------------------------------------------------------------------//
    $scope.initialize();
    
    //Clear form
    $scope.reset = function() {
		$scope.form = {
			productid: '',
			startdate: new Date(),
			enddate : new Date(),
			bannerpath: null
		}
	}
    
    //Edit item
    $scope.edit = function(item) {
        $scope.form = angular.copy(item);
		$(".nav-tabs .nav-item button.nav-link:eq(0)").tab('show');
	}
	
	//SaveAll
	$scope.create = function() {
		var item = angular.copy($scope.form);
		console.log(item);
			$http.post('/rest/banner', item).then(resp => {
				resp.data.startdate = new Date(resp.data.startdate);
				resp.data.enddate = new Date(resp.data.enddate);
				$scope.items.push(item);
				$scope.reset();
				$scope.items = [];
				$scope.itemsall = [];
				$scope.initialize();
				alert("Insert thành công");
			}).catch(error => {
				alert("Insert thất bại");
				console.log("Error", error);
			});	
	}	
	
	
	//Update
	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/banner/${item.bannerid}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.bannerid == item.bannerid);
			$scope.items[index] = item;
			$scope.reset();
			alert("Update thành công");
		}).catch(error => {
			alert("Update thất bại");
			console.log("Error", error);
		});
	}
	
	//Delete
	$scope.delete = function(item) {
		$http.delete(`/rest/banner/${item.bannerid}`).then(resp => {
			var index = $scope.itemsall.findIndex(p => p.bannerid == item.bannerid);
			$scope.itemsall.splice(index,1);
			$scope.reset();
			alert("Delete thành công");
		}).catch(error => {
			alert("Delete thất bại");
			console.log('Error', error);
		});
	}
	
	$scope.deleteall = function(item) {
		$http.delete(`/rest/banner/${item.bannerid}`).then(resp => {
			var index = $scope.items.findIndex(p => p.bannerid == item.bannerid);
			$scope.items.splice(index,1);
			$scope.reset();
			alert("Delete thành công");
		}).catch(error => {
			alert("Delete thất bại");
			console.log('Error', error);
		});
	}
	
	$scope.imageChanged = function(files){
		var data = new FormData();
		data.append("file",files[0]);
		$http.post('/rest/uploadImage/images',data,{
			transformRequest: angular.identity,
			headers:{'Content-Type':undefined}
		}).then(resp =>{
			$scope.form.bannerpath = resp.data.name;
		}).catch(error =>{
			alert('Lỗi Upload hình ảnh');
			console.log("Error",error);
		})
    }
	

});