const employeesRepository = require('../../src/repositories/employeesRepository');
const db = require('../../src/config/connection');

jest.mock('../../src/config/connection');

describe('EmployeesRepository', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return all employees', async () => {
            const mockEmployees = [
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
            ];

            db.query.mockResolvedValue({
                rows: mockEmployees
            });

            const result = await employeesRepository.findAll();

            expect(db.query).toHaveBeenCalledTimes(1);

            expect(db.query).toHaveBeenCalledWith(
                'SELECT * FROM employees ORDER BY id'
            );

            expect(result).toEqual(mockEmployees);
        });

        it('should propagate database errors', async () => {
            db.query.mockRejectedValue(
                new Error('Database error.')
            );

            await expect(employeesRepository.findAll()).rejects.toThrow('Database error.');

            expect(db.query).toHaveBeenCalledTimes(1);

            expect(db.query).toHaveBeenCalledWith(
                'SELECT * FROM employees ORDER BY id'
            );
        });
    });

    describe('create', () => {
        it('should create a new employee', async () => {
            const mockCreatedEmployee = {
                id: 4,
                name: 'Thiago Rocha',
                position: 'Desenvolvedor Backend',
                phone: '(19) 93417-5628'
            };

            db.query.mockResolvedValue({
                rows: [mockCreatedEmployee]
            });

            const result = await employeesRepository.create(
                'Thiago Rocha', 'Desenvolvedor Backend', '(19) 93417-5628'
            );

            expect(db.query).toHaveBeenCalledTimes(1);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO employees'),
                ['Thiago Rocha', 'Desenvolvedor Backend', '(19) 93417-5628']
            );

            expect(result).toEqual(mockCreatedEmployee);
        });

        it('should propagate database errors', async () => {
            db.query.mockRejectedValue(
                new Error('Database error.')
            );

            await expect(employeesRepository.create(
                'Thiago Rocha', 'Desenvolvedor Backend', '(19) 93417-5628'
            )).rejects.toThrow('Database error.');

            expect(db.query).toHaveBeenCalledTimes(1);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO employees'),
                ['Thiago Rocha', 'Desenvolvedor Backend', '(19) 93417-5628']
            );
        });
    });

    describe('update', () => {
        it('should update an existing employee', async () => {
            const mockUpdatedEmployee = {
                id: 1,
                name: 'Renata Nunes',
                position: 'Analista de Sistemas',
                phone: '(85) 91285-6374'
            };

            db.query.mockResolvedValue({
                rows: [mockUpdatedEmployee]
            });

            const result = await employeesRepository.update(
                1, 'Renata Nunes', 'Analista de Sistemas', '(85) 91285-6374'
            );

            expect(db.query).toHaveBeenCalledTimes(1);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE employees'),
                ['Renata Nunes', 'Analista de Sistemas', '(85) 91285-6374', 1]
            );

            expect(result).toEqual(mockUpdatedEmployee);
        });

        it('should propagate database errors', async () => {
            db.query.mockRejectedValue(
                new Error('Database error.')
            );

            await expect(employeesRepository.update(
                1, 'Renata Nunes', 'Analista de Sistemas', '(85) 91285-6374'
            )).rejects.toThrow('Database error.');

            expect(db.query).toHaveBeenCalledTimes(1);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE employees'),
                ['Renata Nunes', 'Analista de Sistemas', '(85) 91285-6374', 1]
            );
        });
    });

    describe('remove', () => {
        it('should remove an employee', async () => {
            const mockDeletedEmployee = {
                id: 3,
                name: 'Camila Santos',
                position: 'Assistente Administrativa',
                phone: '(62) 98314-7256'
            };

            db.query.mockResolvedValue({
                rows: [mockDeletedEmployee]
            });

            const result = await employeesRepository.remove(3);

            expect(db.query).toHaveBeenCalledTimes(1);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('DELETE FROM employees'), [3]
            );

            expect(result).toEqual(mockDeletedEmployee);
        });

        it('should propagate database errors', async () => {
            db.query.mockRejectedValue(
                new Error('Database error.')
            );

            await expect(employeesRepository.remove(3)).rejects.toThrow('Database error.');

            expect(db.query).toHaveBeenCalledTimes(1);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('DELETE FROM employees'), [3]
            );
        });
    });
});