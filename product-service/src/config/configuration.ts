export default () => ({
    SERVER_PORT: parseInt(process.env.SERVER_PORT),
    SERVICE_PATH: process.env.SERVICE_PATH,
    DATABASE: {
        URL: process.env.DATABASE_URL,
    },
    MICROSERVICES:{
       
    },
 })

