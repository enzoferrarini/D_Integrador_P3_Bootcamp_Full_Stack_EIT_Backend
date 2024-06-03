import { Product } from "../models/Products.js";
import { Image } from "../models/Images.js";
import fs from "fs";

export const createProduct = async (req, res) => {
  const { body, file } = req;
  try {
    if (!file) {
      return res.status(400).json({
        ok: false,
        msg: "La foto es obligatoria.",
      });
    }

    const imageBuffer = fs.readFileSync(`./temp/img/${file.filename}`);

    const image = await Image.create({
      fileName: file.filename,
      img: {
        data: imageBuffer,
        contentType: "image/png",
      },
    });

    if (!image) {
      return res.status(400).json({
        ok: false,
        msg: "No se pudo guardar exitosamente la imagen.",
      });
    }

    const product = await Product.create({
      ...body,
      imgUrl: `${process.env.BASE_URL}/images/${image._id}`,
    });

    fs.rm(`./temp/img/${file.filename}`, (error) => {
      if (error) {
        console.log("Lo sentimos, no hemos podido eliminar el archivo");
      }
      console.log("El archivo se ha eliminado exitosamente");
    });

    if (!product) {
      return res.status(400).json({
        ok: false,
        msg: "No se pudo crear el producto.",
      });
    }

    res.json({
      ok: true,
      product,
      msg: "Se ha creado el producto exitosamente.",
    });
  } catch (error) {
    console.log("Ha habido un error al crear el producto.", error);
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error con el servidor!",
      env:process.env.BASE_URL
    });
  }
};

export const getProduct = async (req, res) => {
  const { search } = req.query;

  try {
    const searchBy = search ? { name: new RegExp(search, "i") } : {};
    const products = await Product.find({
      ...searchBy,
      deletedAt: { $in: [null, undefined] },
    });
    res.json({
      ok: true,
      products,
    });
  } catch (error) {
    console.log("Ha habido un error al obtener los productos.", error);
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error con el servidor",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product || product.deletedAt) {
      return res.status(404).json({
        ok: false,
        msg: "No se ha encontrado el producto a eliminar.",
      });
    }

    await Product.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    res.json({
      ok: true,
      msg: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.log("Ha habido un error al editar el producto.");
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error con el servidor",
    });
  }
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { body, file } = req;

  try {
    const product = await Product.findById(id);

    if (!product || product.deletedAt) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado o id inválido",
      });
    }

    let imageUrl = product.imgUrl;

    if (file) {
      const imageBuffer = fs.readFileSync(`./temp/img/${file.filename}`);

      const image = await Image.create({
        fileName: file.filename,
        img: {
          data: imageBuffer,
          contentType: "image/png",
        },
      });

      if (!image) {
        return res.status(400).json({
          ok: false,
          msg: "No se pudo guardar exitosamente la imagen.",
        });
      }

      fs.rm(`./temp/img/${file.filename}`, (error) => {
        if (error) {
          console.log("Lo sentimos, no hemos podido eliminar el archivo");
        }
        console.log("El archivo se ha eliminado exitosamente");
      });

      imageUrl = `${process.env.BASE_URL}/images/${image._id}`;
    }

    const productUpdated = await Product.findByIdAndUpdate(
      id,
      {
        ...body,
        imgUrl: imageUrl,
      },
      { new: true }
    );

    res.json({
      ok: true,
      product: productUpdated,
      msg: "El producto se actualizó exitosamente.",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error con el servidor",
    });
  }
};

export const getProductId = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({
        ok: false,
        msg: `No se pudo encontrar el Producto por Id:${id}`,
      });
    }

    res.json({
      ok: true,
      product,
      msg: "El producto se econttró exitosamente.",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error con el servidor",
    });
  }
};
