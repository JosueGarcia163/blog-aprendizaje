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
            status: true,
        });

        const defaultCourseTec = new Course({
            name: defaultTec,
            description: "Este es el curso de tecnologia",
            status: true,
        });

        const defaultCourseTaller = new Course({
            name: defaultTaller,
            description: "Este es el curso de taller",
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