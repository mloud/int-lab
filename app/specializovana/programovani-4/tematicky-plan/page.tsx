'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable from '@/components/curriculum/SimplePlanTable';
import { PLAN_PRG4 } from '@/registry/curriculum/prgPlanTopics';
import { SVP_PRG4_DATA, SVP_PRG_SHARED_INFO } from '@/registry/curriculum/svpData';

export default function Page() {
  return (
    <CategoryLayout
      title="Tematický plán: Programování a hry 4"
      category="specializovana"
      parent={{ title: 'Programování a hry 4', path: '/specializovana/programovani-4' }}
    >
      <SimplePlanTable
        title="Programování a hry 4"
        gradeLabel="4. Ročník SŠ"
        backRoute="/specializovana/programovani-4"
        topics={PLAN_PRG4}
        svpData={SVP_PRG4_DATA}
        sharedInfo={SVP_PRG_SHARED_INFO}
      />
    </CategoryLayout>
  );
}
