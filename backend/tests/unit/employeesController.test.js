const employeesController = require('../../src/controllers/employeesController');
const employeesRepository = require('../../src/repositories/employeesRepository');

jest.mock('../../src/repositories/employeesRepository');

describe('EmployeesController', () => {
    let req;
    let res;

    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(console, 'error').mockImplementation(() => {});

        req = {};

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getAllEmployees', () => {
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

            employeesRepository.findAll.mockResolvedValue(mockEmployees);

            await employeesController.getAllEmployees(req, res);

            expect(employeesRepository.findAll).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith(mockEmployees);
        });

        it('should return 500 when a repository error occurs', async () => {
            const error = new Error('Database error.');

            employeesRepository.findAll.mockRejectedValue(error);

            await employeesController.getAllEmployees(req, res);

            expect(employeesRepository.findAll).toHaveBeenCalledTimes(1);

            expect(console.error).toHaveBeenCalledWith(error);

            expect(res.status).toHaveBeenCalledWith(500);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Internal server error.'
            });
        });
    });

    describe('createEmployee', () => {
        it('should create a new employee', async () => {
            req.body = {
                name: 'Thiago Rocha',
                position: 'Desenvolvedor Backend',
                phone: '(19) 93417-5628'
            };

            const mockCreatedEmployee = {
                id: 4,
                name: 'Thiago Rocha',
                position: 'Desenvolvedor Backend',
                phone: '(19) 93417-5628'
            };

            employeesRepository.create.mockResolvedValue(mockCreatedEmployee);

            await employeesController.createEmployee(req, res);

            expect(employeesRepository.create).toHaveBeenCalledWith('Thiago Rocha', 'Desenvolvedor Backend', '(19) 93417-5628');

            expect(res.status).toHaveBeenCalledWith(201);

            expect(res.json).toHaveBeenCalledWith(mockCreatedEmployee);
        });

        it('should return 400 when required properties are missing', async () => {
            req.body = {
                position: 'Desenvolvedor Backend',
                phone: '(19) 93417-5628'
            };

            await employeesController.createEmployee(req, res);

            expect(employeesRepository.create).not.toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toHaveBeenCalledWith({
                message: 'The properties name, position, and phone are required.'
            });
        });

        it('should return 500 when a repository error occurs', async () => {
            req.body = {
                name: 'Thiago Rocha',
                position: 'Desenvolvedor Backend',
                phone: '(19) 93417-5628'
            };

            const error = new Error('Database error.');

            employeesRepository.create.mockRejectedValue(error);

            await employeesController.createEmployee(req, res);

            expect(employeesRepository.create).toHaveBeenCalledWith('Thiago Rocha', 'Desenvolvedor Backend', '(19) 93417-5628');

            expect(console.error).toHaveBeenCalledWith(error);

            expect(res.status).toHaveBeenCalledWith(500);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Internal server error.'
            });
        });
    });

    describe('updateEmployee', () => {
        it('should update an existing employee', async () => {
            req.params = {
                id: 1
            };

            req.body = {
                name: 'Renata Nunes',
                position: 'Analista de Sistemas',
                phone: '(85) 91285-6374'
            };

            const mockUpdatedEmployee = {
                id: 1,
                name: 'Renata Nunes',
                position: 'Analista de Sistemas',
                phone: '(85) 91285-6374'
            };

            employeesRepository.update.mockResolvedValue(mockUpdatedEmployee);

            await employeesController.updateEmployee(req, res);

            expect(employeesRepository.update).toHaveBeenCalledWith(1, 'Renata Nunes', 'Analista de Sistemas', '(85) 91285-6374');

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith(mockUpdatedEmployee);
        });

        it('should return 400 when required properties are missing', async() => {
            req.params = {
                id: 1
            };

            req.body = {
                position: 'Analista de Sistemas',
                phone: '(85) 91285-6374'
            };

            await employeesController.updateEmployee(req, res);

            expect(employeesRepository.update).not.toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toHaveBeenCalledWith({
                message: 'The properties name, position, and phone are required.'
            });
        });

        it('should return 404 when the employee does not exist', async() => {
            req.params = {
                id: 4
            };

            req.body = {
                name: 'Thiago Rocha',
                position: 'Engenheiro de Software',
                phone: '(19) 93417-5628'
            };

            employeesRepository.update.mockResolvedValue(undefined);

            await employeesController.updateEmployee(req, res);

            expect(employeesRepository.update).toHaveBeenCalledWith(4, 'Thiago Rocha', 'Engenheiro de Software', '(19) 93417-5628');

            expect(res.status).toHaveBeenCalledWith(404);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Employee not found.'
            });
        });

        it('should return 500 when a repository error occurs', async() => {
            req.params = {
                id: 1
            };

            req.body = {
                name: 'Renata Nunes',
                position: 'Analista de Sistemas',
                phone: '(85) 91285-6374'
            };

            const error = new Error('Database error.');

            employeesRepository.update.mockRejectedValue(error);

            await employeesController.updateEmployee(req, res);

            expect(employeesRepository.update).toHaveBeenCalledWith(1, 'Renata Nunes', 'Analista de Sistemas', '(85) 91285-6374');

            expect(console.error).toHaveBeenCalledWith(error);

            expect(res.status).toHaveBeenCalledWith(500);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Internal server error.'
            });
        });
    });

    describe('deleteEmployee', () => {
        it('should delete an existing employee', async () => {
            req.params = {
                id: 3
            };

            employeesRepository.remove.mockResolvedValue({ id: 3 });

            await employeesController.deleteEmployee(req, res);

            expect(employeesRepository.remove).toHaveBeenCalledWith(3);

            expect(res.status).toHaveBeenCalledWith(204);

            expect(res.send).toHaveBeenCalledWith();
        });

        it('should return 404 when the employee does not exist', async () => {
            req.params = {
                id: 4
            };

            employeesRepository.remove.mockResolvedValue(undefined);

            await employeesController.deleteEmployee(req, res);

            expect(employeesRepository.remove).toHaveBeenCalledWith(4);

            expect(res.status).toHaveBeenCalledWith(404);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Employee not found.'
            });
        });

        it('should return 500 when a repository error occurs', async () => {
            req.params = {
                id: 3
            };

            const error = new Error('Database error.');

            employeesRepository.remove.mockRejectedValue(error);

            await employeesController.deleteEmployee(req, res);

            expect(employeesRepository.remove).toHaveBeenCalledWith(3);

            expect(console.error).toHaveBeenCalledWith(error);

            expect(res.status).toHaveBeenCalledWith(500);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Internal server error.'
            });
        });
    });
});