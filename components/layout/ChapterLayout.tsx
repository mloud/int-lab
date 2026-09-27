import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Home, Menu } from 'lucide-react';
import { getChapterById, getNextChapter, getPrevChapter } from '@/config/curriculum';

interface ChapterLayoutProps {
  chapterId: string;
  children: React.ReactNode;
}

const ChapterLayout: React.FC<ChapterLayoutProps> = ({ chapterId, children }) => {
  const router = useRouter();
  const chapter = getChapterById(chapterId);
  
  if (!chapter) {
    return <div className="p-8 text-center text-red-500">Kapitola nenalezena (ID: {chapterId})</div>;
  }

  const prevChapter = getPrevChapter(chapterId);
  const nextChapter = getNextChapter(chapterId);
  
  const Icon = chapter.icon || null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Header / Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Breadcrumbs & Logo */}
          <div className="flex items-center gap-4">
            <Link 
              href={chapter.category === 'informatika' ? '/informatika' : '/specializovana'}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
              title="Zpět do menu"
            >
              <Home className="w-5 h-5" />
            </Link>
            
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500">
              <Link 
                href={chapter.category === 'informatika' ? '/informatika' : '/specializovana'}
                className="uppercase tracking-wider text-[10px] font-bold hover:text-blue-600 transition-colors cursor-pointer"
              >
                {chapter.category === 'informatika' ? 'Obecná Informatika' : 'Specializovaná IT'}
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-bold flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4 text-blue-500" />}
                {chapter.title}
              </span>
            </div>
          </div>

          {/* Right actions (could be standard menu or user profile) */}
          <div>
             <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors sm:hidden">
               <Menu className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
        
        {/* Page Title (Mobile only, since desktop has breadcrumbs) */}
        <div className="sm:hidden mb-6 flex items-center gap-3">
           {Icon && <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Icon className="w-6 h-6" /></div>}
           <h1 className="text-2xl font-black text-slate-800">{chapter.title}</h1>
        </div>

        {/* The Actual Chapter Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-2 sm:p-6 min-h-[60vh]">
          {children}
        </div>
      </main>

      {/* Footer Navigation (Previous / Next) */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Previous Button */}
          {prevChapter ? (
            <Link 
              href={prevChapter.path}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl hover:bg-slate-50 text-slate-600 transition-colors border border-transparent hover:border-slate-200 w-full sm:w-auto"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Předchozí</div>
                <div className="font-bold">{prevChapter.title}</div>
              </div>
            </Link>
          ) : (
            <div className="w-full sm:w-auto"></div> // Spacer
          )}

          {/* Next Button */}
          {nextChapter ? (
            <Link 
              href={nextChapter.path}
              className="flex items-center justify-between sm:justify-start gap-3 px-6 py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors w-full sm:w-auto"
            >
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Další kapitola</div>
                <div className="font-bold">{nextChapter.title}</div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div className="w-full sm:w-auto"></div> // Spacer
          )}
          
        </div>
      </footer>
      
    </div>
  );
};

export default ChapterLayout;
