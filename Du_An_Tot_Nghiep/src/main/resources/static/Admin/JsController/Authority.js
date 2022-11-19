/**
 * 
 */

app.controller("Authority-ctrl",function($scope,$http,$location){
    $scope.account = [];
    $scope.role = [];
    $http.get("/rest/account/authorities").then(resp =>{
        disabledUpdate();
        $scope.account = resp.data;
        $scope.account.forEach(item=>{
            item.createdate = new Date(item.createdate);
        })
        console.log($scope.account);
        $http.get("/rest/role").then(resp =>{
            $scope.role = resp.data;
        })
    }).catch(resp => {
        $location.path("/unauthorized");
    })

    $scope.changeEvent = function() {
		if($scope.changeModel != null && $scope.changeModel != "" && $scope.changeModel != undefined) {
			$http.get(`/rest/account/${$scope.changeModel}`).then(resp => {
				$scope.account = resp.data;
			})
		}else{
            $http.get("/rest/account").then(resp =>{
                $scope.account = resp.data;
            })
		}
	}

    $scope.Edit = function(account){
        $scope.form = angular.copy(account);
        $scope.roleId =  $scope.form.role.roleid;
        disabledSave()
    }

    $scope.Delete = function(account){
        var item = angular.copy(account);
        $http.delete("/rest/account/"+item.accountid).then(resp =>{
            var index = $scope.account.findIndex(x => x.accountid == item.accountid);
            $scope.account.splice(index,1);
            alert("Xóa thành công !")
            $scope.reset();
        }).catch(error => {
			alert("Delete thất bại");
			console.log("Error", error);
		});
    }

    // cập nhật
    $scope.Update = function(){
        if($scope.form == undefined || $scope.roleId == undefined){
            alert("Vui lòng chọn tải khoản và role !")
            return;
        }
        var flag = checkFormSave();
        if(flag==false){
            return;
        }
        var flag = checkUpdateExists();
        if(flag==false){
            return;
        }
        $scope.form.role.roleid = $scope.roleId;
        var item = angular.copy($scope.form);
        $http.put("/rest/account",item).then(resp =>{
            var index = $scope.account.findIndex(x => x.accountid == item.accountid);
            $scope.account[index] = resp.data;
            alert("Cập nhật thành công !")
            $scope.reset();
        }).catch(error => {
			alert("Cập nhật thất bại");
			console.log("Error", error);
		});
    }

    // thêm mới
    $scope.Save = function(){
        if($scope.form == undefined || $scope.roleId == undefined){
            alert("Vui lòng chọn tải khoản và role!")
            return;
        }
        for(let i= 0; i< $scope.account.length;i++){
            if($scope.form.accountid == $scope.account[i].accountid){
                alert("Tài khoản đã tồn tại!");
                return;
            }
        }
        var flag = checkFormSave();
        if(flag==false){
            return;
        }
        var flag1 = checkSaveExists();
        if(flag1==false){
            return;
        }
        $scope.form.role = {roleid: $scope.roleId};
        $scope.form.avartar = "1.png";
        $scope.form.coin = null;
        $scope.form.status = null;
        $scope.form.createdate = new Date();
        console.log($scope.form);
        var item = angular.copy($scope.form);
        $http.put("/rest/account",item).then(resp =>{
            $scope.account.push(resp.data);
            alert("Thêm mới thành công!")
            $scope.reset();
        }).catch(error => {
			alert("Thêm mới thất bại");
			console.log("Error", error);
		});
    }

    $scope.reset = function(){
        $scope.form = {};
        $scope.roleId = "";
        $scope.changeModel ="";
        disabledUpdate();
        $scope.changeEvent();
       
    }
    function disabledUpdate() {
        $scope.disabledSave= "";
        $scope.disabledUpdate= "disabled";
        $scope.test1 = false;
    }
    function disabledSave() {
        $scope.disabledSave= "disabled";
        $scope.disabledUpdate= "";
        $scope.test1 = true;
    }

    function checkFormSave(){
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test($scope.form.email) == false) {
			alert("Email không đúng định dạng!");
            return false;
		}
        if (vnf_regex.test($scope.form.phonenumber) == false) {
			alert("Số điện thoại không đúng định dạng!");
            return false;
		}
        if($scope.form.name== null || $scope.form.name== ""){
            alert("Vui lòng nhập tên!");
            return false;
        }
        if($scope.form.password== null || $scope.form.password== ""){
            alert("Vui lòng nhập password!");
            return false;
        }
        return true;
    }

    function checkSaveExists(){
        for(let i= 0; i< $scope.account.length;i++){
            if($scope.form.email == $scope.account[i].email ){
                alert("Email đã tồn tại!");
                return false;
            }
            if($scope.form.phonenumber == $scope.account[i].phonenumber){
                alert("Số điện thoại đã tồn tại!");
                return false;
            }
        }
        return true;
    }

    function checkUpdateExists(){
        for(let i= 0; i< $scope.account.length;i++){
            var index = $scope.account.findIndex(x => x.accountid == $scope.form.accountid);
            if($scope.form.email == $scope.account[i].email && i != index){
                alert("Email đã tồn tại!");
                return false;
            }
            if($scope.form.phonenumber == $scope.account[i].phonenumber && i != index){
                alert("Số điện thoại đã tồn tại!");
                return false;
            }
        }
    }
})