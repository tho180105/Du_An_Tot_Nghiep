/**
 * 
 */

 app.controller("account-ctrl", function ($timeout, $rootScope, $scope, $http) {
	var parentPhone = document.getElementById("checkPhoneCurrent");
	var child = document.getElementById("changePhoneChild");
	console.log(child);
	$http.get("/rest/account/getone").then(resp => {
		$scope.acc = resp.data;
		$scope.inPutPassword = "******";
		$scope.checkPhoneNull($scope.acc.phonenumber);
		if ($scope.acc.avatar == null) {
			$scope.reset();
		}
		console.log($scope.acc);
		$scope.securityEmail($scope.acc.email);
	}).catch(error => {
		console.log("Error", error);
	});
	$http.get("/rest/account").then(resp => {
		$scope.listAcc = resp.data;
	}).catch(error => {
		console.log("Error", error);
	});

	$scope.reset = function () {
		$scope.acc.avatar = "1.png";
	}

	$scope.checkPhoneNull = function (phone) {
		if ($scope.acc.phonenumber == null || $scope.acc.phonenumber == "") {
			$scope.phonenumberCurrent = "0327987350";
			parentPhone.removeChild(child);
			console.log(parentPhone);
		} else {
			$scope.securityPhone($scope.acc.phonenumber);
		}
	}
	$scope.checkPhoneAfterChange = function (phone) {
		if ($scope.acc.phonenumber != null) {
			parentPhone.appendChild(child);
			console.log(parentPhone);
			$scope.securityPhone($scope.acc.phonenumber);
		}
	}

	// đổi mật khẩu
	var count = 0;
	$scope.changePassword = function () {
		if($scope.passwordCurrent==null || $scope.passwordCurrent=="" ){
			$scope.checkPassCurrent = "Vui lòng không bỏ trống mật khẩu!";
			$scope.checkPassConfirm = null;
			$scope.checkPassNew = null;
			return;
		}
		if($scope.passwordNew == $scope.confirmPassword) {
			$scope.acc.password = $scope.passwordCurrent;
			$scope.passwordNew.text;
			var item = $scope.acc;
			$http.put("/rest/account/Change-Pass/"+$scope.passwordNew, item).then(resp => {
				if(resp.data == true){
					$scope.checkPassCurrent = null;
					$scope.checkPassNew = null;
					$scope.passwordNew = null;
					$scope.confirmPassword = null;
					$scope.passwordCurrent = null;
					$scope.resultPass = "Đổi mật khẩu thành công";
				}else{
					$scope.checkPassCurrent = "Sai mật khẩu";
					$scope.checkPassNew = null;
					$scope.passwordNew = null;
					$scope.confirmPassword = null;
					$scope.passwordCurrent = null;
					$scope.resultPass = null;
				}
				
			}).catch(error => {
				console.log(error);
			})
		}
		else{
				$scope.checkPassConfirm = "xác nhận mật khẩu không đúng!";
				$scope.checkPassCurrent = null;
				$scope.checkPassNew = null;
		}
	}

	

	//đổi tên
	$scope.changeName = function () {
		$scope.acc.name = $scope.nameNew;
		var item = $scope.acc;
		$http.put("/rest/account", item).then(resp => {
			$scope.resultName = "Đổi tên thành công !";
		}).catch(error => {
			console.log(error)
		})
	}

	// đổi sdt
	$scope.changePhone = function () {
		var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
		var vnf_regex1 = /((09|03|07|08|05)+([0-9]{8})\b)/g;
		$scope.resultPhone = null;
		if (vnf_regex.test($scope.phonenumberCurrent) == false) {
			console.log($scope.phonenumberCurrent);
			$scope.checkPhoneCurrent = "Số điện thoại không đúng định dạng!";
		} else {
			$scope.checkPhoneCurrent = null;
		}
		if (vnf_regex1.test($scope.phonenumberNew) == false) {
			console.log($scope.phonenumberNew);
			$scope.checkPhoneNew = "Số điện thoại không đúng định dạng!";
		} else {
			$scope.checkPhoneNew = null;
		}
		if ($scope.checkPhoneCurrent != null || $scope.checkPhoneNew != null) {
			return;
		}

		if ($scope.acc.phonenumber == null) {
			for (let i = 0; i < $scope.listAcc.length; i++) {
				if ($scope.listAcc[i].phonenumber == $scope.phonenumberNew) {
					$scope.checkPhoneNew = "Số điện thoại đã tồn tại!";
					return;
				}
			}
			$scope.acc.phonenumber = $scope.phonenumberNew;
			var item = $scope.acc;
			$scope.checkPhoneNew = null;
			$scope.checkPhoneCurrent = null;
			$http.put("/rest/account", item).then(resp => {
				$scope.resultPhone = "Đổi số điện thoại thành công";
				$scope.phonenumberCurrent = null;
				$scope.phonenumberNew = null;
				$scope.checkPhoneAfterChange($scope.acc.phonenumber);
				$scope.updateListAcc($scope.acc);
			}).catch(error => {
				console.log(error)
			})
		}
		else if ($scope.phonenumberCurrent == $scope.acc.phonenumber) {
			for (let i = 0; i < $scope.listAcc.length; i++) {
				if ($scope.listAcc[i].phonenumber == $scope.phonenumberNew) {
					$scope.checkPhoneNew = "Số điện thoại đã tồn tại!";
					return;
				}
			}
			$scope.acc.phonenumber = $scope.phonenumberNew;
			var item = $scope.acc;
			$scope.checkPhoneNew = null;
			$scope.checkPhoneCurrent = null;
			$http.put("/rest/account", item).then(resp => {
				$scope.resultPhone = "Đổi số điện thoại thành công";
				$scope.phonenumberCurrent = null;
				$scope.phonenumberNew = null;
				$scope.securityPhone($scope.acc.phonenumber);
				$scope.updateListAcc($scope.acc);
			}).catch(error => {
				console.log(error)
			})
		} else {
			$scope.checkPhoneCurrent = "Số điện thoại không đúng!";
			$scope.checkPhoneNew = null;
		}
	}

	//đổi Email
	$scope.changeEmail = function () {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var filter1 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		$scope.resultEmail = null;
		if (filter.test($scope.emailCurrent) == false) {
			$scope.checkEmailCurrent = "Email không đúng định dạng!";
		} else {
			$scope.checkEmailCurrent = null;
		}
		if (filter1.test($scope.emailNew) == false) {
			$scope.checkEmailNew = "Email không đúng định dạng!";
		} else {
			$scope.checkEmailNew = null;
		}
		if ($scope.checkEmailCurrent != null || $scope.checkEmailNew != null) {
			return;
		}
		if ($scope.emailCurrent == $scope.acc.email) {
			for (let i = 0; i < $scope.listAcc.length; i++) {
				if ($scope.listAcc[i].email == $scope.emailNew) {
					$scope.checkEmailNew = "Email đã tồn tại!";
					return;
				}
			}
			$scope.acc.email = $scope.emailNew;
			var item = $scope.acc;
			$scope.checkEmailCurrent = null;
			$scope.checkEmailNew = null;
			$http.put("/rest/account", item).then(resp => {
				$scope.securityEmail($scope.acc.email);
				$scope.resultEmail = "Đổi Email thành công";
				$scope.emailCurrent = null;
				$scope.emailNew = null;
				$scope.updateListAcc($scope.acc);
			}).catch(error => {
				console.log(error)
			})
		} else {
			$scope.checkEmailCurrent = "Email không đúng!"
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
				console.log($scope.acc);
			}).catch(error1 => {
				console.log(error1)
			})
		}).catch(error => {
			alert("Lỗi upload hình ảnh");
			console.log("Error", error);
		})
	}

	// bỏ ảnh
	$scope.resetImage = function () {
		$scope.reset();
		$http.put("/rest/account", $scope.acc).then(resp => {
			console.log($scope.acc);
		}).catch(error => {
			console.log(error)
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