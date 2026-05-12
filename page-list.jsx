// ヒトヤク — Pharmacist List Page
function PageList() {
  const { PHARMACISTS, SPECIALTIES } = window.HY_DATA;
  const isMobile = useIsMobile();
  const [q, setQ] = React.useState('');
  const [picked, setPicked] = React.useState([]);     // specialty ids
  const [onlineOnly, setOnlineOnly] = React.useState(false);
  const [langOnly, setLangOnly] = React.useState(false);
  const [sort, setSort] = React.useState('recommended');
  const [filterOpen, setFilterOpen] = React.useState(false);

  const toggle = (id) => setPicked(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);

  const filtered = React.useMemo(() => {
    let r = PHARMACISTS.filter(p=>{
      if (q && !(p.name+p.shortMessage+p.tags.join(' ')+p.pharmacyName).toLowerCase().includes(q.toLowerCase())) return false;
      if (picked.length && !picked.every(s=>p.specialties.includes(s))) return false;
      if (onlineOnly && !p.onlineAvailable) return false;
      if (langOnly && p.languages.length<=1) return false;
      return true;
    });
    if (sort === 'experience') r = [...r].sort((a,b)=>b.yearsOfExperience-a.yearsOfExperience);
    if (sort === 'status') {
      const ord = {online:0, busy:1, off:2};
      r = [...r].sort((a,b)=>ord[a.status]-ord[b.status]);
    }
    return r;
  }, [q, picked, onlineOnly, langOnly, sort]);

  return (
    <div style={{background:'var(--bg-base)'}}>
      <SiteHeader current="list"/>
      <Breadcrumb items={[{label:'トップ', go:'top'},{label:'薬剤師を探す'}]}/>

      {/* Hero ribbon */}
      <section style={{background:'var(--brand-wash)', padding: isMobile ? '28px 0 36px' : '56px 0 72px'}}>
        <div className="container">
          {!isMobile && (
            <div style={{fontSize:12, letterSpacing:'.2em', color:'var(--brand-deep)', fontWeight:600, marginBottom:14}}>
              — PHARMACISTS DIRECTORY
            </div>
          )}
          <h1 style={{
            fontFamily:'var(--font-serif)', fontWeight:600,
            fontSize: isMobile ? '26px' : 'clamp(32px, 4vw, 52px)', lineHeight:1.4, margin:0,
            color:'var(--ink-1)',
          }}>
            あなたに合いそうな<br/>薬剤師を探してください。
          </h1>
          {!isMobile && (
            <p style={{marginTop:20, fontSize:15, color:'var(--ink-2)', lineHeight:1.9, maxWidth:640}}>
              得意分野・対応言語・相談方法から、自分の悩みに合う薬剤師を見つけられます。「まず誰に聞けばいいか分からない」場合は、運営にご相談ください。
            </p>
          )}
          <div style={{
            marginTop: isMobile ? 20 : 32,
            background:'#fff', borderRadius:'var(--r-pill)',
            padding: isMobile ? '4px 4px 4px 14px' : '6px 6px 6px 24px',
            display:'flex', alignItems:'center', gap: isMobile ? 8 : 14,
            boxShadow:'var(--shadow-2)',
          }}>
            <span style={{color:'var(--ink-3)', flexShrink:0}}>{Ico.search}</span>
            <input value={q} onChange={(e)=>setQ(e.target.value)}
              placeholder={isMobile ? '漢方、飲み合わせ、英語対応...' : '例: 漢方、サプリ、子どもの解熱剤、英語対応...'}
              style={{
                flex:1, border:0, outline:'none', background:'transparent', minWidth:0,
                fontFamily:'inherit', fontSize: isMobile ? 14 : 15, color:'var(--ink-1)',
                padding: isMobile ? '10px 0' : '14px 0',
              }}/>
            <Button size="sm" variant="deep">検索</Button>
          </div>
        </div>
      </section>

      {/* List w/ sidebar */}
      <section style={{padding: isMobile ? '24px 0 64px' : '72px 0 80px'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '260px 1fr', gap: isMobile ? 0 : 48, alignItems:'start'}}>
          {/* モバイル: 折り畳みフィルター */}
          {isMobile ? (
            <div style={{marginBottom:16}}>
              <button onClick={()=>setFilterOpen(o=>!o)} style={{
                display:'flex', alignItems:'center', gap:8,
                background:'#fff', border:'1px solid var(--line-mid)',
                borderRadius:'var(--r-pill)', padding:'10px 18px',
                fontSize:13, fontWeight:500, color:'var(--ink-1)', cursor:'pointer', width:'100%', justifyContent:'center',
              }}>
                {Ico.filter} 絞り込み {filterOpen ? '▲' : '▼'}
              </button>
              {filterOpen && (
                <div style={{marginTop:12, background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-16)', padding:'20px'}}>
                  <FilterPanel picked={picked} toggle={toggle}
                    onlineOnly={onlineOnly} setOnlineOnly={setOnlineOnly}
                    langOnly={langOnly} setLangOnly={setLangOnly}/>
                </div>
              )}
            </div>
          ) : (
            <aside style={{position:'sticky', top:96}}>
              <FilterPanel picked={picked} toggle={toggle}
                onlineOnly={onlineOnly} setOnlineOnly={setOnlineOnly}
                langOnly={langOnly} setLangOnly={setLangOnly}/>
            </aside>
          )}
          <div>
            <div style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              marginBottom:24, paddingBottom:20, borderBottom:'1px solid var(--line-soft)',
              flexWrap:'wrap', gap:12,
            }}>
              <div style={{fontSize:14, color:'var(--ink-2)'}}>
                <strong style={{color:'var(--ink-1)', fontFamily:'var(--font-serif)', fontSize:22, fontWeight:600}}>{filtered.length}</strong>
                <span style={{margin:'0 8px'}}>名の薬剤師</span>
                {(picked.length>0 || onlineOnly || langOnly || q) && (
                  <button onClick={()=>{setPicked([]);setOnlineOnly(false);setLangOnly(false);setQ('');}}
                    style={{background:'none',border:0,color:'var(--brand-deep)',fontSize:12,textDecoration:'underline',cursor:'pointer'}}>
                    条件をリセット
                  </button>
                )}
              </div>
              <Select value={sort} onChange={(e)=>setSort(e.target.value)}
                style={{padding:'10px 40px 10px 14px', fontSize:13, borderRadius:'var(--r-pill)'}}>
                <option value="recommended">おすすめ順</option>
                <option value="status">相談受付中を優先</option>
                <option value="experience">経験年数が多い順</option>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <EmptyState/>
            ) : (
              <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? 16 : 20}}>
                {filtered.map(p=> <PharmacistCard key={p.id} p={p}/>)}
              </div>
            )}
          </div>
        </div>
      </section>

      <RunbyOpsCTA/>
      <SiteFooter/>
    </div>
  );
}

function Breadcrumb({ items }) {
  return (
    <div style={{position:'sticky', top:'var(--nav-h)', zIndex:90, background:'rgba(255,255,255,0.97)', backdropFilter:'blur(8px)', borderBottom:'1px solid var(--line-soft)'}}>
    <div className="container" style={{padding:'10px 24px', fontSize:12, color:'var(--ink-3)', display:'flex', alignItems:'center', gap:12}}>
      <button onClick={() => window.HY_BACK ? window.HY_BACK() : window.HY_NAV?.('top')} style={{
        display:'inline-flex', alignItems:'center', gap:5,
        background:'none', border:'1px solid var(--line-mid)', borderRadius:'var(--r-pill)',
        padding:'5px 12px', fontSize:12, color:'var(--ink-2)', cursor:'pointer', flexShrink:0,
        fontFamily:'inherit',
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        戻る
      </button>
      <div>
        {items.map((it,i)=>(
          <React.Fragment key={i}>
            {i>0 && <span style={{margin:'0 8px'}}>›</span>}
            {it.go ? <a href="#" onClick={(e)=>{e.preventDefault(); window.HY_NAV?.(it.go);}}
              style={{color:'var(--ink-2)'}}>{it.label}</a> : <span style={{color:'var(--ink-1)'}}>{it.label}</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
    </div>
  );
}

function FilterPanel({ picked, toggle, onlineOnly, setOnlineOnly, langOnly, setLangOnly }) {
  const { SPECIALTIES } = window.HY_DATA;
  return (
    <div style={{display:'flex',flexDirection:'column',gap:32}}>
      <div>
        <h3 style={{fontSize:11, letterSpacing:'.2em', color:'var(--ink-3)', margin:'0 0 14px', fontWeight:600}}>得意分野で絞り込む</h3>
        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
          {SPECIALTIES.map(s=>(
            <button key={s.id} onClick={()=>toggle(s.id)} style={{
              padding:'8px 14px', borderRadius:'var(--r-pill)',
              border:`1px solid ${picked.includes(s.id)?'var(--brand)':'var(--line-mid)'}`,
              background: picked.includes(s.id)?'var(--brand)':'#fff',
              color: picked.includes(s.id)?'#fff':'var(--ink-1)',
              fontSize:12, fontWeight:500, cursor:'pointer', transition:'all .15s',
            }}>{s.label}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 style={{fontSize:11, letterSpacing:'.2em', color:'var(--ink-3)', margin:'0 0 14px', fontWeight:600}}>対応方法</h3>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <Checkbox checked={onlineOnly} onChange={()=>setOnlineOnly(!onlineOnly)}>オンライン対応可</Checkbox>
          <Checkbox checked={langOnly} onChange={()=>setLangOnly(!langOnly)}>外国語対応(英語・中国語ほか)</Checkbox>
        </div>
      </div>
      <div style={{
        background:'var(--brand-wash)', borderRadius:'var(--r-16)', padding:'18px 20px',
      }}>
        <div style={{fontSize:13, fontWeight:600, color:'var(--brand-deep)', marginBottom:8}}>
          迷ったら、運営に相談
        </div>
        <p style={{fontSize:12, color:'var(--ink-2)', lineHeight:1.8, margin:'0 0 12px'}}>
          相談内容を整理して、合いそうな薬剤師をご紹介します。
        </p>
        <Button size="sm" variant="deep" fullWidth onClick={()=>window.HY_NAV?.('consult')}>
          ヒトヤクに相談する
        </Button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{
      textAlign:'center', padding:'80px 24px',
      background:'var(--bg-soft)', borderRadius:'var(--r-20)',
    }}>
      <div style={{fontSize:32, marginBottom:12}}>　</div>
      <h3 style={{fontFamily:'var(--font-serif)', fontWeight:600, fontSize:22, color:'var(--ink-1)', margin:'0 0 12px'}}>
        該当する薬剤師が見つかりませんでした
      </h3>
      <p style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.8, margin:'0 0 24px'}}>
        条件をゆるめるか、ヒトヤク運営にご相談ください。<br/>
        ご希望に近い薬剤師をご紹介できる場合があります。
      </p>
      <Button variant="primary" onClick={()=>window.HY_NAV?.('consult')}>運営に相談する</Button>
    </div>
  );
}

function RunbyOpsCTA() {
  return (
    <section style={{background:'var(--bg-soft)', padding:'80px 0'}}>
      <div className="container" style={{textAlign:'center'}}>
        <h2 style={{fontFamily:'var(--font-serif)', fontSize:30, fontWeight:600, lineHeight:1.5, margin:'0 0 16px', color:'var(--ink-1)'}}>
          自分で選ぶのに不安があるときは。
        </h2>
        <p style={{fontSize:15, color:'var(--ink-2)', lineHeight:1.9, maxWidth: 600, margin:'0 auto 28px'}}>
          ご相談内容をお伺いし、合いそうな薬剤師をヒトヤク運営からご紹介します。
        </p>
        <Button variant="deep" iconRight={Ico.arrow} onClick={()=>window.HY_NAV?.('consult')}>
          まずはヒトヤクに相談する
        </Button>
      </div>
    </section>
  );
}

Object.assign(window, { PageList });
