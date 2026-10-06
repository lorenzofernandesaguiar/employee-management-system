export async function getAllEmployees() {
    const response = await fetch('/employees');
    return response.json();
}

export async function createEmployee(employee) {
    const response = await fetch('/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    });

    return response.json();
}

export async function updateEmployee(id, employee) {
    const response = await fetch(`/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    });

    return response.json();
}

export async function deleteEmployee(id) {
    await fetch(`/employees/${id}`, {
        method: 'DELETE'
    });
}