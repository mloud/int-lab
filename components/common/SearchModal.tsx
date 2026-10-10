'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ChevronRight, BookOpen, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { SEARCH_INDEX, Chapter } from '@/config/curriculum';
import { useCurriculum } from '@/components/providers/CurriculumContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Chapter[]>([]);
  const [filterBySchool, setFilterBySchool] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { school } = useCurriculum();

  // Zjištění všech platných cest v rámci aktivní školy
  const activeSchoolPaths = useMemo(() => {
    const paths = new Set<string>();
    for (const div of school.divisions) {
      paths.add(div.route);
      for (const g of div.grades) {
        for (const s of g.subjects) {
          paths.add(s.route);
          for (const c of s.chapters) {
            paths.add(c.route);
            if (c.subchapters) {
              for (const sub of c.subchapters) {
                paths.add(sub.route);
              }
            }
          }
        }
      }
    }
    return paths;
  }, [school]);

  const isChapterInSchool = useMemo(() => {
    return (chapter: Chapter): boolean => {
      if (activeSchoolPaths.has(chapter.path)) return true;
      // Ověření shody s prefixem cesty divize (např. /informatika/...)
      return school.divisions.some(div => chapter.path.startsWith(div.route));
    };
  }, [activeSchoolPaths, school]);

  // Initialize Fuse.js
  const fuse = useRef(
    new Fuse(SEARCH_INDEX, {
      keys: ['title', 'description', 'keywords', 'category'],
      threshold: 0.3, // Lower is more strict
      includeScore: true,
    })
  );

  const performSearch = (searchTerm: string, onlySchool: boolean) => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const searchResults = fuse.current.search(searchTerm).map(result => result.item);
    const filtered = onlySchool ? searchResults.filter(isChapterInSchool) : searchResults;
    setResults(filtered.slice(0, 8));
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      setResults([]);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    performSearch(val, filterBySchool);
  };

  const handleToggleFilter = (onlySchool: boolean) => {
    setFilterBySchool(onlySchool);
    performSearch(query, onlySchool);
  };

  const handleSelect = (path: string) => {
    onClose();
    router.push(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        
        {/* Header / Input */}
        <div className="flex items-center px-4 py-4 border-b border-slate-100 bg-white">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Hledat lekce, témata (např. 'binární', 'OS')..."
            className="flex-1 text-lg outline-none bg-transparent placeholder:text-slate-400 text-slate-800"
          />
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-header s filtrem školy */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-600 mr-0.5" />
            <span className="text-slate-500 font-medium">Rozsah:</span>
            <div className="inline-flex p-0.5 bg-slate-200/70 rounded-lg">
              <button
                type="button"
                onClick={() => handleToggleFilter(true)}
                className={`px-2.5 py-1 rounded-md font-bold text-xs transition-all ${
                  filterBySchool
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {school.shortName || school.name}
              </button>
              <button
                type="button"
                onClick={() => handleToggleFilter(false)}
                className={`px-2.5 py-1 rounded-md font-bold text-xs transition-all ${
                  !filterBySchool
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Celý portál
              </button>
            </div>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            {filterBySchool ? `Jen pro: ${school.shortName || school.name}` : 'Hledání napříč všemi lekcemi'}
          </span>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1">
          {query.trim() !== '' && results.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              Pro dotaz "{query}" jsme nenašli žádnou shodu.
            </div>
          ) : results.length > 0 ? (
            <ul className="py-2">
              {results.map((chapter) => {
                const Icon = chapter.icon || BookOpen;
                return (
                  <li key={chapter.id}>
                    <button
                      onClick={() => handleSelect(chapter.path)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-4 transition-colors group border-l-2 border-transparent hover:border-indigo-500"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                            {chapter.title}
                          </h4>
                          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {chapter.category === 'informatika' ? 'Obecná IT' : 'Speciální IT'}
                          </span>
                        </div>
                        {chapter.description && (
                          <p className="text-sm text-slate-500 mt-0.5">
                            {chapter.description}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="py-8 px-6 text-slate-400 text-sm">
              <p className="mb-2 font-medium text-slate-500">Tip pro vyhledávání:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Zkuste "binární" pro číselné soustavy</li>
                <li>Zkuste "komprese" pro zmenšování souborů</li>
                <li>Zkuste "hw" pro hardware</li>
              </ul>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span className="border border-slate-200 bg-white rounded px-1.5 py-0.5 font-mono shadow-sm">Esc</span> zavřít
          </div>
          <div>
            Powered by Fuse.js
          </div>
        </div>
      </div>
    </div>
  );
}
