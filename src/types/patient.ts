export interface Patient {
  id: string;
  user_id: string;
  name: string;
  birth_date: string;
  responsible: string;
  observations?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  semiology?: PatientSemiology;
}

export interface PatientSemiology {
  updatedAt: string;
  contacts?: Array<{
    name: string;
    relationship: string;
    phone: string;
  }>;
  consultationReason?: {
    diagnosisAge: string;
    firstSigns: string;
    diagnoses: string[];
    currentCharacteristics: string;
  };
  healthInfo?: {
    allergies: string[];
    intolerances: string[];
    observations: string;
  };
  pregnancyDevelopment?: {
    complications: boolean;
    complicationDetails: string;
    medications: string[];
    observations: string;
  };
  motorDevelopment?: {
    neckControl: string;
    sitAlone: string;
    crawl: string;
    standWithSupport: string;
    walkAlone: string;
    observations: string;
  };
  autonomy?: {
    bathroomRoutine: boolean;
    namesSensations: boolean;
    dressingUndressing: boolean;
    observations: string;
  };
  clinicalObservations?: string;
}