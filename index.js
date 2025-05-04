import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import {createDefaultCourses} from "./src/course/course.controller.js";

config()
const startServer = async () => {
    try {
        await initServer();
        //Llamamos la funcion de crear los cursos por defecto.
        await createDefaultCourses();
        
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
};

startServer();