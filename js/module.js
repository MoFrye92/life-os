/* ==============================================================
   MO OS v0.8 | Shared functionality for 7 standalone pages
   Edit starter OPTIONS in js/module-data.js instead of here.
   Only these new pages load this file. Existing modules untouched.
============================================================== */
(() => {
  'use strict';

  const page = document.body.dataset.module;
  const root = document.getElementById('module-root');
  const data = window.MO_MODULE_DATA;
  if (!root || !data) return;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const storageKey = name => `moos_v08_${name}`;
  const read = (name, fallback) => { try { const s=localStorage.getItem(storageKey(name)); return s===null ? fallback : JSON.parse(s); } catch { return fallback; } };
  const write = (name, value) => { try { localStorage.setItem(storageKey(name), JSON.stringify(value)); return true; } catch { return false; } };
  const today = () => { const d=new Date(); return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-'); };
  const monday = () => { const d=new Date(); d.setDate(d.getDate() - ((d.getDay()+6)%7)); return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-'); };
  const randomNotSame = (list, previousId) => { if (!list.length) return null; const alternatives=list.filter(x=>x.id!==previousId); const pool=alternatives.length?alternatives:list; return pool[Math.floor(Math.random()*pool.length)]; };
  const option = (value,label) => `<option value="${esc(value)}">${esc(label)}</option>`;
  const empty = (text='Nothing matches right now. Try a different filter.') => `<div class="empty">${esc(text)}</div>`;
  const art = item => `<span class="art" style="--card-color:${/^#[0-9a-f]{3,8}$/i.test(item.color||'') ? item.color : '#405443'}"><span aria-hidden="true">${esc(item.icon||'✨')}</span>${item.image ? `<img src="${esc(item.image)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</span>`;
  const card = (item,desc,meta) => `<button class="item-card" data-pick="${esc(item.id)}" type="button">${art(item)}<span class="copy"><span class="name">${esc(item.title)}</span><span class="meta">${esc(meta)}</span><span class="desc">${esc(desc)}</span></span></button>`;
  const showResult = (element, item, label, description, action='') => {
    element.innerHTML = item ? `<div class="result"><span class="kicker">${esc(label)}</span><span class="hero-icon" aria-hidden="true">${esc(item.icon||'✨')}</span><h2>${esc(item.title)}</h2><p>${esc(description)}</p>${action}</div>`
      : `<div class="result"><span class="kicker">${esc(label)}</span><span class="hero-icon" aria-hidden="true">🎲</span><h2>Ready when you are.</h2><p>Choose your filters and tap Pick for me, or browse below.</p></div>`;
  };
  const isButton = (event,selector) => event.target.closest(selector);

  // ----------------------------------------------------------------
  // 🚗 GET OUT THE HOUSE
  // ----------------------------------------------------------------
  function initOutside() {
    const area = read('outside_area','');
    root.innerHTML = `
      <section class="panel"><p class="eyebrow">Choose your adventure</p><div class="control-grid three">
        <div class="field"><label for="out-company">Who's going?</label><select id="out-company">${[['All','Anyone'],['Solo','Just me'],['Company','With someone'],['Family','With the kids'],['Dog','With the dog']].map(x=>option(...x)).join('')}</select></div>
        <div class="field"><label for="out-energy">Energy</label><select id="out-energy">${[['Any','Any'],['Low','Low'],['Medium','Medium'],['High','High']].map(x=>option(...x)).join('')}</select></div>
        <div class="field"><label for="out-budget">Budget</label><select id="out-budget">${[['Any','Any'],['Free','Free'],['Low','Low-cost'],['Spend','Flexible']].map(x=>option(...x)).join('')}</select></div>
      </div><div class="field"><label for="out-area">City or area for Maps searches (optional)</label><input id="out-area" placeholder="e.g. Camden, NJ" value="${esc(area)}" autocomplete="off"></div></section>
      <section class="panel panel-glow"><div id="out-result"></div><div class="button-row"><button id="out-roll" class="btn primary" type="button">🎲 Pick for me</button></div></section>
      <div class="section-heading"><h2>Outing ideas</h2><span class="small muted" id="out-count"></span></div><p class="helper">These are activity ideas, not verified businesses. Maps opens a search for nearby options.</p><div id="out-grid" class="card-grid"></div>`;
    const el = id=>document.getElementById(id); let selected=null;
    const filtered = () => data.outside.filter(x => (el('out-company').value==='All'||x.company.includes(el('out-company').value)) && (el('out-energy').value==='Any'||x.energy===el('out-energy').value) && (el('out-budget').value==='Any'|| ['Free','Low','Spend'].indexOf(x.budget)<=['Free','Low','Spend'].indexOf(el('out-budget').value)));
    function select(x) {
      selected=x;
      const areaText=el('out-area').value.trim();
      const query=`${x.search} ${areaText?'near '+areaText:'near me'}`;
      const url=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      showResult(el('out-result'),x,'Your next outing',x.note,`<div class="mini-tags"><span class="tag">${esc(x.energy)} energy</span><span class="tag">${esc(x.budget==='Low'?'Low-cost':x.budget)}</span></div><div class="button-row"><a class="btn" href="${esc(url)}" target="_blank" rel="noopener noreferrer">📍 Search on Maps ↗</a></div>`);
      el('out-grid').querySelectorAll('[data-pick]').forEach(b=>b.classList.toggle('selected',b.dataset.pick===x.id));
    }
    function render() {
      const options=filtered(); el('out-count').textContent=`${options.length} ideas`;
      el('out-grid').innerHTML=options.map(x=>card(x,x.note,`${x.energy} · ${x.budget==='Low'?'Low-cost':x.budget}`)).join('')||empty();
      if(selected&&!options.some(x=>x.id===selected.id)) {selected=null;showResult(el('out-result'),null,'Outing picker');}
      if(selected) el('out-grid').querySelectorAll('[data-pick]').forEach(b=>b.classList.toggle('selected',b.dataset.pick===selected.id));
    }
    showResult(el('out-result'),null,'Outing picker'); render();
    ['out-company','out-energy','out-budget'].forEach(id=>el(id).addEventListener('change',render));
    el('out-area').addEventListener('change',()=>{write('outside_area',el('out-area').value.trim());if(selected)select(selected);});
    el('out-roll').addEventListener('click',()=>{const x=randomNotSame(filtered(),selected?.id);if(x)select(x);else showResult(el('out-result'),null,'No matching outings');});
    el('out-grid').addEventListener('click',event=>{const b=isButton(event,'[data-pick]');const x=b&&data.outside.find(y=>y.id===b.dataset.pick);if(x){select(x);el('out-result').scrollIntoView({block:'start'});}});
  }

  // ----------------------------------------------------------------
  // 📸 CREATIVE ROULETTE
  // ----------------------------------------------------------------
  function initCreative() {
    const categories=['All',...new Set(data.creative.map(x=>x.category))];
    root.innerHTML=`<section class="panel"><p class="eyebrow">Let's make something</p><div class="control-grid three">
      <div class="field"><label for="cr-category">Creative lane</label><select id="cr-category">${categories.map(x=>option(x,x)).join('')}</select></div>
      <div class="field"><label for="cr-energy">Energy</label><select id="cr-energy">${['Any','Low','Medium','High'].map(x=>option(x,x)).join('')}</select></div>
      <div class="field"><label for="cr-time">Time available</label><select id="cr-time">${[['0','Whatever'],['15','15 min'],['30','30 min'],['60','1 hour']].map(x=>option(...x)).join('')}</select></div>
      </div></section><section class="panel panel-glow"><div id="cr-result"></div><div class="button-row"><button class="btn primary" id="cr-roll" type="button">🎲 Surprise me</button></div></section>
      <div class="section-heading"><h2>Idea bank</h2><span id="cr-count" class="muted small"></span></div><div class="card-grid" id="cr-grid"></div>`;
    const el=id=>document.getElementById(id);let selected=null;
    const filtered=()=>data.creative.filter(x=>(el('cr-category').value==='All'||x.category===el('cr-category').value)&&(el('cr-energy').value==='Any'||x.energy===el('cr-energy').value)&&(!Number(el('cr-time').value)||x.minutes<=Number(el('cr-time').value)));
    function select(x){selected=x;showResult(el('cr-result'),x,`${x.category} · ${x.minutes} minutes`,x.prompt);el('cr-grid').querySelectorAll('[data-pick]').forEach(b=>b.classList.toggle('selected',b.dataset.pick===x.id));}
    function render(){const items=filtered();el('cr-count').textContent=`${items.length} ideas`;el('cr-grid').innerHTML=items.map(x=>card(x,x.prompt,`${x.category} · ${x.minutes} min`)).join('')||empty();if(selected&&!items.some(x=>x.id===selected.id)){selected=null;showResult(el('cr-result'),null,'Creative roulette');}}
    showResult(el('cr-result'),null,'Creative roulette');render();
    ['cr-category','cr-energy','cr-time'].forEach(id=>el(id).addEventListener('change',render));
    el('cr-roll').addEventListener('click',()=>{const x=randomNotSame(filtered(),selected?.id);if(x)select(x);else showResult(el('cr-result'),null,'No matching ideas');});
    el('cr-grid').addEventListener('click',e=>{const b=isButton(e,'[data-pick]');const x=b&&data.creative.find(y=>y.id===b.dataset.pick);if(x){select(x);el('cr-result').scrollIntoView({block:'start'});}});
  }

  // ----------------------------------------------------------------
  // ✨ TREAT YOURSELF
  // ----------------------------------------------------------------
  function initTreat(){
    root.innerHTML=`<section class="panel"><p class="eyebrow">Pick your kind of treat</p><div class="control-grid">
      <div class="field"><label for="tr-budget">Budget</label><select id="tr-budget">${[['Any','Any'],['Free','Free'],['Under $15','Under $15'],['Splurge','Splurge is okay']].map(x=>option(...x)).join('')}</select></div>
      <div class="field"><label for="tr-time">Time available</label><select id="tr-time">${[['0','Any time'],['15','15 minutes'],['30','30 minutes'],['60','1 hour'],['120','2 hours']].map(x=>option(...x)).join('')}</select></div>
      </div></section><section class="panel panel-glow"><div id="tr-result"></div><div class="button-row"><button id="tr-roll" type="button" class="btn primary">🎲 Treat me</button></div></section>
      <div class="section-heading"><h2>Your treat menu</h2><span class="small muted" id="tr-count"></span></div><div id="tr-grid" class="card-grid"></div><p class="note">Spending is optional, not the point. Free treats are treats too.</p>`;
    const el=id=>document.getElementById(id);let selected=null;
    const budgetLevels=['Free','Under $15','Splurge'];
    const filtered=()=>data.treat.filter(x=>(el('tr-budget').value==='Any'||budgetLevels.indexOf(x.budget)<=budgetLevels.indexOf(el('tr-budget').value))&&(!Number(el('tr-time').value)||x.minutes<=Number(el('tr-time').value)));
    function select(x){selected=x;showResult(el('tr-result'),x,`${x.budget} · about ${x.minutes} min`,x.detail);el('tr-grid').querySelectorAll('[data-pick]').forEach(b=>b.classList.toggle('selected',b.dataset.pick===x.id));}
    function render(){const xs=filtered();el('tr-count').textContent=`${xs.length} ideas`;el('tr-grid').innerHTML=xs.map(x=>card(x,x.detail,`${x.budget} · ${x.minutes} min`)).join('')||empty();if(selected&&!xs.some(x=>x.id===selected.id)){selected=null;showResult(el('tr-result'),null,'Treat selector');}}
    showResult(el('tr-result'),null,'Treat selector');render();
    ['tr-budget','tr-time'].forEach(id=>el(id).addEventListener('change',render));
    el('tr-roll').addEventListener('click',()=>{const x=randomNotSame(filtered(),selected?.id);if(x)select(x);else showResult(el('tr-result'),null,'No matching treats');});
    el('tr-grid').addEventListener('click',e=>{const b=isButton(e,'[data-pick]');const x=b&&data.treat.find(y=>y.id===b.dataset.pick);if(x){select(x);el('tr-result').scrollIntoView({block:'start'});}});
  }

  // ----------------------------------------------------------------
  // 👟 FIT CHECK
  // ----------------------------------------------------------------
  function initOutfit(){
    root.innerHTML=`<section class="panel"><p class="eyebrow">What's the occasion?</p><div class="control-grid">
      <div class="field"><label for="fit-occasion">Occasion</label><select id="fit-occasion">${['Any','Casual','Work','Date','Game Day','Dressy'].map(x=>option(x,x)).join('')}</select></div>
      <div class="field"><label for="fit-weather">Dressing for</label><select id="fit-weather">${['Any','Warm','Cool','Cold'].map(x=>option(x,x)).join('')}</select></div>
      </div><p class="note">This isn't a weather forecast or a record of your closet. Edit outfit ideas in js/module-data.js.</p></section>
      <section class="panel panel-glow"><div id="fit-result"></div><div class="button-row"><button id="fit-roll" class="btn primary" type="button">🎲 Build my fit</button></div></section>
      <div class="section-heading"><h2>Outfit formulas</h2><span id="fit-count" class="muted small"></span></div><div id="fit-grid" class="card-grid"></div>`;
    const el=id=>document.getElementById(id);let selected=null;
    const filtered=()=>data.outfits.filter(x=>(el('fit-occasion').value==='Any'||x.occasion===el('fit-occasion').value)&&(el('fit-weather').value==='Any'||x.weather.includes(el('fit-weather').value)));
    function select(x){selected=x;const details=[['Top',x.top],['Bottom',x.bottom],['Shoes',x.shoes],['Layer',x.layer],['Accessories',x.extras]].map(pair=>`<dt>${esc(pair[0])}</dt><dd>${esc(pair[1])}</dd>`).join('');el('fit-result').innerHTML=`<div class="result"><span class="kicker">${esc(x.occasion)} · ${esc(x.weather.join(' / '))}</span><span class="hero-icon">${esc(x.icon)}</span><h2>${esc(x.title)}</h2><p>${esc(x.note)}</p><div class="wardrobe-detail"><dl>${details}</dl></div></div>`;el('fit-grid').querySelectorAll('[data-pick]').forEach(b=>b.classList.toggle('selected',b.dataset.pick===x.id));}
    function render(){const xs=filtered();el('fit-count').textContent=`${xs.length} fits`;el('fit-grid').innerHTML=xs.map(x=>card(x,`${x.top} · ${x.bottom}`,`${x.occasion} · ${x.weather.join(' / ')}`)).join('')||empty();if(selected&&!xs.some(x=>x.id===selected.id)){selected=null;showResult(el('fit-result'),null,'Fit check');}}
    showResult(el('fit-result'),null,'Fit check');render();
    ['fit-occasion','fit-weather'].forEach(id=>el(id).addEventListener('change',render));
    el('fit-roll').addEventListener('click',()=>{const x=randomNotSame(filtered(),selected?.id);if(x)select(x);else showResult(el('fit-result'),null,'No matching fits');});
    el('fit-grid').addEventListener('click',e=>{const b=isButton(e,'[data-pick]');const x=b&&data.outfits.find(y=>y.id===b.dataset.pick);if(x){select(x);el('fit-result').scrollIntoView({block:'start'});}});
  }

  // ----------------------------------------------------------------
  // 🧹 RESET MY SPACE
  // ----------------------------------------------------------------
  function initCleaning(){
    const rooms=Object.keys(data.cleaning.rooms);
    root.innerHTML=`<section class="panel"><p class="eyebrow">Today's basics</p><h2>A little goes a long way.</h2><p class="helper">These checks reset daily on this device.</p><div class="progress-track"><div class="progress-fill" id="cl-daily-bar"></div></div><p class="small muted" id="cl-daily-count"></p><div id="cl-daily-list"></div><div class="button-row"><button id="cl-clear-daily" class="btn ghost small-btn" type="button">Clear today's checks</button></div></section>
      <section class="panel"><p class="eyebrow">Room rotation</p><div class="field"><label for="cl-room">Which room?</label><select id="cl-room">${rooms.map(x=>option(x,x)).join('')}</select></div><p class="helper">Room checkmarks reset each week, starting Monday.</p><div class="progress-track"><div class="progress-fill" id="cl-room-bar"></div></div><p class="small muted" id="cl-room-count"></p><div id="cl-room-list"></div></section>
      <section class="panel panel-glow"><p class="eyebrow">Don't know where to start?</p><div id="cl-suggestion" class="result"><h2>Try one tiny win.</h2><p>You can stop after the one task.</p></div><div class="button-row"><button id="cl-pick" class="btn primary" type="button">🎲 Give me one task</button></div></section>`;
    const el=id=>document.getElementById(id);
    const dkey=`cleaning_day_${today()}`, wkey=`cleaning_week_${monday()}`;
    let daily=read(dkey,{}),weekly=read(wkey,{}),last=null;
    function listHtml(tasks,checks,kind){return tasks.map((name,i)=>`<label class="checkbox-row ${checks[i]?'done':''}"><input type="checkbox" data-kind="${kind}" data-index="${i}" ${checks[i]?'checked':''}><span>${esc(name)}</span></label>`).join('');}
    function render(){const dailyTotal=data.cleaning.daily.length;const room=el('cl-room').value;const roomTasks=data.cleaning.rooms[room]||[];const roomChecks=weekly[room]||{};const doneDaily=data.cleaning.daily.filter((_,i)=>daily[i]).length;const doneRoom=roomTasks.filter((_,i)=>roomChecks[i]).length;el('cl-daily-list').innerHTML=listHtml(data.cleaning.daily,daily,'daily');el('cl-room-list').innerHTML=listHtml(roomTasks,roomChecks,'room');el('cl-daily-count').textContent=`${doneDaily} of ${dailyTotal} basics done`;el('cl-room-count').textContent=`${doneRoom} of ${roomTasks.length} room tasks done`;el('cl-daily-bar').style.width=`${dailyTotal?100*doneDaily/dailyTotal:0}%`;el('cl-room-bar').style.width=`${roomTasks.length?100*doneRoom/roomTasks.length:0}%`;}
    root.addEventListener('change',e=>{if(e.target.id==='cl-room'){last=null;render();return;}if(e.target.matches('input[data-kind]')){const i=e.target.dataset.index;if(e.target.dataset.kind==='daily'){daily[i]=e.target.checked;write(dkey,daily);}else{const room=el('cl-room').value;weekly[room]??={};weekly[room][i]=e.target.checked;write(wkey,weekly);}render();}});
    el('cl-clear-daily').addEventListener('click',()=>{daily={};write(dkey,daily);render();});
    el('cl-pick').addEventListener('click',()=>{const room=el('cl-room').value;const tasks=data.cleaning.rooms[room]||[];const undone=tasks.map((title,index)=>({id:String(index),title})).filter(x=>!(weekly[room]||{})[x.id]);if(!undone.length){el('cl-suggestion').innerHTML='<h2>That room is done for now. 🎉</h2><p>Pick another room or take a break.</p>';return;}const x=randomNotSame(undone,last);last=x.id;el('cl-suggestion').innerHTML=`<span class="kicker">One task in ${esc(room)}</span><h2>${esc(x.title)}</h2><p>Just this one. No need to keep going.</p>`;});
    render();
  }

  // ----------------------------------------------------------------
  // 🧠 THE DAILY RESET
  // ----------------------------------------------------------------
  function initReset(){
    const key=`daily_reset_${today()}`;let state=read(key,{priority:'',done:false,thoughts:''}),last=null;
    root.innerHTML=`<section class="panel"><p class="eyebrow">What's going on?</p><div class="control-grid three">
      <div class="field"><label for="dr-energy">Energy</label><select id="dr-energy">${['Low','Medium','High'].map(x=>option(x,x)).join('')}</select></div>
      <div class="field"><label for="dr-focus">What needs attention?</label><select id="dr-focus">${['Home','Life','Fun','Self','Rest'].map(x=>option(x,x)).join('')}</select></div>
      <div class="field"><label for="dr-time">I have...</label><select id="dr-time">${[['5','5 min'],['15','15 min'],['30','30 min']].map(x=>option(...x)).join('')}</select></div>
      </div></section><section class="panel panel-glow"><div id="dr-result"></div><div class="button-row"><button id="dr-roll" class="btn primary" type="button">🎲 Give me one next move</button></div></section>
      <section class="panel"><p class="eyebrow">One priority, not twenty</p><div class="field"><label for="dr-priority">What's the one thing you want to remember today?</label><input id="dr-priority" maxlength="140" placeholder="One thing, even if it's tiny" value="${esc(state.priority)}"></div><div class="button-row"><button id="dr-save" class="btn" type="button">Save my one thing</button></div><label class="checkbox-row"><input id="dr-done" type="checkbox" ${state.done?'checked':''}><span>I've handled my one thing</span></label><p class="small muted" id="dr-status"></p></section>
      <section class="panel"><p class="eyebrow">Brain parking lot</p><div class="field"><label for="dr-thoughts">Get it out of your head. No organization required.</label><textarea id="dr-thoughts" maxlength="2500" placeholder="Things on my mind…">${esc(state.thoughts)}</textarea></div><div class="button-row"><button class="btn ghost" id="dr-notes-save" type="button">Save notes on this device</button></div><p class="note">Your notes stay in this browser. They don't sync to other devices.</p></section>`;
    const el=id=>document.getElementById(id);showResult(el('dr-result'),null,'One next move');el('dr-status').textContent=state.priority? (state.done?'Marked done for today.':'Saved for today.') : 'Nothing saved yet.';
    el('dr-roll').addEventListener('click',()=>{const energy=el('dr-energy').value,focus=el('dr-focus').value,time=Number(el('dr-time').value);let opts=data.reset.filter(x=>x.energy===energy&&x.focus===focus&&x.minutes<=time);let label='Your next move';if(!opts.length){opts=data.reset.filter(x=>x.focus===focus&&x.minutes<=time);label='Closest match for your time';}if(!opts.length){opts=data.reset.filter(x=>x.focus===focus);label='Try this if you have a little more time';}const x=randomNotSame(opts,last);if(x){last=x.id;showResult(el('dr-result'),{...x,icon:'🌱'},`${label} · ~${x.minutes} min`,x.detail);}});
    el('dr-save').addEventListener('click',()=>{state.priority=el('dr-priority').value.trim();state.done=false;el('dr-done').checked=false;write(key,state);el('dr-status').textContent=state.priority?'Saved for today.':'Your one thing is clear.';});
    el('dr-done').addEventListener('change',()=>{state.priority=el('dr-priority').value.trim();state.done=el('dr-done').checked;write(key,state);el('dr-status').textContent=state.done?'Marked done for today.':'Still on your list.';});
    el('dr-notes-save').addEventListener('click',()=>{state.thoughts=el('dr-thoughts').value;write(key,state);el('dr-notes-save').textContent='✓ Saved on this device';});
  }

  // ----------------------------------------------------------------
  // 📋 HANDLE YOUR BUSINESS
  // ----------------------------------------------------------------
  function initAdmin(){
    let tasks=read('admin_tasks',[]);if(!Array.isArray(tasks)) tasks=[];
    root.innerHTML=`<section class="panel"><p class="eyebrow">Capture the task</p><h2>Get it out of your head.</h2><form id="ad-form"><div class="field"><label for="ad-title">What needs handling?</label><input id="ad-title" maxlength="120" required placeholder="e.g. Call about a bill"></div><div class="control-grid" style="margin-top:12px"><div class="field"><label for="ad-category">Category</label><select id="ad-category">${['Money','Paperwork','Scheduling','Home','Follow-up','Other'].map(x=>option(x,x)).join('')}</select></div><div class="field"><label for="ad-due">Due date (optional)</label><input id="ad-due" type="date"></div></div><div class="button-row"><button class="btn primary" type="submit">＋ Add task</button></div></form></section>
      <section class="panel"><p class="eyebrow">Quick add an idea</p><div class="chip-row" id="ad-quick">${data.adminQuickAdds.map((x,i)=>`<button class="chip" type="button" data-quick="${i}">${esc(x.title)}</button>`).join('')}</div></section>
      <section class="panel"><div class="section-heading" style="margin:0 0 12px"><h2>My task list</h2><span id="ad-count" class="muted small"></span></div><div class="field"><label for="ad-filter">Show</label><select id="ad-filter">${[['Open','Open tasks'],['All','All tasks'],['Done','Completed']].map(x=>option(...x)).join('')}</select></div><div id="ad-list" class="one-col"></div><div class="button-row"><button class="btn ghost small-btn" id="ad-clear-done" type="button">Remove completed tasks</button></div></section>
      <p class="note">Saved only in this browser, not synced with your Mac or other devices. Don't enter passwords, account numbers, or other sensitive details. No reminders are sent automatically.</p>`;
    const el=id=>document.getElementById(id);
    const save=()=>write('admin_tasks',tasks);
    function render(){const view=el('ad-filter').value;const filtered=tasks.filter(t=>view==='All'||(view==='Done'?t.done:!t.done)).sort((a,b)=>(a.done-b.done)||(a.due||'9999').localeCompare(b.due||'9999'));const pending=tasks.filter(x=>!x.done).length;el('ad-count').textContent=`${pending} open`;el('ad-list').innerHTML=filtered.length?filtered.map(t=>{const overdue=!t.done&&t.due&&t.due<today();return `<div class="simple-card list-row ${t.done?'completed':''} ${overdue?'overdue':''}"><div style="flex:1;min-width:0"><div class="title">${esc(t.title)}</div><div class="details">${esc(t.category)}${t.due?' · Due '+esc(t.due):''}${overdue?' · Overdue':''}</div></div><div class="actions"><button type="button" class="icon-btn" data-toggle="${esc(t.id)}" aria-label="${t.done?'Mark not done':'Mark done'}: ${esc(t.title)}" title="${t.done?'Undo':'Mark done'}">${t.done?'↩':'✓'}</button><button type="button" class="icon-btn" data-delete="${esc(t.id)}" aria-label="Delete ${esc(t.title)}" title="Delete">✕</button></div></div>`;}).join(''):empty('No tasks in this view. Enjoy the breathing room!');}
    function addTask(title,category,due=''){const clean=String(title).trim();if(!clean)return;tasks.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,title:clean,category,due,done:false});save();render();}
    el('ad-form').addEventListener('submit',e=>{e.preventDefault();addTask(el('ad-title').value,el('ad-category').value,el('ad-due').value);el('ad-form').reset();el('ad-title').focus();});
    el('ad-quick').addEventListener('click',e=>{const b=isButton(e,'[data-quick]');if(!b)return;const x=data.adminQuickAdds[Number(b.dataset.quick)];if(x)addTask(x.title,x.category);});
    el('ad-filter').addEventListener('change',render);
    el('ad-list').addEventListener('click',e=>{const b=isButton(e,'[data-toggle],[data-delete]');if(!b)return;if(b.dataset.toggle){const t=tasks.find(x=>x.id===b.dataset.toggle);if(t)t.done=!t.done;}else if(b.dataset.delete){tasks=tasks.filter(t=>t.id!==b.dataset.delete);}save();render();});
    el('ad-clear-done').addEventListener('click',()=>{tasks=tasks.filter(x=>!x.done);save();render();});
    render();
  }

  // ----------------------------------------------------------------
  // Initialize the page named in <body data-module="...">.
  // ----------------------------------------------------------------
  const handlers={outside:initOutside,creative:initCreative,treat:initTreat,outfit:initOutfit,cleaning:initCleaning,reset:initReset,admin:initAdmin};
  if (handlers[page]) {
    try { handlers[page](); }
    catch(error) { console.error('MO OS module error:',error); root.innerHTML='<p class="empty">This module could not load. Check the browser console and the module data file.</p>'; }
  } else {
    root.innerHTML=empty('Unknown module. Check the page data-module value.');
  }
})();
