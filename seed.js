const { deleteMany } = require("./models/product");
const Product = require("./models/product");

const products = [
  {
    name: "Iphone 11",
    price: 100,
    desc: "Iphone 11 brand new....More than 2.2 billion iphones had been sold",
    img: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lJTIwMTF8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60",
  },
  {
    name: "Iphone 10",
    price: 60,
    desc: "Iphone 10 brand new....More than 2.2 billion iphones had been sold",
    img: "https://images.unsplash.com/photo-1510166150654-85d6103a2414?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lJTIwMTB8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60",
  },
  {
    name: "Iphone 8",
    price: 55,
    desc: "Iphone 8 brand new....More than 2.2 billion iphones had been sold",
    img: "https://images.unsplash.com/photo-1574166369317-b2a0dd753647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwOHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
  },
  {
    name: "Iphone 7",
    price: 66,
    desc: "Iphone 7 brand new....More than 2.2 billion iphones had been sold",
    img: "https://images.unsplash.com/photo-1551818014-fa14764bc121?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwN3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
    },
   {
    name: "Macbook pro",
    price: 140,
    desc: "Macbookpro brand new....More than 2.2 billion iphones had been sold",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
    },
    {
    name: "Nike shoes",
    price: 35,
    desc: "Nike shoes brand new....More than 2.2 billion iphones had been sold",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrZSUyMHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    },
     {
    name: "Brown lens goggles",
    price: 25,
    desc: "Goggles brand new....More than 2.2 billion iphones had been sold",
    img: "https://images.unsplash.com/photo-1552573773-9c204055fc0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z29nZ2xlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
    },
      {
    name: "Iphone 7",
    price: 66,
    desc: "Iphone 7 brand new....More than 2.2 billion iphones had been sold",
    img: "https://images.unsplash.com/photo-1551818014-fa14764bc121?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwN3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
  },
];

const seedDb = async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('db seeded');
}

module.exports = seedDb;