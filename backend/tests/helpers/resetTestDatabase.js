const fs = require('fs');
const path = require('path');
const pool = require('../../src/config/connection');

async function resetTestDatabase() {
    const sql = fs.readFileSync(path.join(__dirname, '../../database/test_seed.sql'), 'utf-8');

    await pool.query(sql);
}

module.exports = resetTestDatabase;