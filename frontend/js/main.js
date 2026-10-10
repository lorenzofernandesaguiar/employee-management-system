import {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from './api.js';

import {
    createEmployeeForm,
    editEmployeeForm,
    cancelEditButton,
    getCreateEmployeeFormData,
    clearCreateEmployeeForm,
    fillEditEmployeeForm,
    getEditEmployeeFormData,
    clearEditEmployeeForm,
    showEditEmployeeForm,
    hideEditEmployeeForm,
    renderEmployees
} from './ui.js';

let employeeBeingEdited = null;

async function handleCreateEmployeeFormSubmit(event) {
    event.preventDefault();

    const employeeData = getCreateEmployeeFormData();

    await createEmployee(employeeData);

    clearCreateEmployeeForm();

    await loadEmployees();
}

function handleEditEmployeeButtonClick(employee) {
    employeeBeingEdited = employee;

    fillEditEmployeeForm(employee);

    showEditEmployeeForm();
}

async function handleEditEmployeeFormSubmit(event) {
    event.preventDefault();

    const employeeData = getEditEmployeeFormData();

    await updateEmployee(employeeBeingEdited.id, employeeData);

    clearEditEmployeeForm();

    hideEditEmployeeForm();

    employeeBeingEdited = null;

    await loadEmployees();
}

async function handleDeleteEmployeeButtonClick(employee) {
    await deleteEmployee(employee.id);

    await loadEmployees();
}

function handleCancelEdit() {
    clearEditEmployeeForm();

    hideEditEmployeeForm();

    employeeBeingEdited = null;
}

async function loadEmployees() {
    const employees = await getAllEmployees();

    renderEmployees(employees, handleEditEmployeeButtonClick, handleDeleteEmployeeButtonClick);
}

createEmployeeForm.addEventListener('submit', handleCreateEmployeeFormSubmit);

editEmployeeForm.addEventListener('submit', handleEditEmployeeFormSubmit);

cancelEditButton.addEventListener('click', handleCancelEdit);

loadEmployees();