const app = angular.module("app", ["angularUtils.directives.dirPagination"]);

app.controller("pay-ctrl", function ($rootScope, $scope) {
  $scope.orderIdPayedDone = $rootScope.orderIdPayed;
});
app.controller("cart-ctrl", function ($rootScope, $http, $scope, $timeout) {
  $http.get(`/rest/cart`).then((resp) => {
    $rootScope.detailCarts = resp.data;
  });
  $scope.decreaseQuantity = function (element) {
    oldValue = element.currentTarget.nextElementSibling.value;
    oldValueNumber = parseFloat(oldValue);
    if (oldValueNumber == 1) {
    } else {
      element.currentTarget.nextElementSibling.value = oldValueNumber - 1;
      let checkLimitQuantity = $scope.update(
        element.currentTarget.getAttribute("detailCartId"),
        oldValueNumber - 1
      );
    }
  };
  $scope.increaseQuantity = function (element) {
    oldValue = element.currentTarget.previousElementSibling.value;
    oldValueNumber = parseFloat(oldValue);
    let checkLimitQuantity = $scope.update(
      element.currentTarget.getAttribute("detailCartId"),
      oldValueNumber + 1
    );
    if (checkLimitQuantity)
      element.currentTarget.previousElementSibling.value = oldValueNumber + 1;
  };
  $scope.selectALlItem = function (element) {
    var checkbox = document.getElementsByClassName("checkboxSelect");
    if (element.currentTarget.checked) {
      for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = true;
      }
    } else {
      for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
      }
    }
    $timeout($scope.calculateFee, 200);
  };
  $scope.calculateFee = function () {
    $scope.totalMoney = 0;
    var checkbox = document.getElementsByClassName("checkboxSelect");
    for (let i = 1; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        $scope.totalMoney += parseFloat(checkbox[i].value);
      }
    }
  };
  $scope.totalMoney = 0;
  //Check thì thêm tổng không check thì trừ ra khai báo =0;
  $scope.create = function (productRepositoryId) {
    if ($rootScope.detailCarts == "") {
      $rootScope.detailCarts = [];
    }
    var checkExist = $rootScope.detailCarts.findIndex(
      (item) =>
        item.productrepository.productrepositoryid == productRepositoryId
    );
    if (checkExist == -1) {
      $http
        .post("/rest/cart/" + productRepositoryId)
        .then((resp) => {
          $rootScope.detailCarts.push(resp.data);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Thông báo",
            text: "Add failed!",
          });
        });
    } else {
      if (
        $rootScope.detailCarts[checkExist].productrepository.quantity <
        $rootScope.detailCarts[checkExist].quantity + 1
      ) {
        Swal.fire({
          icon: "warning",
          title: "Thông báo",
          text: "Kho hết hàng, quý khách thông cảm",
        });
        return;
      }
      $rootScope.detailCarts[checkExist].quantity += 1;
      $http
        .put("/rest/cart", $rootScope.detailCarts[checkExist])
        .then((resp) => {})
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Thông báo",
            text: "Add failed",
          });
        });
    }
    $timeout($scope.calculateFee, 200);
  };

  $scope.update = function (detailCartId, quantity) {
    var detailCart = $rootScope.detailCarts.find(
      (item) => item.detailcartid == detailCartId
    );
    if (detailCart.productrepository.quantity >= quantity) {
      detailCart.quantity = quantity;
      $http
        .put("/rest/cart", detailCart)
        .then((resp) => {})
        .catch((error) => {
          Swal.fire({
            icon: "warning",
            title: "Thông báo",
            text: "Thay đổi số lượng lỗi",
          });
        });
      $timeout($scope.calculateFee, 200);
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Thông báo",
        text: "Kho hết hàng, quý khách thông cảm",
      });
      return false;
    }
  };
  $scope.updateBlur = function (element) {
    let quantity = element.currentTarget.value;

    detailCartId = element.currentTarget.getAttribute("detailCartId");
    var detailCart = $rootScope.detailCarts.find(
      (item) => item.detailcartid == detailCartId
    );
    if (quantity < 1) {
      element.currentTarget.value = detailCart.quantity;
      return;
    }
    let checkLimitQuantity = $scope.update(detailCartId, quantity);

    if (!checkLimitQuantity) element.currentTarget.value = detailCart.quantity;
  };
  $scope.delete = function (detailCartId) {
    var index = $rootScope.detailCarts.findIndex(
      (item) => item.detailcartid == detailCartId
    );
    $rootScope.detailCarts.splice(index, 1);
    $http
      .delete("/rest/cart/" + detailCartId)
      .then((resp) => {})
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Thông báo",
          text: "Delete failed!",
        });
      });
    $timeout($scope.calculateFee, 200);
  };

  $scope.checkSelectBoxProduct = function () {
    var checkbox = document.getElementsByClassName("checkboxSelect");
    for (let i = 1; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        return true;
      }
    }
    return false;
  };

  $scope.getProductsSelected = function () {
    $scope.productIdsSelected = [];
    var checkbox = document.getElementsByClassName("checkboxSelect");
    for (let i = 1; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        $scope.productIdsSelected.push(
          checkbox[i].getAttribute("productrepositoryid")
        );
      }
    }

    $scope.filterCartToOrder();
    $scope.upListProductSelected();
    location.href = "http://localhost:8080/cart/order";
  };
  $scope.upListProductSelected = function () {
    $http
      .post(`/rest/cart/productSelected`, $scope.productsSelected)
      .then((resp) => {});
  };

  $scope.filterCartToOrder = function () {
    $scope.productsSelected = [];
    $rootScope.detailCarts.forEach((a) => {
      $scope.productIdsSelected.forEach((v) => {
        if (a.detailcartid == v) {
          $scope.productsSelected.push(a);
        }
      });
    });
  };

  // Khi phi thay doi thì cap nhat lai
  //Khi chọn hàng thanh toán , thanh toán thì bên cart sẽ mất sp đó
});
