app.controller("ForgotPassword-ctrl",function($scope,$http){
    $http.get("/rest/account").then(resp=>{
        $scope.ListAccount = resp.data;
        console.log($scope.ListAccount);
    }).catch(error=>{
        console.log(error);
    })

    $scope.forgot = function(){
        // if(form.username==null && form.)
        if($scope.ListAccount.find(acc => acc.accountid == $scope.form.username)){
            alert("có")
        }else{
            alert("không có");
        }
        
    }
})