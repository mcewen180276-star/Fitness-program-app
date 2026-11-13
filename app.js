
'use strict';
const $=id=>document.getElementById(id), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>crypto.randomUUID?crypto.randomUUID():'id'+Date.now()+Math.random().toString(36).slice(2);
const clone=x=>JSON.parse(JSON.stringify(x)), today=()=>new Date().toISOString().slice(0,10);
const categories=['Bodyweight','Dumbbell','Barbell','Kettlebell','Resistance Band','Cable Machine','Resistance Machine','Medicine Ball','Slam Ball','Swiss Ball','BOSU','TRX / Suspension','Bench','Step','Box','Cardio Machine','Ab Sling','Tornado Ball','Battle Rope','Plyometric Box','Other'];
const seeds=[
['Squat','Bodyweight','Legs','Strength'],['Reverse Lunge','Bodyweight','Legs','Strength'],['Glute Bridge','Bodyweight','Glutes','Strength'],['Push-up','Bodyweight','Chest','Strength'],['Plank','Bodyweight','Core','Core'],['Side Plank','Bodyweight','Core','Core'],['Dead Bug','Bodyweight','Core','Core'],['Bird Dog','Bodyweight','Core','Core'],['Burpee','Bodyweight','Full Body','Cardio'],['Low-impact Burpee','Bodyweight','Full Body','Cardio'],['Mountain Climber','Bodyweight','Core','Cardio'],['Jumping Jack','Bodyweight','Full Body','Cardio'],['Step Jack','Bodyweight','Full Body','Cardio'],['Calf Raise','Bodyweight','Calves','Strength'],['Wall Sit','Bodyweight','Legs','Strength'],['Hip Hinge','Bodyweight','Posterior Chain','Mobility'],['Chair Squat','Bodyweight','Legs','Strength'],
['Goblet Squat','Kettlebell','Legs','Strength'],['Kettlebell Swing','Kettlebell','Posterior Chain','Power'],['Kettlebell Deadlift','Kettlebell','Posterior Chain','Strength'],['Kettlebell Clean','Kettlebell','Full Body','Power'],['Kettlebell Press','Kettlebell','Shoulders','Strength'],['Kettlebell Snatch','Kettlebell','Full Body','Power'],['Kettlebell Row','Kettlebell','Back','Strength'],['Kettlebell Farmer Carry','Kettlebell','Full Body','Functional'],
['Dumbbell Squat','Dumbbell','Legs','Strength'],['Dumbbell Bench Press','Dumbbell','Chest','Strength'],['Dumbbell Row','Dumbbell','Back','Strength'],['Dumbbell Shoulder Press','Dumbbell','Shoulders','Strength'],['Dumbbell Lateral Raise','Dumbbell','Shoulders','Strength'],['Dumbbell Biceps Curl','Dumbbell','Arms','Strength'],['Dumbbell Triceps Extension','Dumbbell','Arms','Strength'],['Dumbbell Deadlift','Dumbbell','Posterior Chain','Strength'],['Dumbbell Snatch','Dumbbell','Full Body','Power'],['Dumbbell Reverse Lunge','Dumbbell','Legs','Strength'],['Dumbbell Thruster','Dumbbell','Full Body','Cardio'],['Dumbbell Chest Fly','Dumbbell','Chest','Strength'],
['Barbell Back Squat','Barbell','Legs','Strength'],['Barbell Front Squat','Barbell','Legs','Strength'],['Barbell Deadlift','Barbell','Posterior Chain','Strength'],['Barbell Romanian Deadlift','Barbell','Posterior Chain','Strength'],['Barbell Bench Press','Barbell','Chest','Strength'],['Barbell Bent-over Row','Barbell','Back','Strength'],['Barbell Overhead Press','Barbell','Shoulders','Strength'],['Barbell Hip Thrust','Barbell','Glutes','Strength'],['Barbell Curl','Barbell','Arms','Strength'],
['Band Row','Resistance Band','Back','Strength'],['Band Chest Press','Resistance Band','Chest','Strength'],['Band Pull Apart','Resistance Band','Back','Strength'],['Band Face Pull','Resistance Band','Shoulders','Strength'],['Band Squat','Resistance Band','Legs','Strength'],['Band Lateral Walk','Resistance Band','Glutes','Strength'],['Band Pallof Press','Resistance Band','Core','Core'],['Band Biceps Curl','Resistance Band','Arms','Strength'],['Band Triceps Pressdown','Resistance Band','Arms','Strength'],['Band Good Morning','Resistance Band','Posterior Chain','Strength'],['Band External Rotation','Resistance Band','Shoulders','Mobility'],
['Cable Row','Cable Machine','Back','Strength'],['Cable Chest Fly','Cable Machine','Chest','Strength'],['Cable Triceps Pushdown','Cable Machine','Arms','Strength'],['Cable Wood Chop','Cable Machine','Core','Core'],['Lat Pulldown','Resistance Machine','Back','Strength'],['Leg Press','Resistance Machine','Legs','Strength'],['Seated Leg Curl','Resistance Machine','Hamstrings','Strength'],['Chest Press Machine','Resistance Machine','Chest','Strength'],['Leg Extension','Resistance Machine','Quadriceps','Strength'],
['Medicine Ball Slam','Medicine Ball','Full Body','Power'],['Medicine Ball Rotation','Medicine Ball','Core','Functional'],['Slam Ball Slam','Slam Ball','Full Body','Power'],['Swiss Ball Crunch','Swiss Ball','Core','Core'],['Swiss Ball Hamstring Curl','Swiss Ball','Hamstrings','Strength'],['TRX Row','TRX / Suspension','Back','Strength'],['TRX Squat','TRX / Suspension','Legs','Strength'],['Bench Step-up','Bench','Legs','Functional'],['Step-up','Step','Legs','Cardio'],['Box Jump','Plyometric Box','Legs','Power'],['Battle Rope Waves','Battle Rope','Full Body','Cardio'],['Ab Sling Knee Raise','Ab Sling','Core','Core'],['Ab Sling Leg Raise','Ab Sling','Core','Core'],['Tornado Ball Rotation','Tornado Ball','Core','Functional'],['Tornado Ball Slam','Tornado Ball','Full Body','Power'],
['Treadmill Walk','Cardio Machine','Cardio','Cardio'],['Treadmill Intervals','Cardio Machine','Cardio','Cardio'],['Exercise Bike Intervals','Cardio Machine','Cardio','Cardio'],['Rowing Machine Intervals','Cardio Machine','Cardio','Cardio'],['Cross Trainer Steady State','Cardio Machine','Cardio','Cardio'],['Stair Climber Intervals','Cardio Machine','Cardio','Cardio'],
['Cat Cow','Bodyweight','Spine','Yoga'],['Child Pose','Bodyweight','Full Body','Yoga'],['Downward Facing Dog','Bodyweight','Full Body','Yoga'],['Warrior II','Bodyweight','Legs','Yoga'],['Seated Spinal Twist','Bodyweight','Spine','Mobility'],['Standing Balance','Bodyweight','Balance','Balance'],['Single Leg Stand','Bodyweight','Balance','Balance'],['Heel-to-Toe Walk','Bodyweight','Balance','Balance']
];
const equipmentName=x=>String(x||'').trim();
function addExpandedLibrary(rows){
 if(!Array.isArray(rows))return 0;
 const names=new Set(db.exercises.map(e=>e.name.trim().toLowerCase()));
 const eqNames=new Set(db.equipment.map(e=>canonicalEquipment(e.name).toLowerCase()));
 let count=0;
 for(const r of rows){
  if(!Array.isArray(r)||r.length<6)continue;
  const [name,type,muscle,level,rawEquipment,description]=r;const equipment=canonicalEquipment(rawEquipment);
  if(!name)continue;
  if(names.has(name.trim().toLowerCase())){
   const existing=db.exercises.find(e=>e.name.trim().toLowerCase()===name.trim().toLowerCase());
   if(existing&&(!existing.description||existing.description.startsWith('Use controlled technique and an appropriate range of motion;')||existing.description.startsWith('Set the machine for a comfortable starting intensity;')))existing.description=description;
   continue;
  }
  db.exercises.push({id:uid(),name,equipment,muscle,type,level,description,url:''});
  names.add(name.trim().toLowerCase());count++;
  if(equipment&&!eqNames.has(equipment.trim().toLowerCase())){
   db.equipment.push({id:uid(),name:equipment,quantity:1,hidden:false});
   eqNames.add(equipment.trim().toLowerCase());
  }
 }
 return count;
}
const equipmentAliases={
 'dumbbells':'Dumbbell','dumbbell weights':'Dumbbell','dumbbell':'Dumbbell',
 'kettlebells':'Kettlebell','kettle bells':'Kettlebell','kettle bell':'Kettlebell',
 'barbells':'Barbell','barbell and rack':'Barbell','barbell / rack':'Barbell',
 'bands':'Resistance Band','band':'Resistance Band','resistance bands':'Resistance Band','elastic bands':'Resistance Band',
 'body weight':'Bodyweight','body-weight':'Bodyweight','body weight / floor':'Bodyweight',
 'cables':'Cable Machine','cable':'Cable Machine','cable machines':'Cable Machine',
 'machines':'Resistance Machine','weight machines':'Resistance Machine','resistance machines':'Resistance Machine',
 'medicine balls':'Medicine Ball','med ball':'Medicine Ball','slam balls':'Slam Ball',
 'swiss balls':'Swiss Ball','stability ball':'Swiss Ball','exercise ball':'Swiss Ball',
 'trx':'TRX / Suspension','suspension trainer':'TRX / Suspension','suspension training':'TRX / Suspension',
 'battle ropes':'Battle Rope','ab slings':'Ab Sling','tornado balls':'Tornado Ball',
 'plyo box':'Plyometric Box','plyo boxes':'Plyometric Box',
 'cardio machines':'Cardio Machine','cardio equipment':'Cardio Machine'
};
function canonicalEquipment(name){
 const raw=String(name||'').trim().replace(/\s+/g,' '),key=raw.toLowerCase();
 return equipmentAliases[key]||raw;
}
function dedupeEquipment(){
 const old=db.equipment.length,merged=new Map();
 for(const eq of db.equipment){
  const name=canonicalEquipment(eq.name);if(!name)continue;
  const key=name.toLowerCase();
  if(!merged.has(key))merged.set(key,{...eq,name,quantity:Math.max(0,Number(eq.quantity)||0)});
  else {const item=merged.get(key);item.quantity=Math.max(item.quantity,Math.max(0,Number(eq.quantity)||0));item.hidden=Boolean(item.hidden&&eq.hidden)}
 }
 db.equipment=[...merged.values()].sort((a,b)=>a.name.localeCompare(b.name));
 for(const e of db.exercises)e.equipment=canonicalEquipment(e.equipment);
 // Preserve custom exercise details and saved programme prescriptions; only normalize equipment labels.
 for(const draft of Object.values(db.drafts||{}))for(const day of draft.days||[])for(const e of day.exercises||[])e.equipment=canonicalEquipment(e.equipment);
 for(const plan of db.programmes||[])for(const day of plan.days||[])for(const e of day.exercises||[])e.equipment=canonicalEquipment(e.equipment);
 return old-db.equipment.length;
}
const fresh=()=>({schema:1,clients:[],equipment:categories.map(name=>({id:uid(),name,quantity:1,hidden:false})),exercises:seeds.map(([name,equipment,muscle,type])=>({id:uid(),name,equipment,muscle,type,description:'',url:''})),programmes:[],drafts:{},autosaves:{},templates:[],records:[],challenges:[]});
let db=fresh(),tab='Clients',clientId='',programmeId='',editDay=0,search='',eqFilter='',muscleFilter='',kindFilter='',miniClient='',miniSelected=new Set(),swapTarget=null,swapFilters={equipment:'',muscle:'',kind:'',search:''};
const tabs=['Clients','Exercise Database','Programme Creator','Edit & Print','Workout Mode','Training Record','Templates','Fitness Calculators','Challenges','Mini-App','Data & Backup'];
const dbOpen=()=>new Promise((resolve,reject)=>{const r=indexedDB.open('FitnessManagerRebuiltV1',1);r.onupgradeneeded=()=>r.result.createObjectStore('data');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});
let handle;const read=async()=>{handle=await dbOpen();return new Promise((resolve,reject)=>{const t=handle.transaction('data','readonly').objectStore('data').get('main');t.onsuccess=()=>resolve(t.result);t.onerror=()=>reject(t.error)})};
const save=async()=>{if(!handle)return;await new Promise((resolve,reject)=>{const t=handle.transaction('data','readwrite');t.objectStore('data').put(db,'main');t.oncomplete=resolve;t.onerror=()=>reject(t.error)});$('savedStatus')?.replaceChildren(document.createTextNode('Saved locally '+new Date().toLocaleTimeString()))};
const set=(key,value)=>{db[key]=value;save();render()};
const client=()=>db.clients.find(c=>c.id===clientId);
const current=()=>db.programmes.find(p=>p.id===programmeId);
const ensureDraft=()=>{if(!clientId)return null;return db.drafts[clientId] ||= {structure:'Full Body',days:[{name:'Day 1',style:'Full Body',exercises:[]}]}};
const dateLabel=p=>`${p.name} · ${p.date} · ${p.days.length} day(s)`;
function shell(){ $('nav').innerHTML=tabs.map(t=>`<button class="${t===tab?'active':''}" data-tab="${esc(t)}">${esc(t)}</button>`).join('');$('app').innerHTML=`<div id="view"></div><div class="tiny muted no-print" id="savedStatus">Stored locally in this browser · Back up regularly</div>`;renderView()}
function render(){shell()}
function renderView(){const v=$('view');if(!v)return;const fn=({ 'Clients':viewClients,'Exercise Database':viewExercises,'Programme Creator':viewCreator,'Edit & Print':viewEdit,'Workout Mode':viewWorkout,'Training Record':viewRecords,'Templates':viewTemplates,'Fitness Calculators':viewCalculators,'Challenges':viewChallenges,'Mini-App':viewMini,'Data & Backup':viewData})[tab];v.innerHTML=fn()}
const opt=(items,selected,placeholder='Select')=>`<option value="">${esc(placeholder)}</option>`+items.map(x=>`<option value="${esc(x.id)}" ${x.id===selected?'selected':''}>${esc(x.name)}</option>`).join('');
const clientPick=()=>`<select id="pickClient">${opt(db.clients,clientId,'Select a client')}</select>`;
const programmePick=(cid=clientId)=>`<select id="pickProgramme">${opt(db.programmes.filter(p=>p.clientId===cid).map(p=>({id:p.id,name:dateLabel(p)})),programmeId,'Select approved programme')}</select>`;
const field=(name,val='',type='text')=>`<label>${esc(name)}</label><input data-field="${esc(name)}" type="${type}" value="${esc(val)}">`;
function viewClients(){const c=client();return `<h2>Client Centre</h2><p class="muted">Health and lifestyle questionnaire · No PAR-Q. Medical information stays in the main app, not the mini-app.</p><div class="panel"><div class="row">${clientPick()}<button data-action="newClient" class="primary">+ New client</button><button data-action="deleteClient" class="danger" ${!c?'disabled':''}>Delete client</button></div></div>${!c?'<p>Choose or create a client to begin.</p>':`<div class="grid"><section class="panel"><h3>Client details</h3>${field('Name',c.name)}${field('Email',c.email)}${field('Age',c.age,'number')}${field('Height (cm)',c.height,'number')}${field('Body weight (kg)',c.bodyWeight,'number')}${field('Resting heart rate (bpm)',c.restingHR,'number')}${field('Measured maximum heart rate (bpm)',c.measuredMaxHR,'number')}${field('BMR equation (male / female)',c.bmrSex)}${field('Experience',c.experience)}${field('Goals',c.goals)}<button class="primary" data-action="saveClient">Save client details</button></section><section class="panel"><h3>Health & lifestyle</h3><p class="tiny muted">Select multiple conditions, or None / Not disclosed.</p><div class="grid">${['None','Not disclosed','High blood pressure','Low blood pressure','Heart or cardiovascular condition','Diabetes','Asthma / respiratory condition','Arthritis','Osteoporosis / low bone density','Back / neck problem','Joint pain / injury','Neurological condition','Pregnancy / postnatal considerations','Other'].map(x=>`<label><input type="checkbox" class="condition" value="${esc(x)}" ${(c.conditions||[]).includes(x)?'checked':''}> ${esc(x)}</label>`).join('')}</div>${field('Other condition details',c.otherConditions)}${field('Medication / considerations',c.medication)}${field('Injuries / limitations',c.limitations)}${field('Sleep hours (typical)',c.sleep,'number')}${field('Stress level (low / medium / high)',c.stress)}${field('Occupation / daily activity',c.activity)}${field('Days available each week',c.days,'number')}${field('Preferred exercise',c.preferences)}<button class="primary" data-action="saveHealth">Save health & lifestyle</button><p class="tiny muted">Programme suggestions require instructor review. Health answers are not medical clearance.</p></section></div><section class="panel"><h3>Approved programmes</h3>${db.programmes.filter(p=>p.clientId===c.id).map(p=>`<div class="entry"><b>${esc(p.name)}</b> · ${esc(p.date)} <button data-action="openProgramme" data-id="${p.id}">Open in editor</button><button data-action="deleteProgramme" data-id="${p.id}" class="danger">Delete approved copy</button></div>`).join('')||'<p>No approved programmes yet.</p>'}<details><summary>Private autosave archive (${(db.autosaves[c.id]||[]).length})</summary>${(db.autosaves[c.id]||[]).slice().reverse().map((a,i)=>`<div class="entry">${esc(a.time)} · ${(a.days||[]).length} days <button data-action="restoreAuto" data-index="${(db.autosaves[c.id]||[]).length-1-i}">Restore draft</button></div>`).join('')||'No autosaves'}</details></section>`}`}
function exerciseEditorHtml(e){
 const equipment=db.equipment.slice().sort((a,b)=>a.name.localeCompare(b.name));
 return `<div class="exercise-inline-editor" data-editor="${esc(e.id||'new')}"><div class="grid">
 <label>Exercise name<input data-ex-field="name" value="${esc(e.name||'')}"></label>
 <label>Equipment<select data-ex-field="equipment">${equipment.map(x=>`<option value="${esc(x.name)}" ${x.name===e.equipment?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label>
 <label>Muscle / body area<input data-ex-field="muscle" value="${esc(e.muscle||'')}"></label>
 <label>Training type<input data-ex-field="type" value="${esc(e.type||'Strength')}"></label>
 <label>Difficulty<select data-ex-field="level">${['Beginner','Intermediate','Advanced','All levels'].map(x=>`<option ${x===(e.level||'Beginner')?'selected':''}>${x}</option>`).join('')}</select></label>
 <label>Exercise demonstration link<input data-ex-field="url" value="${esc(e.url||'')}" placeholder="https://..."></label></div>
 <label>Technique explanation<textarea data-ex-field="description" rows="5">${esc(e.description||'')}</textarea></label>
 <div class="row"><button data-action="saveInlineExercise" data-id="${esc(e.id||'')}" class="primary">Save details</button><button data-action="cancelInlineExercise">Cancel</button></div></div>`;
}
const exerciseKind=e=>{const text=`${e.type||''} ${e.name||''}`.toLowerCase();if(cardioExercise(e)||/interval|hiit|aerobic|endurance machine/.test(text))return 'Cardio';if(/yoga|pilates|mobility|flexibility|stretch|balance/.test(text))return 'Mobility / Mind-body';if(/core|abdominal/.test(text)||/core/i.test(e.muscle||''))return 'Core';return 'Resistance / Strength'};
const allMuscles=()=>[...new Set(db.exercises.map(e=>e.muscle).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
const allEquipment=()=>[...new Set(db.exercises.map(e=>e.equipment).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
const filterExercises=(filters)=>db.exercises.filter(e=>(!filters.equipment||e.equipment===filters.equipment)&&(!filters.muscle||e.muscle===filters.muscle)&&(!filters.kind||exerciseKind(e)===filters.kind)&&(!filters.search||`${e.name} ${e.equipment} ${e.muscle} ${e.type} ${e.description||''}`.toLowerCase().includes(filters.search.toLowerCase())));
const filterSelect=(id,values,selected,placeholder)=>`<select id="${id}"><option value="">${placeholder}</option>${values.map(x=>`<option value="${esc(x)}" ${x===selected?'selected':''}>${esc(x)}</option>`).join('')}</select>`;
function viewExercises(){
 const equipment=db.equipment.slice().sort((a,b)=>a.name.localeCompare(b.name));
 const filtered=filterExercises({search,equipment:eqFilter,muscle:muscleFilter,kind:kindFilter});
 const findDemo=e=>`https://www.youtube.com/results?search_query=${encodeURIComponent(e.name+' exercise technique demonstration')}`;
 return `<h2>Exercise Database</h2><p class="muted">Tap an exercise to expand its technique explanation, equipment, difficulty, demo links and editing controls.</p>
 <div class="panel"><div class="row"><input id="exerciseSearch" placeholder="Search exercise, muscle, type, technique..." value="${esc(search)}"><select id="equipmentFilter"><option value="">All equipment</option>${equipment.map(e=>`<option value="${esc(e.name)}" ${e.name===eqFilter?'selected':''}>${esc(e.name)}${e.hidden?' (hidden)':''}</option>`).join('')}</select></div>
 <div class="grid exercise-filter-grid"><label>Body part / muscle${filterSelect('muscleFilter',allMuscles(),muscleFilter,'All body parts')}</label><label>Exercise category${filterSelect('kindFilter',['Cardio','Resistance / Strength','Core','Mobility / Mind-body'],kindFilter,'All categories')}</label></div><div class="row"><button data-action="clearExerciseFilters">Clear filters</button></div>
 <div class="row"><button data-action="addExercise" class="primary">+ Add exercise</button><button data-action="addEquipment" class="primary">+ Add equipment</button><button data-action="manageEquipment">Manage equipment</button><button data-action="importLibrary">Restore expanded library</button></div>
 <div id="newExerciseHolder"></div>
 <p class="muted">${filtered.length} matching exercises · ${db.exercises.length} total · ${db.equipment.length} equipment options</p>
 <div class="exercise-list">${filtered.slice(0,160).map(e=>`<details class="entry exercise-detail"><summary><b>${esc(e.name)}</b><div class="tiny muted">${esc(e.equipment)} · ${esc(e.muscle)} · ${esc(e.type)}${e.level?' · '+esc(e.level):''}</div></summary>
 <div class="exercise-detail-body"><h4>Technique & execution</h4><p>${esc(e.description||'No technique explanation yet. Select Edit to add one.')}</p>
 <div class="row">${e.url?`<a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">▶ Open demonstration</a>`:''}<a href="${findDemo(e)}" target="_blank" rel="noopener noreferrer">Search for demo</a></div>
 <div class="row"><button data-action="editExercise" data-id="${e.id}">Edit details & link</button><button data-action="duplicateExercise" data-id="${e.id}">Duplicate</button><button data-action="deleteExercise" data-id="${e.id}" class="danger">Delete</button></div>
 <div class="inlineEditorSlot"></div></div></details>`).join('')}${filtered.length>160?'<p class="muted">Showing the first 160 matches. Search or filter to narrow the list.</p>':''}</div></div>
 <details class="panel"><summary>Equipment manager (${db.equipment.length})</summary><div class="row"><button data-action="addEquipment" class="primary">+ Add equipment</button><button data-action="showAllEquipment">Show all</button><button data-action="dedupeEquipment">Merge duplicate equipment</button></div>${equipment.map(e=>`<div class="entry"><b>${esc(e.name)}</b> · Quantity ${e.quantity} · ${e.hidden?'Hidden':'Visible'} <button data-action="editEquipment" data-id="${e.id}">Edit name / quantity</button><button data-action="toggleEquipment" data-id="${e.id}">${e.hidden?'Show':'Hide'}</button></div>`).join('')}</details>`;
}
function openExerciseEditor(id){
 const e=db.exercises.find(x=>x.id===id)||{id:'',name:'',equipment:db.equipment.find(x=>!x.hidden)?.name||'Bodyweight',muscle:'',type:'Strength',level:'Beginner',description:'',url:''};
 const slot=id?[...document.querySelectorAll('.exercise-detail')].find(d=>d.querySelector(`[data-action="editExercise"][data-id="${id}"]`))?.querySelector('.inlineEditorSlot'):$('newExerciseHolder');
 if(!slot)return;
 slot.innerHTML=exerciseEditorHtml(e);slot.scrollIntoView({behavior:'smooth',block:'nearest'});
}
const workoutStructures=["Full Body", "Upper Body", "Lower Body", "Push", "Pull", "Legs", "Push / Pull / Legs", "Upper / Lower Split", "Full Body Split", "2-Day Full Body", "2-Day Upper / Lower", "3-Day Full Body", "3-Day Push / Pull / Legs", "4-Day Upper / Lower", "5-Day Split", "6-Day Split", "Cardio", "Core", "Cardio + Core", "Cardio + Resistance", "Strength + Cardio", "Strength", "Muscle Building", "Muscular Endurance", "Power", "Functional Fitness", "Circuit", "Interval Training", "HIIT", "Low Impact", "Mobility", "Flexibility", "Yoga", "Pilates", "Balance", "Seniors / Active Ageing", "Sport Specific", "Recovery / Light Day", "Custom"];
const dayStyles=["Full Body", "Upper Body", "Lower Body", "Push", "Pull", "Legs", "Cardio", "Core", "Cardio + Core", "Cardio + Strength", "Strength", "Hypertrophy", "Endurance", "HIIT", "Intervals", "Steady State", "Mobility", "Flexibility", "Balance", "Yoga", "Pilates", "Recovery", "Functional", "Power", "Mixed", "Custom"];
const cardioMethods=["Steady State", "Easy Recovery", "Aerobic Base", "Tempo", "Threshold", "Short Intervals", "Long Intervals", "HIIT", "Fartlek", "Pyramid Intervals", "Reverse Pyramid", "Ladder Intervals", "Hills", "Rolling Hills", "Hill Repeats", "Incline Intervals", "Resistance Intervals", "Cadence Intervals", "Sprint Intervals", "Sprint / Recovery", "Tabata", "EMOM", "Progressive Build", "Descending Effort", "Mixed Pace", "Distance Challenge", "Time Trial", "Heart Rate Zone 1", "Heart Rate Zone 2", "Heart Rate Zone 3", "Heart Rate Zone 4", "Heart Rate Zone 5", "Warm-up", "Cool-down"];
const optionList=(arr,val)=>arr.map(x=>`<option value="${esc(x)}" ${x===val?'selected':''}>${esc(x)}</option>`).join('');
const addEquipmentOptions=()=>db.equipment.filter(e=>!e.hidden).map(e=>e.name).sort((a,b)=>a.localeCompare(b));
const muscleOptions=()=>[...new Set(db.exercises.map(e=>e.muscle).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
function refreshDayExerciseChoices(di){const eq=$('addEq'+di)?.value||'',mus=$('addMus'+di)?.value||'',term=($('addSearch'+di)?.value||'').toLowerCase();const sel=$('addToDay'+di);if(!sel)return;const matches=db.exercises.filter(e=>(!eq||e.equipment===eq)&&(!mus||e.muscle===mus)&&(!term||`${e.name} ${e.type} ${e.equipment}`.toLowerCase().includes(term)));sel.innerHTML=opt(matches.slice(0,350).map(e=>({id:e.id,name:`${e.name} · ${e.equipment}`})),'',`Choose exercise (${matches.length} matches)`)}
// Build an entirely new unsaved draft. Approved programmes are never modified here.
function programmePattern(structure,days){
 const s=structure.toLowerCase();let pattern;
 if(s.includes('seniors')||s.includes('active ageing'))pattern=['Seniors / Active Ageing','Balance','Seniors / Active Ageing','Mobility'];
 else if(s.includes('push / pull / legs'))pattern=['Push','Pull','Legs'];
 else if(s.includes('upper / lower'))pattern=['Upper Body','Lower Body'];
 else if(s.includes('cardio + core'))pattern=['Cardio','Core'];
 else if(s.includes('cardio + resistance')||s.includes('strength + cardio'))pattern=['Cardio + Strength','Strength'];
 else if(s.includes('split'))pattern=['Chest / Triceps','Back / Biceps','Legs','Shoulders / Core','Full Body'];
 else if(s.includes('recovery'))pattern=['Recovery'];
 else pattern=[structure];
 return Array.from({length:days},(_,i)=>({name:`Day ${i+1} — ${pattern[i%pattern.length]}`,style:pattern[i%pattern.length],exercises:[]}));
}
function programmePool(style,structure){
 const tag=(style+' '+structure).toLowerCase();
 const seniors=/senior|active ageing|prime mover/.test(tag);
 const cardio=/cardio|interval|hiit|steady|aerobic|endurance/.test(style.toLowerCase());
 const balance=/balance/.test(style.toLowerCase());
 const mobility=/mobility|flexibility|yoga|pilates|recovery/.test(style.toLowerCase());
 const core=/core/.test(style.toLowerCase());
 const upper=/upper|push|pull|chest|back|shoulder|biceps|triceps/.test(style.toLowerCase());
 const lower=/lower|legs/.test(style.toLowerCase());
 const desired=style.toLowerCase();
 const avoidSenior=/jump|burpee|sprint|snatch|clean|slam|plyometric|box jump|heavy|tabata|hiit|power|explosive/i;
 const equipment=db.equipment.filter(e=>!e.hidden&&Number(e.quantity)>0).map(e=>e.name);
 const eligible=db.exercises.filter(e=>equipment.includes(e.equipment)||e.equipment==='Bodyweight');
 const pool=eligible.length?eligible:db.exercises;
 const score=e=>{
  const name=e.name.toLowerCase(),mus=(e.muscle||'').toLowerCase(),type=(e.type||'').toLowerCase(),equip=(e.equipment||'').toLowerCase();
  if(seniors&&avoidSenior.test(name))return -999;
  let v=0;
  if(seniors){
   if(/chair|seated|sit.to.stand|heel|toe|step|walk|balance|supported|wall|gentle|band|mobility|march/.test(name))v+=35;
   if(/bodyweight|resistance band|step|chair/.test(equip))v+=10;
   if(/balance|mobility|functional|strength|cardio/.test(type))v+=6;
  }
  if(cardio){if(cardioExercise(e))v+=30;else v-=8;}
  else if(balance){if(/balance/.test(mus+' '+type+' '+name))v+=35;else v-=5;}
  else if(mobility){if(/mobility|yoga|pilates|flexibility|stretch/.test(type+' '+name))v+=35;else v-=5;}
  else if(core){if(/core|abs|abdominal/.test(mus+' '+type))v+=32;else v-=5;}
  else if(upper){if(/chest|back|shoulder|arms|biceps|triceps/.test(mus))v+=25;else v-=8;}
  else if(lower){if(/leg|glute|hamstring|quadricep|calf|posterior/.test(mus))v+=25;else v-=8;}
  else if(/strength|hypertrophy|muscle|power|resistance/.test(desired)){if(/strength|resistance|power/.test(type))v+=22;}
  else if(/functional|circuit/.test(desired)){if(/functional|strength|cardio/.test(type))v+=15;}
  else {if(/strength|resistance|functional|core/.test(type))v+=12;}
  if(/full body/.test(desired)&&/full body/.test(mus))v+=8;
  if(/bodyweight|dumbbell|resistance band/.test(equip))v+=4;
  if(/advanced/.test((e.level||'').toLowerCase())&&seniors)v-=15;
  return v;
 };
 return pool.map(e=>({e,score:score(e)})).filter(x=>x.score>-100).sort((a,b)=>b.score-a.score||a.e.name.localeCompare(b.e.name));
}
function buildStarterDraft(structure,dayCount,existingStyles){
 const days=programmePattern(structure,dayCount),used=new Set();
 for(let i=0;i<days.length;i++){
  const day=days[i];if(existingStyles?.[i])day.style=existingStyles[i];
  const senior=/senior|active ageing|prime mover/i.test(structure+' '+day.style);
  const cardio=/cardio|interval|hiit|steady|aerobic/i.test(day.style);
  const pool=programmePool(day.style,structure);
  const limit=cardio?4:senior?6:6;
  const picked=[];const muscleCounts={};
  for(const {e,score} of pool){
   if(picked.length>=limit)break;
   if(used.has(e.id))continue;
   const m=e.muscle||'Other';if((muscleCounts[m]||0)>=2&&!cardio)continue;
   if(score<0&&!senior&&!cardio)continue;
   picked.push(e);used.add(e.id);muscleCounts[m]=(muscleCounts[m]||0)+1;
  }
  // A small database or uncommon style must still produce a usable draft.
  if(picked.length<3){for(const {e} of pool){if(picked.length>=Math.min(limit,5))break;if(!picked.some(x=>x.id===e.id)){picked.push(e);used.add(e.id)}}}
  // When the catalogue is exhausted across days, reuse sensible exercises rather than leave a day empty.
  if(!picked.length){for(const {e} of pool.slice(0,limit))picked.push(e)}
  // Seniors programme always includes balance/mobility and optional easy cardio.
  if(senior&&picked.length){
   const balance=db.exercises.find(e=>/heel.to.toe walk|single leg stand|standing balance|seated march|chair squat|sit.to.stand/i.test(e.name));
   if(balance&&!picked.some(e=>e.id===balance.id))picked[picked.length-1]=balance;
  }
  day.exercises=picked.map(e=>({...clone(e),sets:cardioExercise(e)?1:senior?2:3,reps:cardioExercise(e)?'':senior?'8–10':'8–12',weight:'',rest:cardioExercise(e)?0:senior?60:75,cardioMethod:cardioExercise(e)?senior?'Easy Recovery':cardio?'Steady State':'Aerobic Base':''}));
 }
 return {structure,days,generatedAt:new Date().toISOString()};
}
function regenerateDraft(structure,dayCount,keepDayStyles=false){
 if(!clientId)return;
 const old=ensureDraft();
 if(old.days.some(d=>d.exercises.length)&&!confirm('Generate a NEW draft for this client? The current working draft will be replaced, but all saved named programmes will remain unchanged.'))return false;
 draftAuto();
 db.drafts[clientId]=buildStarterDraft(structure,dayCount,keepDayStyles?old.days.map(d=>d.style):null);
 editDay=0;programmeId='';save();render();return true;
}
function viewCreator(){
 const d=ensureDraft(),saved=db.programmes.filter(p=>p.clientId===clientId);
 return `<h2>Programme Creator</h2><div class="panel"><h3>1. Choose client or load an existing programme</h3><div class="row">${clientPick()}<button data-action="newDraft" ${!clientId?'disabled':''}>+ Start new</button></div>${!d?'<p>Select a client to begin.</p>':`<div class="row"><select id="creatorSavedProgramme">${opt(saved.map(p=>({id:p.id,name:dateLabel(p)})),'','Choose saved programme to edit')}</select><button data-action="creatorLoad" ${!saved.length?'disabled':''}>Load for editing</button></div><p class="tiny muted">${d.editingProgrammeId?'Editing saved programme: changes stay in this working draft until you choose Save changes.':'New unsaved draft — your saved programmes will not change when you generate.'}</p>`}</div>
 ${!d?'':`<div class="panel"><h3>2. Choose the workout</h3><div class="grid">
 <label>Workout type<select id="programmeStructure">${optionList(workoutStructures,d.structure||'Full Body')}</select></label>
 <label>Number of training days<select id="programmeDays">${Array.from({length:7},(_,i)=>`<option value="${i+1}" ${d.days.length===i+1?'selected':''}>${i+1} day${i?'s':''}</option>`).join('')}</select></label>
 <label>Exercises per day<input id="creatorExerciseCount" type="number" min="1" max="20" value="${esc(d.exerciseCount||6)}"></label>
 <label>Approximate session length<select id="creatorDuration">${dropdownOptions(timeChoices,d.duration||45,'min')}</select></label>
 <label>Default resistance sets<select id="creatorSets">${dropdownOptions(setChoices,d.defaultSets||'3')}</select></label><label>Default reps<select id="creatorReps">${dropdownOptions(repChoices,d.defaultReps||'8–12')}</select></label>
 <label>Default rest<select id="creatorRest">${dropdownOptions(restChoices,d.defaultRest??60,'sec')}</select></label>
 <label>Cardio in programme<select id="creatorCardio"><option value="yes" ${(d.includeCardio??true)?'selected':''}>Include cardio where appropriate</option><option value="no" ${d.includeCardio===false?'selected':''}>No additional cardio</option></select></label>
 <label>Cardio method<select id="creatorCardioMethod">${optionList(cardioMethods,d.cardioMethod||'Steady State')}</select></label>
 </div><button data-action="creatorGenerate" class="primary">Generate programme</button><button data-action="creatorSmartGenerate">Intelligent generator (offline)</button><details><summary>How does intelligent generation work?</summary><p class="muted">Uses client goals, experience, preferred activity, days available, chosen structure, available equipment and exercise categories. It is a local rules-based planner, not a cloud AI model. Always review the programme before giving it to a client.</p></details><p class="tiny muted">Creates a fresh working draft using the selected structure, exercise count, time and equipment availability. Does not overwrite saved programmes.</p></div>
 ${d.generatorRationale?`<div class="panel"><h3>Generator explanation</h3><p>${esc(d.generatorRationale)}</p><p class="muted">${esc(d.generatorReview||'')}</p></div>`:''}<div class="panel"><h3>3. Review each workout day</h3><p class="muted">Choose a different training style for each day, then tap <b>Apply style to this day</b> to replace only that day's exercises. You can also reorder, swap, add and edit individual exercises.</p></div>${dayEditor(d)}
 <div class="panel"><h3>4. Save programme</h3><div class="row"><button data-action="saveApproved" class="primary">Save as new programme</button>${d.editingProgrammeId?'<button data-action="creatorSaveChanges">Save changes to loaded programme</button>':''}</div><p class="tiny muted">Saving as new creates a separate named and dated programme. Save changes updates only the programme you deliberately loaded.</p></div>`}`;
}
function creatorOptions(){
 const d=ensureDraft();
 return {structure:$('programmeStructure')?.value||d.structure||'Full Body',
 days:Math.max(1,Math.min(7,Number($('programmeDays')?.value)||d.days.length||2)),
 count:Math.max(1,Math.min(20,Number($('creatorExerciseCount')?.value)||6)),
 duration:Math.max(10,Math.min(180,Number($('creatorDuration')?.value)||45)),
 sets:$('creatorSets')?.value||String(d.defaultSets||'3'),
 reps:$('creatorReps')?.value||d.defaultReps||'8–12',
 rest:Math.max(0,Math.min(600,Number($('creatorRest')?.value)||60)),
 includeCardio:($('creatorCardio')?.value||'yes')==='yes',
 cardioMethod:$('creatorCardioMethod')?.value||'Steady State'};
}
function exerciseForDay(e,opts,senior=false){
 const isCardio=cardioExercise(e);
 return {...clone(e),sets:isCardio?'1':senior?'2–3':opts.sets,reps:isCardio?'':senior?'8–12':opts.reps,weight:'',rest:isCardio?0:opts.rest,
 cardioMethod:isCardio?opts.cardioMethod:'',duration:isCardio?String(Math.max(5,Math.round(opts.duration/Math.max(1,opts.count)))):''};
}
function makeDayExercises(style,structure,opts,used=new Set()){
 const senior=/senior|active ageing|prime mover/i.test(style+' '+structure);
 const cardioDay=/cardio|hiit|interval|steady|aerobic/i.test(style);
 const pool=programmePool(style,structure);
 const eligible=pool.filter(({e,score})=>score>=0&&(!cardioExercise(e)||opts.includeCardio||cardioDay));
 const ranked=eligible.length?eligible:pool;
 const result=[],muscles=new Map(),limit=opts.count;
 const pick=(e)=>{
  if(result.some(x=>x.id===e.id))return false;
  const m=e.muscle||'Other';
  if((muscles.get(m)||0)>=Math.max(2,Math.ceil(limit/3))&&!cardioDay)return false;
  result.push(e);muscles.set(m,(muscles.get(m)||0)+1);used.add(e.id);return true;
 };
 // Alternate across high scoring equipment and muscle categories instead of filling a day with near-identical variations.
 for(const pass of [0,1,2]){
  for(const {e} of ranked){
   if(result.length>=limit)break;
   if(pass===0&&(used.has(e.id)||result.some(x=>x.equipment===e.equipment&&x.muscle===e.muscle)))continue;
   if(pass===1&&used.has(e.id))continue;
   pick(e);
  }
  if(result.length>=limit)break;
 }
 if(!result.length)for(const {e} of pool.slice(0,limit))pick(e);
 if(opts.includeCardio&&!cardioDay&&!senior&&result.length>1&&!result.some(cardioExercise)){
  const cardio=db.exercises.find(e=>cardioExercise(e)&&db.equipment.some(eq=>eq.name===e.equipment&&!eq.hidden&&Number(eq.quantity)>0));
  if(cardio)result[result.length-1]=cardio;
 }
 return result.map(e=>exerciseForDay(e,opts,senior));
}
function intelligentProgrammeOptions(opts){
 const c=client()||{},goal=String(c.goals||'').toLowerCase(),experience=String(c.experience||'').toLowerCase(),prefs=String(c.preferences||'').toLowerCase();
 const adjusted={...opts};
 if(/senior|older|balance|mobility|low impact/.test(goal+' '+prefs))adjusted.structure='Seniors / Active Ageing';
 else if(/weight loss|fat loss|cardio|endurance|aerobic/.test(goal)&&/full body|custom/i.test(opts.structure))adjusted.structure='Cardio + Resistance';
 else if(/muscle|hypertrophy|size/.test(goal)&&/full body|custom/i.test(opts.structure))adjusted.structure='Muscle Building';
 else if(/strength|power/.test(goal)&&/full body|custom/i.test(opts.structure))adjusted.structure='Strength';
 if(/beginner|new|novice/.test(experience)){adjusted.sets='2';adjusted.reps='10–12';adjusted.rest=Math.max(60,adjusted.rest)}
 if(/advanced|experienced/.test(experience)){adjusted.sets=adjusted.sets||'3–4'}
 const availableDays=Number(c.days);if(Number.isFinite(availableDays)&&availableDays>=1&&availableDays<=7)adjusted.days=Math.min(adjusted.days,availableDays);
 return adjusted;
}
function buildIntelligentDraft(opts){
 const settings=intelligentProgrammeOptions(opts),draft=createProgrammeDraft(settings),c=client()||{};
 draft.generator='offline-intelligent';
 draft.generatorRationale=`Goals: ${c.goals||'not provided'}; experience: ${c.experience||'not provided'}; workout: ${settings.structure}; ${settings.days} day(s); ${settings.count} exercises/day. Available equipment only; review for individual suitability.`;
 draft.generatorReview='Review each exercise, technique, intensity and any health or injury considerations before prescribing.';
 return draft;
}
function createProgrammeDraft(opts){
 const pattern=programmePattern(opts.structure,opts.days),used=new Set();
 return {...opts,days:pattern.map(day=>({...day,exercises:makeDayExercises(day.style,opts.structure,opts,used)})),generatedAt:new Date().toISOString()};
}
function generatorText(){const c=client();if(!c)return 'Select a client.';return `Goals: ${c.goals||'not supplied'}. Experience: ${c.experience||'not supplied'}. Available days: ${c.days||'not supplied'}. Health considerations: ${(c.conditions||[]).join(', ')||'not supplied'}. Avoid assuming a condition automatically prohibits exercise; discuss individual needs and obtain appropriate advice when indicated.`}
const cardioExercise=e=>e.type==='Cardio'||e.muscle==='Cardio'||/treadmill|bike|rowing|cross trainer|stair climber|ergometer/i.test(e.name);
const setChoices=['1','2','2–3','3','3–4','4','4–5','5','5–6','6','6–8','8','10'];
const repChoices=['3–5','4–6','5','5–8','6–8','8','8–10','8–12','10','10–12','12','12–15','12–16','15','15–20','16–20','20','20–25','25–30','30','AMRAP','To fatigue','30 seconds','45 seconds','60 seconds'];
const restChoices=['0','15','20','30','45','60','75','90','120','150','180','240','300'];
const timeChoices=['3','5','8','10','12','15','20','25','30','35','40','45','50','60','75','90','120','150','180'];
function dropdownOptions(choices,value,unit=''){
 const v=String(value??'');const all=[...new Set([...choices,v].filter(Boolean))];
 return all.map(x=>`<option value="${esc(x)}" ${x===v?'selected':''}>${esc(x)}${unit?' '+unit:''}</option>`).join('');
}
function numberOfSets(v){const nums=String(v??'1').match(/\d+/g);return Math.max(1,Math.min(30,Number(nums?.at(-1)||1)))}
const metricFields=e=>cardioExercise(e)?[['duration','Duration (min)'],['distance','Distance (km)'],['speed','Speed (km/h)'],['incline','Incline (%)'],['level','Level / resistance'],['heartRate','Heart rate (bpm)']]:[['weight','Target weight (kg)'],['reps','Reps / time']];
const demo=e=>e.url?`<a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">▶ Exercise demonstration</a>`:'<span class="tiny muted">No demo link yet — add one in Exercise Database</span>';
function showSwapPanel(){
 const panel=$('swapPanel');if(!panel||!swapTarget)return;
 const old=ensureDraft().days[swapTarget.di]?.exercises[swapTarget.xi];if(!old)return;
 panel.classList.remove('hidden');panel.innerHTML=`<div class="row"><h3>Swap: ${esc(old.name)}</h3><button data-action="closeSwap">Close</button></div><p class="muted">Filter by body part, equipment and category, or search by name. The chosen exercise replaces only this occurrence in the draft.</p><div class="grid"><label>Equipment${filterSelect('swapEquipment',allEquipment(),swapFilters.equipment,'All equipment')}</label><label>Muscle / body part${filterSelect('swapMuscle',allMuscles(),swapFilters.muscle,'All body parts')}</label><label>Category${filterSelect('swapKind',['Cardio','Resistance / Strength','Core','Mobility / Mind-body'],swapFilters.kind,'All categories')}</label><label>Search<input id="swapSearch" value="${esc(swapFilters.search)}" placeholder="Search exercises"></label></div><div id="swapResults" class="swap-results"></div>`;
 updateSwapResults();panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function updateSwapResults(){const out=$('swapResults');if(!out)return;const matches=filterExercises(swapFilters);out.innerHTML=`<p class="muted">${matches.length} matching exercises</p>`+matches.slice(0,100).map(e=>`<div class="entry swap-result"><div><b>${esc(e.name)}</b><div class="tiny muted">${esc(e.equipment)} · ${esc(e.muscle)} · ${esc(exerciseKind(e))}</div></div><button class="primary" data-action="chooseSwap" data-id="${esc(e.id)}">Use exercise</button></div>`).join('')+(matches.length>100?'<p>Showing first 100 results. Refine the filters to see more.</p>':'');}
function dayEditor(d){return `<section class="panel"><div class="row"><h3>Workout days</h3><button data-action="addDay">+ Add day</button></div>${d.days.map((day,di)=>`<details ${di===editDay?'open':''}><summary>${esc(day.name)} · ${esc(day.style||'Mixed')} · ${day.exercises.length} exercises</summary><div class="grid"><label>Day name<input data-dayname="${di}" value="${esc(day.name)}"></label><label>Training style<select data-daystyle="${di}">${optionList(dayStyles,day.style||'Mixed')}</select></label></div><div class="row"><button data-action="renameDay" data-index="${di}">Save day name/style</button><button data-action="creatorApplyDay" data-index="${di}" class="primary">Apply style to this day</button><button data-action="moveDayUp" data-index="${di}" ${di===0?'disabled':''}>↑ Day</button><button data-action="moveDayDown" data-index="${di}" ${di===d.days.length-1?'disabled':''}>↓ Day</button><button data-action="removeDay" data-index="${di}" class="danger">Remove</button></div>${day.exercises.map((x,xi)=>`<details class="entry creator-exercise"><summary><b>${esc(x.name)}</b><span class="muted"> · ${esc(x.equipment||'')} · ${cardioExercise(x)?'Cardio':'Resistance / Other'} · ${esc(x.sets||1)} ${cardioExercise(x)?'round(s)':'set(s)'}</span></summary><div class="creator-exercise-body"><div class="row"><button data-action="moveExerciseUp" data-index="${di}:${xi}" ${xi===0?'disabled':''}>↑</button><button data-action="moveExerciseDown" data-index="${di}:${xi}" ${xi===day.exercises.length-1?'disabled':''}>↓</button></div><p>${demo(x)}</p>${x.description?`<details><summary>Technique explanation</summary><p>${esc(x.description)}</p></details>`:''}${cardioExercise(x)?`<label>Cardio workout method<select data-item="${di}:${xi}:cardioMethod">${optionList(cardioMethods,x.cardioMethod||cardioMethods.find(m=>x.name.includes(m))||'Steady State')}</select></label>`:''}<div class="grid"><label>${cardioExercise(x)?'Intervals / rounds':'Sets'}<select data-item="${di}:${xi}:sets">${dropdownOptions(setChoices,x.sets||1)}</select></label>${metricFields(x).map(([k,label])=>`<label>${label}${k==='reps'?`<select data-item="${di}:${xi}:${k}">${dropdownOptions(repChoices,x[k]||'8–12')}</select>`:k==='duration'?`<select data-item="${di}:${xi}:${k}">${dropdownOptions(timeChoices,x[k]||'10','min')}</select>`:`<input data-item="${di}:${xi}:${k}" value="${esc(x[k]??'')}">`}</label>`).join('')}<label>Rest (sec)<select data-item="${di}:${xi}:rest">${dropdownOptions(restChoices,x.rest??60,'sec')}</select></label></div><div class="row"><button data-action="swapExercise" data-index="${di}:${xi}">Swap</button><button data-action="removeExercise" data-index="${di}:${xi}" class="danger">Remove</button></div></div></details>`).join('')}<div class="entry"><h4>Add exercise to ${esc(day.name)}</h4><div class="grid"><label>Equipment<select id="addEq${di}" data-filterday="${di}"><option value="">All equipment</option>${optionList(addEquipmentOptions(),'')}</select></label><label>Muscle / body area<select id="addMus${di}" data-filterday="${di}"><option value="">All muscles</option>${optionList(muscleOptions(),'')}</select></label></div><label>Search exercises<input id="addSearch${di}" data-filterday="${di}" placeholder="Search by name or type"></label><div class="row"><select id="addToDay${di}">${opt(db.exercises.slice(0,350).map(e=>({id:e.id,name:`${e.name} · ${e.equipment}`})),'','Choose exercise')}</select><button data-action="addToDay" data-index="${di}" class="primary">+ Add exercise</button></div></div></details>`).join('')}<div id="swapPanel" class="panel hidden" aria-live="polite"></div></section>`}
function printDocument(p){const c=db.clients.find(c=>c.id===p.clientId);return `<div class="report"><div class="report-head"><div><div class="report-brand">FITNESS PROGRAMME MANAGER</div><h1>${esc(p.name)}</h1><p class="report-sub">Personal training programme</p></div><div class="report-date">PROGRAMME DATE<br><strong>${esc(p.date)}</strong></div></div>${p.trainingTargets?.length?`<div class="report-targets"><b>Training targets</b>${p.trainingTargets.map(t=>`<p>${esc(t.name)}: ${t.low}–${t.high} bpm</p>`).join('')}</div>`:''}${p.calculatorNotes?.length?`<div class="report-targets"><b>Calculator notes</b>${p.calculatorNotes.map(t=>`<p>${esc(t.title)}: ${esc(t.summary)}</p>`).join('')}</div>`:''}<div class="report-meta"><div><small>PREPARED FOR</small><strong>${esc(c?.name||'Client')}</strong></div><div><small>WORKOUT DAYS</small><strong>${p.days.length}</strong></div><div><small>PROGRAMME</small><strong>${esc(p.name)}</strong></div></div>${p.days.map((day,di)=>`<section class="report-day"><div class="report-dayhead"><span>SESSION ${di+1}</span><h2>${esc(day.name)}</h2><p>${esc(day.style||'Mixed')}</p></div><table class="report-table"><thead><tr><th>Exercise</th><th>Prescription</th><th>Equipment / demo</th></tr></thead><tbody>${day.exercises.map(x=>`<tr><td><strong>${esc(x.name)}</strong>${x.description?`<div class="report-note">${esc(x.description)}</div>`:''}</td><td>${esc(x.sets||1)} ${cardioExercise(x)?'round(s)':'set(s)'}<br>${metricFields(x).filter(([k])=>x[k]!==undefined&&x[k]!=='').map(([k,label])=>`${esc(label)}: ${esc(x[k])}`).join('<br>')}<br>${x.cardioMethod?`<br>Method: ${esc(x.cardioMethod)}`:''}<br>Rest: ${esc(x.rest??60)} sec</td><td>${esc(x.equipment||'Bodyweight')}${x.url?`<div><a href="${esc(x.url)}">${esc(x.url)}</a></div>`:''}</td></tr>`).join('')}</tbody></table></section>`).join('')}<div class="report-foot">Programme guidance is individual and should be reviewed by the instructor. Exercise demonstrations are available using the linked URLs.</div></div>`}
function viewEdit(){const p=current();return `<h2 class="no-print">Edit & Print</h2><div class="panel no-print"><div class="row">${clientPick()}${programmePick()}<button data-action="print" class="primary" ${!p?'disabled':''}>Print / Save as PDF</button></div><p class="muted">Professional print layout: select “Save as PDF” in your phone's print menu.</p></div>${!p?'<p>Select an approved programme.</p>':`<div id="printArea">${printDocument(p)}</div><div class="panel no-print"><button data-action="editApproved" class="primary">Edit this programme in Creator</button><button data-action="renameApproved">Rename / change date</button></div>`}`}
function viewWorkout(){const p=current();return `<h2>Workout Mode</h2><div class="panel no-print"><div class="row">${clientPick()}${programmePick()}</div></div>${!p?'<p>Choose an approved programme.</p>':`<div class="panel no-print">${p.trainingTargets?.length?`<p><b>Training targets:</b> ${p.trainingTargets.map(t=>`${esc(t.name)} ${t.low}–${t.high} bpm`).join(' · ')}</p>`:''}${p.calculatorNotes?.length?`<details><summary>Calculator notes</summary>${p.calculatorNotes.map(t=>`<p>${esc(t.title)}: ${esc(t.summary)}</p>`).join('')}</details>`:''}<label>Workout day</label><select id="workoutDay">${p.days.map((d,i)=>`<option value="${i}">${esc(d.name)}</option>`).join('')}</select><div id="workoutItems"></div><button class="primary" data-action="recordWorkout">Save workout record</button></div>`}`}
function renderWorkoutItems(){const p=current(),i=Number($('workoutDay')?.value||0),out=$('workoutItems');if(!p||!out)return;out.innerHTML=(p.days[i]?.exercises||[]).map((e,j)=>`<div class="entry"><h3>${esc(e.name)}</h3><p>${demo(e)}</p>${e.description?`<details><summary>Technique explanation</summary><p>${esc(e.description)}</p></details>`:''}<p class="muted">${e.cardioMethod?`Method: ${esc(e.cardioMethod)} · `:''}Planned: ${esc(e.sets||1)} ${cardioExercise(e)?'rounds':'sets'} · ${metricFields(e).filter(([k])=>e[k]!==undefined&&e[k]!=='').map(([k,l])=>`${l}: ${esc(e[k])}`).join(' · ')}</p>${Array.from({length:Math.max(1,Math.min(30,numberOfSets(e.sets)))},(_,si)=>`<div class="set-record"><strong>${cardioExercise(e)?'Round':'Set'} ${si+1}</strong><div class="grid">${metricFields(e).map(([k,label])=>`<label>${label}<input data-actual="${j}:${si}:${k}" value="${esc(k==='reps'?'':e[k]??'')}"></label>`).join('')}<label>Notes<input data-actual="${j}:${si}:notes"></label></div></div>`).join('')}</div>`).join('')}
function viewRecords(){return `<h2>Training Record</h2><div class="panel">${clientPick()}</div>${db.records.filter(r=>!clientId||r.clientId===clientId).slice().reverse().map(r=>`<div class="panel"><b>${esc(r.name)}</b> · ${esc(r.date)} · ${esc(r.day)}<details><summary>Session details</summary>${r.items.map(x=>`<div class="entry"><b>${esc(x.name)}</b>${(x.sets||[x]).map((set,i)=>`<p>Set / round ${i+1}: ${Object.entries(set).filter(([k,v])=>v).map(([k,v])=>`${esc(k)}: ${esc(v)}`).join(' · ')}</p>`).join('')}</div>`).join('')}</details></div>`).join('')||'<p>No recorded workouts yet.</p>'}`}
function viewTemplates(){return `<h2>Templates</h2><p class="muted">Templates contain workout days and exercises, without client health data.</p><div class="panel"><button data-action="saveTemplate" class="primary" ${!clientId?'disabled':''}>Save current draft as template</button>${db.templates.map(t=>`<div class="entry"><b>${esc(t.name)}</b> · ${t.days.length} days <button data-action="applyTemplate" data-id="${t.id}">Use for selected client</button><button data-action="deleteTemplate" data-id="${t.id}" class="danger">Delete</button></div>`).join('')||'<p>No templates yet.</p>'}</div>`}
const calculatorInput=(id,label,val='')=>`<label>${esc(label)}<input id="${id}" type="number" inputmode="decimal" value="${esc(val)}"></label>`;
const calcNumber=id=>Number($(id)?.value);
let lastCalcResult=null;
function calculatorSaveOption(title,summary){
 lastCalcResult={title,summary};
 const plans=db.programmes.filter(p=>p.clientId===clientId);
 const el=$('calcGeneralProgramme');
 if(el)el.innerHTML=`<p><b>Latest calculation:</b> ${esc(title)} — ${esc(summary)}</p><label>Programme<select id="calcGeneralTarget">${opt(plans.map(p=>({id:p.id,name:dateLabel(p)})),'','Choose approved programme')}</select></label><button data-action="calcAttachResult" ${plans.length?'':'disabled'}>Add result to programme notes</button>`;
}

const fmt=x=>Number.isFinite(x)?Math.round(x*10)/10:'—';
const hrBands=[['Zone 1 · Recovery',.50,.60],['Zone 2 · Easy aerobic',.60,.70],['Zone 3 · Moderate',.70,.80],['Zone 4 · Hard',.80,.90],['Zone 5 · Very hard',.90,1]];
function calcZoneData(){
 const age=calcNumber('calcAge'),rest=calcNumber('calcRest'),measured=calcNumber('calcMax'),method=$('calcHRMethod')?.value||'reserve';
 if(!(age>=18&&age<=100))return {error:'Enter a valid adult age (18–100).'};
 const max=measured>0?measured:208-.7*age;
 if(!(max>80&&max<240))return {error:'Check the maximum heart-rate value.'};
 if(method==='reserve'&&!(rest>=30&&rest<max))return {error:'Enter a resting heart rate below maximum heart rate for Karvonen.'};
 return {max,method,zones:hrBands.map(([name,low,high])=>({name,low:Math.round(method==='reserve'?rest+(max-rest)*low:max*low),high:Math.round(method==='reserve'?rest+(max-rest)*high:max*high)}))};
}
function calculatorCard(title,inputs,action,id,help){return `<section class="panel"><h3>${title}</h3>${inputs}<button data-action="${action}" class="primary">Calculate</button><div id="${id}" class="calc-results" aria-live="polite"></div><p class="tiny muted">${help}</p></section>`}
function viewCalculators(){
 const c=client()||{};
 return `<h2>Fitness Calculators</h2><div class="panel"><div class="row">${clientPick()}<button data-action="calcLoadClient">Load client measurements</button></div><p class="tiny muted">Client details prefill calculators. You can edit every value manually without changing the client's profile.</p></div><div class="grid">
 ${calculatorCard('Heart-rate training zones',`${calculatorInput('calcAge','Age (years)',c.age||'')}${calculatorInput('calcRest','Resting HR (bpm)',c.restingHR||'')}${calculatorInput('calcMax','Measured maximum HR (optional)',c.measuredMaxHR||'')}<label>Method<select id="calcHRMethod"><option value="reserve">Karvonen / heart-rate reserve</option><option value="max">Percentage of maximum HR</option></select></label>`,'calcHR','calcHROut','Estimated max HR uses 208 − 0.7 × age unless measured. Approximate zones, not medical limits.')}
 ${calculatorCard('Basal metabolic rate (BMR)',`${calculatorInput('bmrAge','Age',c.age||'')}${calculatorInput('bmrHeight','Height (cm)',c.height||'')}${calculatorInput('bmrWeight','Weight (kg)',c.bodyWeight||'')}<label>Equation<select id="bmrSex"><option value="">Choose</option><option value="male" ${String(c.bmrSex||'').toLowerCase()==='male'?'selected':''}>Male</option><option value="female" ${String(c.bmrSex||'').toLowerCase()==='female'?'selected':''}>Female</option></select></label><label>Activity<select id="bmrActivity"><option value="1.2">Sedentary</option><option value="1.375">Lightly active</option><option value="1.55">Moderately active</option><option value="1.725">Very active</option><option value="1.9">Extremely active</option></select></label>`,'calcBMR','calcBMROut','Mifflin–St Jeor estimate; maintenance needs vary considerably.')}
 ${calculatorCard('BMI (adults)',`${calculatorInput('calcHeight','Height (cm)',c.height||'')}${calculatorInput('calcMass','Weight (kg)',c.bodyWeight||'')}`,'calcBMI','calcBMIOut','BMI is a limited adult screening metric, not a measure of body composition.')}
 ${calculatorCard('Estimated one-rep max',`${calculatorInput('calcWeight','Weight lifted (kg)','30')}${calculatorInput('calcReps','Repetitions','8')}`,'calc1RM','calc1RMOut','Epley equation; most useful at lower repetitions.')}
 ${calculatorCard('Training load',`${calculatorInput('load1RM','Estimated 1RM (kg)','')}${calculatorInput('loadPercent','Percentage (%)','70')}`,'calcLoad','calcLoadOut','Adjust to technique, experience and individual ability.')}
 ${calculatorCard('Waist-to-height ratio',`${calculatorInput('ratioWaist','Waist (cm)','')}${calculatorInput('ratioHeight','Height (cm)',c.height||'')}`,'calcRatio','calcRatioOut','Population screening measure, not a diagnosis.')}
 ${calculatorCard('Pace and speed',`${calculatorInput('paceDistance','Distance (km)','5')}${calculatorInput('paceMinutes','Time (minutes)','30')}`,'calcPace','calcPaceOut','For treadmill, walking and running plans.')}
 </div><section class="panel"><h3>Apply heart-rate zones to a programme</h3><p class="muted">Calculate zones first, then choose a zone and an approved programme. Only the selected training zone is added.</p><div id="calcProgrammeControls"></div></section><section class="panel"><h3>Save calculator result to a programme</h3><p class="muted">After calculating, you can optionally attach a summary to a chosen approved programme.</p><div id="calcGeneralProgramme"></div></section>`;
}
function calcZoneHtml(data){return `<p><b>Estimated maximum:</b> ${fmt(data.max)} bpm · ${data.method==='reserve'?'Heart-rate reserve':'Percentage of maximum'}</p><table><thead><tr><th>Zone</th><th>Heart rate</th></tr></thead><tbody>${data.zones.map(z=>`<tr><td>${esc(z.name)}</td><td>${z.low}–${z.high} bpm</td></tr>`).join('')}</tbody></table>`}
function calcProgrammePicker(data){const plans=db.programmes.filter(p=>p.clientId===clientId);return `<label>Zone<select id="calcTargetZone">${data.zones.map((z,i)=>`<option value="${i}">${esc(z.name)} · ${z.low}–${z.high} bpm</option>`).join('')}</select></label><label>Approved programme<select id="calcTargetProgramme">${opt(plans.map(p=>({id:p.id,name:dateLabel(p)})),'','Select programme')}</select></label><button data-action="calcAddZone" ${plans.length?'':'disabled'}>Add zone to programme</button>`}

function viewChallenges(){return `<h2>Challenges</h2><div class="panel"><div class="row">${clientPick()}<button class="primary" data-action="addChallenge" ${!clientId?'disabled':''}>+ Add challenge</button></div>${db.challenges.filter(x=>x.clientId===clientId).map(x=>`<div class="entry"><b>${esc(x.name)}</b> · Target: ${esc(x.target)} · Current: ${esc(x.current)} <button data-action="updateChallenge" data-id="${x.id}">Update</button></div>`).join('')||'<p>No challenges for this client.</p>'}</div>`}
function viewMini(){const c=db.clients.find(x=>x.id===miniClient);const ps=db.programmes.filter(p=>p.clientId===miniClient);return `<h2>Client Mini-App</h2><p class="muted">Only the named, dated programmes you tick are exported. No questionnaire, health records or autosave history.</p><div class="panel"><label>Client</label><select id="miniClient">${opt(db.clients,miniClient,'Select client')}</select>${c?`<h3>Approved programmes</h3>${ps.map(p=>`<label class="entry"><input class="miniCheck" type="checkbox" value="${p.id}" ${miniSelected.has(p.id)?'checked':''}> ${esc(p.name)} · ${esc(p.date)} · ${p.days.length} days</label>`).join('')||'<p>No approved programmes yet. Save one in Programme Creator.</p>'}<button data-action="exportMini" class="primary">Export selected mini-app HTML</button>`:''}</div>`}
function viewData(){return `<h2>Data & Backup</h2><div class="panel"><p class="warn">Keep a backup of your old app separately. This rebuild uses a different storage database and does not automatically import old records.</p><p>${db.clients.length} clients · ${db.exercises.length} exercises · ${db.programmes.length} approved programmes · ${db.records.length} training records</p><div class="row"><button class="primary" data-action="backup">Download full backup (JSON)</button><button data-action="restore">Restore rebuild backup</button><input id="restoreFile" type="file" accept=".json" class="hidden"></div><p class="tiny muted">Backups may contain sensitive personal and health information. Store securely and share only with appropriate authorisation.</p></div>`}
function promptText(label,initial=''){const x=prompt(label,initial);return x===null?null:x.trim()}
function draftAuto(){if(!clientId)return;const d=ensureDraft();const a=db.autosaves[clientId] ||= [];a.push({time:new Date().toLocaleString(),days:clone(d.days)});if(a.length>40)a.splice(0,a.length-40)}
function changeDraft(fn){if(!clientId)return;draftAuto();fn(ensureDraft());save();render()}
function createApproved(){if(!clientId)return alert('Select a client first.');const name=promptText('Approved programme name:','Training programme');if(!name)return;const date=promptText('Programme date (YYYY-MM-DD):',today());if(!date)return;if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(date)))return alert('Enter a valid date.');const d=ensureDraft();if(!d.days.some(day=>day.exercises.length))return alert('Add at least one exercise before approving.');const p={id:uid(),clientId,name,date,structure:d.structure,exerciseCount:d.exerciseCount,duration:d.duration,defaultSets:d.defaultSets,defaultReps:d.defaultReps,defaultRest:d.defaultRest,includeCardio:d.includeCardio,cardioMethod:d.cardioMethod,days:clone(d.days)};db.programmes.push(p);delete d.editingProgrammeId;programmeId=p.id;save();alert('Approved programme saved. It is now available in Edit & Print, Workout Mode and Mini-App.');render()}
function download(content,name,mime){const url=URL.createObjectURL(new Blob([content],{type:mime}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)}
function exportMini(){const selected=[...document.querySelectorAll('.miniCheck:checked')].map(e=>e.value);const c=db.clients.find(x=>x.id===miniClient),programmes=db.programmes.filter(p=>p.clientId===miniClient&&selected.includes(p.id));if(!c||!programmes.length)return alert('Tick at least one approved programme.');const clean=programmes.map(p=>({id:p.id,name:p.name,date:p.date,trainingTargets:p.trainingTargets||[],calculatorNotes:p.calculatorNotes||[],days:p.days.map(d=>({name:d.name,style:d.style,exercises:d.exercises.map(x=>({name:x.name,type:x.type,muscle:x.muscle,cardioMethod:x.cardioMethod,sets:x.sets,reps:x.reps,rest:x.rest,weight:x.weight,duration:x.duration,distance:x.distance,speed:x.speed,incline:x.incline,level:x.level,heartRate:x.heartRate,url:x.url,description:x.description}))}))}));const data={packageId:uid(),clientName:c.name,programmes:clean};const payload=JSON.stringify(data).replace(/</g,'\\u003c');const template=new TextDecoder().decode(Uint8Array.from(atob('PCFkb2N0eXBlIGh0bWw+PGh0bWwgbGFuZz0iZW4iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9InV0Zi04Ij48bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLGluaXRpYWwtc2NhbGU9MSI+PHRpdGxlPkNsaWVudCBUcmFpbmluZyBQcm9ncmFtbWU8L3RpdGxlPjxzdHlsZT5ib2R5e2ZvbnQ6MTZweCBzeXN0ZW0tdWk7YmFja2dyb3VuZDojZjJmNWY5O2NvbG9yOiMxYTJiNDI7bWFyZ2luOjA7cGFkZGluZzoxNnB4O21heC13aWR0aDo5MDBweH1oZWFkZXJ7YmFja2dyb3VuZDojMTAyYjRiO2NvbG9yOndoaXRlO2JvcmRlci1yYWRpdXM6MTRweDtwYWRkaW5nOjE4cHh9aDF7Zm9udC1zaXplOjEuNHJlbX1zZWN0aW9ue2JhY2tncm91bmQ6d2hpdGU7Ym9yZGVyOjFweCBzb2xpZCAjZDhlMWViO3BhZGRpbmc6MTZweDttYXJnaW46MTJweCAwO2JvcmRlci1yYWRpdXM6MTJweH1zZWxlY3QsaW5wdXQsYnV0dG9ue2ZvbnQ6aW5oZXJpdDtwYWRkaW5nOjEwcHg7Ym9yZGVyLXJhZGl1czo4cHg7Ym9yZGVyOjFweCBzb2xpZCAjYWViZmQwfXNlbGVjdCxpbnB1dHt3aWR0aDoxMDAlO2JveC1zaXppbmc6Ym9yZGVyLWJveH1idXR0b257YmFja2dyb3VuZDojMTQ1ZmFlO2NvbG9yOndoaXRlO2JvcmRlcjowO21hcmdpbjo4cHggMH1sYWJlbHtkaXNwbGF5OmJsb2NrO21hcmdpbjo4cHggMH0uZ3JpZHtkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOnJlcGVhdChhdXRvLWZpdCxtaW5tYXgoMTMwcHgsMWZyKSk7Z2FwOjEwcHh9LnNldHtiYWNrZ3JvdW5kOiNmMWY2ZmM7Ym9yZGVyLXJhZGl1czo5cHg7cGFkZGluZzoxMnB4O21hcmdpbjo5cHggMH1he2NvbG9yOiMxMjVkYTh9Lm11dGVke2NvbG9yOiM1OTZiN2V9PC9zdHlsZT48L2hlYWQ+PGJvZHk+PGhlYWRlcj48aDE+VHJhaW5pbmcgZm9yIDxzcGFuIGlkPSJjbGllbnQiPjwvc3Bhbj48L2gxPjxwPlNlbGVjdCBhIHByb2dyYW1tZSBhbmQgcmVjb3JkIGVhY2ggc2V0IG9yIGNhcmRpbyByb3VuZC48L3A+PC9oZWFkZXI+PHNlY3Rpb24+PGxhYmVsPlByb2dyYW1tZTxzZWxlY3QgaWQ9InAiPjwvc2VsZWN0PjwvbGFiZWw+PGxhYmVsPldvcmtvdXQgZGF5PHNlbGVjdCBpZD0iZCI+PC9zZWxlY3Q+PC9sYWJlbD48L3NlY3Rpb24+PGRpdiBpZD0ibGlzdCI+PC9kaXY+PGJ1dHRvbiBpZD0ic2F2ZSI+U2F2ZSB3b3Jrb3V0IHJlY29yZDwvYnV0dG9uPjxzZWN0aW9uPjxoMz5TYXZlZCB3b3Jrb3V0cyBvbiB0aGlzIGRldmljZTwvaDM+PGRpdiBpZD0icmVjb3JkcyI+PC9kaXY+PGJ1dHRvbiBpZD0iZXhwb3J0Ij5FeHBvcnQgd29ya291dCByZWNvcmRzIChKU09OKTwvYnV0dG9uPjwvc2VjdGlvbj48c2NyaXB0IGlkPSJwYXlsb2FkIiB0eXBlPSJhcHBsaWNhdGlvbi9qc29uIj5fX1BBWUxPQURfXzwvc2NyaXB0PjxzY3JpcHQ+CmNvbnN0IGRhdGE9SlNPTi5wYXJzZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGF5bG9hZCcpLnRleHRDb250ZW50KSwkPXg9PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHgpLGVzYz1zPT5TdHJpbmcocz8/JycpLnJlcGxhY2UoL1smPD4iJ10vZyxjPT4oeycmJzonJmFtcDsnLCc8JzonJmx0OycsJz4nOicmZ3Q7JywnIic6JyZxdW90OycsIiciOicmIzM5Oyd9W2NdKSk7CmNvbnN0IGNhcmRpbz1lPT5lLnR5cGU9PT0nQ2FyZGlvJ3x8ZS5tdXNjbGU9PT0nQ2FyZGlvJ3x8L3RyZWFkbWlsbHxiaWtlfHJvd2luZ3xjcm9zcyB0cmFpbmVyfHN0YWlyIGNsaW1iZXIvaS50ZXN0KGUubmFtZSk7CmNvbnN0IGZpZWxkcz1lPT5jYXJkaW8oZSk/W1snZHVyYXRpb24nLCdEdXJhdGlvbiAobWluKSddLFsnZGlzdGFuY2UnLCdEaXN0YW5jZSAoa20pJ10sWydzcGVlZCcsJ1NwZWVkIChrbS9oKSddLFsnaW5jbGluZScsJ0luY2xpbmUgKCUpJ10sWydsZXZlbCcsJ0xldmVsIC8gcmVzaXN0YW5jZSddLFsnaGVhcnRSYXRlJywnSGVhcnQgcmF0ZSAoYnBtKSddXTpbWydyZXBzJywnUmVwcyAvIHRpbWUnXSxbJ3dlaWdodCcsJ1dlaWdodCAoa2cpJ11dOwpjb25zdCBudW1iZXJPZlNldHM9dj0+TWF0aC5tYXgoMSxNYXRoLm1pbigzMCxOdW1iZXIoU3RyaW5nKHY/PycxJykubWF0Y2goL1xkKy9nKT8uYXQoLTEpfHwxKSkpOwpjb25zdCBzdG9yZUtleT0nZml0bmVzcy1taW5pLXYyLScrZGF0YS5wYWNrYWdlSWQ7CmZ1bmN0aW9uIGdldFJlY29yZHMoKXt0cnl7cmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmVLZXkpfHwnW10nKX1jYXRjaHtyZXR1cm4gW119fQokKCdjbGllbnQnKS50ZXh0Q29udGVudD1kYXRhLmNsaWVudE5hbWU7CiQoJ3AnKS5pbm5lckhUTUw9ZGF0YS5wcm9ncmFtbWVzLm1hcCgocCxpKT0+JzxvcHRpb24gdmFsdWU9IicraSsnIj4nK2VzYyhwLm5hbWUpKycg4oCUICcrZXNjKHAuZGF0ZSkrJzwvb3B0aW9uPicpLmpvaW4oJycpOwpmdW5jdGlvbiBkYXlzKCl7JCgnZCcpLmlubmVySFRNTD1kYXRhLnByb2dyYW1tZXNbKyQoJ3AnKS52YWx1ZV0uZGF5cy5tYXAoKGQsaSk9Pic8b3B0aW9uIHZhbHVlPSInK2krJyI+Jytlc2MoZC5uYW1lKSsnPC9vcHRpb24+Jykuam9pbignJyk7cmVuZGVyKCl9CmZ1bmN0aW9uIHJlbmRlcigpe2NvbnN0IHA9ZGF0YS5wcm9ncmFtbWVzWyskKCdwJykudmFsdWVdLGQ9cC5kYXlzWyskKCdkJykudmFsdWVdOyQoJ2xpc3QnKS5pbm5lckhUTUw9JzxoMj4nK2VzYyhwLm5hbWUpKycgwrcgJytlc2MocC5kYXRlKSsnPC9oMj48cD5EYXkgc3R5bGU6ICcrZXNjKGQuc3R5bGV8fCdNaXhlZCcpKyc8L3A+JytkLmV4ZXJjaXNlcy5tYXAoKGUsaSk9Pic8c2VjdGlvbj48aDM+Jytlc2MoZS5uYW1lKSsnPC9oMz4nKyhlLnVybD8nPGEgdGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIgbm9yZWZlcnJlciIgaHJlZj0iJytlc2MoZS51cmwpKyciPuKWtiBFeGVyY2lzZSBkZW1vbnN0cmF0aW9uPC9hPic6JzxwIGNsYXNzPSJtdXRlZCI+PGEgdGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIgbm9yZWZlcnJlciIgaHJlZj0iaHR0cHM6Ly93d3cueW91dHViZS5jb20vcmVzdWx0cz9zZWFyY2hfcXVlcnk9JytlbmNvZGVVUklDb21wb25lbnQoZS5uYW1lKycgZXhlcmNpc2UgZGVtb25zdHJhdGlvbiB0ZWNobmlxdWUnKSsnIj5GaW5kIGV4ZXJjaXNlIGRlbW9uc3RyYXRpb248L2E+PC9wPicpKyhlLmRlc2NyaXB0aW9uPyc8ZGV0YWlscz48c3VtbWFyeT5UZWNobmlxdWUgZXhwbGFuYXRpb248L3N1bW1hcnk+PHA+Jytlc2MoZS5kZXNjcmlwdGlvbikrJzwvcD48L2RldGFpbHM+JzonJykrJzxwIGNsYXNzPSJtdXRlZCI+JysoZS5jYXJkaW9NZXRob2Q/J01ldGhvZDogJytlc2MoZS5jYXJkaW9NZXRob2QpKycgwrcgJzonJykrJ1BsYW5uZWQ6ICcrZXNjKGUuc2V0c3x8MSkrJyAnKyhjYXJkaW8oZSk/J3JvdW5kcyc6J3NldHMnKSsnIMK3ICcrZmllbGRzKGUpLmZpbHRlcigoW2tdKT0+ZVtrXSE9PXVuZGVmaW5lZCYmZVtrXSE9PScnKS5tYXAoKFtrLGxdKT0+ZXNjKGwpKyc6ICcrZXNjKGVba10pKS5qb2luKCcgwrcgJykrJzwvcD4nK0FycmF5LmZyb20oe2xlbmd0aDpNYXRoLm1heCgxLE1hdGgubWluKDMwLG51bWJlck9mU2V0cyhlLnNldHMpKSl9LChfLHNpKT0+JzxkaXYgY2xhc3M9InNldCI+PGI+JysoY2FyZGlvKGUpPydSb3VuZCAnOidTZXQgJykrKHNpKzEpKyc8L2I+PGRpdiBjbGFzcz0iZ3JpZCI+JytmaWVsZHMoZSkubWFwKChbayxsYWJlbF0pPT4nPGxhYmVsPicrZXNjKGxhYmVsKSsnPGlucHV0IGRhdGEtaT0iJytpKyciIGRhdGEtcz0iJytzaSsnIiBkYXRhLWY9IicraysnIiB2YWx1ZT0iJytlc2Moaz09PSdyZXBzJz8nJzplW2tdfHwnJykrJyI+PC9sYWJlbD4nKS5qb2luKCcnKSsnPGxhYmVsPk5vdGVzPGlucHV0IGRhdGEtaT0iJytpKyciIGRhdGEtcz0iJytzaSsnIiBkYXRhLWY9Im5vdGVzIj48L2xhYmVsPjwvZGl2PjwvZGl2PicpLmpvaW4oJycpKyc8L3NlY3Rpb24+Jykuam9pbignJyl9CmZ1bmN0aW9uIHJlY29yZHMoKXtjb25zdCBycz1nZXRSZWNvcmRzKCk7JCgncmVjb3JkcycpLmlubmVySFRNTD1ycy5zbGljZSgtMjApLnJldmVyc2UoKS5tYXAocj0+JzxwPicrZXNjKHIuZGF0ZSkrJyDCtyAnK2VzYyhyLnByb2dyYW1tZSkrJyDCtyAnK2VzYyhyLmRheSkrJzwvcD4nKS5qb2luKCcnKXx8JzxwPk5vIHdvcmtvdXRzIHJlY29yZGVkIHlldC48L3A+J30KJCgncCcpLm9uY2hhbmdlPWRheXM7JCgnZCcpLm9uY2hhbmdlPXJlbmRlcjsKJCgnc2F2ZScpLm9uY2xpY2s9KCk9Pntjb25zdCBwPWRhdGEucHJvZ3JhbW1lc1srJCgncCcpLnZhbHVlXSxkPXAuZGF5c1srJCgnZCcpLnZhbHVlXSxpdGVtcz1kLmV4ZXJjaXNlcy5tYXAoKGUsaSk9Pih7bmFtZTplLm5hbWUsc2V0czpBcnJheS5mcm9tKHtsZW5ndGg6TWF0aC5tYXgoMSxNYXRoLm1pbigzMCxudW1iZXJPZlNldHMoZS5zZXRzKSkpfSwoXyxzaSk9Pk9iamVjdC5mcm9tRW50cmllcyhbLi4uZmllbGRzKGUpLm1hcCgoW2tdKT0+ayksJ25vdGVzJ10ubWFwKGs9PltrLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWk9IicraSsnIl1bZGF0YS1zPSInK3NpKyciXVtkYXRhLWY9IicraysnIl0nKT8udmFsdWV8fCcnXSkpKX0pKTtjb25zdCBycz1nZXRSZWNvcmRzKCk7cnMucHVzaCh7ZGF0ZTpuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkscHJvZ3JhbW1lOnAubmFtZSxwcm9ncmFtbWVJZDpwLmlkLGRheTpkLm5hbWUsaXRlbXN9KTt0cnl7bG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmVLZXksSlNPTi5zdHJpbmdpZnkocnMpKTthbGVydCgnV29ya291dCBzYXZlZCBvbiB0aGlzIGRldmljZScpO3JlY29yZHMoKX1jYXRjaChlKXthbGVydCgnQ291bGQgbm90IHNhdmU6ICcrZS5tZXNzYWdlKX19OwokKCdleHBvcnQnKS5vbmNsaWNrPSgpPT57Y29uc3QgYmxvYj1uZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoe2NsaWVudE5hbWU6ZGF0YS5jbGllbnROYW1lLHJlY29yZHM6Z2V0UmVjb3JkcygpfSxudWxsLDIpXSx7dHlwZTonYXBwbGljYXRpb24vanNvbid9KSx1cmw9VVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSxhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTthLmhyZWY9dXJsO2EuZG93bmxvYWQ9J3dvcmtvdXQtcmVjb3Jkcy5qc29uJzthLmNsaWNrKCk7c2V0VGltZW91dCgoKT0+VVJMLnJldm9rZU9iamVjdFVSTCh1cmwpLDEwMDApfTsKZGF5cygpO3JlY29yZHMoKTsKPC9zY3JpcHQ+PC9ib2R5PjwvaHRtbD4='),c=>c.charCodeAt(0)));download(template.replace('__PAYLOAD__',payload),'Client_Programme_'+c.name.replace(/[^a-z0-9_-]/gi,'_')+'.html','text/html')}
document.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.tab){tab=b.dataset.tab;render();if(tab==='Workout Mode')renderWorkoutItems();return}const a=b.dataset.action,id=b.dataset.id,i=Number(b.dataset.index),c=client(),d=ensureDraft();try{switch(a){
case'newClient':{const name=promptText('Client name:');if(!name)return;const x={id:uid(),name,email:'',age:'',experience:'',goals:'',conditions:['Not disclosed'],otherConditions:'',medication:'',limitations:'',sleep:'',stress:'',activity:'',days:'',preferences:''};db.clients.push(x);clientId=x.id;break}
case'deleteClient':if(c&&confirm('Delete this client and associated records? Export a backup first.')){db.clients=db.clients.filter(x=>x.id!==c.id);clientId='';}break;
case'saveClient':if(!c)return;for(const [key,field] of [['name','Name'],['email','Email'],['age','Age'],['experience','Experience'],['goals','Goals'],['height','Height (cm)'],['bodyWeight','Body weight (kg)'],['restingHR','Resting heart rate (bpm)'],['measuredMaxHR','Measured maximum heart rate (bpm)'],['bmrSex','BMR equation (male / female)']])c[key]=document.querySelector(`[data-field="${field}"]`)?.value||'';break;
case'saveHealth':if(!c)return;{const fields={otherConditions:'Other condition details',medication:'Medication / considerations',limitations:'Injuries / limitations',sleep:'Sleep hours (typical)',stress:'Stress level (low / medium / high)',activity:'Occupation / daily activity',days:'Days available each week',preferences:'Preferred exercise'};for(const [k,v] of Object.entries(fields))c[k]=document.querySelector(`[data-field="${v}"]`)?.value||'';c.conditions=[...document.querySelectorAll('.condition:checked')].map(x=>x.value)}break;
case'newDraft':if(!clientId)return;if(d?.days?.some(day=>day.exercises.length)){if(!confirm('Start a new draft? The current working draft will be archived.'))return;draftAuto()}db.drafts[clientId]={structure:'Full Body',days:[{name:'Day 1',style:'Full Body',exercises:[]}]};programmeId='';tab='Programme Creator';break;
case'loadApproved':if(!current())return alert('Select an approved programme in Edit & Print first.');db.drafts[clientId]={structure:current().structure||'Custom',days:clone(current().days),editingProgrammeId:current().id};programmeId='';tab='Programme Creator';break;
case'creatorLoad':{
 if(!clientId)return alert('Select a client first.');
 const saved=db.programmes.find(p=>p.id===$('creatorSavedProgramme')?.value&&p.clientId===clientId);
 if(!saved)return alert('Choose a saved programme.');
 if(d?.days?.some(day=>day.exercises.length)&&!confirm('Load this saved programme into the editor? Your current draft will be archived.'))return;
 draftAuto();
 db.drafts[clientId]={structure:saved.structure||'Custom',days:clone(saved.days),editingProgrammeId:saved.id,
 exerciseCount:saved.exerciseCount||6,duration:saved.duration||45,defaultSets:saved.defaultSets||'3',defaultReps:saved.defaultReps||'8–12',defaultRest:saved.defaultRest??60,includeCardio:saved.includeCardio??true,cardioMethod:saved.cardioMethod||'Steady State'};
 programmeId='';editDay=0;break;
}
case'creatorSmartGenerate':{
 if(!clientId)return alert('Select a client first.');
 const opts=creatorOptions();
 if(d?.days?.some(day=>day.exercises.length)&&!confirm('Replace this working draft with a new intelligently generated draft? Saved programmes are not changed.'))return;
 draftAuto();db.drafts[clientId]=buildIntelligentDraft(opts);programmeId='';editDay=0;break;
}
case'dedupeEquipment':{
 if(!confirm('Merge equivalent equipment labels? Quantities will use the highest existing quantity rather than adding duplicates. Exercise links will be preserved.'))return;
 const count=dedupeEquipment();alert(`Equipment cleanup complete. ${count} duplicate entries merged.`);break;
}
case'creatorGenerate':{
 if(!clientId)return alert('Select a client first.');
 const opts=creatorOptions();
 if(d?.days?.some(day=>day.exercises.length)&&!confirm('Replace the current draft with a newly generated programme? Saved programmes will remain unchanged.'))return;
 draftAuto();db.drafts[clientId]=createProgrammeDraft(opts);programmeId='';editDay=0;break;
}
case'creatorApplyDay':{
 if(!clientId)return;
 const day=ensureDraft().days[i];if(!day)return;
 const style=document.querySelector(`[data-daystyle="${i}"]`)?.value||day.style;
 const name=document.querySelector(`[data-dayname="${i}"]`)?.value||day.name;
 if(day.exercises.length&&!confirm(`Replace the exercises on ${name} with a new ${style} workout? Other days will not change.`))return;
 draftAuto();
 const draft=ensureDraft(),opts={...draft,count:draft.exerciseCount||6,sets:draft.defaultSets||'3',reps:draft.defaultReps||'8–12',rest:draft.defaultRest??60,duration:draft.duration||45,includeCardio:draft.includeCardio??true,cardioMethod:draft.cardioMethod||'Steady State'};
 const used=new Set(draft.days.flatMap((x,j)=>j===i?[]:x.exercises.map(e=>e.id)));
 day.name=name;day.style=style;day.exercises=makeDayExercises(style,draft.structure||'Full Body',opts,used);editDay=i;break;
}
case'creatorSaveChanges':{
 if(!clientId)return;
 const draft=ensureDraft(),original=db.programmes.find(p=>p.id===draft.editingProgrammeId&&p.clientId===clientId);
 if(!original)return alert('No previously loaded programme to update.');
 if(!confirm(`Save your edits to "${original.name}"? This updates the approved programme used for printouts and mini-app exports.`))return;
 original.days=clone(draft.days);original.structure=draft.structure;
 for(const key of ['exerciseCount','duration','defaultSets','defaultReps','defaultRest','includeCardio','cardioMethod'])original[key]=draft[key];
 original.updatedAt=new Date().toISOString();programmeId=original.id;tab='Edit & Print';
 alert('Saved changes to the selected programme.');break;
}
case'applyStructure':{
 if(!clientId)return;const style=$('programmeStructure').value,n=Math.max(1,Math.min(7,Number($('programmeDays').value)||2));
 if(d?.days?.some(day=>day.exercises.length)&&!confirm('Replace the current draft? Saved programmes remain unchanged.'))return;draftAuto();db.drafts[clientId]=createProgrammeDraft({...creatorOptions(),structure:style,days:n});programmeId='';editDay=0;break;
}
case'moveDayUp':changeDraft(x=>{if(i>0)[x.days[i-1],x.days[i]]=[x.days[i],x.days[i-1]];editDay=Math.max(0,i-1)});return;
case'moveDayDown':changeDraft(x=>{if(i<x.days.length-1)[x.days[i+1],x.days[i]]=[x.days[i],x.days[i+1]];editDay=Math.min(x.days.length-1,i+1)});return;
case'moveExerciseUp':case'moveExerciseDown':{const [di,xi]=b.dataset.index.split(':').map(Number),delta=a==='moveExerciseUp'?-1:1;changeDraft(x=>{const arr=x.days[di].exercises;if(xi+delta>=0&&xi+delta<arr.length)[arr[xi],arr[xi+delta]]=[arr[xi+delta],arr[xi]];editDay=di});return}
case'addDay':changeDraft(x=>x.days.push({name:'Day '+(x.days.length+1),exercises:[]}));return;
case'renameDay':changeDraft(x=>{x.days[i].name=document.querySelector(`[data-dayname="${i}"]`).value;x.days[i].style=document.querySelector(`[data-daystyle="${i}"]`).value;editDay=i});return;
case'removeDay':if(d.days.length<=1)return alert('Keep at least one day.');changeDraft(x=>x.days.splice(i,1));return;
case'addToDay':{const ex=db.exercises.find(x=>x.id===$('addToDay'+i)?.value);if(!ex)return alert('Select an exercise.');changeDraft(x=>{x.days[i].exercises.push({...clone(ex),sets:cardioExercise(ex)?1:3,reps:cardioExercise(ex)?'':'8–12',rest:cardioExercise(ex)?0:60,cardioMethod:cardioExercise(ex)?cardioMethods.find(m=>ex.name.includes(m))||'Steady State':''});editDay=i});return}
case'removeExercise':{const [di,xi]=b.dataset.index.split(':').map(Number);changeDraft(x=>x.days[di].exercises.splice(xi,1));return}
case'swapExercise':{const [di,xi]=b.dataset.index.split(':').map(Number);swapTarget={di,xi};const old=ensureDraft().days[di].exercises[xi];swapFilters={equipment:old.equipment||'',muscle:old.muscle||'',kind:'',search:''};showSwapPanel();return}
case'closeSwap':swapTarget=null;$('swapPanel')?.classList.add('hidden');return;
case'chooseSwap':{if(!swapTarget)return;const replacement=db.exercises.find(e=>e.id===id);if(!replacement)return;const {di,xi}=swapTarget;swapTarget=null;changeDraft(x=>{const old=x.days[di].exercises[xi];const carry={sets:old.sets,rest:old.rest};if(cardioExercise(old)===cardioExercise(replacement)){for(const k of ['reps','weight','duration','distance','speed','incline','level','heartRate','cardioMethod'])if(old[k]!==undefined)carry[k]=old[k]};x.days[di].exercises[xi]={...clone(replacement),...carry};editDay=di});return}
case'clearExerciseFilters':search='';eqFilter='';muscleFilter='';kindFilter='';render();return;
case'saveApproved':createApproved();return;
case'openProgramme':programmeId=id;clientId=c.id;tab='Edit & Print';break;
case'deleteProgramme':if(confirm('Delete approved copy?')){db.programmes=db.programmes.filter(x=>x.id!==id);if(programmeId===id)programmeId=''}break;
case'restoreAuto':if(!c)return;db.drafts[c.id]={days:clone(db.autosaves[c.id][i].days)};tab='Programme Creator';break;
case'editApproved':if(!current())return;db.drafts[clientId]={structure:current().structure||'Custom',days:clone(current().days),editingProgrammeId:current().id,defaultSets:current().defaultSets||'3',defaultReps:current().defaultReps||'8–12',defaultRest:current().defaultRest??60,duration:current().duration||45};tab='Programme Creator';break;
case'renameApproved':if(!current())return;{const n=promptText('Programme name:',current().name),date=promptText('Date (YYYY-MM-DD):',current().date);if(!n||!date)return;if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return alert('Invalid date');current().name=n;current().date=date}break;
case'print':window.print();return;
case'addEquipment':{const input=promptText('Equipment name:');if(!input)return;const name=canonicalEquipment(input);const existing=db.equipment.find(e=>canonicalEquipment(e.name).toLowerCase()===name.toLowerCase());if(existing){alert('This equipment already exists: '+existing.name+'. Edit its quantity instead.');return}db.equipment.push({id:uid(),name,quantity:1,hidden:false})}break;
case'editEquipment':{const x=db.equipment.find(e=>e.id===id);if(!x)return;const n=promptText('Equipment name:',x.name),q=promptText('Quantity:',x.quantity);if(n===null||q===null)return;x.name=canonicalEquipment(n);x.quantity=Math.max(0,Number(q)||0);dedupeEquipment()}break;
case'toggleEquipment':{const x=db.equipment.find(e=>e.id===id);x.hidden=!x.hidden}break;
case'addExercise':openExerciseEditor('');return;
case'editExercise':openExerciseEditor(id);return;
case'cancelInlineExercise':b.closest('.exercise-inline-editor').remove();return;
case'saveInlineExercise':{
 const box=b.closest('.exercise-inline-editor');
 const value=k=>box.querySelector(`[data-ex-field="${k}"]`)?.value.trim()||'';
 const fields=Object.fromEntries(['name','equipment','muscle','type','level','description','url'].map(k=>[k,value(k)]));
 if(!fields.name)return alert('Exercise name is required.');
 if(fields.url&&!/^https:\/\//i.test(fields.url))return alert('Use a secure https:// link.');
 const item=id?db.exercises.find(e=>e.id===id):null;
 if(item)Object.assign(item,fields);else db.exercises.push({id:uid(),...fields});
 break
}
case'duplicateExercise':{
 const original=db.exercises.find(e=>e.id===id);if(!original)return;
 db.exercises.push({...clone(original),id:uid(),name:original.name+' (custom)'});
 break
}
case'importLibrary':{
 const rows=await fetch('./expanded-library.json').then(r=>r.json());
 const count=addExpandedLibrary(rows);alert(count+' missing exercises restored. Existing exercises were not overwritten.');
 break
}
case'manageEquipment':document.querySelector('details.panel')?.setAttribute('open','');return;
case'showAllEquipment':db.equipment.forEach(e=>e.hidden=false);break;
case'deleteExercise':if(confirm('Delete exercise from database? Existing programmes retain their copies.'))db.exercises=db.exercises.filter(e=>e.id!==id);break;
case'recordWorkout':{const p=current(),di=Number($('workoutDay')?.value||0);if(!p)return;const day=p.days[di],items=day.exercises.map((x,j)=>({name:x.name,sets:Array.from({length:Math.max(1,Math.min(30,numberOfSets(x.sets)))},(_,si)=>Object.fromEntries([...metricFields(x).map(([k])=>k),'notes'].map(k=>[k,document.querySelector(`[data-actual="${j}:${si}:${k}"]`)?.value||''])))}));db.records.push({id:uid(),clientId,programmeId:p.id,name:p.name,date:today(),day:day.name,items});alert('Workout recorded, including each set / round.');break}
case'saveTemplate':{const n=promptText('Template name:');if(!n)return;db.templates.push({id:uid(),name:n,days:clone(d.days)})}break;
case'applyTemplate':if(!clientId)return alert('Select a client in Clients first.');{const t=db.templates.find(x=>x.id===id);if(!t)return;draftAuto();db.drafts[clientId]={days:clone(t.days)};tab='Programme Creator'}break;
case'deleteTemplate':db.templates=db.templates.filter(x=>x.id!==id);break;
case'addChallenge':{const name=promptText('Challenge name:'),target=promptText('Target:');if(name&&target)db.challenges.push({id:uid(),clientId,name,target,current:''})}break;
case'updateChallenge':{const x=db.challenges.find(x=>x.id===id);if(x){const val=promptText('Current result:',x.current);if(val!==null)x.current=val}}break;
case'calcLoadClient':renderView();return;
case'calcAttachResult':{
 const plan=db.programmes.find(p=>p.id===$('calcGeneralTarget')?.value&&p.clientId===clientId);
 if(!plan||!lastCalcResult)return alert('Calculate a result and select an approved programme.');
 if(!confirm(`Add ${lastCalcResult.title} to ${plan.name}?`))return;
 plan.calculatorNotes ||= [];
 plan.calculatorNotes.push({...lastCalcResult,date:today()});
 alert('Calculation added to programme notes.');break;
}
case'calcHR':{
 const result=calcZoneData();$('calcHROut').innerHTML=result.error?`<p>${esc(result.error)}</p>`:calcZoneHtml(result);
 $('calcProgrammeControls').innerHTML=result.error?'':calcProgrammePicker(result);if(!result.error)calculatorSaveOption('Heart-rate zones',result.zones.map(z=>`${z.name}: ${z.low}–${z.high} bpm`).join('; '));return;
}
case'calcAddZone':{
 const result=calcZoneData();if(result.error)return alert(result.error);
 const plan=db.programmes.find(p=>p.id===$('calcTargetProgramme')?.value&&p.clientId===clientId);
 if(!plan)return alert('Choose an approved programme.');
 const z=result.zones[Number($('calcTargetZone')?.value||0)];
 if(!z||!confirm(`Add ${z.name} (${z.low}–${z.high} bpm) to ${plan.name}?`))return;
 plan.trainingTargets ||= [];
 plan.trainingTargets.push({type:'heartRateZone',name:z.name,low:z.low,high:z.high,method:result.method,estimatedMax:Math.round(result.max)});
 alert('Training zone added. Export a new client mini-app copy to include the update.');break;
}
case'calcBMR':{
 const a=calcNumber('bmrAge'),h=calcNumber('bmrHeight'),w=calcNumber('bmrWeight'),sex=$('bmrSex').value,mult=calcNumber('bmrActivity');
 if(!(a>=18&&a<=100&&h>90&&h<250&&w>20&&w<500&&['male','female'].includes(sex))){$('calcBMROut').textContent='Enter valid adult age, height, weight and equation option.';return}
 const bmr=10*w+6.25*h-5*a+(sex==='male'?5:-161);
 $('calcBMROut').innerHTML=`<p><b>Estimated BMR:</b> ${Math.round(bmr)} kcal/day</p><p><b>Estimated maintenance:</b> ${Math.round(bmr*mult)} kcal/day</p>`;calculatorSaveOption('BMR and estimated maintenance',`${Math.round(bmr)} kcal/day BMR; ${Math.round(bmr*mult)} kcal/day maintenance`);return;
}
case'calcBMI':{
 const h=calcNumber('calcHeight')/100,w=calcNumber('calcMass');
 $('calcBMIOut').textContent=h>0&&w>0?`BMI: ${fmt(w/(h*h))} kg/m²` :'Enter valid height and weight.';if(h>0&&w>0)calculatorSaveOption('BMI',`${fmt(w/(h*h))} kg/m²`);return;
}
case'calc1RM':{
 const w=calcNumber('calcWeight'),r=calcNumber('calcReps');
 if(!(w>0&&r>=1&&r<=30)){$('calc1RMOut').textContent='Enter valid weight and 1–30 reps.';return}
 const max=w*(1+r/30);$('calc1RMOut').innerHTML=`<p><b>Estimated 1RM:</b> ${fmt(max)} kg</p><table><tr><th>Intensity</th><th>Load</th></tr>${[50,60,65,70,75,80,85,90,95].map(x=>`<tr><td>${x}%</td><td>${fmt(max*x/100)} kg</td></tr>`).join('')}</table>`;
 if($('load1RM'))$('load1RM').value=fmt(max);calculatorSaveOption('Estimated 1RM',`${fmt(max)} kg`);return;
}
case'calcLoad':{
 const max=calcNumber('load1RM'),pct=calcNumber('loadPercent');
 $('calcLoadOut').textContent=max>0&&pct>=1&&pct<=100?`${pct}% of ${fmt(max)} kg = ${fmt(max*pct/100)} kg` :'Enter a positive 1RM and percentage between 1 and 100.';if(max>0&&pct>=1&&pct<=100)calculatorSaveOption('Training load',`${pct}% of ${fmt(max)} kg = ${fmt(max*pct/100)} kg`);return;
}
case'calcRatio':{
 const w=calcNumber('ratioWaist'),h=calcNumber('ratioHeight');
 $('calcRatioOut').textContent=w>0&&h>0?`Waist-to-height ratio: ${fmt(w/h)} (${Math.round(w/h*100)}% of height)` :'Enter valid measurements.';if(w>0&&h>0)calculatorSaveOption('Waist-to-height ratio',`${fmt(w/h)}`);return;
}
case'calcPace':{
 const km=calcNumber('paceDistance'),mins=calcNumber('paceMinutes');
 if(!(km>0&&mins>0)){$('calcPaceOut').textContent='Enter valid distance and time.';return}
 const pace=mins/km,sec=Math.round((pace%1)*60);
 $('calcPaceOut').innerHTML=`<p><b>Average speed:</b> ${fmt(km/(mins/60))} km/h</p><p><b>Pace:</b> ${Math.floor(pace)+Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')} min/km</p>`;calculatorSaveOption('Pace and speed',`${fmt(km/(mins/60))} km/h; ${Math.floor(pace)+Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')} min/km`);return;
}
case'exportMini':exportMini();return;
case'backup':download(JSON.stringify({app:'FitnessManagerRebuiltV1',exported:new Date().toISOString(),data:db},null,2),'Fitness_Manager_Backup_'+today()+'.json','application/json');return;
case'restore':$('restoreFile').click();return;
case'suggest':{
 if(!clientId)return;
 const draft=ensureDraft();
 const style=$('programmeStructure')?.value||draft.structure||'Full Body';
 const n=Math.max(1,Math.min(7,Number($('programmeDays')?.value)||draft.days.length||Number(c?.days)||3));
 regenerateDraft(style,n,true);return;
}
default:return
}await save();render();if(tab==='Workout Mode')renderWorkoutItems()}catch(err){alert('Could not complete action: '+err.message);console.error(err)}});
document.addEventListener('change',async e=>{const el=e.target;if(el.id==='pickClient'){clientId=el.value;programmeId='';render();if(tab==='Workout Mode')renderWorkoutItems()}else if(el.id==='pickProgramme'){programmeId=el.value;render();if(tab==='Workout Mode')renderWorkoutItems()}else if(el.id==='workoutDay'){renderWorkoutItems()}else if(el.id==='miniClient'){miniClient=el.value;miniSelected=new Set(db.programmes.filter(p=>p.clientId===miniClient).map(p=>p.id));render()}else if(el.classList.contains('miniCheck')){if(el.checked)miniSelected.add(el.value);else miniSelected.delete(el.value)}else if(el.dataset.item){const [di,xi,k]=el.dataset.item.split(':');draftAuto();ensureDraft().days[+di].exercises[+xi][k]=k==='rest'?Number(el.value):el.value;await save()}else if(el.id==='restoreFile'&&el.files[0]){try{const obj=JSON.parse(await el.files[0].text());if(obj.app!=='FitnessManagerRebuiltV1'||!obj.data?.clients||!obj.data?.programmes)throw Error('Not a valid rebuilt-app backup');if(confirm('Replace all current rebuilt-app data with this backup?')){db=obj.data;clientId='';programmeId='';await save();render()}}catch(err){alert('Restore failed: '+err.message)}}});
document.addEventListener('input',e=>{if(e.target.id==='swapSearch'){swapFilters.search=e.target.value;updateSwapResults();return;}if(e.target.dataset.filterday!==undefined){refreshDayExerciseChoices(Number(e.target.dataset.filterday));return;}if(e.target.id==='exerciseSearch'){search=e.target.value;const pos=e.target.selectionStart;render();$('exerciseSearch')?.focus();$('exerciseSearch')?.setSelectionRange(pos,pos)}});
document.addEventListener('change',e=>{if(['swapEquipment','swapMuscle','swapKind'].includes(e.target.id)){swapFilters[{swapEquipment:'equipment',swapMuscle:'muscle',swapKind:'kind'}[e.target.id]]=e.target.value;updateSwapResults();return;}if(e.target.id==='muscleFilter'){muscleFilter=e.target.value;render();return;}if(e.target.id==='kindFilter'){kindFilter=e.target.value;render();return;}if(e.target.dataset.filterday!==undefined){refreshDayExerciseChoices(Number(e.target.dataset.filterday));return;}if(e.target.id==='equipmentFilter'){eqFilter=e.target.value;render()}if(e.target.classList.contains('condition')&&['None','Not disclosed'].includes(e.target.value)&&e.target.checked){document.querySelectorAll('.condition').forEach(x=>{if(x!==e.target)x.checked=false})}else if(e.target.classList.contains('condition')&&e.target.checked){document.querySelectorAll('.condition').forEach(x=>{if(['None','Not disclosed'].includes(x.value))x.checked=false})}});
(async()=>{try{db=await read()||fresh();db.autosaves ||= {};db.drafts ||= {};db.challenges ||= [];db.records ||= [];db.templates ||= [];db.programmes ||= [];db.clients ||= [];db.exercises ||= [];db.equipment ||= [];
 if(!db.expandedLibraryV11){
  try{const rows=await fetch('./expanded-library.json').then(r=>r.json());const added=addExpandedLibrary(rows);db.expandedLibraryV11=true;await save();console.info('Expanded library imported',added)}
  catch(err){console.warn('Expanded exercise library will retry on next launch',err)}
 }
  const merged=dedupeEquipment();if(merged)await save();
 }catch(err){alert('Local storage unavailable: '+err.message)}render();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(console.warn)})();
