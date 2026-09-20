const db = require('../config/connection');

async function findAll() {
    const result = await db.query(
        'SELECT * FROM employees ORDER BY id'
    );

    return result.rows;
}

async function create(name, position, phone) {
    const result = await db.query(
        `INSERT INTO employees (name, position, phone)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, position, phone]
    );

    return result.rows[0];
}

async function update(id, name, position, phone) {
    const result = await db.query(
        `UPDATE employees
         SET name = $1,
             position = $2,
             phone = $3
         WHERE id = $4
         RETURNING *`,
        [name, position, phone, id]
    );

    return result.rows[0];
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM employees
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
}

module.exports = {
    findAll,
    create,
    update,
    remove
};