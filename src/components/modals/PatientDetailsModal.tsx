import { X } from 'lucide-react';
import { Patient } from '../../types/patient';
import { Button } from '../ui/Button';

interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

export function PatientDetailsModal({ isOpen, onClose, patient }: PatientDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Detalhes do Paciente
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Informações Básicas
            </h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{patient.name}</dd>
              </div>
              {patient.birthDate && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Data de Nascimento</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {new Date(patient.birthDate).toLocaleDateString('pt-BR')}
                  </dd>
                </div>
              )}
            </dl>
          </section>

          {/* Semiologia */}
          {patient.semiology && (
            <>
              {/* Contatos */}
              {patient.semiology.contacts && patient.semiology.contacts.length > 0 && (
                <section>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Contatos
                  </h3>
                  <div className="space-y-4">
                    {patient.semiology.contacts.map((contact, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <dl className="grid grid-cols-1 gap-2">
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</dt>
                            <dd className="text-sm text-gray-900 dark:text-white">{contact.name}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Parentesco</dt>
                            <dd className="text-sm text-gray-900 dark:text-white">{contact.relationship}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Telefone</dt>
                            <dd className="text-sm text-gray-900 dark:text-white">{contact.phone}</dd>
                          </div>
                        </dl>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Motivo da Consulta */}
              {patient.semiology.consultationReason && (
                <section>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Motivo da Consulta
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Idade do Diagnóstico</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.semiology.consultationReason.diagnosisAge}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Primeiros Sinais</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.semiology.consultationReason.firstSigns}
                      </dd>
                    </div>
                    {patient.semiology.consultationReason.diagnoses.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Diagnósticos</dt>
                        <dd className="mt-1 space-y-1">
                          {patient.semiology.consultationReason.diagnoses.map((diagnosis, index) => (
                            <div key={index} className="text-sm text-gray-900 dark:text-white">
                              • {diagnosis}
                            </div>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                </section>
              )}

              {/* Saúde */}
              {patient.semiology.healthInfo && (
                <section>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Saúde
                  </h3>
                  <dl className="space-y-4">
                    {patient.semiology.healthInfo.allergies.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Alergias</dt>
                        <dd className="mt-1 space-y-1">
                          {patient.semiology.healthInfo.allergies.map((allergy, index) => (
                            <div key={index} className="text-sm text-gray-900 dark:text-white">
                              • {allergy}
                            </div>
                          ))}
                        </dd>
                      </div>
                    )}
                    {patient.semiology.healthInfo.intolerances.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Intolerâncias</dt>
                        <dd className="mt-1 space-y-1">
                          {patient.semiology.healthInfo.intolerances.map((intolerance, index) => (
                            <div key={index} className="text-sm text-gray-900 dark:text-white">
                              • {intolerance}
                            </div>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                </section>
              )}

              {/* Desenvolvimento Motor */}
              {patient.semiology.motorDevelopment && (
                <section>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Desenvolvimento Motor
                  </h3>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Firmou Pescoço</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.semiology.motorDevelopment.neckControl}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Sentou Sozinho</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.semiology.motorDevelopment.sitAlone}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Engatinhou</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.semiology.motorDevelopment.crawl}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Ficou em Pé com Apoio</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.semiology.motorDevelopment.standWithSupport}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Andou Sozinho</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.semiology.motorDevelopment.walkAlone}
                      </dd>
                    </div>
                  </dl>
                </section>
              )}

              {/* Autonomia */}
              {patient.semiology.autonomy && (
                <section>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Autonomia
                  </h3>
                  <dl className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Rotina do Banheiro</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.semiology.autonomy.bathroomRoutine ? 'Sim' : 'Não'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nomeia Sensações</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.semiology.autonomy.namesSensations ? 'Sim' : 'Não'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Vestir e Despir</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.semiology.autonomy.dressingUndressing ? 'Sim' : 'Não'}
                        </dd>
                      </div>
                    </div>
                    {patient.semiology.autonomy.observations && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Observações</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.semiology.autonomy.observations}
                        </dd>
                      </div>
                    )}
                  </dl>
                </section>
              )}

              {/* Observações Clínicas */}
              {patient.semiology.clinicalObservations && (
                <section>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Observações Clínicas
                  </h3>
                  <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                    {patient.semiology.clinicalObservations}
                  </p>
                </section>
              )}
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}