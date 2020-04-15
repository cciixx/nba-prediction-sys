module.exports = {
    client: 'mysql',
    connection: {
        host: process.env.B_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}