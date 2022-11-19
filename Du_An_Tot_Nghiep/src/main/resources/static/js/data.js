var bodyData = {
  shipment: {
    address_from: {
      city: "100000",
      district: "100900",
    },
    address_to: {
      city: "100000",
      district: "100200",
    },
    parcel: {
      cod: "500000",
      weight: "220",
      width: "10",
      height: "15",
      length: "15",
    },
  },
};

var carrier_logos = [
    { carrier_short_name: "vtp", carrier_logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fapps.haravan.com%2Fproducts%2Fviettel-post&psig=AOvVaw09v8XFtg429PSy_CDnP-eU&ust=1664018503422000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIDS24_mqvoCFQAAAAAdAAAAABAE" },
    { carrier_short_name: "vnp", carrier_logo: "" },
    { carrier_short_name: "ghn", carrier_logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fghn.vn%2F&psig=AOvVaw3qYIkZMjsM9YqOa3CdgMs8&ust=1664018462842000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPiB9f3lqvoCFQAAAAAdAAAAABAD" },
    { carrier_short_name: "ghtk", carrier_logo: "" },
    { carrier_short_name: "njv", carrier_logo: "" },
    { carrier_short_name: "hbb", carrier_logo: "" },
    { carrier_short_name: "kerry", carrier_logo: "" },
    { carrier_short_name: "sql", carrier_logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fboxme.asia%2Four-partner%2Fdhl-e-commerce%2F&psig=AOvVaw1iWyXXdak9b2YvWM9PLEs2&ust=1664018538143000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiQ0KDmqvoCFQAAAAAdAAAAABAa" },
    { carrier_short_name: "ahm", carrier_logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhome.ahamove.com%2Fjob%2Fhn-call-center-executive%2F&psig=AOvVaw2gNjwNBhzkcQquKdk4dGHc&ust=1664017313646000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOjVt9nkqvoCFQAAAAAdAAAAABAM" },
    { carrier_short_name: "dppost", carrier_logo: "" },
    { carrier_short_name: "ov", carrier_logo: "" },
    { carrier_short_name: "supership", carrier_logo: "" },
    { carrier_short_name: "ghnv3", carrier_logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fghn.vn%2F&psig=AOvVaw3qYIkZMjsM9YqOa3CdgMs8&ust=1664018462842000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPiB9f3lqvoCFQAAAAAdAAAAABAD" },
    { carrier_short_name: "ship60", carrier_logo: "" },
];
