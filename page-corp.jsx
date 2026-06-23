// ヒトヤク — Corporate (法人向け) Page
function PageCorp() {
  const isMobile = useIsMobile();
  const [formStatus, setFormStatus] = React.useState('idle'); // idle|sending|success|error
  const [purposes, setPurposes] = React.useState([]);
  const [wish, setWish] = React.useState('');
  const formRef = React.useRef(null);

  const togglePurpose = (t) => setPurposes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const scrollToForm = () => {
    document.getElementById('corp-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    const fd = new FormData(formRef.current);
    const payload = {
      access_key: '1f72d159-2aa7-4eda-8925-864f3656e2e3',
      subject: '【ヒトヤク法人向け】お問い合わせ',
      from_name: 'ヒトヤク for Business',
      replyto: fd.get('email') || '',
      company: fd.get('company') || '',
      name: fd.get('name') || '',
      email: fd.get('email') || '',
      size: fd.get('size') || '',
      purpose: purposes.join(', '),
      wish: wish,
      message: fd.get('message') || '',
    };
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setFormStatus(data.success ? 'success' : 'error');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div style={{background:'var(--bg-base)'}}>
      <SiteHeader current="corp"/>
      <Breadcrumb items={[{label:'トップ',go:'top'},{label:'一般法人の方へ'}]}/>

      {/* Hero */}
      <section style={{padding: isMobile ? '40px 0 56px' : '48px 0 96px', background:'var(--accent-warm-soft)', position:'relative', overflow:'hidden'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 32 : 64, alignItems:'center'}}>
          <div>
            <div style={{fontSize:12, letterSpacing:'.2em', color:'#8B5A2B', fontWeight:600, marginBottom:18}}>— FOR COMPANIES</div>
            <h1 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:'clamp(36px,4.4vw,56px)',lineHeight:1.4,margin:0,color:'var(--ink-1)'}}>
              従業員の<br/>「ちょっと聞きたい」を、<br/>会社が支える。
            </h1>
            <p style={{marginTop:24, fontSize:16, lineHeight:1.95, color:'var(--ink-2)', maxWidth:520}}>
              市販薬・サプリ・飲み合わせ・受診の目安。
              日常的な健康相談を、薬剤師に気軽に聞ける窓口として、福利厚生にご導入いただけます。
            </p>
            <div style={{marginTop:32, display:'flex', gap:12, flexWrap:'wrap'}}>
              <Button size="lg" variant="accent" iconRight={Ico.arrow} onClick={scrollToForm}>一般法人向け資料を請求する</Button>
              <Button size="lg" variant="ghost" onClick={scrollToForm}>導入相談する</Button>
            </div>
          </div>
          <CorpHeroVisual isMobile={isMobile}/>
        </div>
      </section>

      {/* Problem */}
      <section style={{padding: isMobile ? '56px 0' : '120px 0'}}>
        <div className="container">
          <SectionHead eyebrow="健康経営の現場で" title={<>従業員の小さな不安は、<br/>意外と拾えていない。</>}/>
          <div style={{marginTop: isMobile ? 32 : 56, display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24}}>
            {[
              {t:'病院に行くほどではない健康相談', d:'頭痛、便秘、不眠、サプリ選び。社内では聞きづらい。'},
              {t:'産業医面談までのハードル', d:'予約・対面が前提だと、軽い相談は埋もれてしまう。'},
              {t:'女性・育児世代特有の相談', d:'生理・更年期・子どもの薬。専門家への接点が必要。'},
            ].map((p,i)=>(
              <div key={i} style={{background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-20)', padding: isMobile ? '24px 20px' : '32px'}}>
                <div style={{fontFamily:'var(--font-serif)', color:'var(--accent-warm)', fontSize:36, fontWeight:600, marginBottom:14}}>{String(i+1).padStart(2,'0')}</div>
                <div style={{fontSize:17, fontWeight:600, color:'var(--ink-1)', lineHeight:1.6, marginBottom:10}}>{p.t}</div>
                <div style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.9}}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Merits */}
      <section style={{background:'var(--brand-deep)', color:'#fff', padding: isMobile ? '56px 0' : '120px 0'}}>
        <div className="container">
          <div style={{maxWidth: 720}}>
            <div style={{fontSize:12,letterSpacing:'.2em',color:'var(--brand-soft)',fontWeight:600,marginBottom:18}}>— MERITS</div>
            <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(24px,3.4vw,40px)',fontWeight:600,lineHeight:1.5,margin:0}}>
              健康経営にも、従業員満足にも、<br/>静かに効いていく仕組みです。
            </h2>
          </div>
          <div style={{marginTop: isMobile ? 32 : 56, display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20}}>
            {[
              {t:'日常的に使える健康相談窓口', d:'予約不要・LINEから気軽に。'},
              {t:'女性・育児・高齢家族にも', d:'特化分野を持つ薬剤師が在籍。'},
              {t:'管理者の運用負担を抑える', d:'導入後の運用は基本ヒトヤク側で完結。'},
              {t:'利用レポートで効果を把握', d:'匿名集計で利用傾向をご報告。'},
            ].map((m,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.14)', borderRadius:'var(--r-20)', padding: isMobile ? '20px 16px' : '32px 28px'}}>
                <div style={{width:36,height:36,borderRadius:10,background:'var(--accent-warm)',marginBottom:14,display:'flex',alignItems:'center',justifyContent:'center'}}>{Ico.check}</div>
                <div style={{fontSize: isMobile ? 13 : 16,fontWeight:600,marginBottom:8,lineHeight:1.5}}>{m.t}</div>
                <div style={{fontSize: isMobile ? 12 : 13,color:'rgba(255,255,255,.7)',lineHeight:1.8}}>{m.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section style={{padding: isMobile ? '56px 0' : '120px 0'}}>
        <div className="container">
          <SectionHead eyebrow="利用シーン" title="こんな場面で、薬剤師が頼れます。"/>
          <div style={{marginTop: isMobile ? 32 : 56, display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 24}}>
            {[
              {p:'30代女性 / マーケティング', q:'PMSの薬と、貧血のサプリの飲み合わせを確認したい。'},
              {p:'40代男性 / 営業職', q:'出張先で胃薬を選びたいが、何を買えばいいか分からない。'},
              {p:'30代女性 / エンジニア', q:'子どもの熱が38度。市販の解熱剤、どこまで使っていいか?'},
              {p:'50代男性 / 管理職', q:'親の薬が増えてきた。整理してもいいのか相談したい。'},
            ].map((c,i)=>(
              <div key={i} style={{background:'var(--bg-soft)', borderRadius:'var(--r-20)', padding: isMobile ? '20px 16px' : '28px 32px', display:'flex', gap:14, alignItems:'flex-start'}}>
                <div style={{flex:'0 0 44px',width:44,height:44,borderRadius:'50%',background:'var(--bg-tint)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--ink-2)'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{fontSize:12,color:'var(--ink-3)',marginBottom:6}}>{c.p}</div>
                  <div style={{fontSize: isMobile ? 14 : 15,lineHeight:1.8,color:'var(--ink-1)'}}>「{c.q}」</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section style={{background:'var(--bg-soft)', padding: isMobile ? '56px 0' : '120px 0'}}>
        <div className="container">
          <SectionHead eyebrow="導入の流れ" title="お問い合わせから運用開始まで、3-4週間。"/>
          <div style={{marginTop: isMobile ? 32 : 56, display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 20 : 24}}>
            {[
              {n:'01',t:'資料請求・お問い合わせ',d:'まずはサービス内容をご確認ください。'},
              {n:'02',t:'要件ヒアリング',d:'従業員数・想定利用シーンを伺います。'},
              {n:'03',t:'契約・運用設計',d:'利用案内・運用フローを準備します。'},
              {n:'04',t:'導入・社内案内',d:'従業員向け案内テンプレもご用意。'},
            ].map(s=>(
              <div key={s.n}>
                <div style={{fontFamily:'var(--font-serif)',fontSize:32,fontWeight:600,color:'var(--accent-warm)'}}>{s.n}</div>
                <div style={{fontSize: isMobile ? 14 : 16,fontWeight:600,color:'var(--ink-1)',marginTop:8,marginBottom:6}}>{s.t}</div>
                <div style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.85}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="corp-contact" style={{padding: isMobile ? '56px 0' : '120px 0'}}>
        <div className="container-narrow">
          <SectionHead align="center" eyebrow="お問い合わせ" title="まずは資料からどうぞ。"/>
          <div style={{marginTop:48, background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-24)', padding: isMobile ? '28px 20px' : '40px 48px', boxShadow:'var(--shadow-1)'}}>
            {formStatus === 'success' ? (
              <div style={{textAlign:'center', padding:'40px 0'}}>
                <div style={{width:56,height:56,borderRadius:'50%',background:'var(--brand-wash)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',color:'var(--brand)'}}>
                  {Ico.check}
                </div>
                <div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:600,color:'var(--ink-1)',marginBottom:10}}>送信が完了しました</div>
                <p style={{fontSize:14,color:'var(--ink-2)',lineHeight:1.9}}>お問い合わせいただきありがとうございます。<br/>担当者より2〜3営業日以内にご連絡いたします。</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:20}}>
                  <Field label="会社名" required><Input name="company" placeholder="例: 株式会社ヒトヤク" required/></Field>
                  <Field label="ご担当者名" required><Input name="name" placeholder="例: 山田 太郎" required/></Field>
                  <Field label="メールアドレス" required><Input name="email" type="email" placeholder="例: yamada@example.co.jp" required/></Field>
                  <Field label="従業員数" required>
                    <Select name="size" required>
                      <option value="">選択してください</option>
                      <option>～50名</option><option>51～200名</option>
                      <option>201～500名</option><option>501名以上</option>
                    </Select>
                  </Field>
                </div>
                <div style={{marginTop:20}}>
                  <Field label="ご検討の目的 (複数選択可)">
                    <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                      {['福利厚生強化','健康経営','女性活躍支援','育児世代支援','産業保健の補完','その他'].map(t=>(
                        <span key={t} onClick={()=>togglePurpose(t)} style={{
                          display:'inline-block', fontSize:13, padding:'7px 14px',
                          borderRadius:'var(--r-pill)', fontWeight:500, cursor:'pointer',
                          border:'1px solid '+(purposes.includes(t)?'var(--brand)':'var(--line-mid)'),
                          background:purposes.includes(t)?'var(--brand-wash)':'transparent',
                          color:purposes.includes(t)?'var(--brand-deep)':'var(--ink-2)',
                          transition:'all .15s',
                        }}>{t}</span>
                      ))}
                    </div>
                  </Field>
                </div>
                <div style={{marginTop:20}}>
                  <Field label="ご希望" required>
                    <div style={{display:'flex',gap: isMobile ? 16 : 24,flexWrap:'wrap'}}>
                      {['資料請求','オンライン相談','見積依頼'].map(t=>(
                        <label key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:14,cursor:'pointer'}}>
                          <input type="radio" name="wish" value={t} checked={wish===t} onChange={()=>setWish(t)} style={{accentColor:'var(--brand)'}}/>{t}
                        </label>
                      ))}
                    </div>
                  </Field>
                </div>
                <div style={{marginTop:20}}>
                  <Field label="お問い合わせ内容"><Textarea name="message" placeholder="ご質問やご要望があればお知らせください"/></Field>
                </div>
                <div style={{marginTop:24, textAlign:'center'}}>
                  {!wish && (
                    <p style={{fontSize:13,color:'var(--ink-3)',marginBottom:12}}>ご希望（資料請求・相談・見積）を選択してください</p>
                  )}
                  <Button size="lg" variant="accent" iconRight={Ico.arrow}
                    disabled={formStatus==='sending' || !wish}>
                    {formStatus === 'sending' ? '送信中...' : '送信する'}
                  </Button>
                  {formStatus === 'error' && (
                    <p style={{marginTop:12,fontSize:13,color:'#c0392b'}}>送信に失敗しました。もう一度お試しください。</p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter/>
    </div>
  );
}

function CorpHeroVisual({ isMobile }) {
  const messages = [
    {f:1, t:'最近頭痛がひどくて、市販薬を変えたいです。'},
    {f:0, t:'今飲んでいるお薬と、頭痛のタイミングを教えていただけますか?'},
    {f:1, t:'ロキソニンを朝のみ。午後にズキズキします。'},
    {f:0, t:'肩こりや姿勢の影響かもしれません。一度こちらの市販薬を試してみてはいかがでしょう。'},
  ];

  if (isMobile) {
    return (
      <div style={{background:'#fff', borderRadius:'var(--r-24)', boxShadow:'var(--shadow-2)', padding:'20px 16px', display:'flex', flexDirection:'column', gap:10}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:32,height:32,borderRadius:'50%',background:'var(--brand-wash)',color:'var(--brand-deep)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-serif)',fontWeight:600,fontSize:13}}>K</div>
            <div>
              <div style={{fontSize:12,fontWeight:600}}>会社の健康相談</div>
              <div style={{fontSize:10,color:'var(--ink-3)'}}>ヒトヤク for Business</div>
            </div>
          </div>
          <span style={{fontSize:10,color:'var(--ink-3)'}}>14:32</span>
        </div>
        {messages.map((m,i)=>(
          <div key={i} style={{
            alignSelf: m.f===1?'flex-end':'flex-start', maxWidth:'85%',
            background: m.f===1?'var(--brand)':'var(--bg-soft)',
            color: m.f===1?'#fff':'var(--ink-1)',
            borderRadius: m.f===1?'16px 16px 4px 16px':'16px 16px 16px 4px',
            padding:'9px 13px', fontSize:12, lineHeight:1.7,
          }}>{m.t}</div>
        ))}
      </div>
    );
  }

  return (
    <div style={{position:'relative', aspectRatio:'1/1', maxHeight: 480}}>
      <div style={{
        position:'absolute', inset:'10% 0% 10% 10%', background:'#fff',
        borderRadius:'var(--r-24)', boxShadow:'var(--shadow-2)',
        display:'flex', flexDirection:'column', padding:'24px 28px', gap:14,
      }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:36,height:36,borderRadius:'50%',background:'var(--brand-wash)',color:'var(--brand-deep)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-serif)',fontWeight:600}}>K</div>
            <div>
              <div style={{fontSize:13,fontWeight:600}}>会社の健康相談</div>
              <div style={{fontSize:11,color:'var(--ink-3)'}}>ヒトヤク for Business</div>
            </div>
          </div>
          <span style={{fontSize:11,color:'var(--ink-3)'}}>14:32</span>
        </div>
        {messages.map((m,i)=>(
          <div key={i} style={{
            alignSelf: m.f===1?'flex-end':'flex-start', maxWidth:'80%',
            background: m.f===1?'var(--brand)':'var(--bg-soft)',
            color: m.f===1?'#fff':'var(--ink-1)',
            borderRadius: m.f===1?'18px 18px 4px 18px':'18px 18px 18px 4px',
            padding:'10px 14px', fontSize:13, lineHeight:1.7,
          }}>{m.t}</div>
        ))}
      </div>
      <div style={{
        position:'absolute', top:'4%', right:'2%', width:140, height:140,
        background:'var(--brand-wash)', borderRadius:'50%', zIndex:-1,
      }}/>
    </div>
  );
}

Object.assign(window, { PageCorp });
