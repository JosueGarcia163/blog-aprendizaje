import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Blog Systems API",
            version:"1.0.0",
            description: "API para blog de aprendizaje.",
            contact:{
                name: "Josue Garcia",
                email: "jgarcia-2023324@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/learningBlog/v1"
            }
        ]
    },
    apis:[
        "./src/publication/*.js",
        "./src/comment/*.js",
        "./src/course/*.js"
    ]
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)
export { swaggerDocs, swaggerUi }