import { Comment } from "../models/Comments.js";

export const createComment = async (req, res) => {
  const { body } = req;
  try {
    const comment = await Comment.create(body);
    if (!comment) {
      return res.status(400).json({
        ok: false,
        msg: "El comentario no ha podido ser enviado.",
      });
    }

    res.json({
      ok: true,
      msg: "El comentario ha sido enviado correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error con el servidor",
    });
  }
};

export const getComment = async (req, res) => {
  const { search } = req.query;

  try {
    const comments = await Comment.find();
    res.json({
      ok: true,
      comments,
    });
  } catch (error) {
    console.log("Ha habido un error al obtener los comentarios.", error);
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error con el servidor",
    });
  }
};
