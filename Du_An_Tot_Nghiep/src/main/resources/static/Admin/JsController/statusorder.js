
app.controller("statusorder-ctrl", function($http, $scope) {

	$scope.listNoProcess = [];
    $scope.listDelivery = [];
    $scope.listCancel = [];
    $scope.listSuccess = [];
    $scope.orderNumber = 0;
    $scope.item = {};
    $scope.itemOrderDetail = [];
	
	$scope.initialize = function(){
        //Load Product
        $http.get("/rest/order/NoProcess").then(resp => {
            $scope.listNoProcess = resp.data;
            $scope.listNoProcess.forEach(item => {
                item.createdate = new Date(item.createdate);
            })
        });

        $http.get("/rest/order/Delivery").then(resp => {
            $scope.listDelivery = resp.data;
            $scope.listDelivery.forEach(item => {
                item.createdate = new Date(item.createdate);
            })
        });

        $http.get("/rest/order/Cancel").then(resp => {
            $scope.listCancel = resp.data;
            $scope.listCancel.forEach(item => {
                item.createdate = new Date(item.createdate);
            })
        });

        $http.get("/rest/order/Success").then(resp => {
            $scope.listSuccess = resp.data;
            $scope.listSuccess.forEach(item => {
                item.createdate = new Date(item.createdate);
            })
        });
    }

    //Chọn Order
    $scope.chooseOrder = function(item) {
        $scope.item =  angular.copy(item);
        $scope.orderNumber = $scope.item.orderid;

        $http.get(`/rest/detailorder/order/${$scope.item.orderid}`).then(resp => {
           $scope.itemOrderDetail = resp.data;
        }).catch(error => {
            console.log('Error', error);
        });
        var classHide = document.querySelector(".order-detail");
        classHide.classList.remove("hidex");
    }

    //Chuyển từ chưa xử lý sang đang giao
    $scope.noProcessToDelivery = function (){
        if ($scope.item.orderid == undefined) {
            Swal.fire({
                position: 'top-middle',
                icon: 'error',
                title: 'Vui lòng chọn đơn hàng muốn chuyển trạng thái',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }else{
            var updateItem = {
                orderid: $scope.item.orderid,
                createdate: $scope.item.createdate,
                shipfee: $scope.item.shipfee,
                productmoney: $scope.item.productmoney,
                totalmoney: $scope.item.totalmoney,
                address: $scope.item.address,
                paymentmethod: $scope.item.paymentmethod,
                voucher: $scope.item.voucher,
                account: $scope.item.account,
                orderstatus :{
                    orderstatusid : 2,
                    orderstatustitle: 'Đang giao'
                },
                phonenumber: $scope.item.phonenumber
            }
            $http.put(`/rest/order/NoProcessToDelivery/${$scope.item.orderid}`, updateItem).then(resp => {
                $scope.initialize();
                Swal.fire({
                    position: 'top-middle',
                    icon: 'success',
                    title: 'Đã chuyển sang đang giao hàng',
                    showConfirmButton: false,
                    timer: 1500
                })
                $scope.item = {};
                showOrderDetail();
            }).catch(error => {
                Swal.fire({
                    position: 'top-middle',
                    icon: 'error',
                    title: 'Update thất bại',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        }
    }

    //Chuyển từ chưa xử lý sang hủy đơn hàng
    $scope.noProcessToCancel = function (){
        if ($scope.item.orderid == undefined) {
            Swal.fire({
                position: 'top-middle',
                icon: 'error',
                title: 'Vui lòng chọn đơn hàng muốn chuyển trạng thái',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }else{
            var updateItem = {
                orderid: $scope.item.orderid,
                createdate: $scope.item.createdate,
                shipfee: $scope.item.shipfee,
                productmoney: $scope.item.productmoney,
                totalmoney: $scope.item.totalmoney,
                address: $scope.item.address,
                paymentmethod: $scope.item.paymentmethod,
                voucher: $scope.item.voucher,
                account: $scope.item.account,
                orderstatus :{
                    orderstatusid : 3,
                    orderstatustitle: 'Đã hủy'
                },
                phonenumber: $scope.item.phonenumber
            }
            $http.put(`/rest/order/NoProcessToCancel/${$scope.item.orderid}`, updateItem).then(resp => {
                $scope.initialize();
                Swal.fire({
                    position: 'top-middle',
                    icon: 'success',
                    title: 'Đã chuyển sang hủy đơn hàng',
                    showConfirmButton: false,
                    timer: 1500
                })
                $scope.item = {};
                showOrderDetail();
            }).catch(error => {
                Swal.fire({
                    position: 'top-middle',
                    icon: 'error',
                    title: 'Chuyển trạng thái thất bại',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        }
    }

    //Chuyển từ chưa xử lý sang thành công
    $scope.fromDeliveryToSuccess = function (){
        if ($scope.item.orderid == undefined) {
            Swal.fire({
                position: 'top-middle',
                icon: 'error',
                title: 'Vui lòng chọn đơn hàng muốn chuyển trạng thái',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }else{
            var updateItem = {
                orderid: $scope.item.orderid,
                createdate: $scope.item.createdate,
                shipfee: $scope.item.shipfee,
                productmoney: $scope.item.productmoney,
                totalmoney: $scope.item.totalmoney,
                address: $scope.item.address,
                paymentmethod: $scope.item.paymentmethod,
                voucher: $scope.item.voucher,
                account: $scope.item.account,
                orderstatus :{
                    orderstatusid : 4,
                    orderstatustitle: 'Thành công'
                },
                phonenumber: $scope.item.phonenumber
            }
            $http.put(`/rest/order/DeliveryToSuccess/${$scope.item.orderid}`, updateItem).then(resp => {
                $scope.initialize();
                Swal.fire({
                    position: 'top-middle',
                    icon: 'success',
                    title: 'Đã chuyển sang giao thành công',
                    showConfirmButton: false,
                    timer: 1500
                })
                $scope.item = {};
                showOrderDetail();
            }).catch(error => {
                Swal.fire({
                    position: 'top-middle',
                    icon: 'error',
                    title: 'Chuyển trạng thái thất bại',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        }
    }


    $scope.initialize();

    $scope.pager = {
        page : 0,
        size : 10,

        get items() {
            var start = this.page * this.size;
            var end = start + this.size;
            return $scope.listNoProcess.slice(start, end);
        },


        get count() {
            return Math.ceil(1.0 * $scope.listNoProcess.length / this.size);
        },

        first() {
            this.page = 0;
        },

        prev() {
            this.page--;
            if(this.page < 0) {
                this.last();
            }
        },

        next() {
            this.page++;
            if(this.page >= this.count){
                this.first();
            }
        },

        last(){
            this.page = this.count - 1;
        }
    }

    $scope.pagerDelivery = {
        page : 0,
        size : 10,

        get items() {
            var start = this.page * this.size;
            var end = start + this.size;
            return $scope.listDelivery.slice(start, end);
        },


        get count() {
            return Math.ceil(1.0 * $scope.listDelivery.length / this.size);
        },

        first() {
            this.page = 0;
        },

        prev() {
            this.page--;
            if(this.page < 0) {
                this.last();
            }
        },

        next() {
            this.page++;
            if(this.page >= this.count){
                this.first();
            }
        },

        last(){
            this.page = this.count - 1;
        }
    }

    $scope.pagerCancel = {
        page : 0,
        size : 10,

        get items() {
            var start = this.page * this.size;
            var end = start + this.size;
            return $scope.listCancel.slice(start, end);
        },


        get count() {
            return Math.ceil(1.0 * $scope.listCancel.length / this.size);
        },

        first() {
            this.page = 0;
        },

        prev() {
            this.page--;
            if(this.page < 0) {
                this.last();
            }
        },

        next() {
            this.page++;
            if(this.page >= this.count){
                this.first();
            }
        },

        last(){
            this.page = this.count - 1;
        }
    }

    $scope.pagerSuccess = {
        page : 0,
        size : 10,

        get items() {
            var start = this.page * this.size;
            var end = start + this.size;
            return $scope.listSuccess.slice(start, end);
        },


        get count() {
            return Math.ceil(1.0 * $scope.listSuccess.length / this.size);
        },

        first() {
            this.page = 0;
        },

        prev() {
            this.page--;
            if(this.page < 0) {
                this.last();
            }
        },

        next() {
            this.page++;
            if(this.page >= this.count){
                this.first();
            }
        },

        last(){
            this.page = this.count - 1;
        }
    }
});

function showOrderDetail(){
    var classHide = document.querySelector(".order-detail");
    classHide.classList.add("hidex");
}
