document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}}));

const phoneView=document.querySelector('#phone-view');
const phoneAction=document.querySelector('#phone-action');
const phoneTabs=document.querySelectorAll('[data-phone-view]');
const views={
  cap:{eyebrow:'TON CAP DU JOUR',title:'Rendre le prochain pas simple.',progress:'42%',width:'43%',task:'Marche active · 30 min',label:'Maintenant',action:'Voir l’ajustement KOR'},
  rythme:{eyebrow:'TON RYTHME',title:'Tu as repris sans repartir de zéro.',progress:'4 / 5',width:'80%',task:'Bilan express · 2 min',label:'À ton rythme',action:'Revenir à mon cap'},
  adjust:{eyebrow:'KOR A AJUSTÉ LA SUITE',title:'Allège aujourd’hui. Tu gardes ton élan.',progress:'47%',width:'47%',task:'Respiration · 10 min',label:'Prochain pas',action:'Voir mon rythme'}
};
let current='cap';
function renderPhone(view){const data=views[view];if(!phoneView||!data)return;current=view;phoneView.innerHTML=`<p class="phone-eyebrow">${data.eyebrow}</p><h2>${data.title}</h2><div class="phone-line"><i style="width:${data.width}"></i><b>${data.progress}</b></div><div class="phone-chart"><svg viewBox="0 0 300 118" aria-hidden="true"><path d="M2 104H298M2 68H298M2 32H298"/><polyline points="2,98 50,87 93,91 137,65 183,72 229,38 298,20"/></svg></div><div class="phone-card"><span>${data.label}</span><b>${data.task}</b><em>↗</em></div>`;if(phoneAction)phoneAction.innerHTML=`${data.action} <span>→</span>`;phoneTabs.forEach(tab=>tab.classList.toggle('is-active',tab.dataset.phoneView===view));}
phoneTabs.forEach(tab=>tab.addEventListener('click',()=>renderPhone(tab.dataset.phoneView)));
phoneAction?.addEventListener('click',()=>renderPhone(current==='adjust'?'rythme':'adjust'));
