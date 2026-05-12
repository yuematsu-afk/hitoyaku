// ヒトヤク — Corporate (法人向け) Page
function PageCorp() {
  return (
    <div style={{background:'var(--bg-base)'}}>
      <SiteHeader current="corp"/>
      <Breadcrumb items={[{label:'トップ',go:'top'},{label:'法人の方へ'}]}/>

      {/* Hero */}
      <section style={{padding:'48px 0 96px', background:'var(--accent-warm-soft)', position:'relative', overflow:'hidden'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:64, alignItems:'center'}}>
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
              <Button size="lg" variant="accent" iconRight={Ico.arrow}>法人向け資料を請求する</Button>
              <Button size="lg" variant="ghost">導入相談する</Button>
            </div>
          </div>
          <CorpHeroVisual/>
        </div>
      </section>

      {/* Problem */}
      <section style={{padding:'120px 0'}}>
        <div className="container">
          <SectionHead eyebrow="健康経営の現場で" title={<>従業員の小さな不安は、<br/>意外と拾えていない。</>}/>
          <div style={{marginTop:56, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24}}>
            {[
              {t:'病院に行くほどではない健康相談', d:'頭痛、便秘、不眠、サプリ選び。社内では聞きづらい。'},
              {t:'産業医面談までのハードル', d:'予約・対面が前提だと、軽い相談は埋もれてしまう。'},
              {t:'女性・育児世代特有の相談', d:'生理・更年期・子どもの薬。専門家への接点が必要。'},
            ].map((p,i)=>(
              <div key={i} style={{background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-20)', padding:'32px'}}>
                <div style={{fontFamily:'var(--font-serif)', color:'var(--accent-warm)', fontSize:36, fontWeight:600, marginBottom:14}}>{String(i+1).padStart(2,'0')}</div>
                <div style={{fontSize:17, fontWeight:600, color:'var(--ink-1)', lineHeight:1.6, marginBottom:10}}>{p.t}</div>
                <div style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.9}}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Merits */}
      <section style={{background:'var(--brand-deep)', color:'#fff', padding:'120px 0'}}>
        <div className="container">
          <div style={{maxWidth: 720}}>
            <div style={{fontSize:12,letterSpacing:'.2em',color:'var(--brand-soft)',fontWeight:600,marginBottom:18}}>— MERITS</div>
            <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(28px,3.4vw,40px)',fontWeight:600,lineHeight:1.5,margin:0}}>
              健康経営にも、従業員満足にも、<br/>静かに効いていく仕組みです。
            </h2>
          </div>
          <div style={{marginTop:56, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}}>
            {[
              {t:'日常的に使える健康相談窓口', d:'予約不要・LINEから気軽に。'},
              {t:'女性・育児・高齢家族にも', d:'特化分野を持つ薬剤師が在籍。'},
              {t:'管理者の運用負担を抑える', d:'導入後の運用は基本ヒトヤク側で完結。'},
              {t:'利用レポートで効果を把握', d:'匿名集計で利用傾向をご報告。'},
            ].map((m,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.14)', borderRadius:'var(--r-20)', padding:'32px 28px'}}>
                <div style={{width:40,height:40,borderRadius:10,background:'var(--accent-warm)',marginBottom:18,display:'flex',alignItems:'center',justifyContent:'center'}}>{Ico.check}</div>
                <div style={{fontSize:16,fontWeight:600,marginBottom:8,lineHeight:1.5}}>{m.t}</div>
                <div style={{fontSize:13,color:'rgba(255,255,255,.7)',lineHeight:1.8}}>{m.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section style={{padding:'120px 0'}}>
        <div className="container">
          <SectionHead eyebrow="利用シーン" title="こんな場面で、薬剤師が頼れます。"/>
          <div style={{marginTop:56, display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
            {[
              {p:'30代女性 / マーケティング', q:'PMSの薬と、貧血のサプリの飲み合わせを確認したい。'},
              {p:'40代男性 / 営業職', q:'出張先で胃薬を選びたいが、何を買えばいいか分からない。'},
              {p:'30代女性 / エンジニア', q:'子どもの熱が38度。市販の解熱剤、どこまで使っていいか?'},
              {p:'50代男性 / 管理職', q:'親の薬が増えてきた。整理してもいいのか相談したい。'},
            ].map((c,i)=>(
              <div key={i} style={{background:'var(--bg-soft)', borderRadius:'var(--r-20)', padding:'28px 32px', display:'flex', gap:18, alignItems:'flex-start'}}>
                <div style={{flex:'0 0 48px',width:48,height:48,borderRadius:'50%',background:'var(--bg-tint)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--ink-2)',fontFamily:'var(--font-serif)'}}>{c.p.split(' ')[0].slice(0,1)}</div>
                <div>
                  <div style={{fontSize:12,color:'var(--ink-3)',marginBottom:6}}>{c.p}</div>
                  <div style={{fontSize:15,lineHeight:1.8,color:'var(--ink-1)'}}>「{c.q}」</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section style={{background:'var(--bg-soft)', padding:'120px 0'}}>
        <div className="container">
          <SectionHead eyebrow="導入の流れ" title="お問い合わせから運用開始まで、3-4週間。"/>
          <div style={{marginTop:56, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24}}>
            {[
              {n:'01',t:'資料請求・お問い合わせ',d:'まずはサービス内容をご確認ください。'},
              {n:'02',t:'要件ヒアリング',d:'従業員数・想定利用シーンを伺います。'},
              {n:'03',t:'契約・運用設計',d:'利用案内・運用フローを準備します。'},
              {n:'04',t:'導入・社内案内',d:'従業員向け案内テンプレもご用意。'},
            ].map(s=>(
              <div key={s.n}>
                <div style={{fontFamily:'var(--font-serif)',fontSize:36,fontWeight:600,color:'var(--accent-warm)'}}>{s.n}</div>
                <div style={{fontSize:16,fontWeight:600,color:'var(--ink-1)',marginTop:10,marginBottom:8}}>{s.t}</div>
                <div style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.85}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form preview */}
      <section style={{padding:'120px 0'}}>
        <div className="container-narrow">
          <SectionHead align="center" eyebrow="お問い合わせ" title="まずは資料からどうぞ。"/>
          <div style={{marginTop:48, background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-24)', padding:'40px 48px', boxShadow:'var(--shadow-1)'}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
              <Field label="会社名" required><Input placeholder="例: 株式会社ヒトヤク"/></Field>
              <Field label="ご担当者名" required><Input placeholder="例: 山田 太郎"/></Field>
              <Field label="メールアドレス" required><Input type="email" placeholder="例: yamada@example.co.jp"/></Field>
              <Field label="従業員数" required>
                <Select>
                  <option>選択してください</option>
                  <option>～50名</option><option>51～200名</option>
                  <option>201～500名</option><option>501名以上</option>
                </Select>
              </Field>
            </div>
            <div style={{marginTop:20}}>
              <Field label="ご検討の目的 (複数選択可)">
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {['福利厚生強化','健康経営','女性活躍支援','育児世代支援','産業保健の補完','その他'].map(t=>(
                    <Tag key={t} tone="outline" size="lg">{t}</Tag>
                  ))}
                </div>
              </Field>
            </div>
            <div style={{marginTop:20}}>
              <Field label="ご希望" required>
                <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
                  {['資料請求','オンライン相談','見積依頼'].map(t=>(
                    <label key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:14}}>
                      <input type="radio" name="want" style={{accentColor:'var(--brand)'}}/>{t}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
            <div style={{marginTop:20}}>
              <Field label="お問い合わせ内容"><Textarea placeholder="ご質問やご要望があればお知らせください"/></Field>
            </div>
            <div style={{marginTop:24, textAlign:'center'}}>
              <Button size="lg" variant="accent" iconRight={Ico.arrow}>送信する</Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter/>
    </div>
  );
}

function CorpHeroVisual() {
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
        {[
          {f:1, t:'最近頭痛がひどくて、市販薬を変えたいです。'},
          {f:0, t:'今飲んでいるお薬と、頭痛のタイミングを教えていただけますか?'},
          {f:1, t:'ロキソニンを朝のみ。午後にズキズキします。'},
          {f:0, t:'肩こりや姿勢の影響かもしれません。一度こちらの市販薬を試してみてはいかがでしょう。'},
        ].map((m,i)=>(
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
