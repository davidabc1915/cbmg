-- Adicionar coluna semiology como JSONB
ALTER TABLE patients 
ADD COLUMN IF NOT EXISTS semiology JSONB;

-- Atualizar ou criar índice
CREATE INDEX IF NOT EXISTS idx_patients_semiology ON patients USING gin(semiology);

-- Atualizar trigger para timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recriar trigger se não existir
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'set_patients_timestamp'
    ) THEN
        CREATE TRIGGER set_patients_timestamp
        BEFORE UPDATE ON patients
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();
    END IF;
END;
$$;