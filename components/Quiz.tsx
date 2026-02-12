import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { askExpertHelper } from '../services/gemini';
import { Loader2, MessageSquare, HelpCircle } from 'lucide-react';

interface QuizProps {
  answers: Record<number, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  onSubmit: () => void;
}

const Quiz: React.FC<QuizProps> = ({ answers, setAnswers, onSubmit }) => {
  const [helperQuery, setHelperQuery] = useState('');
  const [helperResponse, setHelperResponse] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleOptionChange = (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const allAnswered = QUESTIONS.every(q => answers[q.id]);

  const handleAskExpert = async () => {
    if (!helperQuery.trim()) return;
    setIsAsking(true);
    const response = await askExpertHelper(helperQuery);
    setHelperResponse(response || "Sin respuesta");
    setIsAsking(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden print:border-none print:shadow-none">
        <div className="bg-indigo-600 p-4 text-white print:bg-transparent print:text-black print:border-b-2 print:border-black print:px-0">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="bg-white text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm print:border print:border-black print:text-black">?</span>
            Preguntas de la Misión
          </h2>
          <p className="text-indigo-100 text-sm mt-1 print:text-gray-600">Mira los gráficos de arriba para encontrar la respuesta correcta.</p>
        </div>

        <div className="p-6 space-y-8 print:px-0">
          {QUESTIONS.map((q, index) => (
            <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 print:bg-transparent print:border-none print:p-0 print:mb-6">
              <p className="font-bold text-lg text-indigo-900 mb-4 print:text-black">
                {index + 1}. {q.text}
              </p>
              <div className="space-y-3">
                {q.options.map((opt) => (
                  <label 
                    key={opt.id} 
                    className={`flex items-start p-3 rounded-xl cursor-pointer transition-all border-2 ${
                      answers[q.id] === opt.id 
                        ? 'bg-indigo-50 border-indigo-400 print:bg-gray-100 print:ring-0 print:border-black' 
                        : 'bg-white border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 print:border-gray-300'
                    } print:break-inside-avoid`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt.id}
                      checked={answers[q.id] === opt.id}
                      onChange={() => handleOptionChange(q.id, opt.id)}
                      className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500 print:text-black"
                    />
                    <span className="ml-3 text-slate-700 font-medium print:text-black">{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar - Hidden during print */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
            <button
              onClick={() => setShowChat(!showChat)}
              className="text-indigo-600 text-sm font-bold flex items-center hover:bg-indigo-50 px-3 py-2 rounded transition-colors"
            >
              <HelpCircle className="w-5 h-5 mr-1" />
              ¿Necesitas una pista?
            </button>

            <button
                onClick={onSubmit}
                disabled={!allAnswered}
                className={`px-8 py-3 rounded-full font-bold text-white shadow-md transition-all ${
                allAnswered 
                    ? 'bg-green-500 hover:bg-green-600 hover:shadow-lg transform hover:-translate-y-1' 
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
            >
                {allAnswered ? '¡Terminar Misión!' : 'Responde todas las preguntas'}
            </button>
        </div>

        {/* AI Helper Chat (Collapsible) */}
        {showChat && (
          <div className="mx-6 mb-6 p-4 bg-indigo-50 rounded-2xl border-2 border-indigo-100 no-print animate-fade-in">
            <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2"/> Profesor Bot
            </h4>
            <div className="flex gap-2 mb-2">
              <input 
                type="text" 
                value={helperQuery}
                onChange={(e) => setHelperQuery(e.target.value)}
                placeholder="Ej: No entiendo el gráfico rojo..."
                className="flex-1 p-3 border-2 border-indigo-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400"
                onKeyDown={(e) => e.key === 'Enter' && handleAskExpert()}
              />
              <button 
                onClick={handleAskExpert} 
                disabled={isAsking || !helperQuery}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold disabled:opacity-50 hover:bg-indigo-700"
              >
                {isAsking ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Preguntar'}
              </button>
            </div>
            {helperResponse && (
               <div className="text-sm text-indigo-900 bg-white p-4 rounded-xl border border-indigo-100 font-medium">
                 "{helperResponse}"
               </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Quiz;