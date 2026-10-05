'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Programovani2Menu from '@/components/specializovana/programovani-2/Programovani2Menu';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout title="Programování a vývoj her 2" category="specializovana">
      <Programovani2Menu 
        onBack={() => router.push('/specializovana')}
        onStartPythonBasics={() => router.push('/specializovana/programovani-2/python-zaklady')}
        onStartPythonVariables={() => router.push('/specializovana/programovani-2/python-promenne')}
        onStartPythonProgram={() => router.push('/specializovana/programovani-2/python-program')}
        onStartPythonOutputs={() => router.push('/specializovana/programovani-2/python-vypisy')}
        onStartPythonDrawing={() => router.push('/specializovana/programovani-2/python-kresleni')}
        onStartPythonColors={() => router.push('/specializovana/programovani-2/python-barvy')}
        onStartPythonVariablesDrawing={() => router.push('/specializovana/programovani-2/python-kresleni-s-promennymi')}
        onStartPythonSubroutines={() => router.push('/specializovana/programovani-2/python-podprogramy')}
        onStartPythonRandom={() => router.push('/specializovana/programovani-2/python-nahoda')}
        onStartPythonText={() => router.push('/specializovana/programovani-2/python-text')}
        onStartPythonLoop={() => router.push('/specializovana/programovani-2/python-cyklus')}
        onStartPythonLoopVar={() => router.push('/specializovana/programovani-2/python-promenna-cyklu')}
        onStartPythonExpressions={() => router.push('/specializovana/programovani-2/python-vyrazy')}
        onStartPythonOvals={() => router.push('/specializovana/programovani-2/python-elipsy')}
        onStartPythonCirclesLoops={() => router.push('/specializovana/programovani-2/python-kruhy-a-cykly')}
        onStartPythonConditions={() => router.push('/specializovana/programovani-2/python-vetveni')}
        onStartPythonBranching={() => router.push('/specializovana/programovani-2/python-vetveni-a-konstrukce')}
        onStartPythonNestedBranching={() => router.push('/specializovana/programovani-2/python-vnorene-vetveni')}
        onStartPythonFunctionsArgs={() => router.push('/specializovana/programovani-2/python-podprogram-s-parametrem')}
        onStartPythonMouseDrawing={() => router.push('/specializovana/programovani-2/python-kresleni-mysi')}
      />
    </CategoryLayout>
  );
}
