
app.controller("vouchers-ctrl", function($http, $scope) {

	$scope.items = [];
	$scope.itemsall = [];
	$scope.form = {};
	$scope.chi_so = -1;
	
	$scope.initialize = function(){
		$scope.chi_so = -1;
        //Load Product
        $http.get("/rest/voucher/bydate").then(resp => {
            $scope.items = resp.data;
            //Chuyển ngày về date JavaScript
            $scope.items.forEach(item => {
                item.startdate = new Date(item.startdate);
                item.enddate = new Date(item.enddate);
            })
        });
        
        $http.get("/rest/voucher").then(resp => {
            $scope.itemsall = resp.data;
            //Chuyển ngày về date JavaScript
            $scope.itemsall.forEach(item => {
                item.startdate = new Date(item.startdate);
                item.enddate = new Date(item.enddate);
            })
        });
        
        
    }
    

    //Start-------------------------------------------------------------------------//
    $scope.initialize();
    
    //Clear form
    $scope.reset = function() {
		$scope.form = {
			voucherid: '',
			vouchertitle: '',
			vouchercontent: '',
			minimunmoney: '',
			percentdiscount: '',
			moneydiscount: '',
			quantity: '',
			startdate: new Date(),
			enddate : new Date(),
			imagevoucher: null
		}
		
		$scope.chi_so = -1;
	}
    
    //Edit item
    $scope.edit = function(item) {
        $scope.form = angular.copy(item);
		$(".nav-tabs .nav-item button.nav-link:eq(0)").tab('show');
		$scope.chi_so = 1;
	}
	
	//SaveAll
	$scope.create = function() {
		var item = angular.copy($scope.form);
		console.log(item);
			$http.post('/rest/voucher/insert', item).then(resp => {
				resp.data.startdate = new Date(resp.data.startdate);
				resp.data.enddate = new Date(resp.data.enddate);
				$scope.itemsall.push(item);
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
		$http.put(`/rest/voucher/${item.voucherid}`, item).then(resp => {
			var index = $scope.itemsall.findIndex(p => p.voucherid == item.voucherid);
			$scope.itemsall[index] = item;
			$scope.reset();
			$scope.items = [];
			$scope.itemsall = [];
			$scope.initialize();
			alert("Update thành công");
		}).catch(error => {
			alert("Update thất bại");
			console.log("Error", error);
		});
	}
	
	//Delete
	$scope.delete = function(item) {
		$http.delete(`/rest/voucher/${item.voucherid}`).then(resp => {
			var index = $scope.itemsall.findIndex(p => p.voucherid == item.voucherid);
			$scope.itemsall.splice(index,1);
			$scope.reset();
			$scope.items = [];
			$scope.itemsall = [];
			$scope.initialize();
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
		$http.post('/rest/uploadImageVoucher/images',data,{
			transformRequest: angular.identity,
			headers:{'Content-Type':undefined}
		}).then(resp =>{
			$scope.form.imagevoucher = resp.data.name;
		}).catch(error =>{
			alert('Lỗi Upload hình ảnh');
			console.log("Error",error);
		})
    }
	

});