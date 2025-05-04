import Publication from "./publication.model.js";


export const createPublication = async (req, res) => {
    try {

        //desestructuramos los objetos del req.body de publicacion.
        const data = req.body;

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

export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, course } = req.body;

        const publicacion = await Publication.findById(id)

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                msg: "Publicacion no encontrada",
            });
        }

        publicacion.title = title || publicacion.title;
        publicacion.description = description || publicacion.description;
        publicacion.course = course|| publicacion.course;

        await publicacion.save();

        res.status(200).json({
            success: true,
            msg: 'Publicacion Actualizada',
            publicacion,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error al actualizar la publicacion",
            error,
        });
    }
}


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