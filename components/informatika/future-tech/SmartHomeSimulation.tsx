import React, { useState, useEffect } from 'react';
import { 
  Thermometer, Lightbulb, Flame, Moon, Sun, Clock, UserCheck, 
  Blinds, Plus, Trash2, AlertTriangle, Target, CheckCircle2, Zap, Droplets, CloudRain, Wind
} from 'lucide-react';

type SensorType = 'temp' | 'light' | 'motion' | 'time' | 'humidity' | 'rain';
type Operator = '<' | '>' | '==';
type ActuatorType = 'heater' | 'bulb' | 'alarm' | 'blinds' | 'washingMachine' | 'window';
type LogicalOp = 'AND' | 'OR';

interface Condition {
  sensor: SensorType;
  operator: Operator;
  value: number | boolean;
  logicalOp?: LogicalOp;
}

interface Rule {
  id: string;
  conditions: Condition[];
  actuator: ActuatorType;
  targetState: boolean;
}

const TASKS = [
  {
    id: 1,
    title: 'Základní osvětlení',
    difficulty: '🟢 Lehká',
    description: 'Nastavte pravidlo, aby se na chodbě rozsvítilo, KDYŽ venkovní světlo klesne pod 40 %.',
    check: (rules: Rule[]) => rules.some(r => r.actuator === 'bulb' && r.targetState === true && r.conditions.some(c => c.sensor === 'light' && c.operator === '<' && Number(c.value) >= 30 && Number(c.value) <= 50))
  },
  {
    id: 2,
    title: 'Úsporné vytápění',
    difficulty: '🟡 Střední',
    description: 'Zapněte topení, KDYŽ teplota klesne pod 21 °C, ale POUZE pokud je zároveň zaznamenán pohyb (někdo je doma).',
    check: (rules: Rule[]) => rules.some(r => r.actuator === 'heater' && r.targetState === true && r.conditions.some(c => c.sensor === 'temp' && c.operator === '<' && Number(c.value) >= 15 && Number(c.value) <= 25) && r.conditions.some(c => c.sensor === 'motion' && c.value === true))
  },
  {
    id: 3,
    title: 'Noční zabezpečení',
    difficulty: '🟡 Střední',
    description: 'Pokud je čas větší než 22 (noc) A ZÁROVEŇ je zaznamenán pohyb u dveří, PAK zapněte alarm!',
    check: (rules: Rule[]) => rules.some(r => r.actuator === 'alarm' && r.targetState === true && r.conditions.some(c => c.sensor === 'time' && c.operator === '>' && Number(c.value) >= 20) && r.conditions.some(c => c.sensor === 'motion' && c.value === true))
  },
  {
    id: 4,
    title: 'Solární praní',
    difficulty: '🔴 Těžká',
    description: 'Solární panely dávají nejvíc energie na přímém slunci. KDYŽ je světlo větší než 80 %, PAK zapněte pračku.',
    check: (rules: Rule[]) => rules.some(r => r.actuator === 'washingMachine' && r.targetState === true && r.conditions.some(c => c.sensor === 'light' && c.operator === '>' && Number(c.value) >= 70))
  },
  {
    id: 5,
    title: 'Chytré větrání (Okno)',
    difficulty: '🔥 Expertní',
    description: 'Otevřete okno, KDYŽ je vlhkost nad 70 % NEBO teplota nad 30 °C. ZÁROVEŇ ale nesmí pršet (Déšť je Žádný), jinak do domu naprší!',
    check: (rules: Rule[]) => rules.some(r => 
       r.actuator === 'window' && 
       r.targetState === true && 
       r.conditions.length >= 3 &&
       r.conditions.some(c => c.sensor === 'humidity' && c.operator === '>' && Number(c.value) >= 60) &&
       r.conditions.some(c => c.sensor === 'temp' && c.operator === '>' && Number(c.value) >= 25) &&
       r.conditions.some(c => c.sensor === 'rain' && c.value === false) &&
       r.conditions.some(c => c.logicalOp === 'OR')
    )
  }
];

const SmartHomeSimulation: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<number>(1);
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);

  const [env, setEnv] = useState({
    temp: 22,
    light: 80,
    motion: false,
    time: 14,
    humidity: 50,
    rain: false
  });

  useEffect(() => {
    const activeTask = TASKS.find(t => t.id === activeTaskId);
    if (activeTask && activeTask.check(rules)) {
      setTaskCompleted(true);
    } else {
      setTaskCompleted(false);
    }
  }, [rules, activeTaskId]);

  useEffect(() => {
    if (env.motion) {
      const timer = setTimeout(() => setEnv(prev => ({ ...prev, motion: false })), 3000);
      return () => clearTimeout(timer);
    }
  }, [env.motion]);

  // --- EVALUATION ---
  let actHeater = false;
  let actBulb = false;
  let actAlarm = false;
  let actBlinds = true;
  let actWashingMachine = false;
  let actWindow = false;

  rules.forEach(rule => {
    if (rule.conditions.length === 0) return;
    
    let isMatch = false;
    
    // Left-to-right evaluation
    rule.conditions.forEach((cond, idx) => {
      const currentVal = env[cond.sensor];
      let condResult = false;
      if (cond.operator === '<') condResult = currentVal < cond.value;
      if (cond.operator === '>') condResult = currentVal > cond.value;
      if (cond.operator === '==') condResult = currentVal === cond.value;
      
      if (idx === 0) {
        isMatch = condResult;
      } else {
        if (cond.logicalOp === 'OR') {
          isMatch = isMatch || condResult;
        } else {
          // Defaults to AND
          isMatch = isMatch && condResult;
        }
      }
    });

    if (isMatch) {
      if (rule.actuator === 'heater') actHeater = rule.targetState;
      if (rule.actuator === 'bulb') actBulb = rule.targetState;
      if (rule.actuator === 'alarm') actAlarm = rule.targetState;
      if (rule.actuator === 'blinds') actBlinds = rule.targetState;
      if (rule.actuator === 'washingMachine') actWashingMachine = rule.targetState;
      if (rule.actuator === 'window') actWindow = rule.targetState;
    }
  });

  // --- HELPERS ---
  const addRule = () => {
    setRules([...rules, {
      id: Math.random().toString(),
      conditions: [{ sensor: 'temp', operator: '<', value: 20, logicalOp: 'AND' }],
      actuator: 'heater',
      targetState: true
    }]);
  };

  const removeRule = (id: string) => setRules(rules.filter(r => r.id !== id));

  const addCondition = (ruleId: string) => {
    setRules(rules.map(r => {
      if (r.id === ruleId) return { ...r, conditions: [...r.conditions, { sensor: 'motion', operator: '==', value: true, logicalOp: 'AND' }] };
      return r;
    }));
  };

  const updateCondition = (ruleId: string, cIdx: number, field: keyof Condition, val: any) => {
    setRules(rules.map(r => {
      if (r.id === ruleId) {
        const newConds = [...r.conditions];
        newConds[cIdx] = { ...newConds[cIdx], [field]: val };
        return { ...r, conditions: newConds };
      }
      return r;
    }));
  };

  const updateSensorType = (ruleId: string, cIdx: number, newSens: SensorType) => {
    setRules(rules.map(r => {
      if (r.id === ruleId) {
        const newConds = [...r.conditions];
        let defVal: any = 20;
        let defOp: Operator = '<';
        
        if (newSens === 'motion' || newSens === 'rain') {
          defVal = true;
          defOp = '==';
        } else if (newSens === 'humidity') {
          defVal = 60;
          defOp = '>';
        }
        
        newConds[cIdx] = { ...newConds[cIdx], sensor: newSens, value: defVal, operator: defOp };
        return { ...r, conditions: newConds };
      }
      return r;
    }));
  };

  const updateRuleAction = (ruleId: string, actuator: ActuatorType, state: boolean) => {
    setRules(rules.map(r => {
      if (r.id === ruleId) return { ...r, actuator, targetState: state };
      return r;
    }));
  };

  const activeTask = TASKS.find(t => t.id === activeTaskId)!;

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* MISSION SELECTOR */}
      <div className="flex flex-wrap gap-2">
        {TASKS.map(t => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTaskId(t.id);
              setRules([]);
            }}
            className={`px-4 py-3 rounded-xl font-bold transition-all text-sm sm:text-base border-2 ${
              activeTaskId === t.id 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                : 'bg-white border-gray-100 text-gray-600 hover:border-blue-300'
            }`}
          >
            {t.id}. {t.title}
          </button>
        ))}
      </div>

      {/* ACTIVE TASK HEADER */}
      <div className={`p-6 rounded-[2rem] shadow-xl border-4 flex flex-col md:flex-row items-center gap-6 transition-colors duration-500 relative z-20 ${taskCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-blue-100'}`}>
        <div className={`p-4 rounded-full shrink-0 ${taskCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
          {taskCompleted ? <CheckCircle2 className="w-8 h-8" /> : <Target className="w-8 h-8" />}
        </div>
        <div className="flex-1 w-full">
          <h2 className="text-xl font-black text-gray-800 flex items-center gap-2 mb-2">
            Mise {activeTask.id}: {activeTask.title} 
            <span className="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md ml-2">{activeTask.difficulty}</span>
          </h2>
          <p className="text-gray-600 font-medium">{activeTask.description}</p>
        </div>
        
        {taskCompleted && (
          <div className="flex flex-col gap-2 shrink-0 animate-in zoom-in duration-300 w-full sm:w-auto text-center">
            <div className="px-6 py-3 bg-green-500 text-white font-black rounded-xl shadow-lg">
              MISE SPLNĚNA! 🎉
            </div>
            {activeTaskId < TASKS.length && (
              <button 
                onClick={() => {
                  setActiveTaskId(activeTaskId + 1);
                  setRules([]);
                }}
                className="px-4 py-2 bg-white text-green-700 font-bold rounded-lg shadow-sm border border-green-200 hover:bg-green-100 transition-colors"
              >
                Další mise ➡️
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* LÁVÝ PANEL: IFTTT PRAVIDLA */}
        <div className="flex-1 bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl border-4 border-gray-50 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-800">Mozek domu</h2>
              <p className="text-gray-500 text-sm">Naprogramujte řešení mise.</p>
            </div>
            <button 
              onClick={addRule}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" /> Pravidlo
            </button>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
            {rules.length === 0 && (
              <div className="text-center p-8 text-gray-400 font-medium border-2 border-dashed border-gray-200 rounded-2xl">
                Žádná pravidla. Přidejte pravidlo pro splnění mise.
              </div>
            )}

            {rules.map((rule) => (
              <div key={rule.id} className="bg-gray-50 rounded-2xl border-2 border-gray-200 p-4 sm:p-5 shadow-sm relative group">
                <button 
                  onClick={() => removeRule(rule.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                
                {/* CONDITIONS (IF) */}
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-700 font-black px-3 py-1 rounded-lg mb-3 text-xs sm:text-sm">KDYŽ (IF)</span>
                  
                  <div className="space-y-3">
                    {rule.conditions.map((cond, cIdx) => (
                      <div key={cIdx} className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-2 bg-white p-2 sm:p-3 rounded-xl border border-gray-200 shadow-sm text-sm">
                        
                        {cIdx > 0 && (
                          <select 
                            value={cond.logicalOp || 'AND'}
                            onChange={(e) => updateCondition(rule.id, cIdx, 'logicalOp', e.target.value)}
                            className="p-1 sm:p-2 rounded-lg bg-purple-100 text-purple-700 font-black outline-none border-none cursor-pointer"
                          >
                            <option value="AND">A ZÁROVEŇ</option>
                            <option value="OR">NEBO</option>
                          </select>
                        )}
                        
                        <select 
                          className="p-1 sm:p-2 rounded-lg bg-gray-100 font-bold text-gray-700 outline-none"
                          value={cond.sensor}
                          onChange={(e) => updateSensorType(rule.id, cIdx, e.target.value as SensorType)}
                        >
                          <option value="temp">🌡️ Teplota</option>
                          <option value="light">☀️ Světlo (Soláry)</option>
                          <option value="humidity">💧 Vlhkost</option>
                          <option value="rain">🌧️ Déšť</option>
                          <option value="time">🕒 Čas</option>
                          <option value="motion">🏃 Pohyb</option>
                        </select>

                        {cond.sensor !== 'motion' && cond.sensor !== 'rain' && (
                          <select 
                            className="p-1 sm:p-2 rounded-lg bg-gray-100 font-bold text-gray-700 outline-none"
                            value={cond.operator}
                            onChange={(e) => updateCondition(rule.id, cIdx, 'operator', e.target.value as Operator)}
                          >
                            <option value="<">je menší než</option>
                            <option value=">">je větší než</option>
                            <option value="==">je rovno</option>
                          </select>
                        )}
                        
                        {(cond.sensor === 'motion' || cond.sensor === 'rain') && <span className="font-bold text-gray-500 px-2">je</span>}

                        {cond.sensor === 'motion' || cond.sensor === 'rain' ? (
                          <select 
                            className="p-1 sm:p-2 rounded-lg border border-gray-300 font-bold bg-white"
                            value={cond.value === true ? 'true' : 'false'}
                            onChange={(e) => updateCondition(rule.id, cIdx, 'value', e.target.value === 'true')}
                          >
                            <option value="true">{cond.sensor === 'motion' ? 'Zaznamenán' : 'Ano (Prší)'}</option>
                            <option value="false">{cond.sensor === 'motion' ? 'Žádný' : 'Ne (Neprší)'}</option>
                          </select>
                        ) : (
                          <div className="flex items-center gap-1">
                            <input 
                              type="number" 
                              value={Number(cond.value)} 
                              onChange={(e) => updateCondition(rule.id, cIdx, 'value', Number(e.target.value))}
                              className="w-16 sm:w-20 p-1 sm:p-2 rounded-lg border border-gray-300 font-bold bg-white"
                            />
                            <span className="font-bold text-gray-500">
                              {cond.sensor === 'temp' ? '°C' : cond.sensor === 'light' || cond.sensor === 'humidity' ? '%' : cond.sensor === 'time' ? 'h' : ''}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => addCondition(rule.id)}
                    className="mt-3 text-xs sm:text-sm font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Přidat podmínku
                  </button>
                </div>

                {/* ACTION (THEN) */}
                <div className="border-t-2 border-gray-200 pt-4">
                  <span className="inline-block bg-blue-100 text-blue-700 font-black px-3 py-1 rounded-lg mb-3 text-xs sm:text-sm">PAK (THEN)</span>
                  
                  <div className="flex flex-wrap items-center gap-2 bg-white p-2 sm:p-3 rounded-xl border border-gray-200 shadow-sm text-sm">
                    <select 
                      className="p-1 sm:p-2 rounded-lg bg-gray-100 font-bold text-gray-700 outline-none"
                      value={rule.targetState ? 'true' : 'false'}
                      onChange={(e) => updateRuleAction(rule.id, rule.actuator, e.target.value === 'true')}
                    >
                      <option value="true">{rule.actuator === 'blinds' || rule.actuator === 'window' ? 'Otevřít' : 'Zapnout'}</option>
                      <option value="false">{rule.actuator === 'blinds' || rule.actuator === 'window' ? 'Zavřít' : 'Vypnout'}</option>
                    </select>

                    <select 
                      className="p-1 sm:p-2 rounded-lg bg-gray-100 font-bold text-gray-700 outline-none"
                      value={rule.actuator}
                      onChange={(e) => updateRuleAction(rule.id, e.target.value as ActuatorType, rule.targetState)}
                    >
                      <option value="bulb">💡 Světlo v chodbě</option>
                      <option value="heater">🔥 Topení</option>
                      <option value="alarm">🚨 Alarm</option>
                      <option value="blinds">🪟 Žaluzie</option>
                      <option value="window">🌬️ Okno</option>
                      <option value="washingMachine">🧺 Pračka</option>
                    </select>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* PRAVÝ PANEL: VIZUÁLNÍ DŮM A SENZORY */}
        <div className="flex-[1.5] bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl border-4 border-gray-50 flex flex-col gap-6">
          
          {/* Environment Simulator Tools */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-2xl border-2 border-gray-100">
            {/* Row 1 */}
            <div className="flex flex-col gap-1 col-span-2 md:col-span-1 lg:col-span-2">
              <label className="text-[10px] sm:text-xs font-bold text-gray-500 flex justify-between">
                Teplota <span className="text-red-500">{env.temp}°C</span>
              </label>
              <input type="range" min="-10" max="40" value={env.temp} onChange={e => setEnv({...env, temp: Number(e.target.value)})} className="accent-red-500"/>
            </div>
            <div className="flex flex-col gap-1 col-span-2 md:col-span-1 lg:col-span-2">
              <label className="text-[10px] sm:text-xs font-bold text-gray-500 flex justify-between">
                Světlo <span className="text-yellow-500">{env.light}%</span>
              </label>
              <input type="range" min="0" max="100" value={env.light} onChange={e => setEnv({...env, light: Number(e.target.value)})} className="accent-yellow-500"/>
            </div>
            <div className="flex flex-col gap-1 col-span-2 md:col-span-1 lg:col-span-2">
              <label className="text-[10px] sm:text-xs font-bold text-gray-500 flex justify-between">
                Čas <span className="text-blue-500">{env.time}:00</span>
              </label>
              <input type="range" min="0" max="23" value={env.time} onChange={e => setEnv({...env, time: Number(e.target.value)})} className="accent-blue-500"/>
            </div>
            
            {/* Row 2 */}
            <div className="flex flex-col gap-1 col-span-2 md:col-span-1 lg:col-span-2 mt-2">
              <label className="text-[10px] sm:text-xs font-bold text-gray-500 flex justify-between">
                Vlhkost <span className="text-cyan-500">{env.humidity}%</span>
              </label>
              <input type="range" min="0" max="100" value={env.humidity} onChange={e => setEnv({...env, humidity: Number(e.target.value)})} className="accent-cyan-500"/>
            </div>
            <div className="flex flex-col justify-end col-span-1 lg:col-span-2 mt-2">
              <button 
                onClick={() => setEnv({...env, rain: !env.rain})}
                className={`p-1.5 sm:p-2 rounded-lg font-bold text-[10px] sm:text-xs transition-colors ${env.rain ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {env.rain ? '🌧️ Prší' : 'Neprší'}
              </button>
            </div>
            <div className="flex flex-col justify-end col-span-1 lg:col-span-2 mt-2">
              <button 
                onClick={() => setEnv({...env, motion: true})}
                className={`p-1.5 sm:p-2 rounded-lg font-bold text-[10px] sm:text-xs transition-colors ${env.motion ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {env.motion ? '🚶 Zaznamenáno' : 'Simulovat pohyb'}
              </button>
            </div>
          </div>

          {/* Visual House */}
          <div className={`mt-2 w-full h-[450px] rounded-[2rem] relative overflow-hidden transition-colors duration-1000 border-4 flex flex-col items-center justify-end ${env.time >= 19 || env.time <= 5 ? 'bg-slate-900 border-slate-800' : 'bg-sky-300 border-sky-200'}`}>
             
             {/* Rain overlay */}
             {env.rain && (
               <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-[slide_0.5s_linear_infinite]"></div>
             )}

             {/* Sky / Solar Panels */}
             <div className="absolute top-6 left-6 text-yellow-500/20 font-black text-4xl whitespace-nowrap z-0">
                {env.light > 70 && !env.rain && (env.time > 5 && env.time < 19) ? '⚡ SOLÁRNÍ REŽIM' : ''}
             </div>
             <div className={`absolute top-6 right-6 transition-all duration-1000 z-0 ${env.time >= 19 || env.time <= 5 ? 'opacity-100 text-yellow-100' : 'opacity-100 text-yellow-400'}`}>
                {env.time >= 19 || env.time <= 5 ? <Moon className="w-16 h-16" fill="currentColor" /> : (env.rain ? <CloudRain className="w-20 h-20 text-gray-400" fill="currentColor" /> : <Sun className="w-20 h-20 animate-[spin_10s_linear_infinite]" fill="currentColor" />)}
             </div>

             {/* House Outline */}
             <div className="w-[95%] sm:w-[85%] h-[350px] bg-slate-100 border-t-[16px] border-x-[16px] border-slate-700 rounded-t-[3rem] shadow-2xl flex flex-col relative z-10">
                
                {/* Top Floor: Bedroom & Blinds */}
                <div className="flex-1 border-b-8 border-slate-700 flex relative">
                   {/* Window with Blinds & Actual Window */}
                   <div className="flex-1 flex flex-col items-center justify-center relative p-2 sm:p-4 border-r-4 border-slate-300">
                      <div className="absolute top-2 left-2 text-[10px] sm:text-xs font-bold text-gray-400 bg-white px-2 py-1 rounded shadow-sm z-10">Ložnice / Okno</div>
                      
                      <div className="flex gap-4 items-end mt-4">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-sky-100 border-4 border-white rounded-lg relative overflow-hidden flex flex-col shadow-inner">
                           {/* Blinds Visual */}
                           <div className={`w-full bg-slate-700 transition-all duration-1000 ease-in-out ${actBlinds ? 'h-2' : 'h-full'}`}></div>
                        </div>

                        {/* Window Actuator */}
                        <div className="flex flex-col items-center relative z-20">
                          <div className={`p-2 rounded-xl transition-all duration-300 border-2 ${actWindow ? 'bg-cyan-100 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.8)] scale-110' : 'bg-gray-200/50 border-transparent'}`}>
                             <Wind className={`w-6 h-6 sm:w-8 sm:h-8 ${actWindow ? 'text-cyan-500 animate-pulse' : 'text-gray-400'}`} />
                             {actWindow && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg whitespace-nowrap animate-bounce">VĚTRÁ SE</span>}
                          </div>
                        </div>
                      </div>
                   </div>

                   {/* Hallway & Light */}
                   <div className="flex-1 flex flex-col items-center justify-center relative p-2 sm:p-4">
                      <div className="absolute top-2 left-2 text-[10px] sm:text-xs font-bold text-gray-400 bg-white px-2 py-1 rounded shadow-sm z-10">Chodba</div>
                      
                      <div className={`p-3 sm:p-4 rounded-full transition-all duration-500 relative ${actBulb ? 'bg-yellow-100 border-4 border-yellow-300 shadow-[0_0_80px_rgba(253,224,71,1)] scale-125 z-20' : 'bg-gray-200/50 border-4 border-transparent'}`}>
                         <Lightbulb className={`w-8 h-8 sm:w-12 sm:h-12 ${actBulb ? 'text-yellow-500' : 'text-gray-400'}`} fill={actBulb ? 'currentColor' : 'none'} />
                         {actBulb && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg whitespace-nowrap">SVÍTÍ</span>}
                      </div>
                   </div>
                </div>

                {/* Bottom Floor: Living Room & Door */}
                <div className="flex-1 flex relative">
                   {/* Living Room & Heater & Washing Machine */}
                   <div className="flex-1 flex items-center justify-center relative p-2 sm:p-4 border-r-4 border-slate-300 gap-6">
                      <div className="absolute top-2 left-2 text-[10px] sm:text-xs font-bold text-gray-400 bg-white px-2 py-1 rounded shadow-sm z-10">Obývák / Koupelna</div>
                      
                      {/* Heater */}
                      <div className={`p-2 sm:p-4 rounded-2xl transition-all duration-500 border-4 relative ${actHeater ? 'bg-red-50 border-red-400 shadow-[0_0_60px_rgba(239,68,68,0.8)] scale-110 z-20' : 'bg-gray-200/50 border-transparent'}`}>
                         <Flame className={`w-6 h-6 sm:w-10 sm:h-10 ${actHeater ? 'text-red-500 animate-bounce' : 'text-gray-400'}`} fill={actHeater ? 'currentColor' : 'none'} />
                         {actHeater && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg whitespace-nowrap">TOPÍ</span>}
                      </div>

                      {/* Washing Machine */}
                      <div className={`p-2 sm:p-4 rounded-2xl transition-all duration-500 border-4 relative ${actWashingMachine ? 'bg-blue-100 border-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.8)] scale-110 z-20' : 'bg-gray-200/50 border-transparent'}`}>
                         <Zap className={`w-6 h-6 sm:w-10 sm:h-10 ${actWashingMachine ? 'text-blue-600 animate-[spin_1s_linear_infinite]' : 'text-gray-400'}`} />
                         {actWashingMachine && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg whitespace-nowrap">PERE</span>}
                      </div>
                   </div>

                   {/* Door & Alarm & Motion */}
                   <div className="flex-1 flex items-end justify-center relative p-2 sm:p-4">
                      <div className="absolute top-2 left-2 text-[10px] sm:text-xs font-bold text-gray-400 bg-white px-2 py-1 rounded shadow-sm z-10">Dveře</div>
                      
                      {/* Alarm Light */}
                      <div className={`absolute top-4 right-4 p-1.5 sm:p-2 rounded-full transition-all duration-300 ${actAlarm ? 'bg-red-600 animate-ping shadow-[0_0_60px_rgba(239,68,68,1)] scale-150 z-20' : 'bg-gray-300'}`}>
                         <AlertTriangle className={`w-4 h-4 sm:w-6 sm:h-6 ${actAlarm ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      {actAlarm && <span className="absolute top-16 right-4 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg animate-pulse whitespace-nowrap z-20">ALARM!</span>}

                      {/* Door Visual */}
                      <div className="w-16 h-24 sm:w-24 sm:h-32 bg-amber-800 border-4 border-amber-950 rounded-t-lg relative">
                         <div className="absolute right-1 sm:right-2 top-1/2 w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-yellow-600 shadow-inner"></div>
                         {/* Motion indicator */}
                         <div className={`absolute -top-12 left-1/2 -translate-x-1/2 p-2 rounded-full transition-all duration-300 ${env.motion ? 'bg-green-100 text-green-600 shadow-[0_0_30px_rgba(34,197,94,0.6)] animate-bounce scale-110 z-20' : 'bg-gray-200/80 text-gray-400 opacity-50'}`}>
                            <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                         </div>
                      </div>
                   </div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SmartHomeSimulation;
