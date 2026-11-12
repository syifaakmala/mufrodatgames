const strip=s=>s.replace(/[\u064B-\u0652\u0640]/g,"");
// Data: arab berharakat | arti | gambar(emoji). Tambah/ubah kata di sini (disarankan 15-20 kata/tema).
const D=[
["Keluarga & rumah","الأَسْرَةُ وَالْبَيْتُ","أَبٌ|ayah|👨;أُمٌّ|ibu|👩;أَخٌ|saudara laki-laki|👦;أُخْتٌ|saudara perempuan|👧;جَدٌّ|kakek|👴;جَدَّةٌ|nenek|👵;بَيْتٌ|rumah|🏠;غُرْفَةٌ|kamar|🛏️"],
["Waktu & hari","الْوَقْتُ وَالْأَيَّامُ","سَاعَةٌ|jam|⏰;يَوْمٌ|hari|📅;أُسْبُوعٌ|pekan|🗓️;شَهْرٌ|bulan|📆;سَنَةٌ|tahun|🎆;صَبَاحٌ|pagi|🌅;مَسَاءٌ|sore|🌇;لَيْلٌ|malam|🌃"],
["Tempat umum","الْأَمَاكِنُ الْعَامَّةُ","مَسْجِدٌ|masjid|🕌;سُوقٌ|pasar|🛒;مَكْتَبَةٌ|perpustakaan|📚;مُسْتَشْفَى|rumah sakit|🏥;مَطَارٌ|bandara|✈️;حَدِيقَةٌ|taman|🌳;مَطْعَمٌ|restoran|🍽️;مَدِينَةٌ|kota|🏙️"],
["Profesi","الْمِهَنُ","طَبِيبٌ|dokter|👨‍⚕️;مُعَلِّمٌ|guru|👨‍🏫;مُهَنْدِسٌ|insinyur|👷;شُرْطِيٌّ|polisi|👮;طَيَّارٌ|pilot|🧑‍✈️;فَلَّاحٌ|petani|👨‍🌾;طَبَّاخٌ|juru masak|👨‍🍳;طَالِبٌ|siswa|🧑‍🎓"],
["Makanan & minuman","الطَّعَامُ وَالشَّرَابُ","خُبْزٌ|roti|🍞;مَاءٌ|air|💧;حَلِيبٌ|susu|🥛;لَحْمٌ|daging|🥩;سَمَكٌ|ikan|🐟;أُرْزٌ|nasi|🍚;بَيْضٌ|telur|🥚;جُبْنٌ|keju|🧀"],
["Hewan","الْحَيَوَانَاتُ","أَسَدٌ|singa|🦁;قِطٌّ|kucing|🐱;فِيلٌ|gajah|🐘;كَلْبٌ|anjing|🐶;حِصَانٌ|kuda|🐴;بَقَرَةٌ|sapi|🐄;جَمَلٌ|unta|🐪;عُصْفُورٌ|burung|🐦"],
["Buah-buahan","الْفَوَاكِهُ","تُفَّاحٌ|apel|🍎;مَوْزٌ|pisang|🍌;عِنَبٌ|anggur|🍇;بُرْتُقَالٌ|jeruk|🍊;فَرَاوِلَةٌ|stroberi|🍓;بِطِّيخٌ|semangka|🍉;أَنَانَاسٌ|nanas|🍍;خَوْخٌ|persik|🍑"],
["Sekolah & kelas","الْمَدْرَسَةُ وَالْفَصْلُ","كِتَابٌ|buku|📖;قَلَمٌ|pena|✏️;سَبُّورَةٌ|papan tulis|📋;مِسْطَرَةٌ|penggaris|📏;حَقِيبَةٌ|tas|🎒;مِقَصٌّ|gunting|✂️;كُرَّاسَةٌ|buku tulis|📓;كُرْسِيٌّ|kursi|🪑"],
["Angka","الْأَرْقَامُ","وَاحِدٌ|satu (1)|1️⃣;اِثْنَانِ|dua (2)|2️⃣;ثَلَاثَةٌ|tiga (3)|3️⃣;أَرْبَعَةٌ|empat (4)|4️⃣;خَمْسَةٌ|lima (5)|5️⃣;سِتَّةٌ|enam (6)|6️⃣;سَبْعَةٌ|tujuh (7)|7️⃣;ثَمَانِيَةٌ|delapan (8)|8️⃣"]
].map(([n,a,w])=>({n,a,w:w.split(";").map(s=>{const[x,m,e]=s.split("|");return{x,m,e,b:strip(x)}})}));
const GN=["Mufradat Catcher","Mufradat Match","Arabic Word Search","Arrange the Letters"];
const B={levels:"home",themes:"levels",theme:"themes",play:"theme",res:"theme"};
const $=i=>document.getElementById(i),shuf=a=>[...a].sort(()=>Math.random()-.5);
const st=s=>s>=90?3:s>=80?2:s>=60?1:0;
const speak=t=>{try{const u=new SpeechSynthesisUtterance(t);u.lang="ar-SA";speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}};
let S;try{S=JSON.parse(localStorage.mg)}catch(e){}S=S||{b:{},xp:0};
const save=()=>{try{localStorage.mg=JSON.stringify(S)}catch(e){}};
const key=(l,t,g)=>l+"-"+t+"-"+g;
const passed=l=>Object.keys(S.b).filter(k=>k[0]==l&&S.b[k]>=60).length;
const open=l=>l==0||passed(l-1)>=36;
let V={v:"home",l:0,t:0,g:0},T=0,miss=[];
const go=(v,o={})=>{V={...V,...o,v};render()};
function render(){T++;const m=$("app"),d=D[V.t];let h="";
$("st").textContent=`⭐ XP ${S.xp} · Misi ${Object.values(S.b).filter(x=>x>=60).length}/108`;
const bk=B[V.v]?`<p><button onclick="go('${B[V.v]}')">← Kembali</button></p>`:"";
if(V.v=="home")h=`<div class=c><h1>🎯 Mufradat Games</h1><p>Belajar kosakata Arab lewat 4 permainan seru. Selesaikan misi, kumpulkan XP dan bintang!</p><button class="c b" onclick="go('levels')">Mulai Petualangan</button></div>`;
if(V.v=="levels")h=`<h2>Pilih Level</h2>`+["Mudah","Sedang","Sulit"].map((n,l)=>`<button class="c b" ${open(l)?"":"disabled"} onclick="go('themes',{l:${l}})">${open(l)?"":"🔒 "}Level ${l+1} — ${n}<small>${passed(l)}/36 misi lulus${open(l)?"":" · selesaikan 36 misi level sebelumnya"}</small></button>`).join("");
if(V.v=="themes")h=`<h2>Level ${V.l+1}: Pilih Tema</h2><div class=gr>`+D.map((x,t)=>`<button class="c b" onclick="go('theme',{t:${t}})"><div class=big>${x.w[0].e}</div>${x.n}<small>${[0,1,2,3].filter(g=>(S.b[key(V.l,t,g)]||0)>=60).length}/4 misi</small></button>`).join("")+`</div>`;
if(V.v=="theme")h=`<h2>${d.n}</h2><p class=ar>${d.a}</p><h3>Pilih Game (Level ${V.l+1})</h3><div class=gr>`+GN.map((n,g)=>{const s=S.b[key(V.l,V.t,g)]||0;return`<button class="c b" onclick="play(${g})">${n}<small>${"⭐".repeat(st(s))||"—"} · terbaik ${s}</small></button>`}).join("")+`</div><h3>Belajar Mufradat</h3><div class=gr>`+d.w.map(w=>`<div class=c><div class=big>${w.e}</div><div class=ar>${w.x}</div>${w.m}<br><button onclick="speak('${w.x}')">🔊</button></div>`).join("")+`</div>`;
if(V.v=="play")h=`<div id=g></div>`;
if(V.v=="res"){const ms=[...new Set(miss)];h=`<div class=c><h2>${V.sc>=60?"Misi lulus! 🎉":"Belum lulus, ayo ulangi!"}</h2><div class=big>${"⭐".repeat(st(V.sc))||"☆"}</div><h1>${V.sc}</h1><p>+${V.gx} XP</p>${ms.length?`<p>Kata untuk diulang:</p>`+ms.map(x=>`<div class=ar>${x.x} — ${x.m}</div>`).join(""):"<p>Tanpa kesalahan!</p>"}<button class="c b" onclick="play(${V.g})">Main lagi</button><button class="c b" onclick="go('theme')">Pilih game lain</button></div>`}
m.innerHTML=bk+h}
function play(g){V.g=g;miss=[];go("play");[C,M,W,A][g](D[V.t].w,V.l)}
function fin(sc){const k=key(V.l,V.t,V.g),o=S.b[k]||0;let gx=0;
if(sc>o){gx=10*Math.max(0,st(sc)-st(o))+(o<60&&sc>=60?20:0);S.b[k]=sc;S.xp+=gx;save()}
go("res",{sc,gx})}
// Game 1: Catcher
function C(w,l){const g=$("g"),tok=T,sp=[1.6,2.4,3.4][l],no=[3,5,8][l];let life=[5,3,2][l],sc=0,r=0,o=[],tg;
g.innerHTML=`<div id=hud></div><div id=sg class=stage><div id=zone></div></div><p>Klik objek yang sesuai petunjuk keranjang saat berada di zona kuning.</p>`;
const s=$("sg"),clr=()=>{o.forEach(e=>e.remove());o=[]},end=()=>fin(Math.round(sc/8*100));
const hud=()=>$("hud").innerHTML=`<span>Misi ${r}/8 · ❤️ ${life} · Poin ${sc}</span><span>🧺 <b class=ar>${tg.x}</b> ${l?"":tg.m}</span>`;
function nr(){if(r==8||life<1)return end();r++;tg=w[Math.random()*w.length|0];const W=s.clientWidth;
o=shuf(shuf(w.filter(x=>x!=tg)).slice(0,no-1).concat(tg)).map((x,i)=>{const e=document.createElement("div");e.className="ob";e.textContent=x.e;e.style.top=(5+Math.random()*60)+"%";e.w=x;e.x=W+i*(l?90:130);e.onclick=()=>hit(e);s.appendChild(e);return e});hud()}
function hit(e){const W=s.clientWidth;if(e.w==tg&&e.x>W*.3&&e.x<W*.6){sc++;speak(tg.x);clr();return nr()}
life--;miss.push(tg);if(e.w==tg){clr();return nr()}e.remove();o=o.filter(z=>z!=e);if(life<1)return end();hud()}
(function lp(){if(tok!=T)return;for(const e of[...o]){e.x-=sp;e.style.left=e.x+"px";
if(e.x<-60){if(e.w==tg){life--;miss.push(tg);clr();nr();break}e.remove();o=o.filter(z=>z!=e)}}requestAnimationFrame(lp)})();
nr()}
// Game 2: Match
function M(w,l){const g=$("g"),n=[3,6,8][l];let c=[],op=[],tr=0,dn=0,lk=0;
shuf(w).slice(0,n).forEach(x=>{const f=l==1?[x.x,x.m]:[x.e,l?x.b:x.x];c.push({id:x.b,t:f[0]},{id:x.b,t:f[1]})});c=shuf(c);
g.innerHTML=`<div id=hud>Percobaan: <span id=tr>0</span></div><div class=gr>`+c.map(()=>`<button class="cd ar">?</button>`).join("")+`</div>`;
const bs=[...g.querySelectorAll(".cd")],wd=i=>w.find(x=>x.b==c[i].id);
bs.forEach((b,i)=>b.onclick=()=>{if(lk||b.disabled||op.includes(i))return;b.textContent=c[i].t;op.push(i);
if(l==0&&/[\u0600-\u06FF]/.test(c[i].t))speak(c[i].t);
if(op.length<2)return;tr++;$("tr").textContent=tr;const[a,d]=op;
if(c[a].id==c[d].id){bs[a].disabled=bs[d].disabled=true;op=[];if(++dn==n)setTimeout(()=>fin(Math.max(0,100-6*(tr-n))),500)}
else{lk=1;miss.push(wd(a),wd(d));setTimeout(()=>{bs[a].textContent=bs[d].textContent="?";op=[];lk=0},900)}})}
// Game 3: Word Search (huruf Arab disusun benar; kata horizontal ditempatkan kanan→kiri)
function W(w,l){const g=$("g"),N=[5,8,10][l],k=[3,5,8][l],DR=[[0,-1],[1,0],[1,-1],[1,1]].slice(0,[1,2,4][l]);
const pick=shuf(w.filter(x=>x.b.length<=N)).slice(0,k);let G,pl;
for(let t=0;t<300;t++){G=Array(N*N).fill("");pl=[];let ok=1;
for(const x of pick){const L=[...x.b];let p=0;
for(let z=0;z<80&&!p;z++){const[dr,dc]=DR[Math.random()*DR.length|0],r=Math.random()*N|0,c=Math.random()*N|0,er=r+dr*(L.length-1),ec=c+dc*(L.length-1);
if(er<0||er>=N||ec<0||ec>=N)continue;const cs=L.map((_,i)=>(r+dr*i)*N+c+dc*i);
if(cs.every((q,i)=>!G[q]||G[q]==L[i])){cs.forEach((q,i)=>G[q]=L[i]);pl.push({x,cs});p=1}}
if(!p){ok=0;break}}if(ok)break}
const P=[...new Set(w.flatMap(x=>[...x.b]))];G=G.map(q=>q||P[Math.random()*P.length|0]);
g.innerHTML=`<div id=hud><span>Cari kata sesuai gambar (ketuk huruf awal lalu huruf akhir)</span><button id=sd>Selesai</button></div><div>`+pl.map((p,i)=>`<span class=k id=k${i}>${p.x.e}${l?"":" "+p.x.m}</span>`).join("")+`</div><div class=ws style="grid-template-columns:repeat(${N},1fr)">`+G.map((q,i)=>`<button class="ce ar" id=c${i}>${q}</button>`).join("")+`</div>`;
let sel=-1;const fd=new Set();
$("sd").onclick=()=>{pl.forEach((p,i)=>fd.has(i)||miss.push(p.x));fin(Math.round(fd.size/pl.length*100))};
G.forEach((_,i)=>$("c"+i).onclick=()=>{if(sel<0){sel=i;$("c"+i).classList.add("s");return}
const a=sel;sel=-1;$("c"+a).classList.remove("s");const r1=a/N|0,c1=a%N,r2=i/N|0,c2=i%N,dr=Math.sign(r2-r1),dc=Math.sign(c2-c1);
if(!(r1==r2||c1==c2||Math.abs(r2-r1)==Math.abs(c2-c1)))return;
const cs=[];for(let r=r1,c=c1;;r+=dr,c+=dc){cs.push(r*N+c);if(r==r2&&c==c2)break}
const s=cs.map(q=>G[q]).join(""),j=pl.findIndex((p,x)=>!fd.has(x)&&(p.x.b==s||p.x.b==[...s].reverse().join("")));
if(j<0)return;fd.add(j);cs.forEach(q=>$("c"+q).classList.add("f"));$("k"+j).classList.add("f");speak(pl[j].x.x);
if(fd.size==pl.length)setTimeout(()=>fin(100),600)})}
// Game 4: Arrange the Letters
function A(w,l){const g=$("g"),n=5;let q=shuf(w.filter(x=>x.b.length<=[4,6,9][l]));if(q.length<n)q=shuf(w);q=q.slice(0,n);let i=0,sc=0;
function nx(){if(i==n)return fin(Math.round(sc/n*100));const x=q[i++],L=[...x.b];let ex=[];
if(l==2)ex=shuf([..."ابتجحخدرزسشصعفقكلمنهوي"].filter(c=>!L.includes(c))).slice(0,1+Math.random()*3|0);
let a="",stk=[];const ls=shuf(L.concat(ex));
g.innerHTML=`<div id=hud>Soal ${i}/${n}</div><div class=c><div class=big>${l<2?x.e:""}</div>${l!=1?`<p>${x.m}</p>`:""}<div id=an class="ar big">&nbsp;</div></div><div>`+ls.map((c,j)=>`<button class="lt ar" id=l${j}>${c}</button>`).join("")+`</div><p><button id=bk>⌫ Hapus</button> <button id=ck>Periksa</button></p><p id=fb></p>`;
const sh=()=>$("an").textContent=a||" ";
ls.forEach((c,j)=>$("l"+j).onclick=()=>{a+=c;stk.push(j);$("l"+j).disabled=true;sh()});
$("bk").onclick=()=>{if(!stk.length)return;a=a.slice(0,-1);$("l"+stk.pop()).disabled=false;sh()};
$("ck").onclick=()=>{if(!a)return;const ok=a==x.b;ok?sc++:miss.push(x);speak(x.x);
$("fb").innerHTML=(ok?"✅ Benar! ":"❌ Jawaban: ")+`<span class=ar>${x.x}</span> (${x.m})`;$("ck").disabled=$("bk").disabled=true;ls.forEach((_,j)=>$("l"+j).disabled=true);setTimeout(nx,1500)}}
nx()}
render();
