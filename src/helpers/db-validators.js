import Publication from "../publication/publication.model.js"
import Comment from "../comment/comment.model.js"


export const publicationExist = async (id = " ") => {
    const existe = await Publication.findById(id)
    if (!existe) {
            throw new Error("No existe la publicacion con el ID proporcionado.")
    }
}

export const namePublicationExists = async (title = " ") => {
    const existe = await Publication.findOne({ title })
    if (existe) {
        throw new Error(`The Publication ${title} is already registered`)
    }
}

export const commentExist = async (id = " ") => {
    const existe = await Comment.findById(id)
    if (!existe) {
        throw new Error("No existe el comentario con el ID proporcionado.")
    }
}

