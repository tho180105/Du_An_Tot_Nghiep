/**
 * 
 */

app.controller("Authority-ctrl",function($scope,$http,$location){
    $scope.account = [];
    $scope.role = [];

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

    $http.get("/rest/account/authorities").then(resp =>{
        disabledUpdate();
        $scope.account = resp.data;
        $scope.account.forEach(item=>{
            item.createdate = new Date(item.createdate);
        })
        $http.get("/rest/role").then(resp =>{
            $scope.role = resp.data;
        })
        $http.get("/rest/account/check").then(resp =>{
            console.log(resp.data);
            if( resp.data == false){
                $location.path("/unauthorized");
            }
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
            Swal.fire({
                icon: 'success',
                title: 'Thông báo',
                text: 'Xóa thành công!',
            })
            $scope.reset();
        }).catch(error => {
			alert("Delete thất bại");
		});
    }

    // cập nhật
    $scope.Update = function(){
        if($scope.form == undefined || $scope.roleId == undefined){
            Swal.fire({
                icon: 'error',
                title: 'Thông báo',
                text: 'Vui lòng chọn tài khoản và role!',
            })
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
            Swal.fire({
                icon: 'success',
                title: 'Thông báo',
                text: 'Cập nhật thành công!',
            })
            $http.get("/rest/account/check").then(resp =>{
                console.log(resp.data);
                if( resp.data == false){
                    $location.path("/unauthorized");
                }
            })
            $scope.reset();
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Thông báo',
                text: 'Cập nhật thất bại!',
            })
		});

    }

    // thêm mới
    $scope.Save = function(){
        if($scope.form == undefined || $scope.roleId == undefined){
            Swal.fire({
                icon: 'error',
                title: 'Thông báo',
                text: 'Vui lòng chọn tài khoản và role!',
            })
            return;
        }
        for(let i= 0; i< $scope.account.length;i++){
            if($scope.form.accountid == $scope.account[i].accountid){
                Swal.fire({
                    icon: 'error',
                    title: 'Thông báo',
                    text: 'Tài khoản đã tồn tại!',
                })
                return;
            }
        }
        $scope.form.password = "1";
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
        var item = angular.copy($scope.form);
        $http.post("/rest/account/authority",item).then(resp =>{
            $scope.account.push(resp.data);
            Swal.fire({
                icon: 'success',
                title: 'Thông báo',
                text: 'Thêm mới thành công!',
            })
            $scope.reset();
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Thông báo',
                text: 'Thêm mới thất bại!',
            })
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
        if ($scope.form.email == undefined ||  $scope.form.email == null || $scope.form.email == ""){
            Swal.fire({
                icon: 'error',
                title: 'Thông báo',
                text: 'Không được bỏ trống Email!',
            })
            return false;
        } else if (filter.test($scope.form.email) == false) {
            Swal.fire({
                icon: 'error',
                title: 'Thông báo',
                text: 'Email không đúng định dạng!',
            })
            return false;
        }
        if ($scope.form.phonenumber == undefined || $scope.form.phonenumber == null || $scope.form.phonenumber == ""){

        }else if (vnf_regex.test($scope.form.phonenumber) == false) {
            Swal.fire({
                icon: 'error',
                title: 'Thông báo',
                text: 'Số điện thoại không đúng định dạng!',
            })
            return false;
        }

        return true;
    }

    function checkSaveExists(){
        for(let i= 0; i< $scope.account.length;i++){
             if($scope.form.email == $scope.account[i].email ){
                 Swal.fire({
                     icon: 'error',
                     title: 'Thông báo',
                     text: 'Email đã tồn tại!',
                 })
                return false;
            }
            if ($scope.form.phonenumber == null || $scope.form.phonenumber == ""){

            } else if($scope.form.phonenumber == $scope.account[i].phonenumber){
                Swal.fire({
                    icon: 'error',
                    title: 'Thông báo',
                    text: 'Số điện thoại đã tồn tại!',
                })
                return false;
            }
        }
        return true;
    }

    function checkUpdateExists(){
        for(let i= 0; i< $scope.account.length;i++){
            var index = $scope.account.findIndex(x => x.accountid == $scope.form.accountid);
            if($scope.form.email == $scope.account[i].email && i != index){
                Swal.fire({
                    icon: 'error',
                    title: 'Thông báo',
                    text: 'Email đã tồn tại!',
                })
                return false;
            }
            if ($scope.form.phonenumber == null || $scope.form.phonenumber == ""){

            }
            else if($scope.form.phonenumber == $scope.account[i].phonenumber && i != index){
                alert("Số điện thoại đã tồn tại!");
                return false;
            }
        }
        return  true;
    }
})