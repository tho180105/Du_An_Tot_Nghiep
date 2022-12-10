/**
 * 
 */

 app.controller("account-ctrl", function ($timeout, $rootScope, $scope, $http) {
	 //lưu div của phone
	var parentPhone = document.getElementById("checkPhoneCurrent");
	var child = document.getElementById("changePhoneChild");

	//thông báo
	 const Toast = Swal.mixin({
		 toast: true,
		 position: 'top-end',
		 showConfirmButton: false,
		 timer: 3000,
		 timerProgressBar: true,
		 didOpen: (toast) => {
			 toast.addEventListener('mouseenter', Swal.stopTimer)
			 toast.addEventListener('mouseleave', Swal.resumeTimer)
		 }
	 })




	$http.get("/rest/account/getone").then(resp => {
		$scope.acc = resp.data;
		$scope.inPutPassword = "******";
		$scope.checkPhoneNull($scope.acc.phonenumber);
		if ($scope.acc.avatar == null) {
			$scope.reset();
		}
		$scope.securityEmail($scope.acc.email);
	}).catch(error => {
	});
	$http.get("/rest/account").then(resp => {
		$scope.listAcc = resp.data;
	}).catch(error => {
	});

	$scope.reset = function () {
		$scope.acc.avatar = "1.png";
	}

	$scope.checkPhoneNull = function (phone) {
		if ($scope.acc.phonenumber == null || $scope.acc.phonenumber == "") {
			$scope.phonenumberCurrent = "0327987350";
			parentPhone.removeChild(child);
		} else {
			$scope.securityPhone($scope.acc.phonenumber);
		}
	}
	$scope.checkPhoneAfterChange = function (phone) {
		if ($scope.acc.phonenumber != null) {
			parentPhone.appendChild(child);
			$scope.securityPhone($scope.acc.phonenumber);
		}
	}

	// đổi mật khẩu
	var count = 0;
	$scope.changePassword = function () {
		if($scope.passwordNew == $scope.confirmPassword) {
			$scope.acc.password = $scope.passwordCurrent;
			var item = $scope.acc;
			$http.put("/rest/account/Change-Pass/"+$scope.passwordNew, item).then(resp => {
				if(resp.data == true){
					$scope.passwordNew = null;
					$scope.confirmPassword = null;
					$scope.passwordCurrent = null;
					Swal.fire({
						icon: 'success',
						title: 'Thông báo',
						text: 'Đổi mật khẩu thành công!',
					})
				}else{
					$scope.passwordNew = null;
					$scope.confirmPassword = null;
					$scope.passwordCurrent = null;
					Swal.fire({
						icon: 'error',
						title: 'Thông báo',
						text: 'Mật khẩu hiện tại không đúng!',
					})
				}
				
			}).catch(error => {
			})
		}
		else{
			$scope.confirmPassword = null;
			$scope.passwordCurrent = null;
			$scope.passwordNew = null;
			Swal.fire({
				icon: 'error',
				title: 'Thông báo',
				text: 'Xác nhận mật khẩu không đúng!',
			})
		}
	}

	

	//đổi tên
	$scope.changeName = function () {
		$scope.acc.name = $scope.nameNew;
		var item = $scope.acc;
		$http.put("/rest/account", item).then(resp => {
			Swal.fire({
				icon: 'success',
				title: 'Thông báo',
				text: 'Đổi họ tên thành công!',
			})
			$scope.nameNew = "";
		}).catch(error => {
		})
	}

	// đổi sdt
	$scope.changePhone = function () {
		var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
		var vnf_regex1 = /((09|03|07|08|05)+([0-9]{8})\b)/g;
		$scope.resultPhone = null;
		if (vnf_regex.test($scope.phonenumberCurrent) == false) {
			$scope.phonenumberCurrent = null;
			$scope.phonenumberNew = null;
			Swal.fire({
				icon: 'error',
				title: 'Thông báo',
				text: 'Số điện thoại hiện tại không đúng định dạng!',
			})
			return;
		}
		if (vnf_regex1.test($scope.phonenumberNew) == false) {
			$scope.phonenumberCurrent = null;
			$scope.phonenumberNew = null;
			Swal.fire({
				icon: 'error',
				title: 'Thông báo',
				text: 'Số điện thoại mới không đúng định dạng!',
			})
			return;
		}
		if ($scope.acc.phonenumber == null) {
			for (let i = 0; i < $scope.listAcc.length; i++) {
				if ($scope.listAcc[i].phonenumber == $scope.phonenumberNew) {
					$scope.phonenumberCurrent = null;
					$scope.phonenumberNew = null;
					Swal.fire({
						icon: 'error',
						title: 'Thông báo',
						text: 'Số điện thoại đã tồn tại!',
					})
					return;
				}
			}
			$scope.acc.phonenumber = $scope.phonenumberNew;
			var item = $scope.acc;
			$http.put("/rest/account", item).then(resp => {
				Swal.fire({
					icon: 'success',
					title: 'Thông báo',
					text: 'Đổi số điện thoại thảnh công!',
				})
				$scope.phonenumberCurrent = null;
				$scope.phonenumberNew = null;
				$scope.checkPhoneAfterChange($scope.acc.phonenumber);
				$scope.updateListAcc($scope.acc);
			}).catch(error => {
			})
		}
		else if ($scope.phonenumberCurrent == $scope.acc.phonenumber) {
			if($scope.phonenumberCurrent == $scope.phonenumberNew){
				$scope.phonenumberCurrent = null;
				$scope.phonenumberNew = null;
				Swal.fire({
					icon: 'error',
					title: 'Thông báo',
					text: 'Số điện thoại mới phải khác với số điện thoại hiện tại!',
				})
				return;
			}
			for (let i = 0; i < $scope.listAcc.length; i++) {
				if ($scope.listAcc[i].phonenumber == $scope.phonenumberNew) {
					$scope.phonenumberCurrent = null;
					$scope.phonenumberNew = null;
					Swal.fire({
						icon: 'error',
						title: 'Thông báo',
						text: 'Số điện thoại mới đã tồn tại!',
					})
					return;
				}
			}
			$scope.acc.phonenumber = $scope.phonenumberNew;
			var item = $scope.acc;
			$scope.checkPhoneNew = null;
			$scope.checkPhoneCurrent = null;
			$http.put("/rest/account", item).then(resp => {
				Swal.fire({
					icon: 'success',
					title: 'Thông báo',
					text: 'Đổi số điện thoại thảnh công!',
				})
				$scope.phonenumberCurrent = null;
				$scope.phonenumberNew = null;
				$scope.securityPhone($scope.acc.phonenumber);
				$scope.updateListAcc($scope.acc);
			}).catch(error => {
			})
		} else {
			$scope.phonenumberCurrent = null;
			$scope.phonenumberNew = null;
			Swal.fire({
				icon: 'error',
				title: 'Thông báo',
				text: 'Số điện thoại hiện tại không đúng!',
			})
		}
	}

	//đổi Email
	$scope.changeEmail = function () {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var filter1 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		$scope.resultEmail = null;
		if (filter.test($scope.emailCurrent) == false) {
			$scope.emailCurrent = null;
			$scope.emailNew = null;
			Swal.fire({
				icon: 'error',
				title: 'Thông báo',
				text: 'Email hiện tại không đúng định dạng!',
			})
			return;
		}
		if (filter1.test($scope.emailNew) == false) {
			$scope.emailCurrent = null;
			$scope.emailNew = null;
			Swal.fire({
				icon: 'error',
				title: 'Thông báo',
				text: 'Email mới không đúng định dạng!',
			})
			return;
		}
		if ($scope.emailCurrent == $scope.acc.email) {
			for (let i = 0; i < $scope.listAcc.length; i++) {
				if($scope.emailNew == $scope.emailCurrent){
					Swal.fire({
						icon: 'error',
						title: 'Thông báo',
						text: 'Email mới phải khác Email hiện tại!',
					})
					$scope.emailCurrent = null;
					$scope.emailNew = null;
					return;
				}
				if ($scope.listAcc[i].email == $scope.emailNew) {
					Swal.fire({
						icon: 'error',
						title: 'Thông báo',
						text: 'Email mới đã tồn tại!',
					})
					$scope.emailCurrent = null;
					$scope.emailNew = null;
					return;
				}
			}
			$scope.acc.email = $scope.emailNew;
			var item = $scope.acc;
			$http.put("/rest/account", item).then(resp => {
				$scope.securityEmail($scope.acc.email);
				Swal.fire({
					icon: 'success',
					title: 'Thông báo',
					text: 'Đổi Email thành công!',
				})
				$scope.emailCurrent = null;
				$scope.emailNew = null;
				$scope.updateListAcc($scope.acc);
			}).catch(error => {
			})
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Thông báo',
				text: 'Email hiện tại không đúng!',
			})
			$scope.emailCurrent = null;
			$scope.emailNew = null;
		}
	}

	// che Số điện thoại
	$scope.securityPhone = function (sdt) {
		var temp = sdt.substring(sdt.length - 3, sdt.length);
		$scope.sdt = "";
		for (let i = 0; i < sdt.length - 3; i++) {
			$scope.sdt += "*";
		}
		$scope.sdt = $scope.sdt + temp;
	}

	// che Email
	$scope.securityEmail = function (email) {
		var temp = email.substring(0, 5);
		$scope.email = "";
		for (let i = 0; i < email.length - 5; i++) {
			$scope.email += "*";
		}
		$scope.email = temp + $scope.email;
	}

	// đổi ảnh
	$scope.imageChanged = function (files) {
		var data = new FormData();
		data.append('file', files[0]);
		if (files[0] == null) {
			return;
		}
		$http.post('/rest/upload/avatars', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			$scope.acc.avatar = resp.data.name;
			var item = $scope.acc;
			$http.put("/rest/account", item).then(resp1 => {
				files = null;
			}).catch(error1 => {
			})
		}).catch(error => {
			alert("Lỗi upload hình ảnh");
		})
	}

	// bỏ ảnh
	$scope.resetImage = function () {
		$scope.reset();
		$http.put("/rest/account", $scope.acc).then(resp => {
		}).catch(error => {
		})
	}

	$scope.updateListAcc = function (acc) {
		for (let i = 0; i < $scope.listAcc.length; i++) {
			if ($scope.listAcc[i].accountid == acc.accountid) {
				$scope.listAcc[i] = acc;
				return;
			}
		}
	}

	$scope.close = function () {
		$scope.checkEmailCurrent = null;
		$scope.checkEmailNew = null;
		$scope.resultEmail = null;
		$scope.emailCurrent = null;
		$scope.emailNew = null;
	}

	

})