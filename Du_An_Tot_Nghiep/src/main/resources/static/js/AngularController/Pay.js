// const app = angular.module("app", []);
// alert("A")

app.controller("pay-ctrl", function ($rootScope, $http, $scope, $timeout) {
  // $rootscope.detailCarts=[]
  $http.get(`/rest/cart`).then((resp) => {
    $rootScope.detailCarts = resp.data;
  });

  //Voucher

  $http.get(`/rest/voucher`).then((resp) => {
      //sbutotal
      $scope.subTotalMoney = 0;
      $scope.shipfee = 0;
      $scope.discountMoney = 0;
      function calculateSubTotal() {
          var priceClasses = document.getElementsByClassName("total-price");
          for (const iterator of priceClasses) {
              $scope.subTotalMoney += parseFloat(iterator.innerHTML);
          }
      }
      $timeout(() => {
          calculateSubTotal()
          var now = new Date();
          $rootScope.vouchers = resp.data;
          $scope.vc = [];
          $rootScope.vouchers.forEach((v) => {
              if (v.quantity > 0 && v.minimunmoney< $scope.subTotalMoney ) {
                  $scope.vc.push(v);
              }
          });

          $scope.vc1 = [];
          $scope.vc.forEach((v) => {
              var x = Date.parse(v.startdate);
              var y = Date.parse(v.enddate);
              if (now > x && now < y) {
                  $scope.vc1.push(v);
              }
          });

          $scope.calculateDisCountMoney = function (percent, total) {
              var discountMoneyPercent =
                  ($scope.subTotalMoney + Number($scope.shipfee)) * percent;
              if (discountMoneyPercent > total) {
                  $scope.discountMoney = total;
              } else {
                  $scope.discountMoney = discountMoneyPercent;
              }
          };


          $scope.calculateTotalMoney = function () {
              return (
                  $scope.subTotalMoney + Number($scope.shipfee) - $scope.discountMoney
              );
          };
          $scope.getShipFee = function (element) {
              $scope.shipfee = element.currentTarget.value;
          };
          $scope.applyVoucher = function (element) {
              var buttonApplyClasses = document.getElementsByClassName("btn-apply");
              for (const iterator of buttonApplyClasses) {
                  iterator.removeAttribute("disabled");
              }
              $scope.voucherApplyId = element.currentTarget.getAttribute("voucherId");

              element.currentTarget.disabled = "true";
              $scope.calculateDisCountMoney(
                  element.currentTarget.getAttribute("percent"),
                  element.currentTarget.getAttribute("maxMoney")
              );
          };
      }, 500);


  });
  $http.get(`/rest/cart/productSelected`).then((resp) => {
    $rootScope.productsSelected = resp.data;
  });

  $scope.getDetailCartsSelected = function () {
    $http.get(`/rest/cart/productSelected`).then((resp) => {});
  };

  $scope.newOrder = [];
  $scope.finishOrder = function () {
    $http.get(`/rest/order/createNew`).then((resp) => {
      $scope.newOrder = resp.data;
      let province = document.getElementById("province_search").value;
      let district = document.getElementById("province_search").value;
      let ward = document.getElementById("province_search").value;
      let radio_pays = document.getElementsByClassName("radio_pay")[0];
      if (radio_pays.checked == true) {
        $scope.newOrder.paymentmethod = "Thanh toán tiền mặt";
      } else {
        $scope.newOrder.paymentmethod = "Thanh toán bằng thẻ";
      }
      $scope.newOrder.address =
        String(province) +
        ", " +
        String(district) +
        ", " +
        String(ward) +
        ", " +
        String($scope.detailAddressOrder);

      $scope.newOrder.orderstatus = {};
      $scope.newOrder.orderstatus.orderstatusid = 1;
      if($scope.voucherApplyId!=null){
        $scope.newOrder.voucher = {};
        $scope.newOrder.voucher.voucherid = $scope.voucherApplyId;
      }
      $scope.newOrder.productmoney = $scope.subTotalMoney;
      $scope.newOrder.shipfee = $scope.shipfee;
      $scope.newOrder.phonenumber =document.getElementById("phoneNumber").value;
      $scope.newOrder.totalmoney = $scope.calculateTotalMoney();
      console.log($scope.newOrder)
      $http.post("/rest/order", $scope.newOrder).then((resp) => {
        $rootScope.orderIdPayed=resp.data.orderid;
        $scope.addDetailOrdersFinish(resp.data.orderid);
      });
    });
  };

  $scope.addDetailOrdersFinish = function (orderid) {
    console.log($rootScope.productsSelected)
    for (const iterator of $rootScope.productsSelected) {
      console.log("a")
      $scope.newDetailOrder = {};
      $scope.newDetailOrder.productprice =    iterator.productrepository.product.sellingprice;
      $scope.newDetailOrder.productrepository = {};
      $scope.newDetailOrder.productrepository.productrepositoryid = iterator.productrepository.productrepositoryid;
      $scope.newDetailOrder.orders = {};
      $scope.newDetailOrder.orders.orderid = orderid
      $scope.newDetailOrder.quantity = iterator.quantity
        $http.post("/rest/detailorder", $scope.newDetailOrder)
        .then((resp) => {
        });
        $http.delete("/rest/cart/"+iterator.detailcartid)
        .then((resp) => {
         
        });
    }
    location.href="/cart/order/"+$rootScope.orderIdPayed
  };



$scope.testValidation=function(){
  var x =document.getElementById("form_order")
  if (x.checkValidity()) {
     $scope.finishOrder()
    }
}












  ///GET CITY
 $scope.getCityStart=function(){
 $http({
    method: "GET",
    url: "http://sandbox.goship.io/api/v2/cities",
    headers: {
      withCredentials:true,
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4In0.eyJhdWQiOiIxMyIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4IiwiaWF0IjoxNjYyOTkzMjQxLCJuYmYiOjE2NjI5OTMyNDEsImV4cCI6NDgxODY2Njg0MSwic3ViIjoiMzE4OSIsInNjb3BlcyI6W119.RzxNMS8bWdklm_YXgxtXZ0lSJuecwCmaiWXbuPrhsBkzAS7dLkfEmoPu4bLieDzSWS2v_yeH8XdiqyRim9xbLsOoplo_w0TboQrZXRxWNhw7aFWalp8TfwR04xm79xgWPHhFe1oqMQ6NCcQKarPvsf9alRuupUnBmyi_PueILbeJsT5Ek_MMXALYwAVlmepzHvwF8x_KQ5Ha_TR2S2xNE_htR8MS9eyfss4mvflfUpvTXgF1YUIl5KlQj5duAluGvXadwp-4g_ImFPljFplTxhF0UQ1C7ohW1GkoA_QUFSyLDUfBkMXTaq_slRGd7aUDgHDDy4cgeTAetmlrYtqImJlocL0bzIaHBur6ieXp2UnYKFTlozZN2MUKvmLuwhO5tXJRo4uBfLJAP9nC8BzoPvq4OUDJ43gRYK05uVF8Yq2YqvXftcyixv5bt3KYS3EG82ku0W83drteuVnF0kjxCipykGgFwjZO1Sj8X7vTeqGXk5kfI5zYeu6N11BJgWrVpJxz0lsRlJ7vuxzAFaRUhrp-8v2bhdaPCQl9L2RIDHsX-gG3NNR6dpd6u0JvDfofh4fgp9VWR8BJcHr17_kHp70ZlBdB-anxUYISVi5SI5l0sCLQXzvhqz2guvyZKbj0xieb67dQgpMlipXouQb-xBnIQFN7j0b8j_kACXqxPGU",
    },
  })
  .then(
    function successCallback(response) {
      $rootScope.province = response.data;
      setTimeout(init, 300);
    },
    function errorCallback(response) {
      $scope.getCityStart();
    
    }
  );
}
$scope.getCityStart();

$scope.getDistrictStart =function(){
  $http({
    method: "GET",
    url: "http://sandbox.goship.io/api/v2/districts?page=1&size=1000",
    headers: {
      withCredentials:true,
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4In0.eyJhdWQiOiIxMyIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4IiwiaWF0IjoxNjYyOTkzMjQxLCJuYmYiOjE2NjI5OTMyNDEsImV4cCI6NDgxODY2Njg0MSwic3ViIjoiMzE4OSIsInNjb3BlcyI6W119.RzxNMS8bWdklm_YXgxtXZ0lSJuecwCmaiWXbuPrhsBkzAS7dLkfEmoPu4bLieDzSWS2v_yeH8XdiqyRim9xbLsOoplo_w0TboQrZXRxWNhw7aFWalp8TfwR04xm79xgWPHhFe1oqMQ6NCcQKarPvsf9alRuupUnBmyi_PueILbeJsT5Ek_MMXALYwAVlmepzHvwF8x_KQ5Ha_TR2S2xNE_htR8MS9eyfss4mvflfUpvTXgF1YUIl5KlQj5duAluGvXadwp-4g_ImFPljFplTxhF0UQ1C7ohW1GkoA_QUFSyLDUfBkMXTaq_slRGd7aUDgHDDy4cgeTAetmlrYtqImJlocL0bzIaHBur6ieXp2UnYKFTlozZN2MUKvmLuwhO5tXJRo4uBfLJAP9nC8BzoPvq4OUDJ43gRYK05uVF8Yq2YqvXftcyixv5bt3KYS3EG82ku0W83drteuVnF0kjxCipykGgFwjZO1Sj8X7vTeqGXk5kfI5zYeu6N11BJgWrVpJxz0lsRlJ7vuxzAFaRUhrp-8v2bhdaPCQl9L2RIDHsX-gG3NNR6dpd6u0JvDfofh4fgp9VWR8BJcHr17_kHp70ZlBdB-anxUYISVi5SI5l0sCLQXzvhqz2guvyZKbj0xieb67dQgpMlipXouQb-xBnIQFN7j0b8j_kACXqxPGU",
    },
  }).then(
    function successCallback(response) {
      $rootScope.district = response.data;
    },
    function errorCallback(response) {
      $scope.getDistrictStart()

    }
  );
}
$scope.getDistrictStart();


  $scope.getDistrictAfterSelectProvince = function () {
    $timeout(function () {
      let provinceSelectedName =
        document.getElementById("province_search").value;
      let placeholderSearch = document
        .getElementById("province_search")
        .getAttribute("placeholder");
      if (provinceSelectedName.localeCompare("") == 0) {
        return;
      }
      if (provinceSelectedName.localeCompare(placeholderSearch) != 0) {
        document.getElementById("district_search").value = "";
        document
          .getElementById("district_search")
          .setAttribute("placeholder", "Select district");
        document.getElementById("ward_search").value = "";
        document
          .getElementById("ward_search")
          .setAttribute("placeholder", "Select ward");
      }
      $scope.provinceSelectedElement = $rootScope.province.data.filter(
        (element) => element.name == provinceSelectedName
      );
      $scope.districts = $rootScope.district.data.filter(
        (element) => element.city_id == $scope.provinceSelectedElement[0].id
      );
      setTimeout(setEventAfterClick, 500, "district");
    }, 400);
  };
  $scope.getWardAfterSelectDistrict = function () {
    $timeout(function () {
      let districtSelectedName =
        document.getElementById("district_search").value;
      let placeholderSearch = document
        .getElementById("district_search")
        .getAttribute("placeholder");
      if (districtSelectedName.localeCompare("") == 0) {
        return;
      }
      if (districtSelectedName.localeCompare(placeholderSearch) != 0) {
        document.getElementById("ward_search").value = "";
        document
          .getElementById("ward_search")
          .setAttribute("placeholder", "Select ward");
      }
      $scope.districtSelectedElement = $rootScope.district.data.filter(
        (element) => element.name == districtSelectedName
      );
      $http({
        method: "GET",
        url:
          "http://sandbox.goship.io/api/v2/districts/" +
          $scope.districtSelectedElement[0].id +
          "/wards",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4In0.eyJhdWQiOiIxMyIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4IiwiaWF0IjoxNjYyOTkzMjQxLCJuYmYiOjE2NjI5OTMyNDEsImV4cCI6NDgxODY2Njg0MSwic3ViIjoiMzE4OSIsInNjb3BlcyI6W119.RzxNMS8bWdklm_YXgxtXZ0lSJuecwCmaiWXbuPrhsBkzAS7dLkfEmoPu4bLieDzSWS2v_yeH8XdiqyRim9xbLsOoplo_w0TboQrZXRxWNhw7aFWalp8TfwR04xm79xgWPHhFe1oqMQ6NCcQKarPvsf9alRuupUnBmyi_PueILbeJsT5Ek_MMXALYwAVlmepzHvwF8x_KQ5Ha_TR2S2xNE_htR8MS9eyfss4mvflfUpvTXgF1YUIl5KlQj5duAluGvXadwp-4g_ImFPljFplTxhF0UQ1C7ohW1GkoA_QUFSyLDUfBkMXTaq_slRGd7aUDgHDDy4cgeTAetmlrYtqImJlocL0bzIaHBur6ieXp2UnYKFTlozZN2MUKvmLuwhO5tXJRo4uBfLJAP9nC8BzoPvq4OUDJ43gRYK05uVF8Yq2YqvXftcyixv5bt3KYS3EG82ku0W83drteuVnF0kjxCipykGgFwjZO1Sj8X7vTeqGXk5kfI5zYeu6N11BJgWrVpJxz0lsRlJ7vuxzAFaRUhrp-8v2bhdaPCQl9L2RIDHsX-gG3NNR6dpd6u0JvDfofh4fgp9VWR8BJcHr17_kHp70ZlBdB-anxUYISVi5SI5l0sCLQXzvhqz2guvyZKbj0xieb67dQgpMlipXouQb-xBnIQFN7j0b8j_kACXqxPGU",
        },
      }).then(
        function successCallback(response) {
            $rootScope.wards = response.data.data;
          //   setTimeout(setEventAfterClick, 300, "ward");
          setTimeout(setEventAfterClickWard, 200, "ward");
        },
        function errorCallback(response) {
          $scope.getWardAfterSelectDistrict()
        }
      );
    }, 400);
  };

  $scope.calculateFeeALL = function () {
    bodyData.shipment.address_to.city = $scope.provinceSelectedElement[0].id;
    bodyData.shipment.address_to.district = $scope.districtSelectedElement;
    $http({
      method: "POST",
      url: "http://sandbox.goship.io/api/v2/rates",
      data: bodyData,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4In0.eyJhdWQiOiIxMyIsImp0aSI6IjllMzQ0MDNlOTZhMzI1NmUwNDFjMGU5ZmE3MzQ0N2ZkMDllN2Y4YTg0NWU5NmE2NTNjODU2YTQ3ZWMwNjQ1MzFjMjNlN2Q0ZGRmMGQ2ODg4IiwiaWF0IjoxNjYyOTkzMjQxLCJuYmYiOjE2NjI5OTMyNDEsImV4cCI6NDgxODY2Njg0MSwic3ViIjoiMzE4OSIsInNjb3BlcyI6W119.RzxNMS8bWdklm_YXgxtXZ0lSJuecwCmaiWXbuPrhsBkzAS7dLkfEmoPu4bLieDzSWS2v_yeH8XdiqyRim9xbLsOoplo_w0TboQrZXRxWNhw7aFWalp8TfwR04xm79xgWPHhFe1oqMQ6NCcQKarPvsf9alRuupUnBmyi_PueILbeJsT5Ek_MMXALYwAVlmepzHvwF8x_KQ5Ha_TR2S2xNE_htR8MS9eyfss4mvflfUpvTXgF1YUIl5KlQj5duAluGvXadwp-4g_ImFPljFplTxhF0UQ1C7ohW1GkoA_QUFSyLDUfBkMXTaq_slRGd7aUDgHDDy4cgeTAetmlrYtqImJlocL0bzIaHBur6ieXp2UnYKFTlozZN2MUKvmLuwhO5tXJRo4uBfLJAP9nC8BzoPvq4OUDJ43gRYK05uVF8Yq2YqvXftcyixv5bt3KYS3EG82ku0W83drteuVnF0kjxCipykGgFwjZO1Sj8X7vTeqGXk5kfI5zYeu6N11BJgWrVpJxz0lsRlJ7vuxzAFaRUhrp-8v2bhdaPCQl9L2RIDHsX-gG3NNR6dpd6u0JvDfofh4fgp9VWR8BJcHr17_kHp70ZlBdB-anxUYISVi5SI5l0sCLQXzvhqz2guvyZKbj0xieb67dQgpMlipXouQb-xBnIQFN7j0b8j_kACXqxPGU",
      },
    }).then(
      function successCallback(response) {
        $rootScope.phigiaohang = response.data;
      },
      function errorCallback(response) {
        $scope.calculateFeeALL()

      }
    );
  };
  function showDropDown() {
    this.nextElementSibling.style.display = "block";
  }
  function offDropDown() {
    this.parentElement.style.display = "none";
  }
  function turnOffDropDownWhenClickOut(container, dropdown, e, address) {
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      dropdown.hide();
      ClickOutDropdownPlaceholderChangeToValue(address);
    }
  }
  function ClickOutDropdownPlaceholderChangeToValue(address) {
    var divOptions = document
      .getElementById("dropdown_" + address)
      .getElementsByTagName("div");
    document.getElementById("dropdown_" + address).style.cursor = "pointer";
    var searchElement = document.getElementById(address + "_search");
    var placeholderSearch = searchElement.getAttribute("placeholder");
    var compareString = "Select " + address;
    //Trường hợp không Not found
    // Nếu place khác mặc định + value rỗng
    if (
      placeholderSearch.localeCompare(compareString) != 0 &&
      searchElement.value.localeCompare("") == 0
    ) {
      searchElement.value = placeholderSearch; // đủ điều kiện đề chuyển placeholder thành value
    }
    //Trường hợp  Not found
    for (let x in divOptions) {
      if (divOptions[x].innerHTML == "Not found") {
        document.getElementById(
          "dropdown_" + address
        ).previousElementSibling.value = "";
        divOptions[x].remove();
        if (placeholderSearch.localeCompare(compareString) != 0) {
          searchElement.value = searchElement.getAttribute("placeholder");
        }
      }
    }
    getProperOption(
      divOptions,
      searchElement,
      placeholderSearch,
      compareString
    );
  }
  function getProperOption(
    divOptions,
    searchElement,
    placeholderSearch,
    compareString
  ) {
    var checkEqualNewValueVsOptions = false;
    for (let index = 0; index < divOptions.length; index++) {
      const element = divOptions[index];
      if (searchElement.value.localeCompare(element.innerHTML) == 0) {
        checkEqualNewValueVsOptions = true;
      }
    }

    if (
      searchElement.value.localeCompare("") != 0 &&
      searchElement.value.localeCompare(placeholderSearch) != 0 &&
      !checkEqualNewValueVsOptions
    ) {
      for (let index = 0; index < divOptions.length; index++) {
        const element = divOptions[index];
        if (element.style.display != "none") {
          searchElement.value = element.innerHTML;
          break;
        }
      }
    }
  }
  var getProvinceID = function () {
    var attribute = this.innerHTML;
    this.parentElement.previousElementSibling.value = attribute;
  };

  function valueChangeToPlaceHolder() {
    if (!this.value == "") {
      this.setAttribute("placeholder", this.value);
      this.value = "";
    }
  }

  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = this;
    filter = input.value.toUpperCase();
    div = this.nextElementSibling;
    a = div.getElementsByTagName("div");
    var Available = false;
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
        Available = true;
      } else {
        a[i].style.display = "none";
      }
      if (a[i].innerText === "Not found") {
        a[i].remove();
      }
    }
    if (!Available) {
      var style = document.createElement("div");
      style.innerHTML = "Not found";
      div.appendChild(style);
      div.style.cursor = "no-drop";
    } else {
      div.style.cursor = "pointer";
    }
  }
  function showAll() {
    var a, div;
    div = this.nextElementSibling;
    a = div.getElementsByTagName("div");
    for (i = 0; i < a.length; i++) {
      a[i].style.display = "block";
    }
  }
  function init() {
    var addressOption = ["province", "district", "ward"];
    for (let i = 0; i < addressOption.length; i++) {
      setEvent(addressOption[i]);
    }
  }

  function setEvent(addressOption) {
    document
      .getElementById(addressOption + "_search")
      .addEventListener("keyup", filterFunction);
    document
      .getElementById(addressOption + "_search")
      .addEventListener("focus", showAll);
    document
      .getElementById(addressOption + "_search")
      .addEventListener("focus", showDropDown);
    document
      .getElementById(addressOption + "_search")
      .addEventListener("focus", valueChangeToPlaceHolder);
    $(document).mouseup(function (e) {
      turnOffDropDownWhenClickOut(
        $("#dropdown_" + addressOption + "_border"),
        $("#dropdown_" + addressOption),
        e,
        addressOption
      );
    });
    let province_option_classes = document.getElementsByClassName(
      addressOption + "_option"
    );
    Array.from(province_option_classes).forEach(function (element) {
      element.addEventListener("click", getProvinceID);
      element.addEventListener("click", offDropDown);
    });
  }
  function setEventAfterClick(addressOption) {
    let province_option_classes = document.getElementsByClassName(
      addressOption + "_option"
    );
    Array.from(province_option_classes).forEach(function (element) {
      element.addEventListener("click", getProvinceID);
      element.addEventListener("click", offDropDown);
    });
  }

  function setEventAfterClickWard(addressOption) {
    let province_option_classes = document.getElementsByClassName(
      addressOption + "_option"
    );
    Array.from(province_option_classes).forEach(function (element) {
      element.addEventListener("click", getProvinceID);
      element.addEventListener("click", offDropDown);
      element.addEventListener("click", $scope.calculateFeeALL);
    });
  }




});
