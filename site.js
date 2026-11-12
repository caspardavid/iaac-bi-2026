(function(){
function ready(f){document.readyState!=='loading'?f():document.addEventListener('DOMContentLoaded',f)}
ready(function(){
var prev=document.querySelector('.pn a.prev'),next=document.querySelector('.pn a.next');
document.addEventListener('keydown',function(e){
var t=e.target,tag=t&&t.tagName;
if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'||(t&&t.isContentEditable))return;
if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;
if(e.key==='ArrowLeft'&&prev){location.href=prev.href}
else if(e.key==='ArrowRight'&&next){location.href=next.href}
});
function fallback(txt){var ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(ta)}
Array.prototype.forEach.call(document.querySelectorAll('.copy'),function(b){
b.addEventListener('click',function(){
var txt=b.parentNode.querySelector('pre').textContent;
function done(){var o=b.textContent;b.textContent='Copied ✓';setTimeout(function(){b.textContent='Copy'},1500)}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done,function(){fallback(txt);done()})}else{fallback(txt);done()}
});
});
/* calculator */
function num(id){var v=document.getElementById(id).value;return v===''?NaN:parseFloat(v)}
function fmt(n){return Math.floor(n+1e-9).toLocaleString('en-US')}
function eur(n){return '€'+Math.round(n).toLocaleString('en-US')}
function set(id,t,cls){var e=document.getElementById(id);e.textContent=t;e.className=cls||''}
function market(){
var c=num('m-cust'),r=num('m-reach'),cv=num('m-conv'),p=num('m-price'),n=num('m-n');
var ok=[c,r,cv,p,n].every(function(x){return !isNaN(x)});
if(!ok){['o-reach','o-clients','o-rev'].forEach(function(i){set(i,'—')});return}
var reach=Math.floor(c*r/100+1e-9),clients=Math.floor(c*r/100*cv/100+1e-9);
set('o-reach',fmt(reach));set('o-clients',fmt(clients));set('o-rev',eur(clients*p*n));
}
function unit(){
var p=num('u-price'),g=num('u-gm'),ch=num('u-churn'),cac=num('u-cac');
var m=(isNaN(p)||isNaN(g))?NaN:p*g/100;
set('o-margin',isNaN(m)?'—':eur(m)+' / month');
var life=(isNaN(ch)||ch===0)?NaN:1/(ch/100);
set('o-life',isNaN(life)?'—':life.toFixed(1)+' months');
var clv=(isNaN(m)||isNaN(life))?NaN:m*life;
set('o-clv',isNaN(clv)?'—':eur(clv));
if(isNaN(clv)||isNaN(cac)||cac===0){set('o-ratio','—')}
else{var x=clv/cac;set('o-ratio',x.toFixed(1)+'×',x>3?'good':(x>=1?'mid':'bad'))}
set('o-pay',(isNaN(cac)||isNaN(m)||m===0)?'—':(cac/m).toFixed(1)+' months');
}
if(document.getElementById('m-cust')){
Array.prototype.forEach.call(document.querySelectorAll('.calc input'),function(i){i.addEventListener('input',function(){market();unit()})});
market();unit();
}
/* timer */
var td=document.getElementById('tdigits');
if(td){
var box=document.getElementById('timer'),dur=60,left=60,iv=null,btn=document.getElementById('tstart');
function show(){var m=Math.floor(left/60),s=left%60;td.textContent=left<=0?'Time':m+':'+(s<10?'0':'')+s;box.className='timer'+(left<=15&&left>0?' low':'')+(left<=0?' low':'')}
function stop(){clearInterval(iv);iv=null;btn.textContent='Start'}
function tick(){left--;if(left<=0){left=0;stop();box.classList.add('flash');setTimeout(function(){box.classList.remove('flash')},1600)}show()}
function toggle(){if(iv){stop()}else{if(left<=0)left=dur;iv=setInterval(tick,1000);btn.textContent='Pause';show()}}
function reset(){stop();left=dur;show()}
function setDur(d){dur=d;reset();document.getElementById('d1').className=d===60?'on':'';document.getElementById('d4').className=d===240?'on':''}
btn.addEventListener('click',toggle);
document.getElementById('treset').addEventListener('click',reset);
document.getElementById('d1').addEventListener('click',function(){setDur(60)});
document.getElementById('d4').addEventListener('click',function(){setDur(240)});
document.addEventListener('keydown',function(e){
var t=e.target.tagName;if(t==='INPUT'||t==='TEXTAREA'||e.metaKey||e.ctrlKey||e.altKey)return;
if(e.key==='t'||e.key==='T')toggle();else if(e.key==='r'||e.key==='R')reset();
});
show();
}
});
})();
