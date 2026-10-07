export const createEmployeeForm = document.querySelector('#create-employee-form');

const createEmployeeNameInput = document.querySelector('#create-employee-name-input');
const createEmployeePositionInput = document.querySelector('#create-employee-position-input');
const createEmployeePhoneInput = document.querySelector('#create-employee-phone-input');

export const editEmployeeForm = document.querySelector('#edit-employee-form');

export const cancelEditButton = document.querySelector('#cancel-edit-button');

const editEmployeeNameInput = document.querySelector('#edit-employee-name-input');
const editEmployeePositionInput = document.querySelector('#edit-employee-position-input');
const editEmployeePhoneInput = document.querySelector('#edit-employee-phone-input');
const editEmployeeMessage = document.querySelector('#edit-employee-message');

const employeesList = document.querySelector('#employees-list');

export function getCreateEmployeeFormData() {
    return {
        name: createEmployeeNameInput.value,
        position: createEmployeePositionInput.value,
        phone: createEmployeePhoneInput.value
    };
}

export function clearCreateEmployeeForm() {
    createEmployeeForm.reset();
}

export function fillEditEmployeeForm(employee) {
    editEmployeeNameInput.value = employee.name;
    editEmployeePositionInput.value = employee.position;
    editEmployeePhoneInput.value = employee.phone;
}

export function getEditEmployeeFormData() {
    return {
        name: editEmployeeNameInput.value,
        position: editEmployeePositionInput.value,
        phone: editEmployeePhoneInput.value
    };
}

export function clearEditEmployeeForm() {
    editEmployeeForm.reset();
}

export function showEditEmployeeForm() {
    editEmployeeMessage.hidden = true;
    editEmployeeForm.hidden = false;
}

export function hideEditEmployeeForm() {
    editEmployeeMessage.hidden = false;
    editEmployeeForm.hidden = true;
}

export function renderEmployees(employees, handleEditEmployeeButtonClick, handleDeleteEmployeeButtonClick) {
    employeesList.innerHTML = '';

    employees.forEach((employee) => {
        const li = document.createElement('li');

        const employeeInfo = document.createElement('span');
        employeeInfo.textContent = `${employee.name} | ${employee.position} | ${employee.phone}`;

        const editEmployeeButton = document.createElement('button');
        editEmployeeButton.type = 'button';
        editEmployeeButton.className = 'button button-blue';
        editEmployeeButton.textContent = 'Editar';

        const deleteEmployeeButton = document.createElement('button');
        deleteEmployeeButton.type = 'button';
        deleteEmployeeButton.className = 'button button-red';
        deleteEmployeeButton.textContent = 'Excluir';

        editEmployeeButton.addEventListener('click', () => {
            handleEditEmployeeButtonClick(employee);
        });

        deleteEmployeeButton.addEventListener('click', () => {
            handleDeleteEmployeeButtonClick(employee);
        });

        li.appendChild(employeeInfo);
        li.appendChild(editEmployeeButton);
        li.appendChild(deleteEmployeeButton);

        employeesList.appendChild(li);
    });
}