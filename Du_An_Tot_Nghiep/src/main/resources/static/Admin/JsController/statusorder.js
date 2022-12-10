
app.controller("statusorder-ctrl", function($http, $scope) {

	$scope.listNoProcess = [];
	
	$scope.initialize = function(){
        //Load Product
        $http.get("/rest/order/NoProcess").then(resp => {
            $scope.listNoProcess = resp.data;
            $scope.listNoProcess.forEach(item => {
                item.createdate = new Date(item.createdate);
            })
        });
    }

    $scope.showDetailOrder = function(item) {
        var item =  angular.copy(item);
        console.log(item);
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

});