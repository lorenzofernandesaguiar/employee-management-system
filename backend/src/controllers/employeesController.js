const employeesRepository = require('../repositories/employeesRepository');

async function getAllEmployees(req, res) {
    try {
        const result = await employeesRepository.findAll();

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function createEmployee(req, res) {
    try {
        const { name, position, phone } = req.body;

        if (name == null || position == null || phone == null) {
            return res.status(400).json({
                message: 'The properties name, position, and phone are required.'
            });
        }

        const result = await employeesRepository.create(name, position, phone);

        return res.status(201).json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function updateEmployee(req, res) {
    try {
        const { id } = req.params;

        const { name, position, phone } = req.body;

        if (name == null || position == null || phone == null) {
            return res.status(400).json({
                message: 'The properties name, position, and phone are required.'
            });
        }

        const result = await employeesRepository.update(id, name, position, phone);

        if (!result) {
            return res.status(404).json({
                message: 'Employee not found.'
            });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function deleteEmployee(req, res) {
    try {
        const { id } = req.params;

        const result = await employeesRepository.remove(id);

        if (!result) {
            return res.status(404).json({
                message: 'Employee not found.'
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
};