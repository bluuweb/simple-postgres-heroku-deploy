require("dotenv").config();
const { Pool } = require("pg");
const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://postgres:root@localhost:5432/simple_db";

const pool = new Pool({ connectionString });

const getTodos = async () => {
    const client = await pool.connect();
    try {
        const respuesta = await client.query("SELECT * FROM todos");
        return {
            ok: true,
            data: respuesta.rows,
        };
    } catch (error) {
        return {
            ok: false,
            data: "error de solicitud",
        };
    } finally {
        client.release();
    }
};

module.exports = {
    getTodos,
};
