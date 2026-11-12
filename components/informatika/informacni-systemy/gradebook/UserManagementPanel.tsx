import React, { useState } from 'react';
import { Student, Parent } from './GradebookTypes';
import { UserPlus, Trash2, Users, Shield, Link2, PlusCircle, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface UserManagementPanelProps {
  students: Student[];
  parents: Parent[];
  onUpdateStudents: (students: Student[]) => void;
  onUpdateParents: (parents: Parent[]) => void;
}

export const UserManagementPanel: React.FC<UserManagementPanelProps> = ({
  students,
  parents,
  onUpdateStudents,
  onUpdateParents,
}) => {
  // Stavy pro přidání žáka
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [selectedParentIdForNewStudent, setSelectedParentIdForNewStudent] = useState('');

  // Stavy pro přidání rodiče
  const [showAddParent, setShowAddParent] = useState(false);
  const [parentFirstName, setParentFirstName] = useState('');
  const [parentLastName, setParentLastName] = useState('');
  const [selectedChildIds, setSelectedChildIds] = useState<string[]>([]);

  // Editace přiřazených dětí u existujícího rodiče
  const [editingParentId, setEditingParentId] = useState<string | null>(null);

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentFirstName.trim() || !studentLastName.trim()) return;

    const newStudentId = `s${Date.now().toString().slice(-4)}`;
    const cleanUsername = (studentFirstName.trim() + studentLastName.trim())
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const newStudent: Student = {
      id: newStudentId,
      firstName: studentFirstName.trim(),
      lastName: studentLastName.trim(),
      username: cleanUsername,
      password: 'heslo' + Math.floor(100 + Math.random() * 900),
      classGroup: '7.A',
      grades: [],
    };

    onUpdateStudents([...students, newStudent]);

    // Pokud byl rovnou vybrán existující rodič, přiřadíme mu nového žáka
    if (selectedParentIdForNewStudent) {
      onUpdateParents(
        parents.map((p) =>
          p.id === selectedParentIdForNewStudent
            ? { ...p, childIds: p.childIds.includes(newStudentId) ? p.childIds : [...p.childIds, newStudentId] }
            : p
        )
      );
    }

    setStudentFirstName('');
    setStudentLastName('');
    setSelectedParentIdForNewStudent('');
    setShowAddStudent(false);
  };

  const handleDeleteStudent = (id: string) => {
    onUpdateStudents(students.filter(s => s.id !== id));
    // Vyčistíme i vazby u rodičů
    onUpdateParents(
      parents.map(p => ({
        ...p,
        childIds: p.childIds.filter(cid => cid !== id),
      }))
    );
  };

  const handleAddParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentFirstName.trim() || !parentLastName.trim()) return;

    const cleanUsername = (parentFirstName.trim() + parentLastName.trim())
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const newParent: Parent = {
      id: `p${Date.now().toString().slice(-4)}`,
      firstName: parentFirstName.trim(),
      lastName: parentLastName.trim(),
      username: cleanUsername,
      password: 'rodic' + Math.floor(100 + Math.random() * 900),
      childIds: selectedChildIds,
    };

    onUpdateParents([...parents, newParent]);
    setParentFirstName('');
    setParentLastName('');
    setSelectedChildIds([]);
    setShowAddParent(false);
  };

  const handleDeleteParent = (id: string) => {
    onUpdateParents(parents.filter(p => p.id !== id));
    if (editingParentId === id) setEditingParentId(null);
  };

  const toggleChildSelection = (childId: string) => {
    setSelectedChildIds(prev =>
      prev.includes(childId) ? prev.filter(id => id !== childId) : [...prev, childId]
    );
  };

  const handleToggleChildForExistingParent = (parentId: string, childId: string) => {
    onUpdateParents(
      parents.map((p) => {
        if (p.id !== parentId) return p;
        const hasChild = p.childIds.includes(childId);
        return {
          ...p,
          childIds: hasChild ? p.childIds.filter((cid) => cid !== childId) : [...p.childIds, childId],
        };
      })
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
      {/* Karta: Správa žáků */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-lg">Evidence žáků (Třída 7.A)</h4>
                <p className="text-xs text-slate-500 font-medium">Uživatelské účty studentů v databázi</p>
              </div>
            </div>

            <button
              onClick={() => setShowAddStudent(!showAddStudent)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <UserPlus className="w-4 h-4" /> {showAddStudent ? 'Zavřít' : 'Nový žák'}
            </button>
          </div>

          {/* Inline formulář pro přidání žáka */}
          {showAddStudent && (
            <form onSubmit={handleAddStudentSubmit} className="mb-4 p-4 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-blue-900">Nový žákovský účet</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Jméno (např. Matěj)"
                  value={studentFirstName}
                  onChange={e => setStudentFirstName(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Příjmení (např. Dvořák)"
                  value={studentLastName}
                  onChange={e => setStudentLastName(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Možnost rovnou přiřadit k existujícímu rodiči */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Přiřadit k zákonnému zástupci (volitelné):
                </label>
                <select
                  value={selectedParentIdForNewStudent}
                  onChange={(e) => setSelectedParentIdForNewStudent(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
                >
                  <option value="">-- Bez okamžitého přiřazení --</option>
                  {parents.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.firstName} {p.lastName} (ID: {p.id})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Vytvořit žáka v databázi
              </button>
            </form>
          )}

          {/* Seznam žáků */}
          <ul className="space-y-2">
            {students.map(student => (
              <li
                key={student.id}
                className="flex items-center justify-between p-3.5 bg-slate-50/80 hover:bg-slate-100 rounded-2xl border border-slate-200/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center">
                    {student.firstName[0]}{student.lastName[0]}
                  </span>
                  <div>
                    <span className="font-black text-slate-900 text-base">
                      {student.firstName} {student.lastName}
                    </span>
                    <span className="ml-2 text-xs font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      ID: {student.id}
                    </span>
                    {student.username && (
                      <span className="ml-1 text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                        @{student.username}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Smazat uživatelský profil žáka"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Karta: Správa rodičů a vazeb */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-lg">Zákonní zástupci a vazby</h4>
                <p className="text-xs text-slate-500 font-medium">Propojení rodiče na ID jeho dětí</p>
              </div>
            </div>

            <button
              onClick={() => setShowAddParent(!showAddParent)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <UserPlus className="w-4 h-4" /> {showAddParent ? 'Zavřít' : 'Nový rodič'}
            </button>
          </div>

          {/* Inline formulář pro přidání rodiče */}
          {showAddParent && (
            <form onSubmit={handleAddParentSubmit} className="mb-4 p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-900">Nový účet zákonného zástupce</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Jméno (např. Petr)"
                  value={parentFirstName}
                  onChange={e => setParentFirstName(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Příjmení (např. Dvořák)"
                  value={parentLastName}
                  onChange={e => setParentLastName(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Přiřadit existující děti (relace v databázi):
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {students.map(s => {
                    const isChecked = selectedChildIds.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleChildSelection(s.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left flex items-center justify-between border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>{s.firstName} {s.lastName}</span>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Vytvořit účet rodiče
              </button>
            </form>
          )}

          {/* Seznam rodičů */}
          <ul className="space-y-3">
            {parents.map(parent => {
              const childrenNames = parent.childIds
                .map(cid => {
                  const st = students.find(s => s.id === cid);
                  return st ? `${st.firstName} ${st.lastName}` : cid;
                })
                .join(', ');

              const isEditing = editingParentId === parent.id;

              return (
                <li
                  key={parent.id}
                  className="p-3.5 bg-slate-50/80 hover:bg-slate-100 rounded-2xl border border-slate-200/60 transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
                        {parent.firstName[0]}{parent.lastName[0]}
                      </span>
                      <div>
                        <div className="font-black text-slate-900 text-base">
                          {parent.firstName} {parent.lastName}
                          <span className="ml-2 text-xs font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                            ID: {parent.id}
                          </span>
                          {parent.username && (
                            <span className="ml-1 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              @{parent.username}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-slate-600 flex items-center gap-1.5 mt-0.5">
                          <Link2 className="w-4 h-4 text-emerald-600" />
                          <span>Děti v péči: <strong className="text-slate-900 font-bold">{childrenNames || 'Žádné přiřazené'}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingParentId(isEditing ? null : parent.id)}
                        className={`text-sm font-black px-3.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                          isEditing
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                            : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-300'
                        }`}
                        title="Upravit přiřazení dětí tomuto rodiči"
                      >
                        <Link2 className="w-4 h-4" />
                        <span>{isEditing ? 'Hotovo' : 'Upravit děti'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteParent(parent.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Smazat profil rodiče"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Rozbalovací panel pro přiřazení dětí (vytvořených dříve i později) */}
                  {isEditing && (
                    <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-2 animate-in fade-in duration-150">
                      <div className="text-[11px] font-black uppercase text-emerald-950 flex items-center justify-between">
                        <span>Přiřadit žáky tomuto rodiči (propojení v databázi):</span>
                        <span className="text-emerald-800 font-bold">Vybráno {parent.childIds.length} dětí</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {students.map((s) => {
                          const isAssigned = parent.childIds.includes(s.id);
                          return (
                            <button
                              type="button"
                              key={s.id}
                              onClick={() => handleToggleChildForExistingParent(parent.id, s.id)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left flex items-center justify-between border transition-all cursor-pointer ${
                                isAssigned
                                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              <span>{s.firstName} {s.lastName}</span>
                              {isAssigned && <Check className="w-3.5 h-3.5" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
