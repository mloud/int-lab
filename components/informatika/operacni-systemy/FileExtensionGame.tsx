import React, { useState } from 'react';
import { ArrowLeft, FileText, Image as ImageIcon, FileVideo, FileCode, CheckCircle2, XCircle, Edit3, Settings, Trophy, RotateCcw } from 'lucide-react';

interface FileExtensionGameProps {
  onBack: () => void;
}

interface Program {
  id: string;
  name: string;
  acceptedExtensions: string[];
  color: string;
}

interface FileItem {
  id: string;
  baseName: string;
  currentExtension: string;
  correctExtension: string;
  isBroken: boolean;
  isMatched: boolean;
  visualHint: React.ElementType; // Nápověda o skutečném obsahu souboru
  contentDesc: string;
}

const PROGRAMS: Program[] = [
  { id: 'word', name: 'MS Word', acceptedExtensions: ['.docx', '.doc'], color: 'bg-blue-600' },
  { id: 'excel', name: 'MS Excel', acceptedExtensions: ['.xlsx', '.xls'], color: 'bg-green-600' },
  { id: 'gallery', name: 'Fotogalerie', acceptedExtensions: ['.jpg', '.png', '.bmp'], color: 'bg-emerald-600' },
  { id: 'vlc', name: 'Přehrávač videí', acceptedExtensions: ['.mp4'], color: 'bg-orange-600' },
  { id: 'acrobat', name: 'Acrobat Reader', acceptedExtensions: ['.pdf'], color: 'bg-red-600' },
];

const INITIAL_FILES: FileItem[] = [
  { id: 'f1', baseName: 'referat_historie', currentExtension: '.docx', correctExtension: '.docx', isBroken: false, isMatched: false, visualHint: FileText, contentDesc: 'Textový dokument o historii' },
  { id: 'f2', baseName: 'dovolena_more', currentExtension: '.jpg', correctExtension: '.jpg', isBroken: false, isMatched: false, visualHint: ImageIcon, contentDesc: 'Fotografie z dovolené' },
  { id: 'f3', baseName: 'zaznam_zapasu', currentExtension: '.mp4', correctExtension: '.mp4', isBroken: false, isMatched: false, visualHint: FileVideo, contentDesc: 'Videozáznam hokejového zápasu' },
  { id: 'f4', baseName: 'ucebnice', currentExtension: '.pdf', correctExtension: '.pdf', isBroken: false, isMatched: false, visualHint: FileText, contentDesc: 'Oskenovaná kniha v neměnném formátu' },
  { id: 'f5', baseName: 'tabulka_vysledku', currentExtension: '.pdf', correctExtension: '.xlsx', isBroken: true, isMatched: false, visualHint: FileText, contentDesc: 'Omylem přejmenovaný tabulkový dokument' },
  { id: 'f6', baseName: 'kocka_vtipne', currentExtension: '.jpgx', correctExtension: '.jpg', isBroken: true, isMatched: false, visualHint: ImageIcon, contentDesc: 'Fotografie kočky s překlepem v příponě' },
  { id: 'f7', baseName: 'kresba_malovani', currentExtension: '.bmp', correctExtension: '.bmp', isBroken: false, isMatched: false, visualHint: ImageIcon, contentDesc: 'Nekomprimovaný obrázek' }
];

const FileExtensionGame: React.FC<FileExtensionGameProps> = ({ onBack }) => {
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [message, setMessage] = useState<{ text: string, type: 'error' | 'success' | 'info' } | null>({ text: 'Vyber soubor a pošli ho do správného programu k otevření.', type: 'info' });

  const activeFile = files.find(f => f.id === activeFileId);
  const isFinished = files.every(f => f.isMatched);

  const handleProgramClick = (progId: string) => {
    if (!activeFile) {
      setMessage({ text: 'Nejprve musíš vybrat nějaký soubor ze seznamu vlevo!', type: 'error' });
      setTimeout(() => setMessage(null), 2000);
      return;
    }

    const program = PROGRAMS.find(p => p.id === progId);
    if (!program) return;

    // 1. Zkontroluje příponu
    if (program.acceptedExtensions.includes(activeFile.currentExtension)) {
      // 2. Přípona sedí, ale je soubor opravdu tím čím se tváří?
      if (activeFile.currentExtension !== activeFile.correctExtension) {
        setMessage({ text: `CHYBA! Program ${program.name} se pokusil soubor otevřít, ale jeho vnitřní obsah neodpovídá koncovce. Někdo ho špatně přejmenoval!`, type: 'error' });
      } else {
        setMessage({ text: `Úspěch! Soubor se otevřel v programu ${program.name}.`, type: 'success' });
        setFiles(prev => prev.map(f => f.id === activeFile.id ? { ...f, isMatched: true } : f));
        setActiveFileId(null);
      }
    } else {
      setMessage({ text: `OS Windows zprávu zamítl: Program ${program.name} neumí otevírat soubory s příponou ${activeFile.currentExtension}.`, type: 'error' });
    }

    setTimeout(() => {
      if (files.filter(f => !f.isMatched).length > 1) {
         setMessage({ text: 'Vyber další soubor...', type: 'info' });
      }
    }, 4000);
  };

  const startRename = (file: FileItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFileId(file.id);
    setEditValue(file.currentExtension);
  };

  const saveRename = () => {
    if (editingFileId) {
      setFiles(prev => prev.map(f => f.id === editingFileId ? { ...f, currentExtension: editValue.startsWith('.') ? editValue : `.${editValue}` } : f));
      setEditingFileId(null);
      setMessage({ text: 'Přípona byla změněna. Zkus soubor nyní otevřít.', type: 'info' });
    }
  };

  const resetGame = () => {
    setFiles(INITIAL_FILES);
    setActiveFileId(null);
    setEditingFileId(null);
    setMessage({ text: 'Vyber soubor a pošli ho do správného programu k otevření.', type: 'info' });
  };

  return (
    <div className="max-w-6xl w-full flex flex-col items-center animate-in fade-in duration-500 px-4 pb-10">
      
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all border border-gray-200 text-sm uppercase">
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight hidden sm:block">
          Detektiv Přípona
        </h2>
        <div className="w-24"></div> {/* spacer */}
      </div>

      {!isFinished ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* L: Soubory */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-2xl border-4 border-slate-100 flex flex-col">
            <h3 className="text-slate-400 font-black uppercase tracking-widest text-sm mb-4 flex items-center justify-between">
              <span>Soubory na Disku</span>
              <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-500">{files.filter(f=>!f.isMatched).length} zbývá</span>
            </h3>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {files.map(file => {
                if (file.isMatched) return null;
                const isActive = activeFileId === file.id;

                return (
                  <div 
                    key={file.id} 
                    onClick={() => { if (!editingFileId) setActiveFileId(file.id) }}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                      ${isActive ? 'bg-blue-50 border-blue-400 shadow-md scale-[1.02]' : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'}
                    `}
                  >
                    <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0 ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-white border border-slate-200 text-slate-400'}`}>
                      <file.visualHint className="w-5 h-5 mb-0.5" />
                    </div>

                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex items-center gap-1 font-mono text-sm sm:text-base text-slate-800 font-bold truncate">
                        {file.baseName}
                        {editingFileId === file.id ? (
                          <input 
                            autoFocus
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') saveRename() }}
                            onBlur={saveRename}
                            className="bg-yellow-100 border border-yellow-400 px-1 w-16 outline-none text-yellow-900"
                          />
                        ) : (
                          <span className={`${file.currentExtension !== file.correctExtension && activeFileId === file.id ? 'text-red-500 underline decoration-wavy' : 'text-blue-600'}`}>
                            {file.currentExtension}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 truncate mt-0.5">{file.contentDesc}</span>
                    </div>

                    {!editingFileId && (
                      <button onClick={(e) => startRename(file, e)} className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors" title="Přejmenovat příponu">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* R: Programy a OS Logika */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Informační panel OS */}
            <div className={`rounded-3xl p-6 shadow-lg border-4 flex items-center gap-4 transition-colors duration-300
              ${message?.type === 'error' ? 'bg-red-50 border-red-300 text-red-800' : message?.type === 'success' ? 'bg-green-50 border-green-300 text-green-800' : 'bg-blue-50 border-blue-200 text-blue-800'}
            `}>
              <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center shrink-0">
                 {message?.type === 'error' ? <XCircle className="w-6 h-6" /> : message?.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
              </div>
              <p className="font-bold text-sm leading-tight flex-1">{message?.text}</p>
            </div>

            {/* Programy */}
            <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl border-4 border-slate-800 flex-1 relative overflow-hidden">
              <h3 className="text-slate-400 font-black uppercase tracking-widest text-sm mb-8 text-center">
                Tabulka programů v Operačním Systému
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {PROGRAMS.map(prog => (
                   <button
                     key={prog.id}
                     onClick={() => handleProgramClick(prog.id)}
                     className={`relative overflow-hidden group p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300
                       ${prog.color} border-b-4 border-black/20 hover:scale-105 active:scale-95 shadow-xl`}
                   >
                     <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                     <span className="text-white font-black text-xl z-10 drop-shadow-md">{prog.name}</span>
                     <div className="flex gap-2 z-10">
                       {prog.acceptedExtensions.map(ext => (
                         <span key={ext} className="bg-black/30 text-white/90 text-xs font-mono font-bold px-2 py-1 rounded-md border border-white/20">
                           {ext}
                         </span>
                       ))}
                     </div>
                   </button>
                 ))}
              </div>
              
              {activeFile && (
                 <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none animate-in slide-in-from-bottom-8">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-full flex items-center gap-2">
                       <span className="text-white/60 text-xs uppercase font-bold tracking-widest">Odesíláš:</span>
                       <span className="text-white font-mono font-bold text-sm bg-black/40 px-2 py-0.5 rounded">{activeFile.baseName}{activeFile.currentExtension}</span>
                    </div>
                 </div>
              )}
            </div>
          </div>
          
        </div>
      ) : (
        <div className="w-full bg-white rounded-3xl p-12 shadow-2xl border-4 border-emerald-400 flex flex-col items-center text-center animate-in zoom-in">
          <Trophy className="w-32 h-32 text-emerald-500 mb-6" />
          <h2 className="text-5xl font-black text-slate-800 uppercase tracking-tighter mb-4">Mise Splněna!</h2>
          
          <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl mb-8 font-bold border-2 border-emerald-200 max-w-2xl text-left">
            <p className="mb-4 text-center">Výborně! Nyní už bezpečně víš, že:</p>
            <ol className="list-decimal pl-6 space-y-2 text-sm">
              <li>Soubory se neotevírají samy od sebe – <strong>operační systém je posílá programům</strong>.</li>
              <li>OS se rozhoduje, komu soubor pošle, výhradně <strong>podle jeho přípony</strong> (např. .docx pošle Wordu).</li>
              <li>Když někdo přejmenuje příponu ručně (např. z .jpg na .pdf), <strong>vnitřní obsah se nezmění</strong>. Program PDF se sice spustí, ale nahlásí chybu, protože obrázek přečíst neumí.</li>
            </ol>
          </div>

          <div className="flex gap-4">
            <button onClick={resetGame} className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> Hrát znovu
            </button>
            <button onClick={onBack} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              Zpět do menu <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExtensionGame;
