// 2do desafio backend
const fs = require("fs").promises;

class ProductManager {
  static increId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(nuevoObjeto) {
    let { title, description, price, thumbnail, code, stock } = nuevoObjeto;

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

    //Guardamos el array en el archivo:
    await this.saveFile(this.products);
  }

  getProducts() {
    console.log(this.products);
  }

  async getProductById(id) {
    try {
      const arrayProductos = await this.rdFile();
      const buscado = arrayProductos.find((item) => item.id === id);

      if (!buscado) {
        console.error("No se ecuentra el producto, volver a intentar");
      } else {
        console.log("Producto disponible");
        return buscado;
      }
    } catch (error) {
      console.log("Error al leer el archivo ", error);
    }
  }
  // metodos desafio 2:

  async rdFile() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("Error, no se puede leer el archivo", error);
    }
  }

  async saveFile(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.error("Error al guardar el archivo", error);
    }
  }

  //Actualizamos producto:
  async updateProduct(id, productoActualizado) {
    try {
      const arrayProductos = await this.rdFile();

      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        // método de array splice para reemplazar el objeto en la posicion del index:
        arrayProductos.splice(index, 1, productoActualizado);
        await this.saveFile(arrayProductos);
      } else {
        console.log("no se encontró el producto");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }
  // Eliminamos un producto:
  async deleteProduct(id) {
    try {
      const arrayProductos = await this.rdFile();
      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProductos.splice(index, 1);
        await this.saveFile(arrayProductos);
        console.log("Producto eliminado correctamente");
      } else {
        console.warn("No se encontró el producto para eliminar");
      }
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  }
}

//testing
//Crear una instancia de la clase "ProductManager"
const manager = new ProductManager("./productos.json");

// Llamar "getProducts" y devolver un arreglo vacio
manager.getProducts();

// Llamar al metodo "addproduct" con los campos:

const medias = {
  title: "medias",
  description: "Primera Calidad",
  price: 4000,
  thumbnail: "sin imagen",
  code: "med1",
  stock: 15,
};

manager.addProduct(medias);

// Agregar el objeto con un id generado automaticamente sin repetirse
const medias1 = {
  title: "medias1",
  description: "Segunda Calidad",
  price: 2000,
  thumbnail: "sin imagen",
  code: "med2",
  stock: 10,
};

manager.addProduct(medias1);

//Llamar al metodo "getProducts" y debe aparecer el producto recien agregado
manager.getProducts();

// LLamar al metodo "addproduct" y arrojar un error porque el codigo esta repetido
//manager.addProduct(medias1); Verificado

//Evaluar "getProductById" si lo encuentra mostrar producto, si no lo encuentra devolver error
async function testeamosBusquedaPorId() {
  const search = await manager.getProductById(2);
  console.log(search);
}

testeamosBusquedaPorId();

//Llamar al método “updateProduct”,intentar cambiar un campo de algún producto!! Evaluar que no se elimine el id y que se produzca la actualizacion
const materialMedias = {
  id: 1,
  title: "Material Medias",
  description: "La mejor calidad",
  price: 150,
  img: "Sin imagen",
  code: "abc123",
  stock: 30,
};

async function testeamosActualizar() {
  await manager.updateProduct(1, materialMedias);
}

testeamosActualizar();

//LLamar al método “deleteProduct”! Evaluar si se elimina el producto o que arroje un error si no lo encuentra.
async function testDelete() {
  await manager.deleteProduct(2);
}
testDelete();
