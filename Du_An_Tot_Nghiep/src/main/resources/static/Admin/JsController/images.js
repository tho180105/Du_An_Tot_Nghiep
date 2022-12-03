app.controller("images", function ($scope, $http) {
    $scope.form = {};
	$scope.initialize = function () {
		$http.get("/rest/products").then(resp => {
			$scope.products = resp.data;
		});
		$scope.reset();

	};
    $scope.change = function (productid) {
		$http.get(`/rest/imagesbyproduct/${productid}`).then(resp => {
			$scope.itemimgs = resp.data;
		});
	};

	$scope.reset = function () {
		$scope.form = {
			additionalimagesid: '',
			imagepath: '',
		}
	};

	$scope.imageChanged = function (files) {
        var data = new FormData();
        data.append("file", files[0]);
        $http.post('/rest/upload/products-main', data, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(resp => {
            $scope.form.imagepath = resp.data.name;
        }).catch(error => {
            alert('Lỗi Upload hình ảnh');
            console.log("Error", error);
        })
    }
	$scope.edit = function (item) {
		console.log(item);
		$scope.form = angular.copy(item);
		$(".nav-tabs .nav-item button.nav-link:eq(0)").tab('show');
	};

	$scope.create = function () {
		var item = angular.copy($scope.form);
		console.log(item);
		if ($scope.form.additionalimagesid < 1) {
			$http.post(`/rest/images`, item).then(resp => {
				$scope.items.push(resp.data);
				$scope.reset();
				alert("Thêm mới hình sản phẩm thành công!");
			}).catch(error => {
				alert("Lỗi thêm mới hình sản phẩm!");
				console.log("Error", error);
			});
		} 
		else {
			if (confirm("Sản phẩm đã có, bạn có muốn cập nhật sản phảm")) {
				$http.put(`/rest/products/${item.productid}`, item).then(resp => {
					var index = $scope.items.findIndex(p => p.productid == item.productid);
					$scope.items[index] = item;
					alert("Cập nhật sản phẩm thành công!");
				})
				.catch(error => {
					alert("Lỗi cập nhật sản phẩm!");
					console.log("Error", error);
				});
			}
		}
	}

		$scope.update = function () {
			var item = angular.copy($scope.form);
			if($scope.form.productid < 1){
				alert("Vui lòng chọn sản phẩm");
				return;
			}
			$http.put(`/rest/products/${item.productid}`, item).then(resp => {
				var index = $scope.items.findIndex(p => p.productid == item.productid);
				$scope.items[index] = item;
				alert("Cập nhật sản phẩm thành công!");
			})
				.catch(error => {
					alert("Lỗi cập nhật sản phẩm!");
					console.log("Error", error);
				});
		}

		$scope.delete = function (item) {
			if (confirm("Bạn muốn xóa sản phẩm này?")) {
				$http.delete(`/rest/products/${item.productid}`).then(resp => {
					var index = $scope.items.findIndex(p => p.productid == item.productid);
					$scope.items.splice(index, 1);
					$scope.reset();
					alert("Xóa sản phẩm thành công!");

				}).catch(error => {
					alert("Lỗi xóa sản phẩm!");
					console.log("Error", error);
				})
			}
		}

		$scope.initialize();
        $scope.change();

		// $scope.pager = {
		// 	page: 0,
		// 	size: 5,
		// 	get items() {
		// 		if (this.page < 0) {
		// 			this.last();
		// 		}
		// 		if (this.page >= this.count) {
		// 			this.first();
		// 		}
		// 		var start = this.page * this.size;
		// 		return $scope.items.slice(start, start + this.size)
		// 	},
		// 	get count() {
		// 		return Math.ceil(1.0 * $scope.items.length / this.size);
		// 	},
		// 	first() {
		// 		this.page = 0;
		// 	},
		// 	last() {
		// 		this.page = this.count - 1;
		// 	},
		// 	next() {
		// 		this.page++;
		// 	},
		// 	prev() {
		// 		this.page--;
		// 	}
		// }
	});