import Publication from "../publication/publication.model.js";
import Comment from "./comment.model.js";


export const createComment = async (req, res) => {
    try {

        //desestructuramos los objetos del req.body de comment.
        const { content, publication, username } = req.body;

        const existingPublication = await Publication.findById(publication);
        if (!existingPublication) {
            return res.status(404).json({ message: "No se encontro publicacion en la db" });
        }

        const comment = new Comment({
            content,
            username,
            publication: existingPublication._id
        });

        await comment.save();


        await Publication.findByIdAndUpdate(
            existingPublication._id,
            { $push: { comments: comment._id } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            comment
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el comentario.', error: error.message });
    }
};


export const getComment = async (req, res) => {
    try {
        const query = { status: true };
        const comment = await Comment.find(query)
            //Buscamos el atributo title y text por medio del campo que hace referenca a publicacion dentro de comentarios
            .populate("publication", "title content")
        return res.status(200).json({
            success: true,
            comment
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los Comentarios",
            error: err.message
        })
    }
}

export const getCommentsByPublication = async (req, res) => {
    try {
        const { publicationId } = req.params;
        const comments = await Comment.find({ publication: publicationId, status: true })
            .populate("publication", "title description")
            .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                comments
            })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los comentarios por medio de publicacion",
            error: err.message
        })
    }
};