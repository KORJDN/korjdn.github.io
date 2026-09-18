(() => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const state = JSON.parse(localStorage.getItem('core-demo') || '{"completed":3}');
  const recipes = {
    Sport:['Évaluer ton point de départ sans te griller','Séance principale à ton niveau','Mobilité et récupération utile','Progression mesurée','Bilan énergie et ajustement'],
    Études:['Choisir la notion qui compte vraiment','Bloc de concentration sans notifications','Rappel actif sans regarder le cours','Corriger l’erreur utile','Bilan de maîtrise'],
    Nutrition:['Observer tes habitudes sans jugement','Préparer une action simple','Composer des repas réalistes','Créer un repère durable','Bilan de ce qui aide'],
    Business:['Définir l’hypothèse à tester','Parler à une personne cible','Tester une action concrète','Lire les retours sans se disperser','Choisir la prochaine décision'],
    Habitudes:['Réduire le premier pas','Installer le rendez-vous','Rendre l’action évidente','Observer sans casser la série','Ajuster la semaine suivante']
  };
  let domain = 'Sport';
  const toast = text => { const node = $('#toast'); node.textContent = text; node.classList.add('show'); setTimeout(() => node.classList.remove('show'), 2700); };
  const go = id => { $$('.view').forEach(view => view.classList.toggle('active', view.id === id)); $$('.nav button').forEach(button => button.classList.toggle('active', button.dataset.go === id)); window.scrollTo({top:0,behavior:'smooth'}); };
  const syncProgress = () => { $('#progress').textContent = `${state.completed} actions terminées sur 5`; $('#fill').style.width = `${state.completed * 20}%`; localStorage.setItem('core-demo', JSON.stringify(state)); };
  document.addEventListener('DOMContentLoaded', () => {
    syncProgress();
    $$('[data-go]').forEach(button => button.addEventListener('click', () => go(button.dataset.go)));
    const toggleTheme = () => document.body.classList.toggle('dark');
    $('#theme').addEventListener('click', toggleTheme); $('#profileTheme').addEventListener('click', toggleTheme);
    $$('#domains .chip').forEach(button => button.addEventListener('click', () => { $$('#domains .chip').forEach(chip => chip.classList.remove('active')); button.classList.add('active'); domain = button.textContent.trim(); }));
    $$('[data-nudge]').forEach(button => button.addEventListener('click', () => { $('#nudge').classList.add('hidden'); toast(button.dataset.nudge === 'move' ? 'Séance déplacée à demain. CORE réajuste ton rythme.' : 'Repos conservé. La semaine reste cohérente.'); }));
    $('#form').addEventListener('submit', event => {
      event.preventDefault(); const goal = $('#goal').value.trim(); if (!goal) return toast('Écris ton objectif avant de continuer.'); const actions = recipes[domain] || recipes.Sport;
      $('#title').textContent = goal.length > 58 ? `${goal.slice(0,58)}…` : goal;
      $('#meta').textContent = `${domain} · ${$('#level').value} · ${$('#time').value}. Contrainte intégrée : ${$('#constraint').value.trim() || 'ton rythme réel'}.`;
      $('#week').innerHTML = actions.map((item,index) => `<div class="day"><b>${['LUN','MAR','MER','JEU','VEN'][index]}</b>${item.split(' ').slice(0,2).join(' ')}</div>`).join('') + '<div class="day"><b>SAM</b>Souple</div><div class="day"><b>DIM</b>Bilan</div>';
      $('#tasks').innerHTML = actions.slice(0,3).map((item,index) => `<div class="task"><span class="num">0${index+1}</span><div><b>${item}</b><small>${index === 0 ? 'Cette semaine' : 'À placer selon ton énergie'} · 40 min</small></div></div>`).join('');
      $('#result').classList.remove('hidden'); $('#result').scrollIntoView({behavior:'smooth',block:'center'}); toast('CORE a construit un premier cycle à relire.');
    });
    $('#save').addEventListener('click', () => { state.completed = Math.max(3,state.completed); syncProgress(); toast('Programme ajouté. Ton bilan arrive dimanche.'); go('plans'); });
    $$('[data-open]').forEach(button => button.addEventListener('click', () => { go('builder'); $('#goal').value = button.dataset.open === 'study' ? 'Structurer mes révisions sans tout repousser' : 'Gagner en force sans négliger la récupération'; toast('Plan ouvert : tu peux l’ajuster avec CORE AI.'); }));
    $('[data-review]').addEventListener('click', () => { go('builder'); $('#goal').value = 'Faire le bilan de ma semaine et ajuster la suivante'; toast('Décris ton bilan : CORE prépare la suite.'); });
    $('#offers').addEventListener('click', () => toast('CORE gratuit, BETA 3,99 € et ALPHA 6,99 € : paiement à connecter après la phase pilote.'));
    $$('[data-studio]').forEach(button => button.addEventListener('click', () => toast(`CORE STUDIO ${button.dataset.studio} est prêt pour ta phase pilote.`)));
    document.documentElement.dataset.coreRuntime = 'ready';
  });
})();
