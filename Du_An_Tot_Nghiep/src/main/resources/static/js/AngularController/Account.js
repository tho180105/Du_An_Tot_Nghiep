/**
 * 
 */

app.controller("account-ctrl", function ($timeout, $rootScope, $scope, $http) {
	var parentPhone = document.getElementById("checkPhoneCurrent");
	var child = document.getElementById("changePhoneChild");
	console.log(child);
	$http.get("/rest/account/getone").then(resp => {
		$scope.acc = resp.data;
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
		if ($scope.passwordCurrent == $scope.acc.password) {
			if ($scope.passwordNew == $scope.confirmPassword) {
				$scope.acc.password = $scope.passwordNew;
				var item = $scope.acc;
				$http.put("/rest/account", item).then(resp => {
					$scope.checkPassCurrent = null;
					$scope.checkPassNew = null;
					$scope.passwordNew = null;
					$scope.confirmPassword = null;
					$scope.passwordCurrent = null;
					$scope.resultPass = "Đổi mật khẩu thành công"
				}).catch(error => {
					console.log(error)
				})
			} else {
				$scope.checkPassConfirm = "xác nhận mật khẩu không đúng!";
				$scope.checkPassCurrent = null;
				$scope.checkPassNew = null;
			}
		} else {
			$scope.checkPassCurrent = "Mật khẩu không đúng!";
			$scope.checkPassConfirm = null;
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

	// ///GET CITY
	// $http({
	// 	method: "GET",
	// 	url: "http://sandbox.goship.io/api/v2/cities",
	// 	headers: {
	// 	  "Content-Type": "application/json",
	// 	  Accept: "application/json",
	// 	  Authorization:
	// 		"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4In0.eyJhdWQiOiIxMyIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4IiwiaWF0IjoxNjYyOTkzMjQxLCJuYmYiOjE2NjI5OTMyNDEsImV4cCI6NDgxODY2Njg0MSwic3ViIjoiMzE4OSIsInNjb3BlcyI6W119.RzxNMS8bWdklm_YXgxtXZ0lSJuecwCmaiWXbuPrhsBkzAS7dLkfEmoPu4bLieDzSWS2v_yeH8XdiqyRim9xbLsOoplo_w0TboQrZXRxWNhw7aFWalp8TfwR04xm79xgWPHhFe1oqMQ6NCcQKarPvsf9alRuupUnBmyi_PueILbeJsT5Ek_MMXALYwAVlmepzHvwF8x_KQ5Ha_TR2S2xNE_htR8MS9eyfss4mvflfUpvTXgF1YUIl5KlQj5duAluGvXadwp-4g_ImFPljFplTxhF0UQ1C7ohW1GkoA_QUFSyLDUfBkMXTaq_slRGd7aUDgHDDy4cgeTAetmlrYtqImJlocL0bzIaHBur6ieXp2UnYKFTlozZN2MUKvmLuwhO5tXJRo4uBfLJAP9nC8BzoPvq4OUDJ43gRYK05uVF8Yq2YqvXftcyixv5bt3KYS3EG82ku0W83drteuVnF0kjxCipykGgFwjZO1Sj8X7vTeqGXk5kfI5zYeu6N11BJgWrVpJxz0lsRlJ7vuxzAFaRUhrp-8v2bhdaPCQl9L2RIDHsX-gG3NNR6dpd6u0JvDfofh4fgp9VWR8BJcHr17_kHp70ZlBdB-anxUYISVi5SI5l0sCLQXzvhqz2guvyZKbj0xieb67dQgpMlipXouQb-xBnIQFN7j0b8j_kACXqxPGU",
	// 	},
	//   }).then(
	// 	function successCallback(response) {
	// 	  $rootScope.province = response.data;
	// 	  setTimeout(init, 200);
	// 	},
	// 	function errorCallback(response) {
	// 	  console.log(response);
	// 	}
	//   );
	//   /// GET DISTRICT
	//   $http({
	// 	method: "GET",
	// 	url: "http://sandbox.goship.io/api/v2/districts?page=1&size=1000",
	// 	headers: {
	// 	  "Content-Type": "application/json",
	// 	  Accept: "application/json",
	// 	  Authorization:
	// 		"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4In0.eyJhdWQiOiIxMyIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4IiwiaWF0IjoxNjYyOTkzMjQxLCJuYmYiOjE2NjI5OTMyNDEsImV4cCI6NDgxODY2Njg0MSwic3ViIjoiMzE4OSIsInNjb3BlcyI6W119.RzxNMS8bWdklm_YXgxtXZ0lSJuecwCmaiWXbuPrhsBkzAS7dLkfEmoPu4bLieDzSWS2v_yeH8XdiqyRim9xbLsOoplo_w0TboQrZXRxWNhw7aFWalp8TfwR04xm79xgWPHhFe1oqMQ6NCcQKarPvsf9alRuupUnBmyi_PueILbeJsT5Ek_MMXALYwAVlmepzHvwF8x_KQ5Ha_TR2S2xNE_htR8MS9eyfss4mvflfUpvTXgF1YUIl5KlQj5duAluGvXadwp-4g_ImFPljFplTxhF0UQ1C7ohW1GkoA_QUFSyLDUfBkMXTaq_slRGd7aUDgHDDy4cgeTAetmlrYtqImJlocL0bzIaHBur6ieXp2UnYKFTlozZN2MUKvmLuwhO5tXJRo4uBfLJAP9nC8BzoPvq4OUDJ43gRYK05uVF8Yq2YqvXftcyixv5bt3KYS3EG82ku0W83drteuVnF0kjxCipykGgFwjZO1Sj8X7vTeqGXk5kfI5zYeu6N11BJgWrVpJxz0lsRlJ7vuxzAFaRUhrp-8v2bhdaPCQl9L2RIDHsX-gG3NNR6dpd6u0JvDfofh4fgp9VWR8BJcHr17_kHp70ZlBdB-anxUYISVi5SI5l0sCLQXzvhqz2guvyZKbj0xieb67dQgpMlipXouQb-xBnIQFN7j0b8j_kACXqxPGU",
	// 	},
	//   }).then(
	// 	function successCallback(response) {
	// 	  $rootScope.district = response.data;
	// 	},
	// 	function errorCallback(response) {
	// 	  console.log(response);
	// 	}
	//   );

	//   $scope.getDistrictAfterSelectProvince = function () {
	// 	$timeout(function () {
	// 	  let provinceSelectedName =
	// 		document.getElementById("province_search").value;
	// 	  let placeholderSearch = document
	// 		.getElementById("province_search")
	// 		.getAttribute("placeholder");
	// 	  if (provinceSelectedName.localeCompare("") == 0) {
	// 		return;
	// 	  }
	// 	  if (provinceSelectedName.localeCompare(placeholderSearch) != 0) {
	// 		document.getElementById("district_search").value = "";
	// 		document
	// 		  .getElementById("district_search")
	// 		  .setAttribute("placeholder", "Select district");
	// 		document.getElementById("ward_search").value = "";
	// 		document
	// 		  .getElementById("ward_search")
	// 		  .setAttribute("placeholder", "Select ward");
	// 	  }
	// 	  $scope.provinceSelectedElement = $rootScope.province.data.filter(
	// 		(element) => element.name == provinceSelectedName
	// 	  );
	// 	  $scope.districts = $rootScope.district.data.filter(
	// 		(element) => element.city_id == $scope.provinceSelectedElement[0].id
	// 	  );
	// 	  setTimeout(setEventAfterClick, 500, "district");
	// 	}, 400);
	//   };
	//   $scope.getWardAfterSelectDistrict = function () {
	// 	$timeout(function () {
	// 	  let districtSelectedName =
	// 		document.getElementById("district_search").value;
	// 	  let placeholderSearch = document
	// 		.getElementById("district_search")
	// 		.getAttribute("placeholder");
	// 	  if (districtSelectedName.localeCompare("") == 0) {
	// 		return;
	// 	  }
	// 	  if (districtSelectedName.localeCompare(placeholderSearch) != 0) {
	// 		document.getElementById("ward_search").value = "";
	// 		document
	// 		  .getElementById("ward_search")
	// 		  .setAttribute("placeholder", "Select ward");
	// 	  }
	// 	  $scope.districtSelectedElement = $rootScope.district.data.filter(
	// 		(element) => element.name == districtSelectedName
	// 	  );
	// 	  $http({
	// 		method: "GET",
	// 		url:
	// 		  "http://sandbox.goship.io/api/v2/districts/" +
	// 		  $scope.districtSelectedElement[0].id +
	// 		  "/wards",
	// 		headers: {
	// 		  "Content-Type": "application/json",
	// 		  Accept: "application/json",
	// 		  Authorization:
	// 			"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4In0.eyJhdWQiOiIxMyIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4IiwiaWF0IjoxNjYyOTkzMjQxLCJuYmYiOjE2NjI5OTMyNDEsImV4cCI6NDgxODY2Njg0MSwic3ViIjoiMzE4OSIsInNjb3BlcyI6W119.RzxNMS8bWdklm_YXgxtXZ0lSJuecwCmaiWXbuPrhsBkzAS7dLkfEmoPu4bLieDzSWS2v_yeH8XdiqyRim9xbLsOoplo_w0TboQrZXRxWNhw7aFWalp8TfwR04xm79xgWPHhFe1oqMQ6NCcQKarPvsf9alRuupUnBmyi_PueILbeJsT5Ek_MMXALYwAVlmepzHvwF8x_KQ5Ha_TR2S2xNE_htR8MS9eyfss4mvflfUpvTXgF1YUIl5KlQj5duAluGvXadwp-4g_ImFPljFplTxhF0UQ1C7ohW1GkoA_QUFSyLDUfBkMXTaq_slRGd7aUDgHDDy4cgeTAetmlrYtqImJlocL0bzIaHBur6ieXp2UnYKFTlozZN2MUKvmLuwhO5tXJRo4uBfLJAP9nC8BzoPvq4OUDJ43gRYK05uVF8Yq2YqvXftcyixv5bt3KYS3EG82ku0W83drteuVnF0kjxCipykGgFwjZO1Sj8X7vTeqGXk5kfI5zYeu6N11BJgWrVpJxz0lsRlJ7vuxzAFaRUhrp-8v2bhdaPCQl9L2RIDHsX-gG3NNR6dpd6u0JvDfofh4fgp9VWR8BJcHr17_kHp70ZlBdB-anxUYISVi5SI5l0sCLQXzvhqz2guvyZKbj0xieb67dQgpMlipXouQb-xBnIQFN7j0b8j_kACXqxPGU",
	// 		},
	// 	  }).then(
	// 		function successCallback(response) {
	// 		  $rootScope.wards = response.data.data;
	// 		  //   setTimeout(setEventAfterClick, 300, "ward");
	// 		  setTimeout(setEventAfterClickWard, 300, "ward");
	// 		},
	// 		function errorCallback(response) {
	// 		  console.log(response);
	// 		}
	// 	  );
	// 	}, 200);
	//   };

	//   $scope.calculateFeeALL = function () {
	// 	bodyData.shipment.address_to.city = $scope.provinceSelectedElement[0].id;
	// 	bodyData.shipment.address_to.district = $scope.districtSelectedElement;
	// 	$http({
	// 	  method: "POST",
	// 	  url: "http://sandbox.goship.io/api/v2/rates",
	// 	  data: bodyData,
	// 	  headers: {
	// 		"Content-Type": "application/json",
	// 		Accept: "application/json",
	// 		Authorization:
	// 		  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4In0.eyJhdWQiOiIxMyIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4IiwiaWF0IjoxNjYyOTkzMjQxLCJuYmYiOjE2NjI5OTMyNDEsImV4cCI6NDgxODY2Njg0MSwic3ViIjoiMzE4OSIsInNjb3BlcyI6W119.RzxNMS8bWdklm_YXgxtXZ0lSJuecwCmaiWXbuPrhsBkzAS7dLkfEmoPu4bLieDzSWS2v_yeH8XdiqyRim9xbLsOoplo_w0TboQrZXRxWNhw7aFWalp8TfwR04xm79xgWPHhFe1oqMQ6NCcQKarPvsf9alRuupUnBmyi_PueILbeJsT5Ek_MMXALYwAVlmepzHvwF8x_KQ5Ha_TR2S2xNE_htR8MS9eyfss4mvflfUpvTXgF1YUIl5KlQj5duAluGvXadwp-4g_ImFPljFplTxhF0UQ1C7ohW1GkoA_QUFSyLDUfBkMXTaq_slRGd7aUDgHDDy4cgeTAetmlrYtqImJlocL0bzIaHBur6ieXp2UnYKFTlozZN2MUKvmLuwhO5tXJRo4uBfLJAP9nC8BzoPvq4OUDJ43gRYK05uVF8Yq2YqvXftcyixv5bt3KYS3EG82ku0W83drteuVnF0kjxCipykGgFwjZO1Sj8X7vTeqGXk5kfI5zYeu6N11BJgWrVpJxz0lsRlJ7vuxzAFaRUhrp-8v2bhdaPCQl9L2RIDHsX-gG3NNR6dpd6u0JvDfofh4fgp9VWR8BJcHr17_kHp70ZlBdB-anxUYISVi5SI5l0sCLQXzvhqz2guvyZKbj0xieb67dQgpMlipXouQb-xBnIQFN7j0b8j_kACXqxPGU",
	// 	  },
	// 	}).then(
	// 	  function successCallback(response) {
	// 		$rootScope.phigiaohang = response.data;
	// 		// console.log($rootScope.phigiaohang)
	// 		// $rootScope.phigiaohang.data.forEach
	// 	  },
	// 	  function errorCallback(response) {
	// 		console.log(response);
	// 	  }
	// 	);
	//   };
	//   function showDropDown() {
	// 	this.nextElementSibling.style.display = "block";
	//   }
	//   function offDropDown() {
	// 	this.parentElement.style.display = "none";
	//   }
	//   function turnOffDropDownWhenClickOut(container, dropdown, e, address) {
	// 	if (!container.is(e.target) && container.has(e.target).length === 0) {
	// 	  dropdown.hide();
	// 	  ClickOutDropdownPlaceholderChangeToValue(address);
	// 	}
	//   }
	//   function ClickOutDropdownPlaceholderChangeToValue(address) {
	// 	var divOptions = document
	// 	  .getElementById("dropdown_" + address)
	// 	  .getElementsByTagName("div");
	// 	document.getElementById("dropdown_" + address).style.cursor = "pointer";
	// 	var searchElement = document.getElementById(address + "_search");
	// 	var placeholderSearch = searchElement.getAttribute("placeholder");
	// 	var compareString = "Select " + address;
	// 	//Trường hợp không Not found
	// 	// Nếu place khác mặc định + value rỗng
	// 	if (
	// 	  placeholderSearch.localeCompare(compareString) != 0 &&
	// 	  searchElement.value.localeCompare("") == 0
	// 	) {
	// 	  searchElement.value = placeholderSearch; // đủ điều kiện đề chuyển placeholder thành value
	// 	}
	// 	//Trường hợp  Not found
	// 	for (let x in divOptions) {
	// 	  if (divOptions[x].innerHTML == "Not found") {
	// 		document.getElementById(
	// 		  "dropdown_" + address
	// 		).previousElementSibling.value = "";
	// 		divOptions[x].remove();
	// 		if (placeholderSearch.localeCompare(compareString) != 0) {
	// 		  searchElement.value = searchElement.getAttribute("placeholder");
	// 		}
	// 	  }
	// 	}
	// 	getProperOption(
	// 	  divOptions,
	// 	  searchElement,
	// 	  placeholderSearch,
	// 	  compareString
	// 	);
	//   }
	//   function getProperOption(
	// 	divOptions,
	// 	searchElement,
	// 	placeholderSearch,
	// 	compareString
	//   ) {
	// 	var checkEqualNewValueVsOptions = false;
	// 	for (let index = 0; index < divOptions.length; index++) {
	// 	  const element = divOptions[index];
	// 	  if (searchElement.value.localeCompare(element.innerHTML) == 0) {
	// 		checkEqualNewValueVsOptions = true;
	// 	  }
	// 	}

	// 	if (
	// 	  searchElement.value.localeCompare("") != 0 &&
	// 	  searchElement.value.localeCompare(placeholderSearch) != 0 &&
	// 	  !checkEqualNewValueVsOptions
	// 	) {
	// 	  for (let index = 0; index < divOptions.length; index++) {
	// 		const element = divOptions[index];
	// 		if (element.style.display != "none") {
	// 		  searchElement.value = element.innerHTML;
	// 		  break;
	// 		}
	// 	  }
	// 	}
	//   }
	//   var getProvinceID = function () {
	// 	var attribute = this.innerHTML;
	// 	this.parentElement.previousElementSibling.value = attribute;
	//   };

	//   function valueChangeToPlaceHolder() {
	// 	if (!this.value == "") {
	// 	  this.setAttribute("placeholder", this.value);
	// 	  this.value = "";
	// 	}
	//   }

	//   function filterFunction() {
	// 	var input, filter, ul, li, a, i;
	// 	input = this;
	// 	filter = input.value.toUpperCase();
	// 	div = this.nextElementSibling;
	// 	a = div.getElementsByTagName("div");
	// 	var Available = false;
	// 	for (i = 0; i < a.length; i++) {
	// 	  txtValue = a[i].textContent || a[i].innerText;
	// 	  if (txtValue.toUpperCase().indexOf(filter) > -1) {
	// 		a[i].style.display = "";
	// 		Available = true;
	// 	  } else {
	// 		a[i].style.display = "none";
	// 	  }
	// 	  if (a[i].innerText === "Not found") {
	// 		a[i].remove();
	// 	  }
	// 	}
	// 	if (!Available) {
	// 	  var style = document.createElement("div");
	// 	  style.innerHTML = "Not found";
	// 	  div.appendChild(style);
	// 	  div.style.cursor = "no-drop";
	// 	} else {
	// 	  div.style.cursor = "pointer";
	// 	}
	//   }
	//   function showAll() {
	// 	var a, div;
	// 	div = this.nextElementSibling;
	// 	a = div.getElementsByTagName("div");
	// 	for (i = 0; i < a.length; i++) {
	// 	  a[i].style.display = "block";
	// 	}
	//   }
	//   function init() {
	// 	var addressOption = ["province", "district", "ward"];
	// 	for (let i = 0; i < addressOption.length; i++) {
	// 	  setEvent(addressOption[i]);
	// 	}
	//   }

	//   function setEvent(addressOption) {
	// 	document
	// 	  .getElementById(addressOption + "_search")
	// 	  .addEventListener("keyup", filterFunction);
	// 	document
	// 	  .getElementById(addressOption + "_search")
	// 	  .addEventListener("focus", showAll);
	// 	document
	// 	  .getElementById(addressOption + "_search")
	// 	  .addEventListener("focus", showDropDown);
	// 	document
	// 	  .getElementById(addressOption + "_search")
	// 	  .addEventListener("focus", valueChangeToPlaceHolder);
	// 	$(document).mouseup(function (e) {
	// 	  turnOffDropDownWhenClickOut(
	// 		$("#dropdown_" + addressOption + "_border"),
	// 		$("#dropdown_" + addressOption),
	// 		e,
	// 		addressOption
	// 	  );
	// 	});
	// 	let province_option_classes = document.getElementsByClassName(
	// 	  addressOption + "_option"
	// 	);
	// 	Array.from(province_option_classes).forEach(function (element) {
	// 	  element.addEventListener("click", getProvinceID);
	// 	  element.addEventListener("click", offDropDown);
	// 	});
	//   }
	//   function setEventAfterClick(addressOption) {
	// 	let province_option_classes = document.getElementsByClassName(
	// 	  addressOption + "_option"
	// 	);
	// 	Array.from(province_option_classes).forEach(function (element) {
	// 	  element.addEventListener("click", getProvinceID);
	// 	  element.addEventListener("click", offDropDown);
	// 	});
	//   }

	//   function setEventAfterClickWard(addressOption) {
	// 	let province_option_classes = document.getElementsByClassName(
	// 	  addressOption + "_option"
	// 	);
	// 	Array.from(province_option_classes).forEach(function (element) {
	// 	  element.addEventListener("click", getProvinceID);
	// 	  element.addEventListener("click", offDropDown);
	// 	  element.addEventListener("click", $scope.calculateFeeALL);
	// 	});
	//   }

})