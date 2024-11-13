// Use this file only as a guide for first steps using routes. Delete it when you have added your own route files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

const HOME_RESPONSE = {
    "products": {
        "almacenamiento": [
            {
                "product_id": 1,
                "name": "Samsung 970 EVO Plus",
                "url_image": null,
                "description": "Disco SSD Samsung",
                "price": 15000.0,
                "images": [],
                "category_name": "Almacenamiento",
                "stock": 80,
                "additional_information": "SSD, 1TB",
                "highlighted": false
            },
            {
                "product_id": 2,
                "name": "Crucial MX500",
                "url_image": "https://images.watercoolinguk.co.uk/images/product_images/original/217/crucial-mx500-m2-ssd-sata-6g-1tb-sscc-073-67376-1.jpg",
                "description": "Disco SSD Crucial",
                "price": 10000.0,
                "images": [],
                "category_name": "Almacenamiento",
                "stock": 100,
                "additional_information": "SSD, 500GB",
                "highlighted": true
            },
            {
                "product_id": 3,
                "name": "Seagate Barracuda 1TB",
                "url_image": null,
                "description": "Disco Duro Seagate",
                "price": 5000.0,
                "images": [],
                "category_name": "Almacenamiento",
                "stock": 120,
                "additional_information": "HDD, 1TB",
                "highlighted": false
            }
        ],
        "fuente": [
            {
                "product_id": 4,
                "name": "Corsair CV550",
                "url_image": null,
                "description": "Fuente Corsair",
                "price": 8000.0,
                "images": [],
                "category_name": "Fuente",
                "stock": 40,
                "additional_information": "550W, 80+ Bronze",
                "highlighted": false
            },
            {
                "product_id": 5,
                "name": "EVGA SuperNOVA 750 G5",
                "url_image": null,
                "description": "Fuente EVGA",
                "price": 12000.0,
                "images": [],
                "category_name": "Fuente",
                "stock": 30,
                "additional_information": "750W, 80+ Gold",
                "highlighted": true
            },
            {
                "product_id": 6,
                "name": "Thermaltake Smart BX1",
                "url_image": null,
                "description": "Fuente Thermaltake",
                "price": 10000.0,
                "images": [],
                "category_name": "Fuente",
                "stock": 50,
                "additional_information": "650W, 80+ Bronze",
                "highlighted": false
            }
        ],
        "motherboard": [
            {
                "product_id": 7,
                "name": "MSI B450 TOMAHAWK MAX",
                "url_image": null,
                "description": "Motherboard MSI",
                "price": 15000.0,
                "images": [],
                "category_name": "Motherboard",
                "stock": 45,
                "additional_information": "AM4, ATX",
                "highlighted": false
            },
            {
                "product_id": 8,
                "name": "Asus Z490-A Prime",
                "url_image": null,
                "description": "Motherboard Asus",
                "price": 25000.0,
                "images": [],
                "category_name": "Motherboard",
                "stock": 20,
                "additional_information": "Z490, ATX",
                "highlighted": true
            },
            {
                "product_id":9,
                "name": "Gigabyte B550 AORUS PRO",
                "url_image": null,
                "description": "Motherboard Gigabyte",
                "price": 20000.0,
                "images": [],
                "category_name": "Motherboard",
                "stock": 30,
                "additional_information": "B550, ATX",
                "highlighted": false
            }
        ],
        "monitor": [
            {
                "product_id": 10,
                "name": "Asus VG248QE",
                "url_image": null,
                "description": "Monitor Gamer Asus",
                "price": 30000.0,
                "images": [],
                "category_name": "Monitor",
                "stock": 35,
                "additional_information": "24\", 144Hz",
                "highlighted": false
            },
            {
                "product_id": 11,
                "name": "Samsung Odyssey G5",
                "url_image": null,
                "description": "Monitor Gamer Samsung",
                "price": 40000.0,
                "images": [],
                "category_name": "Monitor",
                "stock": 20,
                "additional_information": "27\", 165Hz",
                "highlighted": true
            },
            {
                "product_id": 12,
                "name": "LG 23MP68VQ",
                "url_image": null,
                "description": "Monitor LG",
                "price": 20000.0,
                "images": [],
                "category_name": "Monitor",
                "stock": 50,
                "additional_information": "23\", 75Hz",
                "highlighted": false
            }
        ],
        "procesador": [
            {
                "product_id": 13,
                "name": "Ryzen 5 3600",
                "url_image": null,
                "description": "Procesador AMD Ryzen 5",
                "price": 25000.0,
                "images": [],
                "category_name": "Procesador",
                "stock": 50,
                "additional_information": "3.6 GHz, 6 cores",
                "highlighted": false
            },
            {
                "product_id": 14,
                "name": "Intel Core i7 10700K",
                "url_image": null,
                "description": "Procesador Intel i7",
                "price": 35000.0,
                "images": [],
                "category_name": "Procesador",
                "stock": 29,
                "additional_information": "3.8 GHz, 8 cores",
                "highlighted": true
            },
            {
                "product_id": 15,
                "name": "Ryzen 3 3200G",
                "url_image": null,
                "description": "Procesador AMD Ryzen 3",
                "price": 15000.0,
                "images": [],
                "category_name": "Procesador",
                "stock": 19,
                "additional_information": "3.4 GHz, 4 cores",
                "highlighted": false
            },
            {
                "product_id": 16,
                "name": "Zapatilla",
                "url_image": null,
                "description": "asadasdasdsafaf",
                "price": 52.0,
                "images": [],
                "category_name": "Procesador",
                "stock": 9,
                "additional_information": "AJDSKAFSAKSFK",
                "highlighted": false
            }
        ],
        "perifericos": [
            {
                "product_id": 17,
                "name": "HyperX Alloy FPS Pro",
                "url_image": null,
                "description": "Teclado HyperX",
                "price": 5000.0,
                "images": [],
                "category_name": "Perifericos",
                "stock": 60,
                "additional_information": "Teclado Mecánico",
                "highlighted": false
            },
            {
                "product_id": 18,
                "name": "Logitech G305",
                "url_image": null,
                "description": "Mouse Logitech",
                "price": 3000.0,
                "images": [],
                "category_name": "Perifericos",
                "stock": 80,
                "additional_information": "Mouse Inalámbrico",
                "highlighted": true
            },
            {
                "product_id": 19,
                "name": "Razer Kraken X",
                "url_image": null,
                "description": "Auriculares Razer",
                "price": 2000.0,
                "images": [],
                "category_name": "Perifericos",
                "stock": 100,
                "additional_information": "Auriculares",
                "highlighted": false
            },
            {
                "product_id": 20,
                "name": "Mouse",
                "url_image": null,
                "description": "asadasdasdsafaf",
                "price": 52.0,
                "images": [
                    "/path3",
                    "/path2",
                    "/path1"
                ],
                "category_name": "Perifericos",
                "stock": 1,
                "additional_information": "AJDSKAFSAKSFK",
                "highlighted": false
            }
        ],
        "gpu": [
            {
                "product_id": 21,
                "name": "Nvidia RTX 3060",
                "url_image": null,
                "description": "Tarjeta Gráfica Nvidia",
                "price": 75000.0,
                "images": [],
                "category_name": "GPU",
                "stock": 25,
                "additional_information": "8GB GDDR6",
                "highlighted": true
            },
            {
                "product_id": 22,
                "name": "AMD Radeon RX 5600XT",
                "url_image": null,
                "description": "Tarjeta Gráfica AMD",
                "price": 65000.0,
                "images": [],
                "category_name": "GPU",
                "stock": 40,
                "additional_information": "6GB GDDR6",
                "highlighted": false
            },
            {
                "product_id": 23,
                "name": "Nvidia GTX 1650",
                "url_image": null,
                "description": "Tarjeta Gráfica Nvidia",
                "price": 50000.0,
                "images": [],
                "category_name": "GPU",
                "stock": 60,
                "additional_information": "4GB GDDR5",
                "highlighted": false
            }
        ],
        "ram": [
            {
                "product_id": 24,
                "name": "Corsair Vengeance LPX",
                "url_image": null,
                "description": "Memoria RAM Corsair",
                "price": 8000.0,
                "images": [],
                "category_name": "RAM",
                "stock": 100,
                "additional_information": "DDR4, 8GB",
                "highlighted": false
            },
            {
                "product_id": 25,
                "name": "Kingston HyperX Fury",
                "url_image": null,
                "description": "Memoria RAM Kingston",
                "price": 12000.0,
                "images": [],
                "category_name": "RAM",
                "stock": 73,
                "additional_information": "DDR4, 16GB",
                "highlighted": true
            },
            {
                "product_id": 26,
                "name": "Crucial Ballistix Sport",
                "url_image": null,
                "description": "Memoria RAM Crucial",
                "price": 6000.0,
                "images": [],
                "category_name": "RAM",
                "stock": 150,
                "additional_information": "DDR3, 4GB",
                "highlighted": false
            }
        ]
    },
    "recently_viewed_products": [
        {
            "product_id": 27,
            "name": "Gigabyte B550 AORUS PRO",
            "url_image": null,
            "description": "Motherboard Gigabyte",
            "price": 20000.0,
            "images": [],
            "category_name": "Motherboard",
            "stock": 30,
            "additional_information": "B550, ATX",
            "highlighted": false
        }
    ],
    "featured_products": [
        {
            "product_id": 28,
            "name": "Intel Core i7 10700K",
            "url_image": null,
            "description": "Procesador Intel i7",
            "price": 35000.0,
            "images": [],
            "category_name": "Procesador",
            "stock": 29,
            "additional_information": "3.8 GHz, 8 cores",
            "highlighted": true
        },
        {
            "product_id": 29,
            "name": "Kingston HyperX Fury",
            "url_image": null,
            "description": "Memoria RAM Kingston",
            "price": 12000.0,
            "images": [],
            "category_name": "RAM",
            "stock": 73,
            "additional_information": "DDR4, 16GB",
            "highlighted": true
        },
        {
            "product_id": 30,
            "name": "Nvidia RTX 3060",
            "url_image": null,
            "description": "Tarjeta Gráfica Nvidia",
            "price": 75000.0,
            "images": [],
            "category_name": "GPU",
            "stock": 25,
            "additional_information": "8GB GDDR6",
            "highlighted": true
        },
        {
            "product_id": 31,
            "name": "Samsung Odyssey G5",
            "url_image": null,
            "description": "Monitor Gamer Samsung",
            "price": 40000.0,
            "images": [],
            "category_name": "Monitor",
            "stock": 20,
            "additional_information": "27\", 165Hz",
            "highlighted": true
        },
        {
            "product_id": 32,
            "name": "EVGA SuperNOVA 750 G5",
            "url_image": null,
            "description": "Fuente EVGA",
            "price": 12000.0,
            "images": [],
            "category_name": "Fuente",
            "stock": 30,
            "additional_information": "750W, 80+ Gold",
            "highlighted": true
        },
        {
            "product_id": 33,
            "name": "Asus Z490-A Prime",
            "url_image": null,
            "description": "Motherboard Asus",
            "price": 25000.0,
            "images": [],
            "category_name": "Motherboard",
            "stock": 20,
            "additional_information": "Z490, ATX",
            "highlighted": true
        },
        {
            "product_id": 34,
            "name": "Logitech G305",
            "url_image": null,
            "description": "Mouse Logitech",
            "price": 3000.0,
            "images": [],
            "category_name": "Perifericos",
            "stock": 80,
            "additional_information": "Mouse Inalámbrico",
            "highlighted": true
        },
        {
            "product_id": 35,
            "name": "Crucial MX500",
            "url_image": null,
            "description": "Disco SSD Crucial",
            "price": 10000.0,
            "images": [],
            "category_name": "Almacenamiento",
            "stock": 100,
            "additional_information": "SSD, 500GB",
            "highlighted": true
        }
    ],
    "recommended_products": null
  }
  
  module.exports = [
    {
      id: "get-home", // route id
      url: "/api/home", // url in express format
      method: "GET", // HTTP method
      variants: [
        {
          id: "success", // variant id
          type: "json", // variant handler id
          options: {
            status: 200, // status to send
            body: HOME_RESPONSE, // body to send
          },
        }
      ],
    },

    {
        id: "get-product", // route id
        url: "/api/product/2", // url in express format
        method: "GET", // HTTP method
        variants: [
          {
            id: "success", // variant id
            type: "json", // variant handler id
            options: {
              status: 200, // status to send
              body: {
                "product_id": 2,
                "name": "Crucial MX500",
                "url_image": "https://images.watercoolinguk.co.uk/images/product_images/original/217/crucial-mx500-m2-ssd-sata-6g-1tb-sscc-073-67376-1.jpg",
                "description": "Disco SSD Crucial",
                "price": 10000.0,
                "images": [],
                "category_name": "Almacenamiento",
                "stock": 100,
                "additional_information": "SSD, 500GB",
                "highlighted": true
            }, // body to send
            },
          }
        ],
      },
      {
          id: "get-add-to-cart", // route id
          url: "/api/add-to-cart", // url in express format
          method: "GET", // HTTP method
          variants: [
            {
              id: "success", // variant id
              type: "json", // variant handler id
              options: {
                status: 200, // status to send
                body: {
                  "status": "added to cart"
              },
              },
            }
          ],
        }
  ];
  