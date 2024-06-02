import { Image } from "../models/Images.js";

export const getImage = async (req, res) => {
  const { idImage } = req.params;
  try {
    const image = await Image.findById(idImage);

    const imgBuffer = Buffer.from(image.img.data);

    res.writeHead(200, {
      "Content-Type": image.img.contentType,
      "Content-Length": imgBuffer.length,
    });
    res.end(imgBuffer);
  } catch (error) {
    res.status(500).send("No se pudo acceder a la imagen.");
  }
};
