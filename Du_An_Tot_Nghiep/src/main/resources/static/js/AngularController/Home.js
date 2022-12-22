app.controller("Home-ctrl", function ($scope, $http){
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

    $http.get("/rest/login").then(resp =>{
        $scope.check = resp.data;
        if($scope.check == true){
            Toast.fire({
                icon: 'success',
                title: 'Đăng nhập thành công'
            })
        }
    })
})