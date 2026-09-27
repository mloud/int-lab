import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Menu, Search } from 'lucide-react';
import SearchModal from '../common/SearchModal';

interface CategoryLayoutProps {
  title: string;
  category: 'informatika' | 'specializovana' | 'main';
  parent?: {
    title: string;
    path: string;
  };
  children: React.ReactNode;
}

const CategoryLayout: React.FC<CategoryLayoutProps> = ({ title, category, parent, children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Header / Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Breadcrumbs & Logo */}
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
              title="Zpět na úvodní stránku"
            >
              <Home className="w-5 h-5" />
            </Link>
            
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500">
              {parent && (
                <>
                  <Link 
                    href={parent.path}
                    className="uppercase tracking-wider text-[10px] font-bold hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {parent.title}
                  </Link>
                  <span className="text-slate-300">/</span>
                </>
              )}
              <span className={`uppercase tracking-wider text-[10px] font-bold ${parent ? 'text-slate-900' : 'text-slate-500'}`}>
                {title}
              </span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
             <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                title="Hledat (Ctrl+K)"
             >
               <Search className="w-5 h-5" />
             </button>
             <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors sm:hidden">
               <Menu className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
        
        {/* Page Title (Mobile only) */}
        <div className="sm:hidden mb-6 flex items-center gap-3">
           <h1 className="text-2xl font-black text-slate-800">{title}</h1>
        </div>

        {/* The Actual Content */}
        <div className="bg-transparent sm:bg-white sm:rounded-3xl sm:shadow-sm sm:border border-slate-100 p-2 sm:p-6 min-h-[60vh] flex flex-col items-center justify-center">
          {children}
        </div>
      </main>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default CategoryLayout;
