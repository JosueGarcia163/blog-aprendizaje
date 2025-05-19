import Publication from "./publication.model.js";

export const createPublication = async (req, res) => {
    try {

        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        data.profilePicture = profilePicture

        const publication = new Publication({
            ...data
        });

        await publication.save();

        res.status(200).json({
            success: true,
            publication
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la publicacion.', error: error.message });
    }
};

export const getPublication = async (req, res) => {
    try {
        const query = { status: true };
        const publicacion = await Publication.find(query)
            //Buscamos el atributo comments y el contenido del comentario para listarlo.
            .populate("comments", "content")
            .populate("course", "name description")

        return res.status(200).json({
            success: true,
            publicacion
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los Publicacion",
            error: err.message
        })
    }
}

export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params
        const publicacion = await Publication.findById(id).populate("comments", "content")
            .populate("course", "name description")

        return res.status(200).json({
            success: true,
            publicacion
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener la publicacion",
            error: err.message
        })
    }
}

export const getPublicationsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const publications = await Publication.find({ course: courseId, status: true })
            .populate("course", "name")
            .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                publications
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones por medio del curso",
            error: err.message
        })
    }
};


export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const publicacion = await Publication.findByIdAndUpdate(id, { ...data }, { new: true });

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                msg: "Publicación no encontrada",
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Publicación actualizada',
            publicacion
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la publicación.', error: error.message });
    }
};



export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params

        const publication = await Publication.findById(id)

        //validamos que la publicacion no venga vacia.
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "publicacion no encontrada"
            });
        }

        //Validamos para ver si la publicacion ya esta eliminada.
        if (publication.status == "false") {
            return res.status(400).json({
                success: false,
                message: "La publicacion ya ha sido eliminada previamente."
            })
        }


        const updatePublication = await Publication.findByIdAndUpdate(
            id,
            { status: false },
            { new: true }
        )
        return res.status(200).json({
            success: true,
            message: "Publicacion eliminada.",
            publication: updatePublication
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error al eliminar la publicacion",
            error,
        });
    }
}