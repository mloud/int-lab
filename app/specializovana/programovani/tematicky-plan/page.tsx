'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable from '@/components/curriculum/SimplePlanTable';
import { PLAN_PRG1 } from '@/registry/curriculum/prgPlanTopics';
import { SVP_PRG1_DATA, SVP_PRG_SHARED_INFO } from '@/registry/curriculum/svpData';

export default function Page() {
  return (
    <CategoryLayout
      title="Tematický plán: Programování a hry 1"
      category="specializovana"
      parent={{ title: 'Programování a hry 1', path: '/specializovana/programovani' }}
    >
      <SimplePlanTable
        title="Programování a hry 1"
        gradeLabel="1. Ročník SŠ"
        backRoute="/specializovana/programovani"
        topics={PLAN_PRG1}
        svpData={SVP_PRG1_DATA}
        sharedInfo={SVP_PRG_SHARED_INFO}
      />
    </CategoryLayout>
  );
}
