app.controller("product-ctrl", function ($scope, $http) {
	$scope.form = {};
	$scope.initialize = function () {
		$http.get("/rest/categoryAll").then(resp => {
			$scope.cates = resp.data;
		});
		$http.get("/rest/styles").then(resp => {
			$scope.styles = resp.data;
		});
		$http.get("/rest/products").then(resp => {
			$scope.items = resp.data;
		});
		$scope.reset();

	}

	$scope.reset = function () {
		$scope.form = {
			productid: '',
			productname: '',
			mainproductimage: '',
			describe: '',
			sellingprice: '',
			listedprice: '',
			purchaseprice: ''
		}
	}

	//$scope.edit = function(item){
	//	$scope.form = angular.copy(item);
	//$(".nav-tabs a:eq(0)").tab("0");
	//}
	$scope.edit = function (item) {
		console.log(item);
		$scope.form = angular.copy(item);
		$(".nav-tabs .nav-item button.nav-link:eq(0)").tab('show');
	}
	$scope.img = function (item) {
		console.log(item);
		$http.get(`/rest/imagesbyproduct/${item.productid}`).then(resp => {
			$scope.itemimgs = resp.data;
		});
		var itemimg = $scope.itemimgs[item.productid];
		$scope.formimg = angular.copy(itemimg);
		$(".nav-tabs .nav-item button.nav-link:eq(1)").tab('show');
	}

	$scope.create = function () {
		var item = angular.copy($scope.form);
		console.log(item);
		if ($scope.form.productid < 1) {
			$http.post(`/rest/products`, item).then(resp => {
				$scope.items.push(resp.data);
				$scope.reset();
				alert("Thêm mới sản phẩm thành công!");
			}).catch(error => {
				alert("Lỗi thêm mới sản phẩm!");
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

		$scope.imageChanged = function (files) {
			var data = new FormData();
			data.append("file", files[0]);
			$http.post('/rest/uploadImage/product', data, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			}).then(resp => {
				$scope.form.mainproductimage = resp.data.name;
			}).catch(error => {
				alert('Lỗi Upload hình ảnh');
				console.log("Error", error);
			})
		}

		$scope.initialize();

		$scope.pager = {
			page: 0,
			size: 5,
			get items() {
				if (this.page < 0) {
					this.last();
				}
				if (this.page >= this.count) {
					this.first();
				}
				var start = this.page * this.size;
				return $scope.items.slice(start, start + this.size)
			},
			get count() {
				return Math.ceil(1.0 * $scope.items.length / this.size);
			},
			first() {
				this.page = 0;
			},
			last() {
				this.page = this.count - 1;
			},
			next() {
				this.page++;
			},
			prev() {
				this.page--;
			}
		}
	});