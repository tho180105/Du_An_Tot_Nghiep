app.controller("size", function($scope, $http){
	$scope.form = {};
	$scope.initialize = function(){
		$http.get("/rest/sizes").then(resp => {
			$scope.items = resp.data;
		});
		$scope.reset();
		
	}
	
	$scope.reset = function(){
		$scope.form = {
			sizeid: '',
			describe: '',	
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
		if($scope.items.findIndex(p => p.sizeid == item.sizeid) >=0){
			Swal.fire({
					position: 'top-middle',
					icon: 'error',
					title: 'Mã size đã tồn tại',
					showConfirmButton: false,
					timer: 1500
				})
			return;
		}
		$http.post(`/rest/sizes`, item).then(resp => {
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
		if(!$scope.items.findIndex(p => p.sizeid == item.sizeid) >=0){
			Swal.fire({
					position: 'top-middle',
					icon: 'error',
					title: 'Mã size sản phẩm không tồn tại',
					showConfirmButton: false,
					timer: 1500
				})
			return;
		}
		$http.put(`/rest/sizes/${item.sizeid}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.sizeid == item.sizeid);
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
			$http.delete(`/rest/sizes/${item.sizeid}`).then(resp => {
				var index = $scope.items.findIndex(p => p.sizeid == item.sizeid);
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
		size: 10,
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
			var num = $scope.items.length;
			return Math.ceil(1.0 * num / this.size);
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
});