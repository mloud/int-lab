
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Trophy, RefreshCcw, CheckCircle2, XCircle, BrainCircuit, Lightbulb } from 'lucide-react';
import { RGB } from '../../../types';

const COLORS = [
  { name: 'Červená', rgb: { r: 255, g: 0, b: 0 } },
  { name: 'Zelená', rgb: { r: 0, g: 255, b: 0 } },
  { name: 'Modrá', rgb: { r: 0, g: 0, b: 255 } },
  { name: 'Žlutá', rgb: { r: 255, g: 255, b: 0 } },
  { name: 'Azurová', rgb: { r: 0, g: 255, b: 255 } },
  { name: 'Fialová', rgb: { r: 255, g: 0, b: 255 } },
  { name: 'Bílá', rgb: { r: 255, g: 255, b: 255 } },
  { name: 'Černá', rgb: { r: 0, g: 0, b: 0 } },
  { name: 'Šedá', rgb: { r: 128, g: 128, b: 128 } },
];

type QuestionType = 'rgbToColor' | 'colorToRgb';

interface Question {
  type: QuestionType;
  correctColor: typeof COLORS[0];
  options: (typeof COLORS[0])[];
}

const Quiz: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const totalQuestions = 15;

  const generateQuestion = useCallback(() => {
    const type: QuestionType = Math.random() > 0.5 ? 'rgbToColor' : 'colorToRgb';
    const shuffledColors = [...COLORS].sort(() => Math.random() - 0.5);
    const correctColor = shuffledColors[0];
    
    // Vybereme další 2 náhodné barvy, které nejsou tou správnou
    const otherOptions = shuffledColors.slice(1, 3);
    const options = [correctColor, ...otherOptions].sort(() => Math.random() - 0.5);
    
    setCurrentQuestion({ type, correctColor, options });
    setSelectedOption(null);
    setIsAnswered(false);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    const isCorrect = currentQuestion?.options[index].name === currentQuestion?.correctColor.name;
    if (isCorrect) {
      setScore(s => s + 1);
    }

    // Čekáme déle, pokud uživatel udělal chybu, aby si mohl prohlédnout správné řešení
    const delay = isCorrect ? 1500 : 3000;

    setTimeout(() => {
      if (questionIndex + 1 < totalQuestions) {
        setQuestionIndex(i => i + 1);
        generateQuestion();
      } else {
        setIsGameOver(true);
      }
    }, delay);
  };

  const resetQuiz = () => {
    setScore(0);
    setQuestionIndex(0);
    setIsGameOver(false);
    generateQuestion();
  };

  if (isGameOver) {
    return (
      <div className="max-w-md w-full animate-in zoom-in duration-500">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-4 border-white text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl rotate-12">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Konec hry!</h2>
          <p className="text-gray-600 mb-8 font-medium italic">Tvé skóre: <span className="text-blue-600 font-black text-2xl not-italic ml-2">{score} / {totalQuestions}</span></p>
          
          <div className="space-y-4">
            <button 
              onClick={resetQuiz}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[2rem] shadow-xl shadow-blue-100 transition-all uppercase tracking-widest"
            >
              Hrát znovu
            </button>
            <button 
              onClick={onBack}
              className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold rounded-[2rem] transition-all uppercase tracking-widest text-xs"
            >
              Zpět na úvod
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const isUserCorrect = selectedOption !== null && currentQuestion.options[selectedOption].name === currentQuestion.correctColor.name;

  return (
    <div className="max-w-2xl w-full animate-in fade-in duration-500 px-4">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-blue-600 font-black uppercase text-xs tracking-widest transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Konec
        </button>
        <div className="flex items-center space-x-3">
          <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Otázka {questionIndex + 1}/{totalQuestions}</span>
          <div className="w-24 sm:w-32 h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}></div>
          </div>
        </div>
        <div className="bg-blue-600 px-4 py-2 rounded-2xl shadow-md font-black text-white text-sm">
          Skóre: {score}
        </div>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-[3rem] shadow-xl border-2 border-gray-50 text-center mb-6">
        <div className="inline-flex p-4 bg-blue-50 rounded-2xl mb-6">
          <BrainCircuit className="w-8 h-8 text-blue-600" />
        </div>
        
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-10 uppercase tracking-tight leading-snug">
          {currentQuestion.type === 'rgbToColor' 
            ? `Která barva má kód RGB(${currentQuestion.correctColor.rgb.r}, ${currentQuestion.correctColor.rgb.g}, ${currentQuestion.correctColor.rgb.b})?`
            : `Jaký RGB kód má tato barva?`}
        </h2>

        {currentQuestion.type === 'colorToRgb' && (
          <div className="flex justify-center mb-10">
            <div 
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-[2.5rem] shadow-lg border-4 border-white ring-4 ring-gray-100"
              style={{ backgroundColor: `rgb(${currentQuestion.correctColor.rgb.r}, ${currentQuestion.correctColor.rgb.g}, ${currentQuestion.correctColor.rgb.b})` }}
            ></div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentQuestion.options.map((option, idx) => {
            const isCorrectOption = option.name === currentQuestion.correctColor.name;
            const isSelected = selectedOption === idx;
            
            let btnClass = "relative h-32 sm:h-40 flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all text-gray-800 shadow-sm ";
            
            if (!isAnswered) {
              btnClass += "bg-white border-gray-100 hover:border-blue-400 hover:scale-105 active:scale-95 cursor-pointer text-gray-900";
            } else {
              if (isCorrectOption) {
                btnClass += "bg-green-50 border-green-500 text-green-900 shadow-green-100 ring-4 ring-green-100 scale-105 z-10";
              } else if (isSelected) {
                btnClass += "bg-red-50 border-red-500 text-red-900 shadow-red-100 opacity-80";
              } else {
                btnClass += "bg-gray-50 border-gray-100 opacity-40 text-gray-400 scale-95";
              }
            }

            return (
              <button key={idx} onClick={() => handleAnswer(idx)} className={btnClass} disabled={isAnswered}>
                {currentQuestion.type === 'rgbToColor' ? (
                  <>
                    <div 
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl mb-4 border-2 border-white shadow-md"
                      style={{ backgroundColor: `rgb(${option.rgb.r}, ${option.rgb.g}, ${option.rgb.b})` }}
                    ></div>
                    <span className="font-black text-sm uppercase tracking-wider">{option.name}</span>
                  </>
                ) : (
                  <span className="font-black text-sm tracking-widest">
                    RGB({option.rgb.r}, {option.rgb.g}, {option.rgb.b})
                  </span>
                )}

                {isAnswered && isCorrectOption && <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-green-600" />}
                {isAnswered && isSelected && !isCorrectOption && <XCircle className="absolute top-3 right-3 w-5 h-5 text-red-600" />}
              </button>
            );
          })}
        </div>

        {isAnswered && !isUserCorrect && (
          <div className="mt-8 p-4 bg-blue-50 border-2 border-blue-100 rounded-2xl flex items-center justify-center text-blue-800 animate-in slide-in-from-bottom duration-300">
            <Lightbulb className="w-5 h-5 mr-3 text-blue-600" />
            <span className="font-bold text-sm uppercase tracking-tight">
              Správně bylo: {currentQuestion.type === 'rgbToColor' ? currentQuestion.correctColor.name : `RGB(${currentQuestion.correctColor.rgb.r}, ${currentQuestion.correctColor.rgb.g}, ${currentQuestion.correctColor.rgb.b})`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
