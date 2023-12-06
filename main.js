// 1er desafio backend
class ProductManager {
  static increId = 0;
  constructor() {
    this.products = [];
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.warn("Todos los campos son obligatorios");
      return;
    }
    if (this.products.some((item) => item.code === code)) {
      console.error("Error de codigo, por favor volver a intentar");
      return;
    }
    const newProduct = {
      id: ++ProductManager.increId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);
  }
  getProducts() {
    console.log(this.products);
  }
  getProductById(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      console.error("No se ecuentra el producto, volver a intentar");
    } else {
      console.log("Producto disponible", product);
    }
    return product;
  }
}

//testing
//1)Crear una instancia de la clase "ProductManager"
const manager = new ProductManager();

//2) Llamar "getProducts" y devolver un arreglo vacio
manager.getProducts();

//3) Llamar al metodo "addproduct" con los campos:
manager.addProduct("Medias", "Primera calidad", 4000, "sin imagen", "med1", 15);
manager.getProducts();

//4) Agregar el objeto con un id generado automaticamente sin repetirse
manager.addProduct("Medias", "Segunda Calidad", 2000, "sin imagen", "med2", 10);
manager.addProduct("Medias", "Tercera Calidad", 1000, "sin imagen", "med3", 5);

//5)Llamar al metodo "getProducts" y debe aparecer el producto recien agregado
manager.getProducts();

//6) LLamar al metodo "addproduct" y arrojar un error porque el codigo esta repetido
manager.addProduct("Medias", "Segunda Calidad", 2000, "sin imagen", "med2", 10);

//7)Evaluar "getProductById" si lo encuentra mostrar producto, si no lo encuentra devolver error
manager.getProductById(3);
manager.getProductById(22);
