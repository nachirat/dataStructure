'use strict';
const key = 'dsa-worksheet-v1-' + KIND;
const inputs = [...document.querySelectorAll('[data-save]')];
const note = document.getElementById('saveStatus');
function answers() { return Object.fromEntries(inputs.map(e => [e.dataset.save, e.type === 'checkbox' ? e.checked : e.value])); }
function progress() { const n = inputs.filter(e => e.type === 'checkbox' && e.checked).length; document.getElementById('progress').value = n; document.getElementById('completion').textContent = `เสร็จแล้ว ${n}/5 ขั้นตอน`; }
try { const saved = JSON.parse(localStorage.getItem(key) || '{}'); inputs.forEach(e => { if (Object.prototype.hasOwnProperty.call(saved,e.dataset.save)) { if(e.type==='checkbox') e.checked=!!saved[e.dataset.save]; else e.value=saved[e.dataset.save]; } }); } catch (_) { note.textContent='ไม่สามารถอ่านข้อมูลที่บันทึกไว้ กรุณาดาวน์โหลดคำตอบก่อนปิดหน้า'; }
inputs.forEach(e => e.addEventListener('input', () => { progress(); try { localStorage.setItem(key,JSON.stringify(answers())); note.textContent='บันทึกในเบราว์เซอร์แล้ว'; } catch (_) { note.textContent='บันทึกอัตโนมัติไม่ได้ กรุณาดาวน์โหลดคำตอบ'; } }));
progress();
document.getElementById('export').onclick = () => { const url=URL.createObjectURL(new Blob([JSON.stringify({worksheet:KIND,version:1,exportedAt:new Date().toISOString(),answers:answers()},null,2)],{type:'application/json'})); const a=document.createElement('a'); a.href=url; a.download=KIND+'-answers.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); };
const CAP=5; let data=Array(CAP).fill(null), top=-1, front=0, rear=-1, count=0;
function render(message) { const cells=document.getElementById('cells'); cells.replaceChildren(); data.forEach((v,i)=>{ const cell=document.createElement('div'); cell.className='cell'; const value=document.createElement('strong'); value.textContent=v===null?'—':String(v); const label=document.createElement('small'); label.textContent='index '+i+(KIND==='stack'?(i===top?' · TOP':''):(count>0&&i===front?' · FRONT':'')+(count>0&&i===rear?' · REAR':'')); cell.append(value,label); cells.append(cell); }); document.getElementById('state').textContent=KIND==='stack'?`top = ${top} · จำนวน = ${top+1}`:`front = ${front} · rear = ${rear} · count = ${count}`; document.getElementById('status').textContent=message; }
document.getElementById('add').onclick=()=>{ const raw=document.getElementById('value').value; const v=Number(raw); if(!raw.trim()||!Number.isSafeInteger(v)) return render('กรอกจำนวนเต็มที่ถูกต้อง'); if((KIND==='stack'?top+1:count)===CAP) return render('Overflow: เต็มแล้ว สถานะไม่เปลี่ยน'); if(KIND==='stack') data[++top]=v; else {rear=(rear+1)%CAP;data[rear]=v;count++;} render('เพิ่ม '+v); };
document.getElementById('remove').onclick=()=>{ if((KIND==='stack'?top+1:count)===0) return render('Underflow: ว่างอยู่ สถานะไม่เปลี่ยน'); let v;if(KIND==='stack'){v=data[top];data[top--]=null;}else{v=data[front];data[front]=null;front=(front+1)%CAP;count--;} render('นำออก '+v); };
document.getElementById('peek').onclick=()=>render((KIND==='stack'?top+1:count)===0?'ว่าง: ไม่มีข้อมูลให้ Peek':'Peek = '+data[KIND==='stack'?top:front]+' · สถานะไม่เปลี่ยน');
document.getElementById('reset').onclick=()=>{data=Array(CAP).fill(null);top=-1;front=0;rear=-1;count=0;render('เริ่มตัวจำลองใหม่แล้ว (คำตอบยังคงอยู่)');};
render('เริ่มจากโครงสร้างว่าง · ช่อง — หมายถึงไม่มีสมาชิกที่ใช้งาน');
