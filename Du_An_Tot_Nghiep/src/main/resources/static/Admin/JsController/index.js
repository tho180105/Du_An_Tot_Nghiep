var app = angular.module("AnhApp", ["ngRoute"]);
app.config(function($routeProvider) {
	$routeProvider
		.when("/main", {
			templateUrl: "/Admin/main.html"
		})

		.when("/ThongKeDoanhThu", {
			templateUrl: "/Admin/ThongKeDoanhThu.html"
		})

		.when("/ThongKeSanPham", {
			templateUrl: "/Admin/ThongKeSanPham.html"
		})

		.when("/ThongKeDonHang", {
			templateUrl: "/Admin/ThongKeDonHang.html"
		})

		.when("/QuanLyCategory", {
			templateUrl: "/Admin/QuanLyCategory.html",
			controller: "category"
		})
		.when("/QuanLyStyle", {
			templateUrl: "/Admin/QuanLyStyle.html",
			controller: "style"
		})
		.when("/QuanLySize", {
			templateUrl: "/Admin/QuanLySize.html",
			controller: "size"
		})

		.when("/QuanLySanPham", {
			templateUrl: "/Admin/QuanLySanPham.html",
			controller: "product-ctrl"
		})
		.when("/QuanLyKho", {
			templateUrl: "/Admin/QuanLyKho.html",
			controller: "repository"
		})

		.when("/QuanLyVoucher", {
			templateUrl: "/Admin/QuanLyVoucher.html",
		})

		.when("/QuanLyDiscount", {
			templateUrl: "/Admin/QuanLyDiscount.html",
			controller: "discount-ctrl"
		})
		
		.when("/QuanLyBanner", {
			templateUrl: "/Admin/QuanLyBanner.html",
			controller: "banner-ctrl"
		})

		.when("/MyProfile", {
			templateUrl: "./index2.html"
		})

		
		.when("/cart", {
			templateUrl: "./cart/view.html"
		})

		.when("/cart/order", {
			templateUrl: "./cart/order.html"
		})
		.otherwise({
			redirectTo: "/main"
		})
})