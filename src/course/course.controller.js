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
            description: "Curso de práctica supervisada donde se asignan tareas y proyectos prácticos utilizando Node.js, MongoDB, React con Vite, Express y otras tecnologías modernas para consolidar habilidades de desarrollo full stack.",
            image: "PracticaSupervisadaImg.jpg",
            status: true,
        });

        const defaultCourseTec = new Course({
            name: defaultTec,
            description: "Curso enfocado en la teoría y fundamentos de la programación y tecnologías web, incluyendo los conceptos de software, conceptos de bases de datos, protocolos y principios de desarrollo.",
            image: "TecnologiaImg.webp",
            status: true,
        });

        const defaultCourseTaller = new Course({
            name: defaultTaller,
            description: "El curso de taller pretende implementar proyectos y actividades que enfoquen al alumno a un ambiente practico de la programacion y a la vez orientado a implementar proyectos y actividades. ",
            image: "TallerImg.jpg",
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