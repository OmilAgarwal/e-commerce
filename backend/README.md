## How to run

### Run using npm

```bash
npm install
npm start
```

### Run using yarn

```bash
yarn install
yarn start
```

## Local Host

```bash
http://localhost:3032
```

## Routes

### Product Routes

| Route | Method | Description |
| --- | --- | --- |
| /products | GET | Get all products |
| /products/:id | GET | Get product by id |
| /products | POST | Create a product |
| /products/many | POST | Create many products |
| /products/:id | DELETE | Delete a product |
| /products/:id | PATCH | Update a product |
| /all/products | DELETE | Delete all products |
| /search/:query | GET | Search products |

### User Routes

| Route | Method | Description |
| --- | --- | --- |
| /register | POST | Register a user |
| /login | POST | Login a user |
| /user | GET | Get all users |
| /user/details | GET | Get user details |
| /user/:id | GET | Get user by id |
| /user/:id | DELETE | Delete a user |
| /users | DELETE | Delete all users |
| /user/:id | PATCH | Update a user |
| /user/cart | POST | Add to cart |
| /user/cart/update | POST | Update cart |
| /cart | GET | Get cart |

### Add Product

```bash
    {
        "name": "Peripherals Latop Latitude 3520 Gallery 3",
        "brand": "Dell",
        "category": "Computers",
        "stock": 5,
        "discount": 5,
        "price": 50000,
        "description": "Work and play with this laptop that features a powerful processor, a large memory, and a high-resolution screen.",
        "image": "https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/15-3520/media-gallery/peripherals_latop_latitude_3520_gallery_3.psd?fmt=pjpg&pscan=auto&scl=1&wid=3339&hei=2291&qlt=100,1&resMode=sharp2&size=3339,2291&chrss=full&imwidth=5000",
        "tags": ["technology", "office", "gaming"],
        "rating": 4.6,
        "totalSales": 12
    }
```

### Add Many Products

```bash
[
    {
        "name": "Peripherals Latop Latitude 3520 Gallery 3",
        "brand": "Dell",
        "category": "Computers",
        "stock": 5,
        "discount": 5,
        "price": 50000,
        "description": "Work and play with this laptop that features a powerful processor, a large memory, and a high-resolution screen.",
        "image": "https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/15-3520/media-gallery/peripherals_latop_latitude_3520_gallery_3.psd?fmt=pjpg&pscan=auto&scl=1&wid=3339&hei=2291&qlt=100,1&resMode=sharp2&size=3339,2291&chrss=full&imwidth=5000",
        "tags": ["technology", "office", "gaming"],
        "rating": 4.6,
        "totalSales": 12
    },
    {
        "name": "Peripherals Latop Latitude 3520 Gallery 2",
        "brand": "Dell",
        "category": "Computers",
        "stock": 8,
        "discount": 10,
        "price": 70000,
        "description": "Work and play with this laptop that features a powerful processor, a large memory, and a high-resolution screen.",
        "image": "https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/14-3420/media-gallery/peripherals_laptop_latitude_3420nt_gallery_1.psd?fmt=pjpg&pscan=auto&scl=1&wid=3319&hei=2405&qlt=100,1&resMode=sharp2&size=3319,2405&chrss=full&imwidth=5000",
        "tags": ["technology", "office", "gaming"],
        "rating": 4.2,
        "totalSales": 10
    }
]
```

### Delete Product

```bash
    http://localhost:3032/products/60e1b1b0e1b1b1b1b1b1b1b1
```

## Author

- [@sauravhathi](https://github.com/sauravhathi)

## License

[MIT](https://choosealicense.com/licenses/mit/)
