CREATE TABLE IF NOT EXISTS users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS accounts (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(20) CHECK (type IN ('checking', 'credit', 'savings')),
    user_id INT REFERENCES users(id),
    bank INT NOT NULL
)

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    amount DECIMAL NOT NULL,
    date DATE NOT NULL,
    raw_name VARCHAR(255) NOT NULL,
    clean_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    notes TEXT,
    user_id INT REFERENCES users(id),
    account_id INT REFERENCES accounts(id),
    ref_num VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);
