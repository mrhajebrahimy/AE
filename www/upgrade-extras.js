/* Aria Edit — theme toggle (sun/moon) + 10-step onboarding. Self-contained overlay. */
(function(){
  'use strict';
  var TK='aria_theme', OK='aria_onboard_done_v1';
  function ls(k,v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k,v); }catch(e){ return null; } }
  function applyTheme(t){ document.documentElement.setAttribute('data-theme', t==='light'?'light':'dark');
    var m=document.querySelector('meta[name="theme-color"]'); if(m) m.setAttribute('content', t==='light'?'#f4f6fb':'#0a0e16');
    var b=document.getElementById('uxThemeBtn'); if(b){ b.textContent=t==='light'?'🌙':'☀️'; b.setAttribute('aria-label', t==='light'?'تم تاریک':'تم روشن'); } }
  applyTheme(ls(TK)==='light'?'light':'dark');

  var STEPS=[
    ['👋','به آریا ادیت خوش آمدی','این اپ مسیر چهارسالهٔ تو برای تبدیل شدن به یک ادیتور حرفه‌ای است. در ۱۰ قدم کوتاه، کل اپ را می‌شناسی.'],
    ['◉','داشبورد','صفحهٔ اصلی: وضعیت امروز، سطح و پیشرفتت را اینجا می‌بینی و کار را از همین‌جا شروع می‌کنی.'],
    ['⏱️','ثبت زمان تمرین','هر روز زمان تمرینت را ثبت کن. ساعت‌ها جمع می‌شوند، سطحت بالا می‌رود و استریک (روزهای پیاپی) ساخته می‌شود.'],
    ['✦','نقشه راه','۱۶ فصل برای چهار سال؛ هر فصل ۳ ماه و هر ماه ۳۰ روز با سه بخش: آموزش، تمرین و تحلیل. روی یک ماه بزن تا روزهایش باز شود.'],
    ['📘','درس‌ها و آزمون‌ها','ماه‌های ابتدایی درس کامل و آزمون دارند. ماه‌های بعدی فعلاً برنامهٔ روزانه‌اند و به‌مرور کامل‌تر می‌شوند.'],
    ['▥','آمار','نمودار هفتهٔ اخیر، استریک و سطحت را اینجا ببین تا بفهمی کجا قوی‌تر شده‌ای و کجا باید بیشتر کار کنی.'],
    ['🏅','دستاوردها و مدال‌ها','۵۰ مدال برای ساعت تمرین، روزهای پیاپی، پروژه‌ها، سطح و پیشرفت در نقشه راه چهار سال در انتظار توست.'],
    ['▤','ژورنال','پروژه‌ها و کارهایی که ساخته‌ای را اینجا ثبت کن تا پورتفولیوی شخصی‌ات کم‌کم ساخته شود.'],
    ['▣','منابع','دوره‌های پیشنهادی هر مهارت، با لینک و سرفصل، برای وقتی که می‌خواهی عمیق‌تر یاد بگیری.'],
    ['◎','پروفایل و شروع','اسم و هدفت را تنظیم کن، با دکمهٔ ☀️/🌙 تم را عوض کن و از اینجا پشتیبان بگیر. حالا آمادهٔ شروع هستی!']
  ];
  var ov=null, idx=0;
  function el(t,c,x){ var e=document.createElement(t); if(c) e.className=c; if(x!==undefined) e.textContent=x; return e; }
  function close(done){ if(ov){ ov.remove(); ov=null; document.removeEventListener('keydown',onKey); } if(done) ls(OK,'1'); }
  function onKey(e){ if(e.key==='Escape') close(true); }
  function draw(){
    var s=STEPS[idx], c=ov.firstChild; c.textContent='';
    c.appendChild(el('div','ux-ob-ic',s[0])); c.appendChild(el('div','ux-ob-t',s[1])); c.appendChild(el('div','ux-ob-d',s[2]));
    var d=el('div','ux-ob-dots'); STEPS.forEach(function(_,i){ var x=el('i', i===idx?'on':''); d.appendChild(x); }); c.appendChild(d);
    var a=el('div','ux-ob-act');
    var prev=el('button','ux-btn','قبلی'); prev.type='button'; prev.disabled=idx===0; prev.onclick=function(){ idx--; draw(); };
    var last=idx===STEPS.length-1, next=el('button','ux-btn pri', last?'شروع کنیم':'بعدی'); next.type='button';
    next.onclick=function(){ if(last) close(true); else { idx++; draw(); } };
    a.appendChild(prev); a.appendChild(next); c.appendChild(a);
    var sk=el('button','ux-ob-skip','رد کردن راهنما ('+(idx+1)+' از '+STEPS.length+')'); sk.type='button'; sk.onclick=function(){ close(true); }; c.appendChild(sk);
    next.focus();
  }
  function openTour(){ if(ov) return; idx=0; ov=el('div','ux-ob'); ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true'); ov.setAttribute('aria-label','راهنمای شروع'); ov.appendChild(el('div','ux-ob-card')); document.body.appendChild(ov); document.addEventListener('keydown',onKey); draw(); }
  window.ARIA_openTour=openTour;

  function mountProfile(){
    var v=document.getElementById('view-profile'); if(!v||document.getElementById('uxThemeBtn')) return;
    var card=v.querySelector('.card')||v, row=el('div','ux-theme-row');
    var tour=el('button','ux-btn','🧭 راهنمای شروع'); tour.type='button'; tour.onclick=openTour;
    var b=el('button','ux-btn ux-theme-btn'); b.type='button'; b.id='uxThemeBtn';
    b.onclick=function(){ var n=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light'; ls(TK,n); applyTheme(n); };
    row.appendChild(tour); row.appendChild(b); card.insertBefore(row, card.firstChild);
    applyTheme(ls(TK)==='light'?'light':'dark');
  }
  function boot(){
    mountProfile();
    var tries=0, t=setInterval(function(){
      tries++;
      var shell=document.querySelector('.shell'), unlocked=shell&&!shell.hasAttribute('inert');
      if(unlocked){ clearInterval(t); if(!ls(OK)) setTimeout(openTour,600); }
      else if(tries>600) clearInterval(t);
    },700);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
