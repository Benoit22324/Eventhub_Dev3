const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "EventHub API",
            version: "1.0.0",
            description: "Documentation de l'API EventHub"
        },
        servers: [
            {
                url: "http://localhost:8000/api",
                description: "Serveur de développement"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: [
        "./src/api/docs/**/*.ts"
    ]
}

export default swaggerOptions;