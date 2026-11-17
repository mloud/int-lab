import { ThematicPlan } from './thematic-plans/thematicPlanTypes';
import { OPS1_THEMATIC_PLAN } from './thematic-plans/ops1Plan';
import { OPS2_THEMATIC_PLAN } from './thematic-plans/ops2Plan';
import { OPS3_THEMATIC_PLAN } from './thematic-plans/ops3Plan';
import { ROB3_THEMATIC_PLAN, ROB4_THEMATIC_PLAN } from './thematic-plans/robPlan';

export type { ThematicSubtopic, ThematicBlock, ThematicPlan } from './thematic-plans/thematicPlanTypes';

export const THEMATIC_PLANS: Record<string, ThematicPlan> = {
  ops1: OPS1_THEMATIC_PLAN,
  ops2: OPS2_THEMATIC_PLAN,
  ops3: OPS3_THEMATIC_PLAN,
  rob3: ROB3_THEMATIC_PLAN,
  rob4: ROB4_THEMATIC_PLAN,
};
