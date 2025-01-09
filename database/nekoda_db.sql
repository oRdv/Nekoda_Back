create schema nekoda_db;

use nekoda_db;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

SET SQL_SAFE_UPDATES = 0;


UPDATE Users
SET password = MD5(password);


-- Inserindo usuários
INSERT INTO Users (name, username, email, password)
VALUES 
('Alana', 'alane123', 'alana@exemplo.com', 'Senha1234'),
('Kaique', 'kai456', 'kai@exemplo.com', 'Senha1234');

-- Inserindo posts
INSERT INTO Posts (title, body, user_id, created_at)
VALUES
('Primeiro Post de Alana', 'Este é o primeiro post de Alana.', 1, '2025-01-01 10:00:00'),
('Segundo Post de Alana', 'Este é outro post de Alana.', 1, '2025-01-02 14:30:00'),
('Primeiro Post de Kai', 'Este é o primeiro post de Kai.', 2, '2025-01-03 09:15:00');
