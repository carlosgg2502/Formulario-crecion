import React, { useState, useEffect } from 'react';
import { AppStep } from './types';
import ChartsSection from './components/ChartsSection';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { BarChart3, FileText, Download, Share2, Check, Link } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('intro');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);

  const startActivity = () => setStep('activity');
  const finishActivity = () => setStep('results');
  const resetActivity = () => {
    setAnswers({});
    setStep('intro');
  };

  // Function to trigger print dialog (effectively "Downloading" the form)
  const downloadForm = () => {
    window.print();
  };

  // Function to share the URL
  const handleShare = async () => {
    const shareData = {
      title: 'Detectives del Clima - Misión Bioterra',
      text: '¡Ayúdame a investigar el cambio climático en Bioterra! 🌍🔍',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error al compartir:', err);
      }
    } else {
      // Fallback for desktop browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Error al copiar:', err);
      }
    }
  };

  // Lock body scroll when in Intro mode because we use a fixed overlay
  useEffect(() => {
    if (step === 'intro') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [step]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-[60] print:static print:bg-white print:text-black print:border-b-2 print:border-black">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg print:hidden">
               <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Detectives del Clima</h1>
              <p className="text-xs text-slate-400 print:text-gray-600">5º Primaria - Matemáticas y Naturaleza</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 no-print">
            <button 
              onClick={handleShare}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-all font-medium border ${copied ? 'bg-green-600 border-green-500 text-white' : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200'}`}
              title="Compartir enlace con amigos"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? '¡Enlace Copiado!' : 'Compartir'}</span>
            </button>

            <button 
              onClick={downloadForm}
              className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded text-sm transition-colors border border-slate-700"
              title="Descargar ficha para imprimir"
            >
              <Download className="w-4 h-4" />
              <span className="hidden lg:inline">Imprimir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow print:p-0">
        <div className="max-w-6xl mx-auto relative">
          
          {/* Printable Content */}
          {step !== 'results' && (
             <div className={`p-4 md:p-8 transition-opacity duration-300 ${step === 'intro' ? 'absolute inset-0 opacity-0 -z-50 print:static print:opacity-100 print:z-auto' : 'animate-fade-in-up'}`}>
                
                {/* Printable Header Context */}
                <div className="hidden print:block mb-8 border-b pb-4">
                  <h2 className="text-2xl font-bold">Misión: Salvar Bioterra</h2>
                  <p><strong>Objetivo:</strong> Usar las gráficas para descubrir por qué hace tanto calor.</p>
                  <p><strong>Instrucciones:</strong> Mira los dibujos y marca la respuesta correcta con una X.</p>
                </div>

                <div className="mb-8">
                   <div className="flex items-center justify-between mb-4 print:hidden">
                      <h2 className="text-2xl font-bold text-slate-800">Pistas Visuales</h2>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded border border-yellow-200">
                          Años: 2014 - 2024
                      </span>
                   </div>
                   <ChartsSection />
                </div>

                <Quiz 
                    answers={answers} 
                    setAnswers={setAnswers} 
                    onSubmit={finishActivity} 
                />
             </div>
          )}

          {/* INTRO OVERLAY (Gamified) */}
          {step === 'intro' && (
            <div className="fixed inset-0 top-[72px] bg-sky-100 z-50 overflow-y-auto print:hidden">
               <div className="max-w-6xl mx-auto p-8 flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in">
                  <div className="max-w-2xl space-y-6 bg-white p-8 rounded-3xl shadow-xl border-4 border-blue-200">
                    <div className="text-5xl mb-2">🌍🔍</div>
                    <h2 className="text-4xl font-extrabold text-blue-600">¡Hola Detective Junior!</h2>
                    <p className="text-lg text-slate-700 leading-relaxed font-medium">
                      Bienvenido a la isla de <strong>Bioterra</strong>. Tenemos un problema: ¡Hace demasiado calor! 🥵
                      <br/><br/>
                      Necesitamos tu ayuda. Tienes que mirar los <strong>gráficos secretos</strong>, descubrir qué está pasando con los árboles y resolver el misterio.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-8">
                       <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-100">
                          <div className="font-bold text-blue-800 mb-1">⏱️ Tiempo</div>
                          <div className="text-sm text-blue-600">25 Minutos</div>
                       </div>
                       <div className="bg-green-50 p-4 rounded-xl border-2 border-green-100">
                          <div className="font-bold text-green-800 mb-1">🎯 Misión</div>
                          <div className="text-sm text-green-600">Descubrir el problema</div>
                       </div>
                       <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-100">
                          <div className="font-bold text-orange-800 mb-1">🛠️ Herramienta</div>
                          <div className="text-sm text-orange-600">Tus ojos de detective</div>
                       </div>
                    </div>

                    <div className="pt-8">
                        <button 
                            onClick={startActivity}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-bold px-10 py-4 rounded-full hover:scale-105 transform transition-all shadow-xl ring-4 ring-blue-200 animate-pulse"
                        >
                            ¡Aceptar la Misión!
                        </button>
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-500">
                           <button onClick={handleShare} className="flex items-center gap-1 hover:text-blue-600 font-medium">
                             <Link className="w-4 h-4" />
                             Compartir con compañeros
                           </button>
                           <span className="hidden sm:inline">•</span>
                           <button onClick={downloadForm} className="flex items-center gap-1 hover:text-blue-600 font-medium">
                             <FileText className="w-4 h-4" />
                             Imprimir ficha de papel
                           </button>
                        </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {step === 'results' && (
            <div className="p-4 md:p-8 animate-fade-in-up">
               <div className="mb-8 print:block">
                  <ChartsSection />
               </div>
               <Results 
                  answers={answers} 
                  onRetry={resetActivity} 
               />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto print:hidden z-10">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 Bioterra Escolar. ¡Cuidemos el planeta!</p>
        </div>
      </footer>
    </div>
  );
};

export default App;