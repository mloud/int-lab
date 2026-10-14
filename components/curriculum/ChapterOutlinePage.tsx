'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Clock, FlaskConical, Hammer, Link2 } from 'lucide-react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import { getCurriculumIcon } from '@/registry/curriculum/iconRegistry';
import { getOutline } from '@/registry/curriculum/outlines';

interface ChapterOutlinePageProps {
  /** id skupiny (kapitoly), např. 'os3-linux' */
  chapterId: string;
  /** slug podkapitoly, např. 'terminal' */
  slug: string;
  /** Volitelné přepsání nadřazené navigace (např. pro přímé lekce vedoucí zpět na předmět) */
  parent?: { title: string; path: string };
}

/**
 * Sdílená přehledová stránka podkapitoly: stručná teorie o tom, co se v ní bude učit.
 * Používá se, dokud podkapitola nemá plný obsah (Teorie | Simulace | Praxe).
 * Data pocházejí z registry/curriculum/outlines.
 */
export const ChapterOutlinePage: React.FC<ChapterOutlinePageProps> = ({ chapterId, slug, parent }) => {
  const router = useRouter();
  const found = getOutline(chapterId, slug);

  if (!found) {
    return (
      <CategoryLayout title="Kapitola nenalezena" category="specializovana">
        <div className="p-8 text-center bg-white rounded-3xl shadow-xl max-w-md mx-auto">
          <h1 className="text-xl font-black text-red-600 mb-2">Kapitola nenalezena</h1>
          <p className="text-sm text-slate-500 leading-relaxed">Přehled „{chapterId}/{slug}“ není v konfiguraci definován.</p>
        </div>
      </CategoryLayout>
    );
  }

  const { group, item } = found;
  const Icon = getCurriculumIcon(item.icon ?? group.icon);
  const parentNav = parent ?? { title: group.chapterTitle, path: group.chapterPath };

  return (
    <CategoryLayout
      title={item.title}
      category="specializovana"
      parent={parentNav}
    >
      <div className="max-w-4xl w-full animate-in fade-in duration-500 px-4">
        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-14 rounded-[3rem] border-4 border-white shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          {/* Tlačítko Zpět */}
          <div className="w-full flex justify-start mb-6">
            <button
              onClick={() => router.push(parentNav.path)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zpět na {parentNav.title}</span>
            </button>
          </div>

          {/* Ikona */}
          <div className={`w-20 h-20 bg-gradient-to-tr ${group.gradient} rounded-3xl flex items-center justify-center shadow-xl mb-6`}>
            <Icon className="w-10 h-10 text-white" />
          </div>

          {/* Odznaky */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider">
              #{item.tag}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider">
              {group.subjectTitle}
            </span>
            {item.hours && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                {item.hours}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black uppercase tracking-wider">
              <Hammer className="w-3.5 h-3.5" />
              Přehled kapitoly
            </span>
          </div>

          {/* Nadpisy */}
          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 leading-tight">
            {item.title}
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
            {item.subtitle}
          </p>

          {/* O čem kapitola je */}
          <div className="w-full text-left space-y-8">
            <section>
              <h2 className="text-2xl font-black text-slate-800 mb-3 flex items-center gap-3">
                <span className={`w-3 h-7 rounded-full bg-gradient-to-b ${group.gradient}`}></span>
                O čem to bude
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">{item.intro}</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6">
                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Teorie
                </h3>
                <ul className="space-y-2">
                  {item.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6">
                <h3 className="text-xl font-black text-slate-800 tracking-tight mb-3 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-emerald-600" />
                  Simulace a praxe
                </h3>
                <ul className="space-y-2">
                  {item.practice.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {item.builds && (
              <section className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 flex items-start gap-3">
                <Link2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight mb-1">Navazuje na</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.builds}</p>
                </div>
              </section>
            )}

            <p className="text-xs text-slate-400 leading-relaxed text-center">
              Tato stránka je zatím jen přehledem obsahu. Plná kapitola (teorie, simulace a praxe) bude doplněna.
            </p>
          </div>
        </div>
      </div>
    </CategoryLayout>
  );
};

export default ChapterOutlinePage;
