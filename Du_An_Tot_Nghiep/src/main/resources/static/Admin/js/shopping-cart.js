/** */
var app = angular.module("myApp", []);

app.controller("myCtrl" , function($scope, $http){
    /**
	QUẢN LÝ GIỎ HÀNG
	 */
	$scope.cart = {
		items: [],
		//Thêm sản phẩm
		add(id){
			var item = this.items.find(item => item.id == id)
			if(item){
				item.qty++;
				this.saveToLocalStorage();
			}else{
				$http.get(`/rest/products/${id}`).then(resp => {
					resp.data.qty = 1;
					this.items.push(resp.data);
					this.saveToLocalStorage();
				})
			}
		},
		//Xóa sản phẩm
		remove(id){
			var index = this.items.findIndex(item => item.id == id);
			this.items.splice(index,1);
			this.saveToLocalStorage();
			
		},
		
		//Xóa sạch sản phẩm
		clear(){
			this.items = [];
			this.saveToLocalStorage();
		},
		
		//Tính tiền của 1 sản phẩm
		
		//Tính tổng số lượng các mặt hàng trong giỏ
		get count(){
			return this.items
				.map(item => item.qty)
				.reduce((total,qty) => total += qty,0);
		},
		
		//Tổng thành tiền các mặt hàng trong giỏ
		get amount(){
			return this.items
				.map(item => item.qty * item.price)
				.reduce((total,qty) => total += qty,0);
		},
		
		//Lưu giỏ hàng vào Local Storage
		saveToLocalStorage(){
			//Đổi mảng sang Json và lưu vào localStorage
			var json = JSON.stringify(angular.copy(this.items));
			localStorage.setItem("cart",json);
		},
		
		//Đọc giỏ hàng từ Local Storage
		loadFromLocalStorage(){
			var json = localStorage.getItem("cart");
			this.items = json ? JSON.parse(json):[]; 
		}
	}
	
	//Duy trì giỏ hàng khi reset
	$scope.cart.loadFromLocalStorage();


	/**ORDER DON HANGF-------------------------------------------------- */
	$scope.order = {
		
		createDate: new Date(),
		address:"",
		account: {username: $("#username").text()},
		get orderDetails(){
			return $scope.cart.items.map(item => {
				return {
					product: {id: item.id},
					price: item.price,
					quantity: item.qty
				}
			});
		},

		purchase(){
			var orders = angular.copy(this);
			console.log(orders);
			//Thực hiên đơn hàng
			$http.post("/rest/orders", orders).then(resp => {
				alert("Đặt hàng thành công");
				$scope.cart.clear();
				location.href = "/order/detail/"+ resp.data.id;
			}).catch( error => {
				alert("Đặt hàng lỗi")
				console.log(error)
			})
		}
	}
	

})