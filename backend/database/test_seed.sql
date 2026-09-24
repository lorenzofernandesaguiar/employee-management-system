TRUNCATE TABLE employees RESTART IDENTITY;

INSERT INTO employees (name, position, phone)
VALUES
('Renata Nunes', 'Designer de Interface', '(85) 91285-6374'),
('Lucas Almeida', 'Administrador de Banco de Dados', '(31) 95673-1842'),
('Camila Santos', 'Assistente Administrativa', '(62) 98314-7256');