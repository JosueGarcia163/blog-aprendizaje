import Course from "./course.model.js";

export const createDefaultCourses = async () => {
    try {
        const defaultPractica = "Practica supervisada";
        const defaultTec = "Tecnologia";
        const defaultTaller = "Taller";

        const existingPractica = await Course.findOne({ name: defaultPractica });
        const existingTecnologia = await Course.findOne({ name: defaultTec });
        const existingTaller = await Course.findOne({ name: defaultTaller });

        if (existingPractica && existingTecnologia && existingTaller) {
            console.log("Los cursos ya existen.");
            return;
        }

        const defaultCoursePractica = new Course({
            name: defaultPractica,
            description: "Este es el curso de practica supervisada",
            image: "https://www.unirioja.es/wp-content/uploads/2025/03/20240311%E2%80%90SurfIngInf%E2%80%90Boscos%E2%80%90Unirioja-010.jpg",
            status: true,
        });

        const defaultCourseTec = new Course({
            name: defaultTec,
            description: "Este es el curso de tecnologia",
            image: "https://www.cibernos.com/hubfs/photo-1561883088-039e53143d73.jpg",
            status: true,
        });

        const defaultCourseTaller = new Course({
            name: defaultTaller,
            description: "Este es el curso de taller",
            image: "https://ingenieria.uv.cl/wp-content/uploads/2023/07/1688565356336-696x378.jpg",
            status: true,
        });


        await defaultCoursePractica.save();
        await defaultCourseTec.save();
        await defaultCourseTaller.save();

        //Mandamos un console log en consola para dar a entender de que se creo perfectamente.
        console.log("Cursos creados exitosamente creado exitosamente.");
    } catch (error) {
        console.error("Error al crear los cursos:", error.message);
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        return res.status(200).json({
            success: true,
            courses
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        })
    }
};