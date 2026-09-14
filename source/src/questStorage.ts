/** Validates portable saves before touching application state. Missing legacy fields use defaults. */
export function parseQuest<T extends Record<string, any>>(raw:string, defaults:T, screens:readonly string[], sectors:readonly string[]):T {
  const data=JSON.parse(raw);
  const object=(v:any)=>v!==null&&typeof v==='object'&&!Array.isArray(v);
  const fail=()=>{throw new Error('Invalid Envizi Quest file');};
  if(!object(data)||!('profile' in data)||!('priorities' in data))fail();
  const enums:Record<string,readonly any[]>={language:['it','en'],profile:['marco','luisa',null],screen:screens,companySector:sectors,companyMarket:['italia','europa','mondo'],esgReadiness:['primi','consolidamento','decisioni'],negativeChoice:['form','postpone'],pendingOutcome:['positive','warning','critical'],prioExpMode:['scratch','scenario']};
  const priorities=['credit','compliance','customers','efficiency','supply','reputation'];
  const ratings=['low','medium','high'];
  const result={...defaults};
  for(const key of Object.keys(defaults)) {
    if(!(key in data))continue;
    const value=data[key], fallback=defaults[key];
    if(enums[key]) {if(!enums[key].includes(value))fail();}
    else if(key==='sustainabilityReportSince'){if(value!=='mai'&&(!Number.isInteger(value)||value<1900||value>2200))fail();}
    else if(Array.isArray(fallback)){
      if(!Array.isArray(value))fail();
      if(key==='priorities'&&(value.length!==6||new Set(value).size!==6||value.some((v:any)=>!priorities.includes(v))))fail();
      if(key==='missionOrder'&&(value.length!==6||new Set(value).size!==6||value.some((v:any)=>!Number.isInteger(v)||v<0||v>5)))fail();
      if(key==='companyDims'&&(value.length!==5||value.some((v:any)=>typeof v!=='number'||!Number.isFinite(v)||v<0)))fail();
      if(key==='screenHistory'&&value.some((v:any)=>!screens.includes(v)))fail();
      if(key==='dataNeeds'&&value.some((v:any)=>!object(v)||typeof v.id!=='string'||typeof v.label!=='string'||!priorities.includes(v.priority)))fail();
    }else if(object(fallback)){
      if(!object(value))fail();
      for(const [id,v] of Object.entries(value)){
        if(['__proto__','constructor','prototype'].includes(id))fail();
        if(['dfRatings','rfRatings','efRatings','scRatings','plRatings','frRatings'].includes(key)&&!ratings.includes(v as string))fail();
        if(['needIncluded','priorityIncluded'].includes(key)&&typeof v!=='boolean')fail();
        if(['prioExperience','pdCustomLabels','pdCustomMemos'].includes(key)&&typeof v!=='string')fail();
        if(['needRelevance','needCriticality','prioExpSelected'].includes(key)&&(typeof v!=='number'||!Number.isFinite(v)))fail();
        if(key==='missionOutcomes'&&!['positive','warning','critical'].includes(v as string))fail();
        if(key==='missionParameters'&&(!Array.isArray(v)||v.some(x=>typeof x!=='string')))fail();
        if(key==='asIsRatings'&&(!Array.isArray(v)||v.some(x=>!['alto','medio','basso'].includes(x))))fail();
        if(key==='ucSelections'&&(!Array.isArray(v)||v.some(x=>!Number.isInteger(x)||x<0)))fail();
        if(key==='frameworkChecks'&&(!object(v)||typeof (v as any).inUso!=='boolean'||typeof (v as any).diInteresse!=='boolean'))fail();
        if(key==='siteTable'){
          if(!object(v)||!(id in fallback))fail();
          for(const [geo,num] of Object.entries(v as object))if(!(geo in fallback[id])||typeof num!=='number'||!Number.isFinite(num)||num<0)fail();
        }
      }
    }else if(typeof value!==typeof fallback||(typeof value==='number'&&!Number.isFinite(value)))fail();
    (result as any)[key]=object(fallback)?{...fallback,...value}:value;
    if(key==='siteTable')for(const row of Object.keys(fallback))(result as any)[key][row]={...fallback[row],...value[row]};
  }
  if(!Number.isInteger(result.selectedMission)||result.selectedMission<0||result.selectedMission>5)fail();
  return result;
}
