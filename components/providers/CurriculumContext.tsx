'use client';
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  SchoolConfig, 
  DivisionConfig, 
  SubjectConfig, 
  ChapterConfig, 
  GradeConfig,
  DEFAULT_SCHOOL,
  AVAILABLE_SCHOOLS,
  setActiveSchool
} from '@/registry/curriculum';

interface CurriculumContextType {
  school: SchoolConfig;
  availableSchools: SchoolConfig[];
  divisions: DivisionConfig[];
  getDivision: (divisionId: string) => DivisionConfig | undefined;
  getSubject: (subjectId: string) => { subject: SubjectConfig; division: DivisionConfig; grade: GradeConfig } | undefined;
  getChapter: (chapterId: string) => ChapterConfig | undefined;
  setSchool: (school: SchoolConfig) => void;
  switchSchool: (schoolId: string) => void;
  isLoading: boolean;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

const STORAGE_KEY = 'intlab_active_school_id';

export const CurriculumProvider: React.FC<{ children: React.ReactNode; initialSchool?: SchoolConfig }> = ({ 
  children,
  initialSchool = DEFAULT_SCHOOL
}) => {
  const [school, setSchoolState] = useState<SchoolConfig>(initialSchool);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Načtení uložené školy z localStorage po připojení na klienta
  useEffect(() => {
    try {
      const savedSchoolId = localStorage.getItem(STORAGE_KEY);
      if (savedSchoolId) {
        const found = AVAILABLE_SCHOOLS.find(s => s.id === savedSchoolId);
        if (found && found.id !== school.id) {
          setSchoolState(found);
          setActiveSchool(found);
        }
      }
    } catch {
      // Ignorovat chyby při přístupu k localStorage
    }
  }, [school.id]);

  const switchSchool = useCallback((schoolId: string) => {
    const found = AVAILABLE_SCHOOLS.find(s => s.id === schoolId);
    if (found) {
      setSchoolState(found);
      setActiveSchool(found);
      try {
        localStorage.setItem(STORAGE_KEY, schoolId);
      } catch {
        // Ignorovat chyby
      }
    }
  }, []);

  const setSchool = useCallback((newSchool: SchoolConfig) => {
    setSchoolState(newSchool);
    setActiveSchool(newSchool);
    try {
      localStorage.setItem(STORAGE_KEY, newSchool.id);
    } catch {
      // Ignorovat chyby
    }
  }, []);

  const divisions = useMemo(() => school.divisions, [school]);

  const getDivision = useMemo(() => {
    return (divisionId: string): DivisionConfig | undefined => {
      return school.divisions.find(d => d.id === divisionId);
    };
  }, [school]);

  const getSubject = useMemo(() => {
    return (subjectId: string): { subject: SubjectConfig; division: DivisionConfig; grade: GradeConfig } | undefined => {
      for (const division of school.divisions) {
        for (const grade of division.grades) {
          const subject = grade.subjects.find(s => s.id === subjectId);
          if (subject) {
            return { subject, division, grade };
          }
        }
      }
      return undefined;
    };
  }, [school]);

  const getChapter = useMemo(() => {
    return (chapterId: string): ChapterConfig | undefined => {
      for (const division of school.divisions) {
        for (const grade of division.grades) {
          for (const subject of grade.subjects) {
            const chapter = subject.chapters.find(c => c.id === chapterId);
            if (chapter) return chapter;
          }
        }
      }
      return undefined;
    };
  }, [school]);

  return (
    <CurriculumContext.Provider
      value={{
        school,
        availableSchools: AVAILABLE_SCHOOLS,
        divisions,
        getDivision,
        getSubject,
        getChapter,
        setSchool,
        switchSchool,
        isLoading
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
};

export function useCurriculum(): CurriculumContextType {
  const context = useContext(CurriculumContext);
  if (!context) {
    // Bezpečný fallback, pokud by komponenta byla renderována mimo Provider
    return {
      school: DEFAULT_SCHOOL,
      availableSchools: AVAILABLE_SCHOOLS,
      divisions: DEFAULT_SCHOOL.divisions,
      getDivision: (id: string) => DEFAULT_SCHOOL.divisions.find(d => d.id === id),
      getSubject: (id: string) => {
        for (const division of DEFAULT_SCHOOL.divisions) {
          for (const grade of division.grades) {
            const subject = grade.subjects.find(s => s.id === id);
            if (subject) return { subject, division, grade };
          }
        }
        return undefined;
      },
      getChapter: (id: string) => {
        for (const division of DEFAULT_SCHOOL.divisions) {
          for (const grade of division.grades) {
            for (const subject of grade.subjects) {
              const chapter = subject.chapters.find(c => c.id === id);
              if (chapter) return chapter;
            }
          }
        }
        return undefined;
      },
      setSchool: () => {},
      switchSchool: () => {},
      isLoading: false
    };
  }
  return context;
}
