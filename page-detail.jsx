// ヒトヤク — Pharmacist Detail Page (最重要ページ)
function PageDetail({ id }) {
  const { PHARMACISTS, SPECIALTIES, CONSULT_CATEGORIES } = window.HY_DATA;
  const isMobile = useIsMobile();
  const p = PHARMACISTS.find(x=>x.id===id) || PHARMACISTS[0];
  const related = PHARMACISTS.filter(x=>x.id!==p.id && x.specialties.some(s=>p.specialties.includes(s))).slice(0,3);

  return (
    <div style={{background:'var(--bg-base)'}}>
      <SiteHeader current="list"/>
      <Breadcrumb items={[
        {label:'トップ', go:'top'},
        {label:'薬剤師を探す', go:'list'},
        {label:p.name},
      ]}/>

      {/* Hero */}
      <section style={{padding: isMobile ? '24px 0 48px' : '40px 0 80px'}}>
        <div className="container" style={{
          display:'grid', gridTemplateColumns: isMobile ? '1fr' : '380px 1fr', gap: isMobile ? 32 : 64, alignItems:'start',
        }}>
          <div style={isMobile ? {} : {position:'sticky', top:96}}>
            <div style={{
              background:'#fff', borderRadius:'var(--r-24)', overflow:'hidden',
              border:'1px solid var(--line-soft)', boxShadow:'var(--shadow-2)',
            }}>
              <div style={{aspectRatio:'4/5', position:'relative', overflow:'hidden'}}>
                {p.photo
                  ? <img src={p.photo} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top',display:'block'}}/>
                  : <PharmacistPhoto p={p} size={380} rounded={0}/>
                }
                <div style={{position:'absolute', bottom:14, left:14}}>
                  <Tag tone={p.status==='online'?'online':p.status==='busy'?'busy':'off'} size="md">
                    <span style={{width:6,height:6,borderRadius:'50%',background:'currentColor',display:'inline-block',marginRight:6}}/>
                    {p.status==='online'?'相談受付中':p.status==='busy'?'やや混雑':'受付停止中'}
                  </Tag>
                </div>
              </div>
              <div style={{padding:'24px', display:'flex',flexDirection:'column',gap:14}}>
                <div>
                  <div style={{fontSize:11, color:'var(--ink-3)', marginBottom:4}}>{p.nameKana}</div>
                  <div style={{fontFamily:'var(--font-serif)', fontSize:30, fontWeight:600, color:'var(--ink-1)'}}>{p.name}</div>
                  <div style={{fontSize:12, color:'var(--ink-2)', marginTop:6, lineHeight:1.7}}>{p.title}</div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:'8px 14px', fontSize:12, color:'var(--ink-2)'}}>
                  <span style={{color:'var(--ink-3)'}}>{Ico.shop}</span><span>{p.pharmacyName}</span>
                  <span style={{color:'var(--ink-3)'}}>{Ico.pin}</span><span>{p.location}</span>
                  <span style={{color:'var(--ink-3)'}}>{Ico.globe}</span><span>{p.languages.join(' / ')}</span>
                  <span style={{color:'var(--ink-3)'}}>{Ico.online}</span>
                  <span>{p.onlineAvailable?'オンライン対応可':'店舗のみ'} / {p.inPersonAvailable?'店舗相談可':'オンラインのみ'}</span>
                </div>
              </div>
              <div style={{padding:'0 24px 24px', display:'flex', flexDirection:'column', gap:10}}>
                <Button size="lg" variant="deep" fullWidth iconRight={Ico.arrow}
                  onClick={()=>window.HY_NAV?.('consult', {pharmacistId: p.id, mode:'direct'})}>
                  この薬剤師に相談する
                </Button>
                <Button size="md" variant="ghost" fullWidth
                  onClick={()=>window.HY_NAV?.('consult', {mode:'ops'})}>
                  まずはヒトヤクに相談する
                </Button>
              </div>
            </div>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:64}}>
            {/* Tagline */}
            <div>
              <div style={{fontSize:12, letterSpacing:'.2em', color:'var(--brand-deep)', fontWeight:600, marginBottom:14}}>
                — A PHARMACIST'S MESSAGE
              </div>
              <h1 style={{
                fontFamily:'var(--font-serif)', fontWeight:600,
                fontSize:'clamp(28px, 3vw, 40px)', lineHeight:1.55,
                margin:0, color:'var(--ink-1)',
              }}>
                「{p.shortMessage}」
              </h1>
              <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:24}}>
                {p.specialties.map(sid=>(
                  <Tag key={sid} tone="brand" size="lg">{SPECIALTIES.find(s=>s.id===sid)?.label}</Tag>
                ))}
              </div>
            </div>

            {/* Profile */}
            <Block title="プロフィール" eyebrow="PROFILE">
              <p style={{fontSize:15, lineHeight:2, color:'var(--ink-1)', margin:'0 0 28px'}}>{p.profile}</p>
              <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: isMobile ? 20 : 28}}>
                <div>
                  <SubTitle>経歴</SubTitle>
                  <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10}}>
                    {p.career.map((c,i)=>{
                      const [year, ...rest] = c.split(' ');
                      return (
                        <li key={i} style={{display:'flex', gap:14, fontSize:13, color:'var(--ink-2)', lineHeight:1.7}}>
                          <span style={{flex:'0 0 48px', fontFamily:'var(--font-serif)', color:'var(--brand-deep)', fontWeight:600}}>{year}</span>
                          <span>{rest.join(' ')}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <SubTitle>相談スタンス</SubTitle>
                  <p style={{fontSize:14, lineHeight:1.9, color:'var(--ink-2)', margin:0}}>{p.consultationStyle}</p>
                  <SubTitle style={{marginTop:24}}>経験年数</SubTitle>
                  <div style={{fontFamily:'var(--font-serif)', fontSize:36, fontWeight:600, color:'var(--brand-deep)'}}>{p.yearsOfExperience}<span style={{fontSize:14, color:'var(--ink-2)', fontFamily:'inherit', marginLeft:6}}>年</span></div>
                </div>
              </div>
            </Block>

            {/* Consultation categories */}
            <Block title="相談できる内容" eyebrow="CATEGORIES">
              <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap:14}}>
                {CONSULT_CATEGORIES.filter(c=>c.id!=='other').slice(0,8).map(c=>(
                  <div key={c.id} style={{
                    background:'#fff', border:'1px solid var(--line-soft)',
                    borderRadius:'var(--r-16)', padding:'18px 22px',
                    display:'flex', gap:14, alignItems:'flex-start',
                  }}>
                    <span style={{
                      flex:'0 0 32px', width:32, height:32, borderRadius:'50%',
                      background:'var(--brand-wash)', color:'var(--brand-deep)',
                      display:'inline-flex', alignItems:'center', justifyContent:'center',
                    }}>{Ico.check}</span>
                    <div>
                      <div style={{fontSize:14, fontWeight:600, color:'var(--ink-1)', marginBottom:4}}>{c.label}</div>
                      <div style={{fontSize:12, color:'var(--ink-2)', lineHeight:1.7}}>{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            {/* Consultation methods */}
            <Block title="相談方法" eyebrow="HOW TO CONSULT">
              <div style={{display:'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap:14}}>
                {['LINE','オンライン面談','店舗相談','メール'].map(m=>{
                  const enabled = p.availableMethods.includes(m);
                  return (
                    <div key={m} style={{
                      background: enabled?'#fff':'transparent',
                      border:`1px solid ${enabled?'var(--line-soft)':'var(--line-soft)'}`,
                      opacity: enabled?1:.45,
                      borderRadius:'var(--r-16)', padding:'20px 16px', textAlign:'center',
                    }}>
                      <div style={{
                        width:44, height:44, borderRadius:'50%',
                        background: enabled?'var(--brand-wash)':'var(--bg-soft)',
                        color: enabled?'var(--brand-deep)':'var(--ink-3)',
                        display:'inline-flex', alignItems:'center', justifyContent:'center',
                        marginBottom:10,
                      }}>{m==='LINE'?Ico.line: m==='オンライン面談'?Ico.online: m==='店舗相談'?Ico.shop: Ico.chat}</div>
                      <div style={{fontSize:13, fontWeight:600, color: enabled?'var(--ink-1)':'var(--ink-3)'}}>{m}</div>
                      <div style={{fontSize:10, color:'var(--ink-3)', marginTop:4}}>{enabled?'対応可':'対応不可'}</div>
                    </div>
                  );
                })}
              </div>
            </Block>

            {/* Personal message — warm callout */}
            <div style={{
              background:'var(--accent-warm-soft)', borderRadius:'var(--r-24)',
              padding: isMobile ? '32px 24px' : '48px 56px', position:'relative',
            }}>
              {!isMobile && <div style={{
                fontFamily:'var(--font-serif)', fontSize:80, lineHeight:1, color:'var(--accent-warm)',
                position:'absolute', top:24, left:36,
              }}>”</div>}
              <div style={{paddingLeft: isMobile ? 0 : 60}}>
                <div style={{fontSize:12, letterSpacing:'.2em', color:'#8B5A2B', fontWeight:600, marginBottom:14}}>
                  — はじめての方へ
                </div>
                <p style={{
                  fontFamily:'var(--font-serif)', fontSize: isMobile ? 17 : 22, lineHeight:1.85,
                  color:'var(--ink-1)', margin:0, fontWeight:500,
                }}>
                  どんな小さな疑問でも大丈夫です。{p.name.split(' ')[1] || p.name}と申します。<br/>
                  {p.consultationStyle}
                </p>
                <div style={{marginTop:24, display:'flex', alignItems:'center', gap:14}}>
                  <PharmacistPhoto p={p} size={48}/>
                  <div>
                    <div style={{fontSize:13, fontWeight:600, color:'var(--ink-1)'}}>{p.name}</div>
                    <div style={{fontSize:11, color:'var(--ink-3)'}}>{p.pharmacyName}</div>
                  </div>
                </div>
              </div>
            </div>

            <Disclaimer/>

            {/* Related */}
            <Block title="同じ分野に強い薬剤師" eyebrow="RELATED">
              <div style={{display:'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap:16}}>
                {related.map(rp=> <PharmacistCard key={rp.id} p={rp}/>)}
              </div>
            </Block>

            {/* Final CTA */}
            <div style={{
              background:'var(--brand-deep)', color:'#fff',
              borderRadius:'var(--r-24)', padding: isMobile ? '32px 24px' : '48px 56px',
              display:'flex', flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent:'space-between', gap: isMobile ? 20 : 32,
            }}>
              <div>
                <h3 style={{fontFamily:'var(--font-serif)', fontSize: isMobile ? 22 : 26, fontWeight:600, lineHeight:1.5, margin:'0 0 12px'}}>
                  {p.name}に相談してみる。
                </h3>
                <p style={{fontSize:14, color:'rgba(255,255,255,.85)', margin:0, lineHeight:1.8}}>
                  ご希望の相談方法と、簡単な相談内容をお送りください。
                </p>
              </div>
              <div style={{display:'flex', gap:10, flex:'0 0 auto', width: isMobile ? '100%' : 'auto'}}>
                <Button variant="accent" size="lg" fullWidth={isMobile} iconRight={Ico.arrow}
                        onClick={()=>window.HY_NAV?.('consult', {pharmacistId:p.id, mode:'direct'})}>
                  この薬剤師に相談する
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter/>
    </div>
  );
}

function Block({eyebrow, title, children}) {
  return (
    <section>
      <header style={{display:'flex', alignItems:'baseline', gap:14, marginBottom:24, paddingBottom:16, borderBottom:'1px solid var(--line-soft)'}}>
        <span style={{fontSize:11, letterSpacing:'.2em', color:'var(--brand-deep)', fontWeight:600}}>— {eyebrow}</span>
        <h2 style={{fontFamily:'var(--font-serif)', fontWeight:600, fontSize:24, margin:0, color:'var(--ink-1)'}}>{title}</h2>
      </header>
      {children}
    </section>
  );
}

function SubTitle({children, style}) {
  return <div style={{fontSize:11, letterSpacing:'.18em', color:'var(--ink-3)', fontWeight:600, marginBottom:10, ...style}}>{children}</div>;
}

Object.assign(window, { PageDetail });
