import { useState } from 'react';
import { PatientSemiology } from '../../types/patient';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Minus } from 'lucide-react';

interface SemiologyFormProps {
  initialData?: PatientSemiology;
  onSave: (data: PatientSemiology) => void;
  onCancel: () => void;
}

export function SemiologyForm({ initialData, onSave, onCancel }: SemiologyFormProps) {
  const [formData, setFormData] = useState<PatientSemiology>(initialData || {
    updatedAt: new Date().toISOString(),
    contacts: [],
    consultationReason: {
      diagnosisAge: '',
      firstSigns: '',
      diagnoses: [],
      currentCharacteristics: ''
    },
    healthInfo: {
      allergies: [],
      intolerances: [],
      observations: ''
    },
    pregnancyDevelopment: {
      complications: false,
      complicationDetails: '',
      medications: [],
      observations: ''
    },
    motorDevelopment: {
      neckControl: '',
      sitAlone: '',
      crawl: '',
      standWithSupport: '',
      walkAlone: '',
      observations: ''
    },
    autonomy: {
      bathroomRoutine: false,
      namesSensations: false,
      dressingUndressing: false,
      observations: ''
    },
    clinicalObservations: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Responsáveis */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Responsáveis</h3>
        <div className="space-y-4">
          {formData.contacts?.map((contact, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                value={contact.name}
                onChange={(e) => {
                  const newContacts = [...(formData.contacts || [])];
                  newContacts[index] = { ...newContacts[index], name: e.target.value };
                  setFormData(prev => ({ ...prev, contacts: newContacts }));
                }}
                placeholder="Nome"
              />
              <Input
                value={contact.phone}
                onChange={(e) => {
                  const newContacts = [...(formData.contacts || [])];
                  newContacts[index] = { ...newContacts[index], phone: e.target.value };
                  setFormData(prev => ({ ...prev, contacts: newContacts }));
                }}
                placeholder="Telefone"
              />
              <div className="flex gap-2">
                <Input
                  value={contact.relationship}
                  onChange={(e) => {
                    const newContacts = [...(formData.contacts || [])];
                    newContacts[index] = { ...newContacts[index], relationship: e.target.value };
                    setFormData(prev => ({ ...prev, contacts: newContacts }));
                  }}
                  placeholder="Parentesco"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newContacts = formData.contacts?.filter((_, i) => i !== index) || [];
                    setFormData(prev => ({ ...prev, contacts: newContacts }));
                  }}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => setFormData(prev => ({
              ...prev,
              contacts: [...(prev.contacts || []), { name: '', relationship: '', phone: '' }]
            }))}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Responsável
          </Button>
        </div>
      </section>

      {/* Motivo da Consulta */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Motivo da Consulta</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Idade do diagnóstico
            </label>
            <Input
              value={formData.consultationReason?.diagnosisAge || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                consultationReason: {
                  ...prev.consultationReason,
                  diagnosisAge: e.target.value
                }
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Primeiros sinais
            </label>
            <textarea
              value={formData.consultationReason?.firstSigns || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                consultationReason: {
                  ...prev.consultationReason,
                  firstSigns: e.target.value
                }
              }))}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>
        </div>
      </section>

      {/* Saúde */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Saúde</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Alergias e intolerâncias
            </label>
            <textarea
              value={formData.healthInfo?.observations || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                healthInfo: {
                  ...prev.healthInfo,
                  observations: e.target.value
                }
              }))}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>
        </div>
      </section>

      {/* Desenvolvimento Motor */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Evolução Psicomotora</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Firmou o pescoço
            </label>
            <Input
              value={formData.motorDevelopment?.neckControl || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                motorDevelopment: {
                  ...prev.motorDevelopment,
                  neckControl: e.target.value
                }
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sentou sozinho
            </label>
            <Input
              value={formData.motorDevelopment?.sitAlone || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                motorDevelopment: {
                  ...prev.motorDevelopment,
                  sitAlone: e.target.value
                }
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Engatinhou
            </label>
            <Input
              value={formData.motorDevelopment?.crawl || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                motorDevelopment: {
                  ...prev.motorDevelopment,
                  crawl: e.target.value
                }
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ficou de pé com apoio
            </label>
            <Input
              value={formData.motorDevelopment?.standWithSupport || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                motorDevelopment: {
                  ...prev.motorDevelopment,
                  standWithSupport: e.target.value
                }
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Andou sozinho
            </label>
            <Input
              value={formData.motorDevelopment?.walkAlone || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                motorDevelopment: {
                  ...prev.motorDevelopment,
                  walkAlone: e.target.value
                }
              }))}
            />
          </div>
        </div>
      </section>

      {/* Autonomia */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Autonomia</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.autonomy?.bathroomRoutine || false}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                autonomy: {
                  ...prev.autonomy,
                  bathroomRoutine: e.target.checked
                }
              }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Realiza rotina do banheiro
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.autonomy?.namesSensations || false}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                autonomy: {
                  ...prev.autonomy,
                  namesSensations: e.target.checked
                }
              }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Nomeia sensações
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.autonomy?.dressingUndressing || false}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                autonomy: {
                  ...prev.autonomy,
                  dressingUndressing: e.target.checked
                }
              }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Vestir e despir
            </label>
          </div>
        </div>
      </section>

      {/* Observações Clínicas */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Observações Clínicas</h3>
        <textarea
          value={formData.clinicalObservations || ''}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            clinicalObservations: e.target.value
          }))}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm dark:bg-gray-700 dark:text-white"
          rows={6}
          placeholder="Adicione observações clínicas relevantes..."
        />
      </section>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
}