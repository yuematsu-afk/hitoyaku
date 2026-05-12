// ヒトヤク — Top Page (トップページ)
// Sections: Hero / Problem / What we do / Pick-your-own / Pharmacist preview
//           / How it works / Corporate intro / Pharmacist intro / Trust / FAQ / Final CTA

function PageTop() {
  const { PHARMACISTS, SPECIALTIES } = window.HY_DATA;
  const featured = PHARMACISTS.slice(0, 4);

  return (
    <div>
      <SiteHeader current="top" transparent/>
      <Hero/>
      <ProblemSection/>
      <FeatureSection/>
      <PickSection/>
      <PharmacistPreview pharmacists={featured}/>
      <FlowSection/>
      <DualEntrySection/>
      <TrustSection/>
      <FaqShort/>
      <FinalCTA/>
      <SiteFooter/>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────
function Hero() {
  const t = window.HY_TWEAKS || {};
  const isMobile = useIsMobile();
  const layout = isMobile ? 'stack' : (t.heroLayout || 'right'); // 'left' | 'right' | 'fullbleed' | 'stack'

  const copy = (
    <div style={{display:'flex', flexDirection:'column', gap:32}}>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <span style={{
          width:36, height:1, background:'var(--brand-deep)',
        }}/>
        <span style={{fontSize:12, letterSpacing:'.2em', color:'var(--brand-deep)', fontWeight:600}}>
          薬剤師を、選んで相談する。
        </span>
      </div>
      <h1 style={{
        fontFamily:'var(--font-serif)', fontWeight:600,
        fontSize:'clamp(40px, 5.4vw, 72px)',
        lineHeight: 1.3, letterSpacing: '.01em',
        margin: 0, color:'var(--ink-1)',
      }}>
        薬の不安は、<br/>
        <span style={{color:'var(--brand-deep)'}}>聞ける人</span>がいれば<br/>
        やわらぐ。
      </h1>
      <p style={{
        fontSize:17, lineHeight:1.95, color:'var(--ink-2)',
        margin:0, maxWidth: 480,
      }}>
        飲み合わせ、副作用、市販薬、漢方、サプリ、受診の目安。
        日常のちいさな疑問を、自分に合った薬剤師にゆっくり相談できる場所をつくりました。
      </p>
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <Button size="lg" variant="deep" iconRight={Ico.arrow}
                onClick={()=>window.HY_NAV?.('list')}>
          自分に合う薬剤師を探す
        </Button>
        <Button size="lg" variant="ghost"
                onClick={()=>window.HY_NAV?.('consult')}>
          まずはヒトヤクに相談する
        </Button>
      </div>
      <div style={{display:'flex',gap:24,alignItems:'center',marginTop:8}}>
        <div style={{display:'flex'}}>
          {window.HY_DATA.PHARMACISTS.slice(0,4).map((p,i)=>(
            <div key={p.id} style={{
              width:36, height:36, borderRadius:'50%',
              marginLeft: i===0?0:-10, border:'2px solid var(--bg-base)', overflow:'hidden',
            }}>
              <PharmacistPhoto p={p} size={32}/>
            </div>
          ))}
        </div>
        <div style={{fontSize:13, color:'var(--ink-2)'}}>
          認定薬剤師を中心に <strong style={{color:'var(--ink-1)', fontWeight:600}}>120名</strong> が在籍。
        </div>
      </div>
    </div>
  );

  const visual = <HeroVisual/>;

  if (layout === 'fullbleed') {
    return (
      <section style={{position:'relative', background:'var(--brand-wash)', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0, opacity:.5}}><HeroVisual decorative/></div>
        <div className="container-wide" style={{position:'relative', padding:'120px 24px 140px', maxWidth: 880}}>
          {copy}
        </div>
      </section>
    );
  }

  if (layout === 'stack') {
    return (
      <section style={{background:'var(--bg-base)', position:'relative', overflow:'hidden'}}>
        <div style={{aspectRatio:'16/9', maxHeight:260, overflow:'hidden'}}>
          <img src="photos/hero.jpg" alt="薬剤師とのご相談"
            style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%', display:'block'}}/>
        </div>
        <div className="container-wide" style={{padding:'32px 16px 64px'}}>
          {copy}
        </div>
      </section>
    );
  }

  return (
    <section style={{background:'var(--bg-base)', position:'relative', overflow:'hidden'}}>
      <div className="container-wide" style={{
        padding:'80px 24px 120px',
        display:'grid', gridTemplateColumns: layout==='left' ? '1fr 1.05fr' : '1.05fr 1fr',
        gap:80, alignItems:'center',
      }}>
        {layout==='left' ? <>{visual}{copy}</> : <>{copy}{visual}</>}
      </div>
    </section>
  );
}

function HeroVisual({ decorative }) {
  const { PHARMACISTS } = window.HY_DATA;
  return (
    <div style={{
      position:'relative', borderRadius:32, overflow:'hidden',
      aspectRatio:'4/5', maxHeight:560, boxShadow:'var(--shadow-3)',
    }}>
      <img src="photos/hero.jpg" alt="薬剤師とのご相談"
        style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block'}}/>

      {/* floating cards — inside container so they never overflow into the copy */}
      {!decorative && (
        <>
          <div className="lift" style={{
            position:'absolute', left:16, bottom:24,
            background:'rgba(255,255,255,.97)', backdropFilter:'blur(8px)',
            boxShadow:'var(--shadow-2)', borderRadius:'var(--r-16)',
            padding:'12px 14px', display:'flex', alignItems:'center', gap:12, maxWidth:230,
          }}>
            <PharmacistPhoto p={PHARMACISTS[0]} size={44}/>
            <div style={{minWidth:0, flex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:'var(--ink-1)'}}>{PHARMACISTS[0].name}</div>
              <div style={{fontSize:11,color:'var(--ink-3)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                漢方 / 女性の健康
              </div>
              <div style={{marginTop:4}}><StatusDot status="online"/></div>
            </div>
          </div>
          <div style={{
            position:'absolute', right:16, top:24,
            background:'rgba(255,255,255,.97)', backdropFilter:'blur(8px)',
            boxShadow:'var(--shadow-2)', borderRadius:'var(--r-16)',
            padding:'12px 14px', display:'flex', alignItems:'center', gap:10,
          }}>
            <div style={{
              width:32, height:32, borderRadius:8, background:'var(--accent-warm-soft)',
              color:'#8B5A2B', display:'flex', alignItems:'center', justifyContent:'center',
            }}>{Ico.chat}</div>
            <div>
              <div style={{fontSize:11,color:'var(--ink-3)'}}>今日の相談</div>
              <div style={{fontSize:12,fontWeight:600,color:'var(--ink-1)'}}>サプリと薬の飲み合わせ</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function DecorPortrait() {
  // Soft SVG composition meant to read as "two people talking softly", lifestyle-mag style
  return (
    <svg viewBox="0 0 400 440" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bg-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#DBE7DD"/>
          <stop offset="100%" stopColor="#A8C7B5"/>
        </linearGradient>
        <linearGradient id="skin1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F4E1CD"/><stop offset="100%" stopColor="#E1C39E"/>
        </linearGradient>
        <linearGradient id="skin2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F0D7B3"/><stop offset="100%" stopColor="#D7B488"/>
        </linearGradient>
      </defs>
      <rect width="400" height="440" fill="url(#bg-g)"/>
      {/* sun / window */}
      <circle cx="320" cy="100" r="60" fill="#F2E6CE" opacity=".7"/>
      {/* table */}
      <rect x="0" y="330" width="400" height="110" fill="#EFE3D0"/>
      <rect x="40" y="330" width="320" height="4" fill="#D6BFA0"/>
      {/* mugs */}
      <path d="M120 300 c0 30 60 30 60 0 v-30 h-60z" fill="#fff"/>
      <path d="M180 280 c10 0 16 10 16 18 s-6 18 -16 18" fill="none" stroke="#fff" strokeWidth="6"/>
      <path d="M250 300 c0 30 50 30 50 0 v-26 h-50z" fill="#E8A87C"/>
      {/* steam */}
      <path d="M148 260 c-6 -10 6 -16 0 -28" stroke="#fff" strokeWidth="3" fill="none" opacity=".7"/>
      {/* person 1 (pharmacist, slight smile) */}
      <ellipse cx="120" cy="200" rx="48" ry="56" fill="url(#skin1)"/>
      <path d="M72 200 c0 -50 24 -78 60 -78 c30 0 50 22 50 50 c0 8 -4 14 -8 18" fill="#2F3E36"/>
      {/* white coat collar */}
      <path d="M40 300 q40 -50 80 -50 q40 0 80 50 v50 h-160z" fill="#fff"/>
      <rect x="118" y="260" width="4" height="44" fill="#E0E0DC"/>
      {/* person 2 (patient) */}
      <ellipse cx="280" cy="220" rx="44" ry="52" fill="url(#skin2)"/>
      <path d="M236 220 c0 -46 22 -72 56 -72 c28 0 46 22 46 48 c0 6 -2 12 -6 18 c-10 4 -20 14 -24 26" fill="#5C3A20"/>
      {/* sweater */}
      <path d="M210 320 q40 -40 80 -40 q40 0 80 40 v40 h-160z" fill="#C97650"/>
      {/* eyes — closed crescents, soft */}
      <path d="M104 196 q8 -6 16 0" stroke="#2F3E36" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M130 196 q8 -6 16 0" stroke="#2F3E36" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M268 216 q8 -6 16 0" stroke="#3a2a18" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M292 216 q8 -6 16 0" stroke="#3a2a18" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* mouths */}
      <path d="M116 226 q6 4 12 0" stroke="#8B4A30" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M280 244 q6 4 12 0" stroke="#8B4A30" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ── Problem ──────────────────────────────────────────────────
function ProblemSection() {
  const isMobile = useIsMobile();
  const problems = [
    {q:'ネット検索だけでは、不安が逆に増える。', d:'信頼できる情報源にたどり着けず、結局判断できない。'},
    {q:'病院に行くほどではない気がする。', d:'でも、誰かに確かめておきたい気持ちはある。'},
    {q:'薬局では、ゆっくり聞きにくい。', d:'忙しそうだったり、人の目が気になったり。'},
    {q:'家族の薬や、サプリの飲み合わせが心配。', d:'年齢が上がると、確認したいことが増えてくる。'},
  ];
  return (
    <section style={{background:'var(--bg-soft)', padding: isMobile ? '64px 0' : '120px 0'}}>
      <div className="container">
        <SectionHead
          eyebrow="ありませんか、こんな迷い"
          title={<>診てもらうほどでもないけれど、<br/>誰かに聞きたい。</>}
          lede="多くの方が、薬や体調について「聞ける専門家」を見つけられずにいます。ヒトヤクは、その距離を埋めるためのサービスです。"
        />
        <div style={{
          marginTop: isMobile ? 32 : 64, display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap:16,
        }}>
          {problems.map((p,i)=>(
            <div key={i} style={{
              background:'#fff', border:'1px solid var(--line-soft)',
              borderRadius:'var(--r-20)', padding:'32px 36px',
              display:'flex', gap:20,
            }}>
              <div style={{
                flex:'0 0 36px', height:36, borderRadius:'50%',
                background:'var(--brand-wash)', color:'var(--brand-deep)',
                fontFamily:'var(--font-serif)', fontWeight:600, fontSize:16,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>{String(i+1).padStart(2,'0')}</div>
              <div>
                <div style={{fontSize:18, fontWeight:600, color:'var(--ink-1)', marginBottom:8, lineHeight:1.6}}>{p.q}</div>
                <div style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.9}}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ─────────────────────────────────────────────────
function FeatureSection() {
  const isMobile = useIsMobile();
  const features = [
    {
      tag:'01 / SELECT',
      title:'薬剤師を、自分で選べる。',
      lede:'専門・人柄・話し方が分かったうえで、相談相手をあなたが選びます。',
      bg:'var(--brand-wash)', accent:'var(--brand-deep)',
      icon:(<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="20" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 46c2-9 8-13 16-13s14 4 16 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="42" cy="14" r="6" fill="currentColor" opacity=".15"/><path d="M40 14h4M42 12v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>),
    },
    {
      tag:'02 / ASK',
      title:'気軽に、でもしっかり聞ける。',
      lede:'LINEやオンライン面談など、相談しやすい方法を選べます。',
      bg:'var(--accent-warm-soft)', accent:'#8B5A2B',
      icon:(<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M10 22c0-7 8-12 18-12s18 5 18 12c0 4-3 8-7 10l2 8-10-5c-1 .1-2 .1-3 .1-10 0-18-5-18-13Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M20 22h16M20 27h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
    },
    {
      tag:'03 / CONTINUE',
      title:'必要なときだけ、続けて頼れる。',
      lede:'契約や月額制ではなく、必要に応じて、その都度ご相談できます。',
      bg:'var(--bg-tint)', accent:'var(--brand-deep)',
      icon:(<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M28 8v8M28 40v8M8 28h8M40 28h8M14 14l6 6M36 36l6 6M14 42l6-6M36 20l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="28" cy="28" r="6" stroke="currentColor" strokeWidth="1.6"/></svg>),
    },
  ];
  return (
    <section style={{padding: isMobile ? '64px 0' : '120px 0'}}>
      <div className="container">
        <SectionHead
          eyebrow="ヒトヤクでできること"
          title={<>「薬剤師を選ぶ」という<br/>あたらしい体験。</>}
        />
        <div style={{marginTop: isMobile ? 32 : 64, display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap:16}}>
          {features.map((f,i)=>(
            <div key={i} style={{
              background:f.bg, borderRadius:'var(--r-24)', padding:'40px 36px 56px',
              minHeight:340, display:'flex', flexDirection:'column', justifyContent:'space-between',
              color: f.accent,
            }}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <span style={{fontSize:11, letterSpacing:'.2em', fontWeight:600, opacity:.7}}>{f.tag}</span>
                {f.icon}
              </div>
              <div>
                <h3 style={{
                  fontFamily:'var(--font-serif)', fontSize:26, fontWeight:600,
                  lineHeight:1.5, margin:0, color:'var(--ink-1)',
                }}>{f.title}</h3>
                <p style={{marginTop:18, fontSize:14, lineHeight:1.9, color:'var(--ink-2)'}}>{f.lede}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pick (薬剤師を選べることの説明) ───────────────────────────
function PickSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{background:'var(--brand-deep)', color:'#fff', padding: isMobile ? '64px 0' : '120px 0'}}>
      <div className="container" style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 40 : 80, alignItems:'center'}}>
        <div>
          <div style={{fontSize:12, letterSpacing:'.2em', color:'var(--brand-soft)', fontWeight:600, marginBottom:20}}>
            — なぜ「選べる」が大切か
          </div>
          <h2 style={{
            fontFamily:'var(--font-serif)', fontSize:'clamp(28px, 3.4vw, 44px)',
            lineHeight:1.45, fontWeight:600, margin:'0 0 28px', color:'#fff',
          }}>
            合う薬剤師に出会えると、<br/>聞き方も変わる。
          </h2>
          <p style={{fontSize:16, lineHeight:2, color:'rgba(255,255,255,.85)', margin:0, maxWidth: 480}}>
            漢方が得意な方、子どもの薬に詳しい方、英語で話せる方、ご家族の薬整理に向き合ってきた方。
            ヒトヤクでは、それぞれの薬剤師の専門と人柄を、相談する前に知っていただけます。
          </p>
        </div>
        <PickIllustration/>
      </div>
    </section>
  );
}

function PickIllustration() {
  const { PHARMACISTS } = window.HY_DATA;
  const list = PHARMACISTS.slice(0, 6);
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14, position:'relative'}}>
      {list.map((p, i)=>(
        <div key={p.id} style={{
          background: i===2 ? '#fff' : 'rgba(255,255,255,.08)',
          border: i===2 ? '2px solid var(--accent-warm)' : '1px solid rgba(255,255,255,.16)',
          borderRadius:'var(--r-16)', padding:'16px',
          color: i===2 ? 'var(--ink-1)' : '#fff',
          position:'relative', transform: i===2 ? 'translateY(-12px) scale(1.04)' : 'none',
          transition:'transform .3s',
        }}>
          <PharmacistPhoto p={p} size={72} rounded="var(--r-12)"/>
          <div style={{marginTop:12, fontSize:13, fontWeight:600}}>{p.name}</div>
          <div style={{fontSize:11, color: i===2?'var(--ink-3)':'rgba(255,255,255,.7)', marginTop:4}}>
            {p.specialties.slice(0,2).map(sid=>window.HY_DATA.SPECIALTIES.find(s=>s.id===sid)?.label).join(' / ')}
          </div>
          {i===2 && (
            <div style={{
              position:'absolute', top:-10, right:-10, background:'var(--accent-warm)',
              color:'#fff', fontSize:10, fontWeight:600, padding:'4px 10px', borderRadius:'var(--r-pill)',
            }}>あなたの選んだ薬剤師</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Pharmacist Preview ───────────────────────────────────────
function PharmacistPreview({ pharmacists }) {
  const isMobile = useIsMobile();
  const shown = isMobile ? pharmacists.slice(0, 2) : pharmacists;
  return (
    <section style={{padding: isMobile ? '64px 0' : '120px 0'}}>
      <div className="container">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:24,flexWrap:'wrap'}}>
          <SectionHead
            eyebrow="薬剤師を知る"
            title={<>気になる薬剤師から、<br/>はじめてみる。</>}
          />
          <Button variant="ghost" iconRight={Ico.arrow} onClick={()=>window.HY_NAV?.('list')}>
            すべての薬剤師を見る
          </Button>
        </div>
        <div style={{marginTop: isMobile ? 32 : 56, display:'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20}}>
          {shown.map(p=> <PharmacistCard key={p.id} p={p} variant="medium"/>)}
        </div>
      </div>
    </section>
  );
}

// Reusable card — variant aware (used in list page too)
function PharmacistCard({ p, variant='medium', onClick }) {
  const t = window.HY_TWEAKS || {};
  const style = t.cardStyle || variant; // 'large' | 'row' | 'compact' | 'medium'
  const { SPECIALTIES } = window.HY_DATA;
  const handleClick = () => {
    if (onClick) onClick(p);
    else window.HY_NAV?.('detail', { id: p.id });
  };

  if (style === 'row') {
    return (
      <article onClick={handleClick} className="lift" style={{
        background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-20)',
        padding:24, display:'grid', gridTemplateColumns:'120px 1fr auto', gap:24,
        alignItems:'center', cursor:'pointer',
      }}>
        <PharmacistPhoto p={p} size={120} rounded="var(--r-16)"/>
        <div>
          <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:6}}>
            <StatusDot status={p.status}/>
          </div>
          <div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:600,color:'var(--ink-1)'}}>{p.name}</div>
          <div style={{fontSize:12,color:'var(--ink-3)',marginTop:4}}>{p.title}</div>
          <div style={{fontSize:13,color:'var(--ink-2)',marginTop:10,lineHeight:1.7}}>「{p.shortMessage}」</div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:14}}>
            {p.specialties.slice(0,4).map(sid=>(
              <Tag key={sid} tone="brand" size="sm">
                {SPECIALTIES.find(s=>s.id===sid)?.label}
              </Tag>
            ))}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <Button size="sm" variant="primary">この薬剤師に相談する</Button>
          <Button size="sm" variant="ghost">詳しく見る</Button>
        </div>
      </article>
    );
  }

  if (style === 'compact') {
    return (
      <article onClick={handleClick} className="lift" style={{
        background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-16)',
        padding:'16px 18px', display:'flex', gap:14, alignItems:'center', cursor:'pointer',
      }}>
        <PharmacistPhoto p={p} size={56}/>
        <div style={{minWidth:0, flex:1}}>
          <div style={{fontWeight:600, fontSize:15, color:'var(--ink-1)'}}>{p.name}</div>
          <div style={{fontSize:11, color:'var(--ink-3)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
            {p.specialties.slice(0,2).map(sid=>SPECIALTIES.find(s=>s.id===sid)?.label).join(' / ')}
          </div>
          <div style={{marginTop:4}}><StatusDot status={p.status}/></div>
        </div>
        <span style={{color:'var(--ink-3)'}}>{Ico.arrow}</span>
      </article>
    );
  }

  // medium / large
  const big = style === 'large';
  const hue = p.photoHue ?? 140;
  return (
    <article onClick={handleClick} className="lift" style={{
      background:'#fff', border:'1px solid var(--line-soft)',
      borderRadius:'var(--r-20)', overflow:'hidden', cursor:'pointer',
      display:'flex', flexDirection:'column',
    }}>
      <div style={{position:'relative', aspectRatio: big ? '4/5' : '1/1', overflow:'hidden'}}>
        {p.photo
          ? <img src={p.photo} alt={p.name} style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block'}}/>
          : <div style={{
              width:'100%', height:'100%',
              background:`linear-gradient(140deg, hsl(${hue} 32% 86%) 0%, hsl(${hue} 28% 74%) 100%)`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'var(--font-serif)', fontSize:42, fontWeight:600,
              color:`hsl(${hue} 40% 28%)`,
            }}>{p.name?.[0] || 'P'}</div>
        }
        <div style={{position:'absolute', top:12, left:12}}>
          <Tag tone={p.status==='online'?'online':p.status==='busy'?'busy':'off'} size="sm">
            <span style={{
              display:'inline-block', width:6, height:6, borderRadius:'50%',
              background:'currentColor', marginRight:4,
            }}/>
            {p.status==='online'?'相談OK':p.status==='busy'?'やや混雑':'受付停止'}
          </Tag>
        </div>
      </div>
      <div style={{padding:'18px 18px 20px', display:'flex', flexDirection:'column', gap:8, flex:1}}>
        <div style={{display:'flex',alignItems:'baseline',gap:8}}>
          <div style={{fontFamily:'var(--font-serif)', fontSize: big?22:18, fontWeight:600, color:'var(--ink-1)'}}>{p.name}</div>
          <div style={{fontSize:11, color:'var(--ink-3)'}}>{p.location}</div>
        </div>
        <div style={{fontSize:11, color:'var(--ink-3)'}}>{p.title}</div>
        <div style={{fontSize:13, color:'var(--ink-2)', lineHeight:1.7, marginTop:4}}>
          「{p.shortMessage}」
        </div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:'auto', paddingTop:12}}>
          {p.specialties.slice(0,3).map(sid=>(
            <Tag key={sid} tone="outline" size="sm">{SPECIALTIES.find(s=>s.id===sid)?.label}</Tag>
          ))}
        </div>
      </div>
    </article>
  );
}

// ── How it works (相談までの流れ) ──────────────────────────────
function FlowSection() {
  const isMobile = useIsMobile();
  const steps = [
    { n:'01', t:'薬剤師を探す', d:'得意分野や対応方法から、気になる薬剤師を見つけます。' },
    { n:'02', t:'プロフィールを読む', d:'人柄・経歴・相談スタンスを確認。「合いそう」と感じたら次へ。' },
    { n:'03', t:'相談内容を送る', d:'直接相談、またはヒトヤク運営に相談して薬剤師を紹介してもらう。' },
    { n:'04', t:'返信を受け取る', d:'LINE・メール・オンライン面談など、ご希望の方法で。' },
  ];
  return (
    <section style={{background:'var(--bg-soft)', padding: isMobile ? '64px 0' : '120px 0'}}>
      <div className="container">
        <SectionHead eyebrow="ご利用の流れ" title={<>相談するまでの、<br/>4つのステップ。</>}/>
        <div style={{marginTop: isMobile ? 32 : 64, position:'relative'}}>
          {!isMobile && <div style={{
            position:'absolute', top:36, left:'4%', right:'4%', height:1,
            borderTop:'1px dashed var(--line-strong)', zIndex:0,
          }}/>}
          <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 20 : 24, position:'relative'}}>
            {steps.map((s,i)=>(
              <div key={i} style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                <div style={{
                  width: isMobile ? 52 : 72, height: isMobile ? 52 : 72, borderRadius:'50%', background:'#fff',
                  border:'1px solid var(--line-mid)', display:'flex',
                  alignItems:'center', justifyContent:'center', marginBottom: isMobile ? 14 : 24,
                  fontFamily:'var(--font-serif)', fontSize: isMobile ? 16 : 22, color:'var(--brand-deep)',
                  fontWeight:600,
                }}>{s.n}</div>
                <div style={{fontSize: isMobile ? 14 : 18, fontWeight:600, color:'var(--ink-1)', marginBottom: isMobile ? 6 : 10}}>{s.t}</div>
                <div style={{fontSize:13, color:'var(--ink-2)', lineHeight:1.85}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Dual entry (法人 + 薬剤師・薬局) ──────────────────────────
function DualEntrySection() {
  const isMobile = useIsMobile();
  return (
    <section style={{padding: isMobile ? '64px 0' : '120px 0'}}>
      <div className="container" style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 32}}>
        <EntryCard
          eyebrow="法人ご担当者の方へ"
          title="従業員の健康相談窓口として。"
          lede="日々の薬や体調の疑問を、専門家に気軽に聞ける環境を、福利厚生として導入いただけます。"
          ctaLabel="法人向け資料を請求する"
          ctaTarget="corp"
          bg="var(--accent-warm-soft)"
          accent="#8B5A2B"
          features={['気軽に使える健康相談窓口', '導入・運用の負担を抑える設計', '管理レポートで利用状況を把握']}
        />
        <EntryCard
          eyebrow="薬剤師・薬局法人の方へ"
          title="あなたの専門性を、必要な人に。"
          lede="ヒトヤクは、薬剤師が自分の強みを発信し、新しい相談接点を持てる場です。"
          ctaLabel="薬剤師として参加する"
          ctaTarget="pharma"
          bg="var(--brand-wash)"
          accent="var(--brand-deep)"
          features={['専門性・人柄を見える化', '相談者との新しい接点', '将来の患者関係管理基盤に']}
        />
      </div>
    </section>
  );
}

function EntryCard({eyebrow, title, lede, ctaLabel, ctaTarget, bg, accent, features}) {
  return (
    <div style={{
      background:bg, borderRadius:'var(--r-24)', padding:'48px 48px 56px',
      display:'flex', flexDirection:'column', gap:24,
    }}>
      <div style={{fontSize:12, letterSpacing:'.2em', fontWeight:600, color:accent}}>— {eyebrow}</div>
      <h3 style={{fontFamily:'var(--font-serif)', fontSize:30, fontWeight:600, lineHeight:1.45, margin:0, color:'var(--ink-1)'}}>{title}</h3>
      <p style={{fontSize:15, lineHeight:1.95, color:'var(--ink-2)', margin:0}}>{lede}</p>
      <ul style={{listStyle:'none', padding:0, margin:'8px 0 0', display:'flex', flexDirection:'column', gap:10}}>
        {features.map((f,i)=>(
          <li key={i} style={{display:'flex', gap:10, alignItems:'center', fontSize:14, color:'var(--ink-1)'}}>
            <span style={{color:accent}}>{Ico.check}</span>{f}
          </li>
        ))}
      </ul>
      <div style={{marginTop:8}}>
        <Button variant={ctaTarget==='pharma'?'deep':'accent'} iconRight={Ico.arrow}
                onClick={()=>window.HY_NAV?.(ctaTarget)}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

// ── Trust ────────────────────────────────────────────────────
function TrustSection() {
  const isMobile = useIsMobile();
  const stats = [
    { v:'5名', l:'登録薬剤師数（順次拡大中）' },
    { v:'15年+', l:'平均薬剤師経験年数' },
    { v:'24h',   l:'平均初回返信時間' },
    { v:'無料',  l:'初回運営相談' },
  ];
  return (
    <section style={{background:'var(--bg-tint)', padding: isMobile ? '64px 0' : '120px 0'}}>
      <div className="container">
        <SectionHead align="center" eyebrow="安心の理由"
          title={<>はじめての方にも、<br/>安心していただける工夫を。</>}/>
        <div style={{marginTop: isMobile ? 32 : 56, display:'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 24}}>
          {stats.map((s,i)=>(
            <div key={i} style={{background:'#fff', borderRadius:'var(--r-20)', padding:'28px', textAlign:'center'}}>
              <div style={{fontFamily:'var(--font-serif)', fontSize:42, fontWeight:600, color:'var(--brand-deep)', letterSpacing:'-.01em'}}>{s.v}</div>
              <div style={{marginTop:6, fontSize:13, color:'var(--ink-2)'}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:32}}><Disclaimer/></div>
      </div>
    </section>
  );
}

// ── FAQ (short) ──────────────────────────────────────────────
function FaqShort() {
  return (
    <section style={{padding:'120px 0'}}>
      <div className="container-narrow">
        <SectionHead align="center" eyebrow="よくあるご質問" title="はじめてのご利用前に。"/>
        <div style={{marginTop:48}}>
          <FAQ items={[
            { q:'相談料はかかりますか?', a:'初回の運営相談は無料です。薬剤師との個別相談は、薬剤師ごとに無料・有料(コーヒー一杯程度〜)が異なります。各薬剤師ページで明示しています。' },
            { q:'処方箋を出してもらえますか?', a:'ヒトヤクは医師の診療や処方を行うサービスではありません。薬剤師による服薬・健康相談に特化しています。受診が必要と判断した場合は、医療機関への受診をお勧めします。' },
            { q:'相談内容は秘密にしてもらえますか?', a:'守秘義務に基づき、相談内容は厳重に管理されます。第三者への共有はいたしません。' },
            { q:'家族の薬について相談できますか?', a:'はい、可能です。ご家族の処方薬・市販薬・サプリのご相談を多く受けています。' },
          ]}/>
        </div>
        <div style={{textAlign:'center', marginTop:40}}>
          <Button variant="ghost" iconRight={Ico.arrow}>すべてのFAQを見る</Button>
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ────────────────────────────────────────────────
function FinalCTA() {
  const isMobile = useIsMobile();
  return (
    <section style={{padding: isMobile ? '32px 0 80px' : '40px 0 120px'}}>
      <div className="container">
        <div style={{
          background:'var(--brand-deep)', borderRadius:'var(--r-24)',
          padding: isMobile ? '40px 24px' : '72px 64px',
          color:'#fff', position:'relative', overflow:'hidden',
          display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
          gap: isMobile ? 28 : 48, alignItems:'center',
        }}>
          <div>
            <h2 style={{
              fontFamily:'var(--font-serif)', fontWeight:600, fontSize:40, lineHeight:1.45,
              margin:0, color:'#fff',
            }}>
              はじめての方も、まずは<br/>運営にご相談ください。
            </h2>
            <p style={{marginTop:20, fontSize:15, lineHeight:2, color:'rgba(255,255,255,.85)', maxWidth: 520}}>
              「どの薬剤師に聞いたらいいか分からない」「相談内容がうまく言えない」そんなときは、ヒトヤク運営に。
              内容を整理して、合いそうな薬剤師をご紹介します。
            </p>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            <Button size="lg" variant="accent" fullWidth iconRight={Ico.arrow}
                    onClick={()=>window.HY_NAV?.('consult')}>
              ヒトヤクに相談する
            </Button>
            <Button size="lg" variant="soft" fullWidth iconRight={Ico.arrow}
                    onClick={()=>window.HY_NAV?.('list')}>
              自分で薬剤師を探す
            </Button>
          </div>
          {/* deco wave */}
          <svg viewBox="0 0 600 200" style={{position:'absolute',right:-100,bottom:-60,width:600,opacity:.14}}>
            <path d="M0,100 C150,40 300,160 600,80 L600,200 L0,200 Z" fill="#fff"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PageTop, PharmacistCard });
