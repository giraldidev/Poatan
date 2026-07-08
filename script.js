/* ============================================================
   1. TELA DE CARREGAMENTO
   ============================================================ */
(function(){
  // gera a faixa de grafismo tribal (triângulos + zigzag) como SVG data-URI
  const tribalSVG = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="46" viewBox="0 0 160 46">
      <g fill="none" stroke="#c8371e" stroke-width="2">
        <path d="M0 34 L10 18 L20 34 L30 18 L40 34 L50 18 L60 34 L70 18 L80 34 L90 18 L100 34 L110 18 L120 34 L130 18 L140 34 L150 18 L160 34"/>
      </g>
      <g fill="#e8a33d">
        <path d="M5 44 L10 36 L15 44 Z"/><path d="M45 44 L50 36 L55 44 Z"/>
        <path d="M85 44 L90 36 L95 44 Z"/><path d="M125 44 L130 36 L135 44 Z"/>
      </g>
      <g fill="#f2e8d5" opacity=".55">
        <circle cx="30" cy="8" r="2"/><circle cx="70" cy="8" r="2"/>
        <circle cx="110" cy="8" r="2"/><circle cx="150" cy="8" r="2"/>
      </g>
    </svg>`);
  document.getElementById('bandTop').style.backgroundImage =
  document.getElementById('bandBottom').style.backgroundImage = `url("data:image/svg+xml,${tribalSVG}")`;

  // título letra a letra
  const titulo = document.getElementById('loaderTitulo');
  'POATAN'.split('').forEach((l,i)=>{
    const s=document.createElement('span');
    s.textContent=l;s.style.animationDelay=(0.15+i*0.12)+'s';
    titulo.appendChild(s);
  });

  const frases=['invocando a lenda…','pintando o rosto de urucum…','esticando a corda do arco…','afiando as mãos de pedra…','chama.'];
  const fraseEl=document.getElementById('loaderFrase');
  const pctEl=document.getElementById('loaderPct');
  const corpo=document.getElementById('flechaCorpo');
  const ponta=document.getElementById('flechaPonta');
  const loader=document.getElementById('loader');

  let p=0,f=0;
  const fraseTimer=setInterval(()=>{
    f=(f+1)%frases.length;
    fraseEl.style.opacity=0;
    setTimeout(()=>{fraseEl.textContent=frases[f];fraseEl.style.opacity=1;},300);
  },820);

  // abra a página com #loader no fim da URL para segurar a tela de carregamento (útil p/ gravar stories)
  const modoLento = location.hash === '#loader' ? .12 : 1;
  const tick=setInterval(()=>{
    // progresso orgânico: acelera no meio, desacelera no fim
    p += (p<70 ? (2.2+Math.random()*2.6) : (1+Math.random()*1.4)) * modoLento;
    if(p>=100){
      p=100;clearInterval(tick);clearInterval(fraseTimer);
      fraseEl.textContent='chama.';
      // a flecha "dispara" e a tela abre
      ponta.style.transition='left .35s cubic-bezier(.5,0,1,.5), opacity .3s .25s';
      ponta.style.left='130%';ponta.style.opacity='0';
      setTimeout(()=>{
        loader.classList.add('done');
        document.dispatchEvent(new Event('poatan:pronto'));
        setTimeout(()=>loader.remove(),1000);
      },520);
    }
    pctEl.textContent=Math.floor(p)+'%';
    corpo.style.width=p+'%';
    ponta.style.left=p+'%';
  },60);
})();

/* ============================================================
   2. BRASAS FLUTUANTES (canvas)
   ============================================================ */
(function(){
  const cv=document.getElementById('brasas');
  const cx=cv.getContext('2d');
  let W,H,parts=[];
  const N=Math.min(46,Math.floor(innerWidth/22));
  function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight;}
  addEventListener('resize',resize);resize();
  function nova(init){
    return{
      x:Math.random()*W,
      y:init?Math.random()*H:H+10,
      r:.8+Math.random()*2.4,
      vy:.25+Math.random()*.8,
      vx:(Math.random()-.5)*.35,
      vida:0,max:400+Math.random()*400,
      dourada:Math.random()<.3
    };
  }
  for(let i=0;i<N;i++)parts.push(nova(true));
  (function anim(){
    cx.clearRect(0,0,W,H);
    for(let i=0;i<parts.length;i++){
      const b=parts[i];
      b.y-=b.vy;b.x+=b.vx+Math.sin((b.vida)*.02)*.3;b.vida++;
      const a=Math.max(0,Math.sin(Math.PI*Math.min(1,b.vida/b.max)))*.75;
      if(b.y<-12||b.vida>b.max)parts[i]=nova(false);
      cx.beginPath();
      cx.arc(b.x,b.y,b.r,0,7);
      cx.fillStyle=b.dourada?`rgba(232,163,61,${a})`:`rgba(255,74,33,${a*.85})`;
      cx.shadowColor=b.dourada?'#e8a33d':'#ff4a21';
      cx.shadowBlur=8;
      cx.fill();
      cx.shadowBlur=0;
    }
    requestAnimationFrame(anim);
  })();
})();

/* ============================================================
   3. REVEAL AO ROLAR + CONTADORES
   ============================================================ */
(function(){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting)return;
      en.target.classList.add('on');
      const num=en.target.querySelector?.('[data-conta]');
      if(num&&!num.dataset.feito){
        num.dataset.feito=1;
        const alvo=+num.dataset.conta;const ini=performance.now();
        (function passo(n){
          const k=Math.min(1,(n-ini)/1400);
          num.textContent=Math.floor(alvo*(1-Math.pow(1-k,3)));
          if(k<1)requestAnimationFrame(passo);
        })(ini);
      }
      io.unobserve(en.target);
    });
  },{threshold:.18});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();

/* ============================================================
   4. BARRA DE NAVEGAÇÃO — aparece após o carregamento
   ============================================================ */
document.addEventListener('poatan:pronto',()=>document.getElementById('topo').classList.add('visivel'));

/* ============================================================
   5. FLIP CARDS no toque (mobile)
   ============================================================ */
document.querySelectorAll('.flip-cena').forEach(c=>{
  c.addEventListener('click',()=>c.classList.toggle('tocado'));
});
