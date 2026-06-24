'use client'

import { useEffect, useRef } from 'react'

const CSS = `
.hero-light {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-height: 580px;
  overflow: hidden;
}
.hero-light::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 16% 22%, rgba(255,255,255,.34), transparent 28%),
    radial-gradient(circle at 70% 60%, rgba(94,75,52,.035), transparent 42%),
    repeating-linear-gradient(0deg, rgba(59,47,47,.020) 0px, rgba(59,47,47,.020) 1px, transparent 1px, transparent 4px);
  mix-blend-mode: multiply;
  opacity: .34;
}
#topo-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background: #F5EFE6;
}
#tree-sketch {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center 9%;
  mix-blend-mode: multiply;
  opacity: 0;
  transition: opacity 3.8s cubic-bezier(.4,0,.2,1);
  filter: saturate(.95) brightness(1.04) contrast(.94);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,.94) 0%, rgba(0,0,0,.90) 34%, rgba(0,0,0,.58) 54%, rgba(0,0,0,.14) 70%, rgba(0,0,0,0) 82%);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,.94) 0%, rgba(0,0,0,.90) 34%, rgba(0,0,0,.58) 54%, rgba(0,0,0,.14) 70%, rgba(0,0,0,0) 82%);
}
.hero-content {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
  padding: 0 56px 68px;
  max-width: 560px;
}
.hero-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: #4A7C6F;
  margin-bottom: 22px;
}
.hero-name {
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: clamp(52px, 6.6vw, 98px);
  line-height: 1.05;
  color: #3B2F2F;
}
.hero-name .line { display: block; padding-right: 0.15em; }
.hero-name .line span { display: inline-block; }
.hero-name em { font-style: italic; color: #4A7C6F; }
.hero-tagline {
  margin-top: 30px;
  font-size: 14px;
  line-height: 1.82;
  color: #9B9187;
  max-width: 360px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
}
.hero-ctas {
  margin-top: 42px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 22px;
  row-gap: 14px;
}
.btn-solid {
  background: #3B2F2F;
  color: #F5EFE6;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: .16em;
  text-transform: uppercase;
  padding: 15px 30px;
  text-decoration: none;
  display: inline-block;
  transition: background .25s, transform .2s;
}
.btn-solid:hover { background: #4A7C6F; transform: translateY(-2px); }
.btn-ghost {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #3B2F2F;
  text-decoration: none;
  border-bottom: 1px solid #C4BCB3;
  padding-bottom: 2px;
  opacity: .45;
  transition: opacity .2s, color .2s, border-color .2s;
}
.btn-ghost:hover { opacity: 1; color: #4A7C6F; border-color: #4A7C6F; }
#paper-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 300px 300px;
  mix-blend-mode: multiply;
  opacity: 0.18;
}
.canyon-label {
  position: absolute;
  bottom: 42px;
  right: 52px;
  z-index: 3;
  text-align: right;
  font-family: 'DM Mono', monospace;
  font-size: 8.5px;
  letter-spacing: .24em;
  text-transform: uppercase;
  color: #9B9187;
}
.hero-scroll { position: absolute; bottom: 42px; left: 56px; z-index: 3; }
.scroll-bar { width: 36px; height: 1px; background: rgba(155,145,135,.25); position: relative; overflow: hidden; }
.scroll-bar::after {
  content: '';
  position: absolute;
  left: -100%; top: 0;
  width: 100%; height: 100%;
  background: #4A7C6F;
  animation: scrollLine 2.8s ease 2.4s infinite;
  opacity: .55;
}
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes scrollLine { 0% { left: -100% } 50% { left: 100% } 100% { left: 100% } }
@media (max-width: 768px) {
  .hero-content { padding: 0 28px 52px; max-width: 100%; }
  .hero-tagline { max-width: 100%; }
  .canyon-label { display: none; }
  .hero-scroll { left: 28px; bottom: 20px; }
  #tree-sketch { object-position: center 8%; }
}
`

export default function HeroLight() {
  const canvasRef = useRef(null)
  const treeRef   = useRef(null)
  const eyebrowRef = useRef(null)
  const taglineRef = useRef(null)
  const ctasRef    = useRef(null)
  const scrollRef  = useRef(null)
  const labelRef   = useRef(null)
  const nameSpansRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let rafId
    let frameRafId
    let resizeTimer
    let paused = false
    let pausedAt = 0
    let inView = true
    let tabVisible = true
    let io = null

    /* ── HELPERS ── */
    const lerp = (a,b,t) => a+(b-a)*t
    const clamp = (x,lo,hi) => Math.max(lo,Math.min(hi,x))
    const easeOut = t => 1-(1-t)*(1-t)
    const hash = n => { const x=Math.sin(n*127.1+311.7)*43758.5453; return x-Math.floor(x) }
    const vn = x => { const i=Math.floor(x),f=x-i,u=f*f*(3-2*f); return lerp(hash(i),hash(i+1),u) }
    function fbm(x,oct){let v=0,a=.5,f=1,m=0;for(let o=0;o<oct;o++){v+=vn(x*f)*a;m+=a;a*=.52;f*=2.13;}return v/m}
    const h2=(x,y)=>{const s=Math.sin(x*127.1+y*311.7+x*y*.13)*43758.5453;return s-Math.floor(s)}
    function vn2(x,y){const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;const ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy);return lerp(lerp(h2(ix,iy),h2(ix+1,iy),ux),lerp(h2(ix,iy+1),h2(ix+1,iy+1),ux),uy)}
    function fbm2(x,y,oct){let v=0,a=.5,f=1,m=0;for(let o=0;o<oct;o++){v+=vn2(x*f,y*f)*a;m+=a;a*=.52;f*=2.13;}return v/m}
    function silenceMask(x,y){if(!W||!H)return 0;const dx=x/W,dy=y/H;const upperLeft=Math.exp(-Math.pow((dx-.12)/.22,2))*Math.exp(-Math.pow((dy-.18)/.26,2));const textVoid=Math.exp(-Math.pow((dx-.18)/.24,2))*Math.exp(-Math.pow((dy-.68)/.30,2));const lowerRight=Math.exp(-Math.pow((dx-.84)/.24,2))*Math.exp(-Math.pow((dy-.78)/.22,2))*.55;return clamp(Math.max(upperLeft,textVoid,lowerRight),0,1)}
    function weatherEnvelope(t){return clamp(fbm(t*.025+2.7,4),.16,1)}
    function turbulenceField(x,y,t){return fbm2(x*.003+t*.008,y*.003+t*.006,3)}
    function riverVisibility(d,t){return clamp(fbm(d*.001+t*.04,4)*1.45-.18,0,1)}
    function pigmentDeposit(x,y){return lerp(.82,1.08,fbm2(x*.020,y*.020,2))}
    function microDropout(x,y){return vn2(x*.080+1.1,y*.080+3.3)>.94?.34:1}
    const WASHES=[{x:.28,y:.37,ang:.95,len:.22,w:.030,str:.026},{x:.44,y:.70,ang:-.82,len:.20,w:.034,str:.030},{x:.62,y:.39,ang:.72,len:.18,w:.026,str:.023},{x:.78,y:.68,ang:-1.05,len:.24,w:.032,str:.025}]
    function washInfluence(nx,ny){let pull=0;for(const w of WASHES){const ca=Math.cos(w.ang),sa=Math.sin(w.ang);const dx=nx-w.x,dy=ny-w.y;const along=dx*ca+dy*sa;const cross=-dx*sa+dy*ca;const a=Math.exp(-Math.pow(along/w.len,2));const c=Math.exp(-Math.pow(cross/w.w,2));pull+=w.str*a*c}return pull}
    function collapseZone(x,y){const nx=x/W,ny=y/H;const z1=Math.exp(-Math.pow((nx-.36)/.08,2))*Math.exp(-Math.pow((ny-.54)/.12,2));const z2=Math.exp(-Math.pow((nx-.70)/.10,2))*Math.exp(-Math.pow((ny-.58)/.10,2));const z3=Math.exp(-Math.pow((nx-.53)/.07,2))*Math.exp(-Math.pow((ny-.42)/.09,2))*.7;return clamp(Math.max(z1,z2,z3),0,1)}
    function lcg(n){n=(n^(n<<13));n=(n^(n>>>17));n=(n^(n<<5));return(n&0x7fffffff)/0x7fffffff}

    /* ── CANVAS ── */
    const ctx = canvas.getContext('2d')
    let W, H
    function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight}
    resize()

    /* ── GEOMETRY ── */
    function catmullRom(pts,seg){const out=[];for(let i=0;i<pts.length-1;i++){const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];for(let j=0;j<seg;j++){const t=j/seg,t2=t*t,t3=t2*t;out.push([.5*((2*p1[0])+(-p0[0]+p2[0])*t+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),.5*((2*p1[1])+(-p0[1]+p2[1])*t+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3)])}}out.push([...pts[pts.length-1]]);return out}
    function offsetPoly(pts,dist){return pts.map(([x,y],i)=>{const a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)];const tx=b[0]-a[0],ty=b[1]-a[1],len=Math.sqrt(tx*tx+ty*ty)||1;return[x+(-ty/len)*dist,y+(tx/len)*dist]})}
    function ptSegDist(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy;const t=l2>0?clamp(((px-ax)*dx+(py-ay)*dy)/l2,0,1):0;return Math.hypot(ax+t*dx-px,ay+t*dy-py)}
    function signedRiverDistanceNorm(px,py){let best=1e9,bestSign=1;const rn=_riverPixPts;for(let i=0;i<rn.length-1;i++){const ax=rn[i][0],ay=rn[i][1],bx=rn[i+1][0],by=rn[i+1][1];const dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy;const t=l2>0?clamp(((px-ax)*dx+(py-ay)*dy)/l2,0,1):0;const qx=ax+t*dx,qy=ay+t*dy;const vx=px-qx,vy=py-qy;const d=Math.hypot(vx,vy);if(d<best){best=d;const cross=dx*vy-dy*vx;bestSign=cross>=0?1:-1}}return bestSign*best/W}
    function canyonShadeProfile(signedD,nx,ny){const d=Math.abs(signedD);const near=Math.exp(-Math.pow(d/.040,2));const mid=Math.exp(-Math.pow((d-.065)/.055,2))*.88;const upper=Math.exp(-Math.pow((d-.140)/.090,2))*.52;const wash=Math.exp(-Math.pow((d-.260)/.130,2))*.22;const wallBias=signedD<0?1.32:.82;const mottled=lerp(.64,1.28,fbm2(nx*7.5+1.4,ny*6.4+5.2,4));const shelf=lerp(.78,1.14,fbm2(nx*2.1+9.0,ny*2.8+2.5,3));return(near*.82+mid*.72+upper*.44+wash*.18)*wallBias*mottled*shelf}
    let riverLen=[],riverTotalLen=0
    function buildArcLen(pts){riverLen=[0];for(let i=1;i<pts.length;i++)riverLen.push(riverLen[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));riverTotalLen=riverLen[riverLen.length-1]}
    function _bseg(d){let lo=0,hi=riverLen.length-1;while(lo<hi-1){const m=(lo+hi)>>1;if(riverLen[m]<=d)lo=m;else hi=m;}return[lo,hi]}
    function ptAt(pts,d){if(!riverTotalLen)return[0,0];d=((d%riverTotalLen)+riverTotalLen)%riverTotalLen;const[lo,hi]=_bseg(d),span=riverLen[hi]-riverLen[lo]||1,t=(d-riverLen[lo])/span;return[lerp(pts[lo][0],pts[hi][0],t),lerp(pts[lo][1],pts[hi][1],t)]}
    function tanAt(pts,d){if(!riverTotalLen)return[1,0];d=((d%riverTotalLen)+riverTotalLen)%riverTotalLen;const[lo,hi]=_bseg(d);const dx=pts[hi][0]-pts[lo][0],dy=pts[hi][1]-pts[lo][1],len=Math.hypot(dx,dy)||1;return[dx/len,dy/len]}

    /* ── RIVER CENTERLINE ── */
    const RIVER_NORM=[[-0.1200,0.3550],[-0.0600,0.3550],[0.0000,0.3550],[0.0300,0.3550],[0.0326,0.3869],[0.0714,0.4116],[0.1024,0.4452],[0.1307,0.4871],[0.1688,0.5122],[0.2218,0.5349],[0.2891,0.5399],[0.3558,0.5296],[0.3979,0.5431],[0.4271,0.5679],[0.4679,0.5802],[0.5065,0.6025],[0.5467,0.6031],[0.6046,0.5940],[0.6651,0.5945],[0.7157,0.6040],[0.7676,0.6350],[0.8056,0.6336],[0.8418,0.6141],[0.8658,0.5899],[0.8927,0.5717],[0.9306,0.5856],[0.9700,0.5901],[1.0200,0.5950],[1.1000,0.6020]]
    function normToCanvas(n){return n.map(([nx,ny])=>[nx*W,ny*H])}

    /* ── ELEVATION ── */
    let _distCache=null
    let _riverPixPts=[]
    function riverDistNorm(px,py){let minD=1e9;const rn=_riverPixPts;for(let i=0;i<rn.length-1;i++){const d=ptSegDist(px,py,rn[i][0],rn[i][1],rn[i+1][0],rn[i+1][1]);if(d<minD)minD=d}return minD/W}
    function sampleElev(px,py){const nd=riverDistNorm(px,py);let e;if(nd<0.006)e=670+nd/0.006*22;else if(nd<0.036)e=lerp(692,740,Math.pow((nd-.006)/.030,.5));else if(nd<0.090)e=lerp(740,830,Math.pow((nd-.036)/.054,.65));else if(nd<0.135)e=lerp(830,896,(nd-.090)/.045);else e=lerp(896,907,Math.min(1,(nd-.135)/.04));const nx=px/W,ny=py/H;e+=(nx-.5)*8+(ny-.5)*-5;e+=fbm2(nx*5.2+7.1,ny*4.8+2.3,4)*16-8;e+=vn2(nx*14,ny*12)*5-2.5;return e}

    /* ── MARCHING SQUARES ── */
    function edgePt(x0,y0,v0,x1,y1,v1,thr){const t=(thr-v0)/(v1-v0);return[lerp(x0,x1,t),lerp(y0,y1,t)]}
    function marchSquares(grid,gW,gH,cW,cH,oX,oY,thr){const segs=[];for(let r=0;r<gH-1;r++){for(let c=0;c<gW-1;c++){const bl=grid[r*gW+c],br=grid[r*gW+c+1],tr=grid[(r+1)*gW+c+1],tl=grid[(r+1)*gW+c];const x0=oX+c*cW,x1=oX+(c+1)*cW,y0=oY+(gH-1-r)*cH,y1=oY+(gH-1-(r+1))*cH;const idx=(bl>=thr?1:0)|(br>=thr?2:0)|(tr>=thr?4:0)|(tl>=thr?8:0);if(!idx||idx===15)continue;const bot=()=>edgePt(x0,y0,bl,x1,y0,br,thr);const rgt=()=>edgePt(x1,y0,br,x1,y1,tr,thr);const top=()=>edgePt(x0,y1,tl,x1,y1,tr,thr);const lft=()=>edgePt(x0,y0,bl,x0,y1,tl,thr);const T={1:[lft(),bot()],2:[bot(),rgt()],3:[lft(),rgt()],4:[rgt(),top()],6:[bot(),top()],7:[lft(),top()],8:[top(),lft()],9:[bot(),top()],11:[bot(),rgt()],12:[rgt(),lft()],13:[rgt(),bot()],14:[top(),lft()]};if(idx===5){segs.push([lft(),bot()]);segs.push([rgt(),top()]);}else if(idx===10){segs.push([lft(),top()]);segs.push([bot(),rgt()]);}else if(T[idx])segs.push(T[idx]);}}return segs}
    function chainSegs(segs){if(!segs.length)return[];const TOL=2,used=new Uint8Array(segs.length),chains=[];for(let i=0;i<segs.length;i++){if(used[i])continue;const ch=[...segs[i]];used[i]=1;let ext=true;while(ext){ext=false;for(let j=0;j<segs.length;j++){if(used[j])continue;const[a,b]=segs[j];const tl=ch[ch.length-1];if(Math.hypot(tl[0]-a[0],tl[1]-a[1])<TOL){ch.push(b);used[j]=1;ext=true;break;}if(Math.hypot(tl[0]-b[0],tl[1]-b[1])<TOL){ch.push(a);used[j]=1;ext=true;break;}}}if(ch.length>1)chains.push(ch)}return chains}

    /* ── GEOMETRY / FLOW ── */
    const COFF_N=[.018,.052,.104],COFF_S=[.034,.092],POFF=[.170,.205,.245],NC=COFF_N.length
    const PERS=COFF_N.map((_,i)=>({seed:i*17.3+3.7,ds:i*23.1+11.4,da:lerp(.09,.018,i/(NC-1)),dsp:.13+[0,.07,.03,.09,.02,.06,.04,.08,.01,.05,.03][i],eA:lerp(.72,.90,i/(NC-1)),eB:lerp(.82,.94,i/(NC-1)),delay:.24+i*.12}))
    function computeMask(n,intensity,seed){const m=new Uint8Array(n);for(let i=0;i<n;i++)m[i]=(vn(i/n*8.4+seed)*.45+fbm(i/n*2.1+seed*.37,3)*.55)>intensity?1:0;return m}
    let riverPts=[],cA=[],cB=[],mA=[],mB=[],pA=[],pB=[],pmA=[],pmB=[]
    let baseCanvas=null
    function updateTreeClip(){const el=treeRef.current;if(!el||!riverPts||riverPts.length<2)return;const pts=riverPts.map(([x,y])=>`${(x/W*100).toFixed(2)}% ${(y/H*100).toFixed(2)}%`);pts.push('100% 0%','0% 0%');el.style.clipPath=`polygon(${pts.join(', ')})`}
    function buildGeometry(){if(riverPts.length<2)return;buildArcLen(riverPts);cA=[];cB=[];mA=[];mB=[];COFF_N.forEach((off,i)=>{const px=off*W,p=PERS[i];const a=offsetPoly(riverPts,px*(1+0.08*vn(i*9.3)));cA.push(a);mA.push(computeMask(a.length,p.eA,p.seed))});COFF_S.forEach((off,i)=>{const px=off*W;const b=offsetPoly(riverPts,-px*(1+0.18*vn(i*11.7+3)));cB.push(b);mB.push(computeMask(b.length,lerp(.64,.90,i/Math.max(1,COFF_S.length-1)),100+i*31.2))});pA=[];pB=[];pmA=[];pmB=[];POFF.forEach((off,i)=>{const px=off*W;const a=offsetPoly(riverPts,px*(1+.05*vn(i+40)));const b=offsetPoly(riverPts,-px*(1+.20*vn(i+50)));pA.push(a);pB.push(b);pmA.push(computeMask(a.length,.84,300+i*47));pmB.push(computeMask(b.length,.90,350+i*47))});initFlow()}

    const DASHES=(()=>{const D=[];[[.09,18,64,6.2,.060,0],[.53,21,52,5.8,.050,0]].forEach(([ph,sp,ln,lw,a,lat])=>D.push({ph:ph*0,_ph:ph,sp,ln,lw,a,lat,rgb:[72,176,205]}));[.00,.21,.43,.64,.85].forEach((bp,i)=>{D.push({_ph:bp,sp:32+vn(i*3.7+1)*14,ln:16+vn(i*6.1+2)*14,lw:1.0+vn(i*2.1)*0.35,a:.085+vn(i*9.2)*0.045,lat:(vn(i*11.4+5)-.5)*1.6,rgb:[72,176,205]})});[.07,.26,.46,.67,.87].forEach((bp,i)=>{D.push({_ph:bp,sp:50+vn(i*4.9+50)*18,ln:5+vn(i*8.7+50)*7,lw:.72,a:.050+vn(i*7.3+50)*0.030,lat:(vn(i*10.3+100)-.5)*3.8,rgb:[72,176,205]})});return D})()
    let dashOffsets=[]
    function strokePoly(c,pts,lw,style){if(!pts||pts.length<2)return;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.lineWidth=lw;c.strokeStyle=style;c.lineCap='round';c.lineJoin='round';c.stroke()}
    function buildBaseLayer(){
      if(!W||!H||riverPts.length<2)return
      baseCanvas=document.createElement('canvas');baseCanvas.width=W;baseCanvas.height=H
      const b=baseCanvas.getContext('2d')
      b.fillStyle='#F5EFE6';b.fillRect(0,0,W,H)
      // —— TUNE: subtle canyon warmth + faint contour hints ——
      strokePoly(b,riverPts,0.05*W,'rgba(120,96,60,0.016)')
      ;[0.016,0.026,-0.016,-0.026].forEach((o,i)=>strokePoly(b,offsetPoly(riverPts,o*W),1,'rgba(112,80,52,'+(0.022-i*0.005)+')'))
      // —— baked river, settled appearance (matches the intro's final strokes) ——
      strokePoly(b,riverPts,30,'rgba(28,92,116,0.040)')
      strokePoly(b,riverPts,14,'rgba(72,176,205,0.075)')
      strokePoly(b,riverPts,3.2,'rgba(72,176,205,0.34)')
    }
    function initFlow(){if(!riverTotalLen)return;dashOffsets=DASHES.map(d=>d._ph*riverTotalLen+(vn(d._ph*37.1)-.5)*riverTotalLen*.04)}

    const REDUCE_MOTION=window.matchMedia('(prefers-reduced-motion:reduce)').matches
    function maxJumpSq(){return(Math.max(W,1)*.15)*(Math.max(W,1)*.15)}
    function drawFlowDash(d0,dashLen,lateral,r,g,b,baseAlpha,lw){if(!riverTotalLen||dashLen<1)return;const fadeOut=clamp((riverTotalLen-d0)/dashLen,0,1);const fadeIn=clamp(d0/dashLen,0,1);const wrap=Math.min(fadeOut,fadeIn);if(wrap<.01)return;const now=performance.now()/1000;const globalWeather=weatherEnvelope(now);const steps=Math.max(3,Math.round(dashLen/3));ctx.lineWidth=lw;ctx.lineCap='round';for(let s=0;s<steps;s++){const t0=s/steps,t1=(s+1)/steps;const env=t0<.22?t0/.22:t0>.78?(1-t0)/.22:1;const da=d0+dashLen*t0,db=d0+dashLen*t1;let[x0,y0]=ptAt(riverPts,da);let[x1,y1]=ptAt(riverPts,db);if(lateral){const[tx0,ty0]=tanAt(riverPts,da);const[tx1,ty1]=tanAt(riverPts,db);x0-=ty0*lateral;y0+=tx0*lateral;x1-=ty1*lateral;y1+=tx1*lateral;}const ddx=x1-x0,ddy=y1-y0;if(ddx*ddx+ddy*ddy>maxJumpSq())continue;const xf=clamp(x0/(W*.14),0,1)*clamp((W-x0)/(W*.04),0,1);const vis=riverVisibility(da,now);const silence=1-silenceMask(x0,y0)*.65;const material=pigmentDeposit(x0,y0);const alpha=baseAlpha*env*wrap*xf*vis*silence*material*lerp(.60,1,globalWeather);if(alpha<.004)continue;ctx.strokeStyle=`rgba(${r},${g},${b},${alpha.toFixed(3)})`;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke()}}
    const ND=24
    function distort(pts,seed,amp,spd,elapsed){const env=weatherEnvelope(elapsed)*vn(elapsed*.036+seed*.06);const base=env<.28?amp*.025:env<.50?amp*.15:amp*(env*.72+.08);if(base<.025)return pts;const t=elapsed*spd;const dy=[],dx=[];for(let c=0;c<ND;c++){const nx=c/(ND-1);dy.push((fbm(nx*1.2+t*.26+seed*2.1,4)*.72+vn(nx*4.1+t+seed)*.28-.5)*base*2.0);dx.push((vn(nx*2.6+t*.5+seed+50)-.5)*base*.16)}return pts.map(([x,y],i)=>{const nx=i/Math.max(1,pts.length-1),cv=nx*(ND-1),c0=Math.floor(cv),c1=Math.min(ND-1,c0+1),tf=cv-c0;const turb=turbulenceField(x,y,elapsed);const nd=riverDistNorm(x,y);const nearRiver=clamp(1-nd/.08,0,1);const thermal=nearRiver*(fbm2(x*.005+elapsed*.02,y*.005,2)-.5);const localAmp=lerp(.18,1.12,turb)*lerp(.75,1.18,nearRiver);return[x+lerp(dx[c0],dx[c1],tf)*localAmp+thermal*1.35,y+lerp(dy[c0],dy[c1],tf)*localAmp+thermal*.60]})}
    let ACTIVE_TRACE_WINDOW=null
    function drawLine(pts,mask,fi,r,g,b,a,lw,noLDeadZone){if(fi<=0||!pts.length)return;ctx.globalAlpha=fi;ctx.lineWidth=lw;ctx.lineJoin='round';ctx.lineCap='round';let ip=false;ctx.beginPath();for(let i=0;i<pts.length;i++){const[x,y]=pts[i];if(ACTIVE_TRACE_WINDOW){const nx=x/W,ny=y/H;const dx=(nx-ACTIVE_TRACE_WINDOW.x)/ACTIVE_TRACE_WINDOW.w;const dy=(ny-ACTIVE_TRACE_WINDOW.y)/ACTIVE_TRACE_WINDOW.h;if(dx*dx+dy*dy>1){if(ip){ctx.stroke();ctx.beginPath();ip=false;}continue;}}if(!noLDeadZone&&x<W*.13){if(ip){ctx.stroke();ctx.beginPath();ip=false;}continue;}const eR=clamp((W-x)/(W*.04),0,1),eT=clamp(y/(H*.07),0,1),eB=clamp((H-y)/(H*.09),0,1);if(eR<.07||eT<.07||eB<.07){if(ip){ctx.stroke();ctx.beginPath();ip=false;}continue;}if(mask&&!mask[i]){if(ip){ctx.stroke();ctx.beginPath();ip=false;}continue;}const lf=noLDeadZone?1:clamp((x/W-.13)/.11,0,1);const nd=riverDistNorm(x,y);const nearRiver=clamp(1-nd/.08,0,1);const turb=turbulenceField(x,y,performance.now()/1000);const silence=1-silenceMask(x,y)*.84;const compression=lerp(1,.70,nearRiver*turb*.85);const material=pigmentDeposit(x,y)*microDropout(x,y);const alpha=a*Math.min(lf,eR,eT,eB)*silence*compression*material;if(alpha<.003){if(ip){ctx.stroke();ctx.beginPath();ip=false;}continue;}ctx.strokeStyle=`rgba(${r},${g},${b},${alpha.toFixed(3)})`;if(!ip){ctx.moveTo(x,y);ip=true;}else{const prev=pts[i-1];const jump=prev?Math.hypot(x-prev[0],y-prev[1]):0;if(jump>Math.max(18,W*.035)){ctx.stroke();ctx.beginPath();ctx.moveTo(x,y);}else ctx.lineTo(x,y);}}if(ip)ctx.stroke();ctx.globalAlpha=1}

    /* ── RENDER LOOP ── */
    let T0=null,introStartTs=null
    const RIV_DUR=5600,BG_DUR=1800,SHADE_DUR=2200
    function easeIn(t){t=clamp(t,0,1);return t*t}
    function ease(t){t=clamp(t,0,1);return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
    function drawRiverToLen(pts,maxLen,alpha,lw,r=72,g=176,b=205){if(!pts.length||maxLen<=0)return;ctx.strokeStyle=`rgba(${r},${g},${b},${alpha})`;ctx.lineWidth=lw;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);let drawn=0;for(let i=1;i<pts.length;i++){const dx=pts[i][0]-pts[i-1][0],dy=pts[i][1]-pts[i-1][1];const seg=Math.sqrt(dx*dx+dy*dy)||0;if(drawn+seg>=maxLen){const t=(maxLen-drawn)/(seg||1);ctx.lineTo(pts[i-1][0]+t*dx,pts[i-1][1]+t*dy);break;}ctx.lineTo(pts[i][0],pts[i][1]);drawn+=seg;}ctx.stroke()}
    function drawRiverWindow(pts,startLen,endLen,alpha,lw,r=74,g=124,b=111){if(!pts.length||endLen<=0||endLen<=startLen)return;startLen=Math.max(0,startLen);endLen=Math.min(riverTotalLen,endLen);ctx.strokeStyle=`rgba(${r},${g},${b},${alpha})`;ctx.lineWidth=lw;ctx.lineCap='round';ctx.lineJoin='round';let drawn=0,ip=false;ctx.beginPath();for(let i=1;i<pts.length;i++){const p0=pts[i-1],p1=pts[i];const dx=p1[0]-p0[0],dy=p1[1]-p0[1];const seg=Math.sqrt(dx*dx+dy*dy)||0;const a=drawn,bLen=drawn+seg;if(bLen<startLen){drawn=bLen;continue;}if(a>endLen)break;const from=clamp((startLen-a)/(seg||1),0,1);const to=clamp((endLen-a)/(seg||1),0,1);const x0=p0[0]+dx*from,y0=p0[1]+dy*from;const x1=p0[0]+dx*to,y1=p0[1]+dy*to;if(!ip){ctx.moveTo(x0,y0);ip=true;}ctx.lineTo(x1,y1);drawn=bLen;}if(ip)ctx.stroke()}
    function drawRiverWindowOffset(pts,startLen,endLen,alpha,lw,lateral,r=74,g=124,b=111){if(!pts.length||endLen<=0||endLen<=startLen)return;startLen=Math.max(0,startLen);endLen=Math.min(riverTotalLen,endLen);ctx.strokeStyle=`rgba(${r},${g},${b},${alpha})`;ctx.lineWidth=lw;ctx.lineCap='round';ctx.lineJoin='round';let drawn=0,ip=false;ctx.beginPath();for(let i=1;i<pts.length;i++){const p0=pts[i-1],p1=pts[i];const dx=p1[0]-p0[0],dy=p1[1]-p0[1];const seg=Math.sqrt(dx*dx+dy*dy)||0;const a=drawn,bLen=drawn+seg;if(bLen<startLen){drawn=bLen;continue;}if(a>endLen)break;const from=clamp((startLen-a)/(seg||1),0,1);const to=clamp((endLen-a)/(seg||1),0,1);const len=Math.sqrt(dx*dx+dy*dy)||1;const nx=-dy/len,ny=dx/len;const x0=p0[0]+dx*from+nx*lateral,y0=p0[1]+dy*from+ny*lateral;const x1=p0[0]+dx*to+nx*lateral,y1=p0[1]+dy*to+ny*lateral;if(!ip){ctx.moveTo(x0,y0);ip=true;}ctx.lineTo(x1,y1);drawn=bLen;}if(ip)ctx.stroke()}
    function drawIntroFlow(maxLen,elapsed){if(REDUCE_MOTION||maxLen<80)return;const count=9;for(let i=0;i<count;i++){const seed=i*19.7+3.1;const speed=42+vn(seed)*34;const len=86+vn(seed+4)*120;const phase=vn(seed+9)*maxLen;const head=(elapsed*speed+phase)%Math.max(140,maxLen);const tail=Math.max(0,head-len);const fade=clamp(maxLen/320,0,1)*(.82+.18*Math.sin(elapsed*.65+i));const alpha=(.055+vn(seed+2)*.060)*fade;const width=.75+vn(seed+7)*.85;const lateral=(vn(seed+12)-.5)*6.0;drawRiverWindowOffset(riverPts,tail,head,alpha,width,lateral,72,176,205)}const lead=Math.max(0,maxLen-320);drawRiverWindow(riverPts,lead,maxLen,.034,7,28,92,116);drawRiverWindow(riverPts,Math.max(0,lead-160),maxLen,.016,12,28,92,116);drawRiverWindow(riverPts,Math.max(0,maxLen-90),maxLen,.145,3.2,168,224,235)}
    function drawTerrainReveal(maxLen,progress,elapsed){ctx.fillStyle='#F5EFE6';ctx.fillRect(0,0,W,H);const pulse=.84+.16*Math.sin(elapsed*.80);drawRiverWindow(riverPts,Math.max(0,maxLen-220),maxLen,.032*pulse,12,28,92,116);drawRiverWindow(riverPts,Math.max(0,maxLen-150),maxLen,.065*pulse,6,72,176,205);drawRiverWindow(riverPts,Math.max(0,maxLen-90),maxLen,.22,1.45,168,224,235)}

    function frame(ts){
      if(!T0)T0=ts
      const elapsed=(ts-T0)/1000
      ctx.clearRect(0,0,W,H)
      if(introStartTs===null||!riverPts.length){ctx.fillStyle='#F5EFE6';ctx.fillRect(0,0,W,H);frameRafId=requestAnimationFrame(frame);return}
      const introMs=Math.max(0,ts-introStartTs)
      const rivP=REDUCE_MOTION?1:ease(introMs/RIV_DUR)
      const rivLen=rivP*riverTotalLen
      ctx.fillStyle='#F5EFE6';ctx.fillRect(0,0,W,H)
      if(rivP<1){drawTerrainReveal(rivLen,rivP,elapsed);drawRiverToLen(riverPts,rivLen,.040,30,28,92,116);drawRiverToLen(riverPts,rivLen,.075,14,72,176,205);drawRiverToLen(riverPts,rivLen,.34,3.2,72,176,205);drawIntroFlow(rivLen,elapsed);drawRiverWindow(riverPts,Math.max(0,rivLen-80),rivLen,.12,3.2,168,224,235);}else{
      // —— Hybrid: blit the baked base, animate only the gentle flow ——
      if(baseCanvas)ctx.drawImage(baseCanvas,0,0)
      if(!REDUCE_MOTION){
        const win=Math.min(riverTotalLen*0.5,220),head=(elapsed*46)%riverTotalLen
        // head-weighted highlight; drawRiverWindowOffset clamps at the ends → no seam line
        drawRiverWindowOffset(riverPts,head-win,head,.06,1.6,0,168,224,235)
        drawRiverWindowOffset(riverPts,head-win*0.5,head,.12,1.4,0,168,224,235)
        drawRiverWindowOffset(riverPts,head-win*0.18,head,.22,1.2,0,168,224,235)
        for(let i=0;i<6;i++){const seed=i*29.3+8.1;const pos=(elapsed*(40+vn(seed)*22)+vn(seed+5)*riverTotalLen)%riverTotalLen;const len=70+vn(seed+2)*70;const lat=(vn(seed+7)-.5)*5;drawRiverWindowOffset(riverPts,pos-len,pos,.05+vn(seed+9)*.05,1.3+vn(seed+3)*1.2,lat,168,224,235)}
      }
    }
      frameRafId=requestAnimationFrame(frame)
    }
    frameRafId=requestAnimationFrame(frame)

    /* ── INIT ── */
    function revealUI(){
      // Only the tree animates in; text/buttons/links render immediately (like dark mode)
      const tree=treeRef.current;if(tree)setTimeout(()=>{tree.style.opacity='.52'},3000)
    }

    async function init(){
      resize()
      _riverPixPts=catmullRom(normToCanvas(RIVER_NORM),100)
      riverPts=[..._riverPixPts]
      await new Promise(r=>setTimeout(r,0))
      buildGeometry()
      updateTreeClip()
      buildBaseLayer()
      if(document.fonts&&document.fonts.ready){try{await document.fonts.ready}catch(e){}}
      await new Promise(requestAnimationFrame)
      await new Promise(requestAnimationFrame)
      requestAnimationFrame(ts=>{
        introStartTs=ts
        revealUI()
        setTimeout(()=>{const t=treeRef.current;if(t)t.style.opacity='0.9'},RIV_DUR+900+SHADE_DUR+2500)
      })
    }

    rafId=requestAnimationFrame(()=>init())

    const onResize=()=>{
      clearTimeout(resizeTimer)
      resizeTimer=setTimeout(()=>{
        resize()
        _riverPixPts=catmullRom(normToCanvas(RIVER_NORM),100)
        riverPts=[..._riverPixPts]
        buildGeometry()
        updateTreeClip()
        buildBaseLayer()
      },160)
    }
    window.addEventListener('resize',onResize)

    /* ── PAUSE WHEN OFF-SCREEN OR TAB HIDDEN ── */
    function startLoop(){
      if(!paused) return
      paused=false
      if(pausedAt){
        const dt=performance.now()-pausedAt
        if(T0!=null)T0+=dt
        if(introStartTs!=null)introStartTs+=dt
        pausedAt=0
      }
      frameRafId=requestAnimationFrame(frame)
    }
    function stopLoop(){
      if(paused) return
      paused=true
      pausedAt=performance.now()
      cancelAnimationFrame(frameRafId)
    }
    function syncLoop(){ if(inView && tabVisible) startLoop(); else stopLoop() }
    io=new IntersectionObserver(es=>{ inView=es[0].isIntersecting; syncLoop() },{threshold:0})
    io.observe(canvas)
    const onVisibility=()=>{ tabVisible=!document.hidden; syncLoop() }
    document.addEventListener('visibilitychange',onVisibility)
    tabVisible=!document.hidden; syncLoop()

    return () => {
      cancelAnimationFrame(rafId)
      cancelAnimationFrame(frameRafId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize',onResize)
      document.removeEventListener('visibilitychange',onVisibility)
      if(io)io.disconnect()
    }
  }, [])

  return (
    <>
      <style>{CSS}</style>
      <section className="hero-light" aria-label="Greg T. Chism personal site hero">
        <canvas id="topo-canvas" ref={canvasRef} aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img id="tree-sketch" ref={treeRef} src="/images/tree-sketch.png" alt="" aria-hidden="true" />
        <div id="paper-overlay" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-eyebrow" ref={eyebrowRef}>data scientist · bend, or</p>
          <h1 className="hero-name">
            <span className="line"><span ref={el => { if (el) nameSpansRef.current[0] = el }}>Greg</span></span>
            <span className="line"><span ref={el => { if (el) nameSpansRef.current[1] = el }}>T. <em>Chism</em></span></span>
          </h1>
          <p className="hero-tagline" ref={taglineRef}>
            Turning complex data into decisions that matter — for universities, health systems, and the communities between them.
          </p>
          <div className="hero-ctas" ref={ctasRef}>
            <a className="btn-solid" href="/work">See the work</a>
            <a className="btn-ghost" href="/about">About</a>
            <a className="btn-ghost" href="/reading">Reading</a>
          </div>
        </div>
        <div className="canyon-label" ref={labelRef}>Deschutes River · Central Oregon</div>
        <div className="hero-scroll" ref={scrollRef}><div className="scroll-bar" /></div>
      </section>
    </>
  )
}
