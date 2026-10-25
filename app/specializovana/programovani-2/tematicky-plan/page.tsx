'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable from '@/components/curriculum/SimplePlanTable';
import { PLAN_PRG2 } from '@/registry/curriculum/prgPlanTopics';
import { SVP_PRG2_DATA, SVP_PRG_SHARED_INFO } from '@/registry/curriculum/svpData';

export default function Page() {
  return (
    <CategoryLayout
      title="Tematický plán: Programování a hry 2"
      category="specializovana"
      parent={{ title: 'Programování a hry 2', path: '/specializovana/programovani-2' }}
    >
      <SimplePlanTable
        title="Programování a hry 2"
        gradeLabel="2. Ročník SŠ"
        backRoute="/specializovana/programovani-2"
        topics={PLAN_PRG2}
        svpData={SVP_PRG2_DATA}
        sharedInfo={SVP_PRG_SHARED_INFO}
      />
    </CategoryLayout>
  );
}
