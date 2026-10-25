'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable from '@/components/curriculum/SimplePlanTable';
import { PLAN_PRG3 } from '@/registry/curriculum/prgPlanTopics';
import { SVP_PRG3_DATA, SVP_PRG_SHARED_INFO } from '@/registry/curriculum/svpData';

export default function Page() {
  return (
    <CategoryLayout
      title="Tematický plán: Programování a hry 3"
      category="specializovana"
      parent={{ title: 'Programování a hry 3', path: '/specializovana/programovani-3' }}
    >
      <SimplePlanTable
        title="Programování a hry 3"
        gradeLabel="3. Ročník SŠ"
        backRoute="/specializovana/programovani-3"
        topics={PLAN_PRG3}
        svpData={SVP_PRG3_DATA}
        sharedInfo={SVP_PRG_SHARED_INFO}
      />
    </CategoryLayout>
  );
}
