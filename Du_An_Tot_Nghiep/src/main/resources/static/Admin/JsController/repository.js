app.controller("repository", function($scope, $http){
	$scope.initialize = function(){
		$http.get("/rest/sizes").then(resp => {
			$scope.sizes = resp.data;
		});
		$http.get("/rest/products").then(resp => {
			$scope.products = resp.data;
		});
		$http.get("/rest/repositorys").then(resp => {
			$scope.items = resp.data;
		});
		$scope.reset();
		
	}
	
	$scope.reset = function(){
		$scope.form = {
			productrepositoryid: '',
			quantity: '',
		}
	}

	//$scope.edit = function(item){
	//	$scope.form = angular.copy(item);
		//$(".nav-tabs a:eq(0)").tab("0");
	//}
	$scope.edit = function(item) {
		
        $scope.form = angular.copy(item);
		$(".nav-tabs .nav-item button.nav-link:eq(0)").tab('show');
	}

	$scope.create = function(){
		var item = angular.copy($scope.form);
		
		$http.post(`/rest/repositorys`, item).then(resp => {
			$scope.items.push(resp.data);
			$scope.reset();
			location.reload();
		Swal.fire({
					position: 'top-middle',
					icon: 'success',
					title: 'Thêm mới thành công!',
					showConfirmButton: false,
					timer: 1500
				})
		}).catch(error => {
				Swal.fire({
					position: 'top-middle',
					icon: 'error',
					title: 'Thêm mới thất bại',
					showConfirmButton: false,
					timer: 1500
				})
		});
	}

	$scope.update = function(){
		var item = angular.copy($scope.form);
		$http.put(`/rest/repositorys/${item.productrepositoryid}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.productrepositoryid == item.productrepositoryid);
			$scope.items[index] = item;
			Swal.fire({
					position: 'top-middle',
					icon: 'success',
					title: 'Cập nhật thành công!',
					showConfirmButton: false,
					timer: 1500
				})
		}).catch(error => {
				Swal.fire({
					position: 'top-middle',
					icon: 'error',
					title: 'Cập nhật thất bại',
					showConfirmButton: false,
					timer: 1500
				})
		});
	}

	$scope.delete = function(item){
		if(confirm("Bạn muốn xóa sản phẩm này?")){
			$http.delete(`/rest/repositorys/${item.productrepositoryid}`).then(resp => {
				var index = $scope.items.findIndex(p => p.productrepositoryid == item.productrepositoryid);
				$scope.items.splice(index, 1);
				$scope.reset();
				Swal.fire({
					position: 'top-middle',
					icon: 'success',
					title: 'Xóa thành công!',
					showConfirmButton: false,
					timer: 1500
				})
		}).catch(error => {
				Swal.fire({
					position: 'top-middle',
					icon: 'error',
					title: 'Xóa thất bại',
					showConfirmButton: false,
					timer: 1500
				})
			})
		}
	}

	$scope.initialize();

	$scope.pager = {
		page: 0,
		size: 5,
		get items(){
			if(this.page < 0){
				this.last();
			}
			if(this.page >= this.count){
				this.first();
			}
			var start = this.page*this.size;
			return $scope.items.slice(start, start + this.size)
		},
		get count(){
			return Math.ceil(1.0 * $scope.items.length / this.size);
		},
		first(){
			this.page = 0;
		},
		last(){
			this.page = this.count - 1;
		},
		next(){
			this.page++;
		},
		prev(){
			this.page--;
		}
	}
	$scope.cast = function(num){
		return String(num);
	}

});