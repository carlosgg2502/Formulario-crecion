import React, { useEffect, useState } from 'react';
import { QUESTIONS } from '../constants';
import { getExpertAnalysis } from '../services/gemini';
import { CheckCircle, XCircle, Download, RotateCcw, FileText, Loader2, Sparkles } from 'lucide-react';

interface ResultsProps {
  answers: Record<number, string>;
  onRetry: () => void;
}

const Results: React.FC<ResultsProps> = ({ answers, onRetry }) => {
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(true);

  const score = QUESTIONS.reduce((acc, q) => {
    return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / QUESTIONS.length) * 100);

  useEffect(() => {
    const fetchFeedback = async () => {
      const feedback = await getExpertAnalysis(answers, score);
      setAiFeedback(feedback);
      setLoadingAi(false);
    };
    fetchFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Score Card */}
      <div className={`p-8 rounded-xl text-center text-white shadow-lg print:border print:border-black print:text-black print:shadow-none ${percentage >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-600 print:bg-none' : 'bg-gradient-to-r from-orange-500 to-red-600 print:bg-none'}`}>
        <h2 className="text-3xl font-bold mb-2">Resultado de la Investigación</h2>
        <div className="text-6xl font-black mb-4">{percentage}%</div>
        <p className="text-lg opacity-90">
            Has acertado {score} de {QUESTIONS.length} preguntas de análisis.
        </p>
      </div>

      {/* AI Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 relative overflow-hidden print:border print:border-black">
        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Análisis de Inteligencia Artificial
        </h3>
        
        {loadingAi ? (
            <div className="flex items-center space-x-2 text-slate-500 py-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generando reporte detallado desde los servidores de Bioterra...</span>
            </div>
        ) : (
            <div className="prose prose-slate max-w-none text-slate-700 bg-purple-50 p-4 rounded-lg border border-purple-100 print:bg-white print:border-none">
                <p className="whitespace-pre-line leading-relaxed">{aiFeedback}</p>
            </div>
        )}
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden print:shadow-none print:border-none">
        <div className="p-4 bg-slate-100 border-b border-slate-200 font-semibold text-slate-700 print:bg-transparent print:border-b-2 print:border-black">
            Detalle de Respuestas
        </div>
        <div className="divide-y divide-slate-100">
            {QUESTIONS.map((q) => {
                const isCorrect = answers[q.id] === q.correctAnswer;
                return (
                    <div key={q.id} className="p-6">
                         <div className="flex items-start gap-3">
                            <div className="mt-1 flex-shrink-0">
                                {isCorrect ? (
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-red-500" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-slate-900 mb-2">{q.text}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className={`p-3 rounded border ${isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                        <span className="font-semibold block text-xs uppercase mb-1">Tu Respuesta:</span>
                                        {q.options.find(o => o.id === answers[q.id])?.text}
                                    </div>
                                    {!isCorrect && (
                                        <div className="p-3 rounded border bg-blue-50 border-blue-200 text-blue-800">
                                            <span className="font-semibold block text-xs uppercase mb-1">Respuesta Correcta:</span>
                                            {q.options.find(o => o.id === q.correctAnswer)?.text}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-3 text-sm text-slate-600 bg-slate-50 p-3 rounded italic print:bg-transparent print:pl-0">
                                    <span className="font-bold not-italic">Explicación: </span>
                                    {q.explanation}
                                </div>
                            </div>
                         </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center py-8 no-print">
         <button 
            onClick={onRetry}
            className="flex items-center justify-center px-6 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors"
         >
            <RotateCcw className="w-4 h-4 mr-2" /> Intentar de nuevo
         </button>
         
         <button 
            onClick={handlePrint}
            className="flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
         >
            <Download className="w-4 h-4 mr-2" /> Descargar/Imprimir Informe
         </button>
      </div>
      
      <div className="text-center text-xs text-slate-400 no-print">
        * Al imprimir, selecciona "Guardar como PDF" para descargar el formulario completado.
      </div>
    </div>
  );
};

export default Results;
