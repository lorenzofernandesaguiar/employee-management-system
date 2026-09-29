const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/config/connection');
const resetTestDatabase = require('../helpers/resetTestDatabase');

describe('Employees API', () => {
    beforeEach(async () => {
        await resetTestDatabase();
    });

    afterAll(async () => {
        await db.end();
    });

    describe('GET /employees', () => {
        it('should return all employees', async () => {
            const response = await request(app).get('/employees');

            expect(response.status).toBe(200);

            expect(response.body).toEqual([
                {
                    id: 1,
                    name: 'Renata Nunes',
                    position: 'Designer de Interface',
                    phone: '(85) 91285-6374'
                },
                {
                    id: 2,
                    name: 'Lucas Almeida',
                    position: 'Administrador de Banco de Dados',
                    phone: '(31) 95673-1842'
                },
                {
                    id: 3,
                    name: 'Camila Santos',
                    position: 'Assistente Administrativa',
                    phone: '(62) 98314-7256'
                }
            ]);
        });
    });

    describe('POST /employees', () => {
        it('should create a new employee', async () => {
            const newEmployee = {
                name: 'Thiago Rocha',
                position: 'Desenvolvedor Backend',
                phone: '(19) 93417-5628'
            };

            const response = await request(app).post('/employees').send(newEmployee);

            expect(response.status).toBe(201);

            expect(response.body).toEqual({
                id: 4,
                name: 'Thiago Rocha',
                position: 'Desenvolvedor Backend',
                phone: '(19) 93417-5628'
            });
        });

        it('should return 400 when required fields are missing', async () => {
            const invalidEmployee = {
                position: 'Desenvolvedor Backend',
                phone: '(19) 93417-5628'
            };

            const response = await request(app).post('/employees').send(invalidEmployee);

            expect(response.status).toBe(400);

            expect(response.body).toEqual({
                message: 'The properties name, position, and phone are required.'
            });
        });
    });

    describe('PUT /employees/:id', () => {
        it('should update an existing employee', async () => {
            const updatedEmployee = {
                name: 'Renata Nunes',
                position: 'Analista de Sistemas',
                phone: '(85) 91285-6374'
            };

            const response = await request(app).put('/employees/1').send(updatedEmployee);

            expect(response.status).toBe(200);

            expect(response.body).toEqual({
                id: 1,
                name: 'Renata Nunes',
                position: 'Analista de Sistemas',
                phone: '(85) 91285-6374'
            });
        });

        it('should return 400 when required fields are missing', async () => {
            const invalidUpdatedEmployee = {
                position: 'Analista de Sistemas',
                phone: '(85) 91285-6374'
            };

            const response = await request(app).put('/employees/1').send(invalidUpdatedEmployee);

            expect(response.status).toBe(400);

            expect(response.body).toEqual({
                message: 'The properties name, position, and phone are required.'
            });
        });

        it('should return 404 when employee does not exist', async () => {
            const updatedEmployee = {
                name: 'Thiago Rocha',
                position: 'Engenheiro de Software',
                phone: '(19) 93417-5628'
            };

            const response = await request(app).put('/employees/4').send(updatedEmployee);

            expect(response.status).toBe(404);

            expect(response.body).toEqual({
                message: 'Employee not found.'
            });
        });
    });

    describe('DELETE /employees/:id', () => {
        it('should delete an existing employee', async () => {
            const response = await request(app).delete('/employees/3');

            expect(response.status).toBe(204);

            expect(response.body).toEqual({});
        });

        it('should return 404 when employee does not exist', async () => {
            const response = await request(app).delete('/employees/4');

            expect(response.status).toBe(404);

            expect(response.body).toEqual({
                message: 'Employee not found.'
            });
        });
    });
});