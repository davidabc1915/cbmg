-- Atualizar tabela patients
ALTER TABLE patients 
ADD COLUMN IF NOT EXISTS responsible TEXT,
ADD COLUMN IF NOT EXISTS birth_date DATE,
ADD COLUMN IF NOT EXISTS observations TEXT;

-- Atualizar tabela sessions
ALTER TABLE sessions 
ADD COLUMN IF NOT EXISTS next_steps TEXT,
ADD COLUMN IF NOT EXISTS patient_name TEXT;

-- Atualizar tabela checklists
ALTER TABLE checklists 
ADD COLUMN IF NOT EXISTS evaluation_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS template_name TEXT,
ADD COLUMN IF NOT EXISTS patient_name TEXT;

-- Atualizar tabela goals
ALTER TABLE goals 
ADD COLUMN IF NOT EXISTS patient_name TEXT;