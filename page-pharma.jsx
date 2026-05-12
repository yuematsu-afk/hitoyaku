// ヒトヤク — Pharmacist Join (薬剤師・薬局向け) Page
function PagePharma() {
  return (
    <div style={{background:'var(--bg-base)'}}>
      <SiteHeader current="pharma"/>
      <Breadcrumb items={[{label:'トップ',go:'top'},{label:'薬剤師・薬局の方へ'}]}/>

      <section style={{padding:'48px 0 96px', background:'var(--brand-wash)'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:64, alignItems:'center'}}>
          <div>
            <div style={{fontSize:12, letterSpacing:'.2em', color:'var(--brand-deep)', fontWeight:600, marginBottom:18}}>— FOR PHARMACISTS</div>
            <h1 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:'clamp(36px,4.4vw,56px)',lineHeight:1.4,margin:0,color:'var(--ink-1)'}}>
              あなたの専門性を、<br/>必要としている人へ。
            </h1>
            <p style={{marginTop:24, fontSize:16, lineHeight:1.95, color:'var(--ink-2)', maxWidth:520}}>
              ヒトヤクは、薬剤師が自分の強みを発信し、相談したい人と出会える場所です。
              漢方、女性の健康、子育て、外国語対応など、あなたの「これが伝えたい」を活かせます。
            </p>
            <div style={{marginTop:32, display:'flex',gap:12,flexWrap:'wrap'}}>
              <Button size="lg" variant="deep" iconRight={Ico.arrow}>薬剤師として参加する</Button>
              <Button size="lg" variant="ghost">薬局法人として問い合わせる</Button>
            </div>
          </div>
          <PharmaHeroVisual/>
        </div>
      </section>

      {/* Why join */}
      <section style={{padding:'120px 0'}}>
        <div className="container">
          <SectionHead eyebrow="参加のメリット" title={<>「自分の強み」を活かして、<br/>新しい接点をつくる。</>}/>
          <div style={{marginTop:56, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24}}>
            {[
              {n:'01',t:'専門性と人柄を見える化',d:'プロフィール・メッセージ・得意分野を発信。「合いそう」を相談前に伝えられます。'},
              {n:'02',t:'相談者との新しい接点',d:'処方箋に来た方だけでなく、新たな相談者と出会えます。'},
              {n:'03',t:'継続的な関係につなげる',d:'一度きりではなく、継続相談・かかりつけ関係に発展できます。'},
            ].map(b=>(
              <div key={b.n} style={{background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-20)', padding:'36px 32px'}}>
                <div style={{fontFamily:'var(--font-serif)',fontSize:42,fontWeight:600,color:'var(--brand-deep)',marginBottom:18}}>{b.n}</div>
                <div style={{fontSize:18,fontWeight:600,color:'var(--ink-1)',marginBottom:12,lineHeight:1.5}}>{b.t}</div>
                <div style={{fontSize:14,color:'var(--ink-2)',lineHeight:1.95}}>{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How profile appears */}
      <section style={{background:'var(--bg-soft)',padding:'120px 0'}}>
        <div className="container" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center'}}>
          <div>
            <SectionHead eyebrow="プロフィールの見え方" title="温かく、でも専門性が伝わる紹介ページ。"/>
            <ul style={{listStyle:'none',padding:0,margin:'32px 0 0',display:'flex',flexDirection:'column',gap:14}}>
              {['短いキャッチコピーで人柄を表現','得意分野はタグでスキャナブルに','経歴と相談スタンスを並べて掲載','LINE・オンライン面談など対応方法を明示'].map((t,i)=>(
                <li key={i} style={{display:'flex',gap:12,alignItems:'flex-start',fontSize:14,color:'var(--ink-1)',lineHeight:1.85}}>
                  <span style={{flex:'0 0 22px',color:'var(--brand)',marginTop:3}}>{Ico.check}</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <MiniProfilePreview/>
        </div>
      </section>

      {/* Flow */}
      <section style={{padding:'120px 0'}}>
        <div className="container">
          <SectionHead eyebrow="参加の流れ" title="申し込みから掲載まで、最短2週間。"/>
          <div style={{marginTop:56, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24}}>
            {[
              {n:'01',t:'参加申し込み',d:'資格・所属先・得意分野をお知らせください。'},
              {n:'02',t:'オンライン面談',d:'運営とご挨拶。サービス説明と方針確認。'},
              {n:'03',t:'プロフィール作成',d:'運営がインタビューしてご一緒に作成。'},
              {n:'04',t:'掲載・運用開始',d:'相談受付状況はご自身で調整いただけます。'},
            ].map(s=>(
              <div key={s.n}>
                <div style={{fontFamily:'var(--font-serif)',fontSize:36,fontWeight:600,color:'var(--brand-deep)'}}>{s.n}</div>
                <div style={{fontSize:16,fontWeight:600,color:'var(--ink-1)',marginTop:10,marginBottom:8}}>{s.t}</div>
                <div style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.85}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{padding:'40px 0 120px'}}>
        <div className="container-narrow">
          <SectionHead align="center" eyebrow="参加お問い合わせ" title="まずはお話しさせてください。"/>
          <div style={{marginTop:48, background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-24)', padding:'40px 48px'}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
              <Field label="お名前" required><Input placeholder="例: 中村 結衣"/></Field>
              <Field label="薬剤師資格" required>
                <Select><option>選択してください</option><option>あり</option><option>申請中</option><option>なし(薬局法人としての問い合わせ)</option></Select>
              </Field>
              <Field label="ご所属(薬局・法人名)"><Input placeholder="例: みどり薬局 表参道店"/></Field>
              <Field label="ご所在地"><Input placeholder="例: 東京都・港区"/></Field>
            </div>
            <div style={{marginTop:20, display:'flex', flexDirection:'column', gap:20}}>
              <Field label="得意分野 (複数選択可)" required>
                <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                  {window.HY_DATA.SPECIALTIES.map(s=>(
                    <Tag key={s.id} tone="outline" size="lg">{s.label}</Tag>
                  ))}
                </div>
              </Field>
              <Field label="オンライン対応">
                <div style={{display:'flex',gap:24}}>
                  {['可','店舗のみ希望','要相談'].map(t=>(
                    <label key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:14}}>
                      <input type="radio" name="online" style={{accentColor:'var(--brand)'}}/>{t}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="参加希望理由 / 伝えたい強み" required>
                <Textarea placeholder="どんな相談に応えていきたいか、自由にお書きください"/>
              </Field>
              <Field label="ご連絡先" required><Input type="email" placeholder="メールアドレス"/></Field>
            </div>
            <div style={{marginTop:24, textAlign:'center'}}>
              <Button size="lg" variant="deep" iconRight={Ico.arrow}>送信する</Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter/>
    </div>
  );
}

function PharmaHeroVisual() {
  const { PHARMACISTS } = window.HY_DATA;
  return (
    <div style={{position:'relative', aspectRatio:'1/1', maxHeight:480}}>
      <div style={{position:'absolute',inset:'8% 8% 24% 12%',background:'#fff',borderRadius:'var(--r-24)',boxShadow:'var(--shadow-2)',overflow:'hidden',padding:24}}>
        <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
          <PharmacistPhoto p={PHARMACISTS[1]} size={88} rounded="var(--r-16)"/>
          <div style={{minWidth:0}}>
            <StatusDot status="online"/>
            <div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:600,marginTop:6}}>{PHARMACISTS[1].name}</div>
            <div style={{fontSize:11,color:'var(--ink-3)',marginTop:4}}>{PHARMACISTS[1].title.split(' /')[0]}</div>
          </div>
        </div>
        <div style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.85,marginTop:18}}>「{PHARMACISTS[1].shortMessage}」</div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:14}}>
          {['飲み合わせ','慢性疾患','英語対応'].map(t=> <Tag key={t} tone="brand" size="sm">{t}</Tag>)}
        </div>
      </div>
      <div style={{
        position:'absolute',bottom:'4%',right:'4%',background:'var(--accent-warm)',color:'#fff',
        padding:'14px 20px',borderRadius:'var(--r-16)',fontSize:13,fontWeight:600,
        boxShadow:'var(--shadow-2)',
      }}>新着相談: 3件</div>
    </div>
  );
}

function MiniProfilePreview() {
  const p = window.HY_DATA.PHARMACISTS[0];
  return (
    <div style={{background:'#fff',borderRadius:'var(--r-24)',border:'1px solid var(--line-soft)',padding:24,boxShadow:'var(--shadow-2)'}}>
      <div style={{aspectRatio:'5/4',borderRadius:'var(--r-16)',overflow:'hidden',marginBottom:16}}>
        <PharmacistPhoto p={p} size={400} rounded={0}/>
      </div>
      <StatusDot status="online"/>
      <div style={{fontFamily:'var(--font-serif)',fontSize:24,fontWeight:600,marginTop:8}}>{p.name}</div>
      <div style={{fontSize:11,color:'var(--ink-3)',marginTop:4}}>{p.title}</div>
      <div style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.85,marginTop:12}}>「{p.shortMessage}」</div>
      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:14}}>
        {p.specialties.slice(0,3).map(sid=>(
          <Tag key={sid} tone="brand" size="sm">{window.HY_DATA.SPECIALTIES.find(s=>s.id===sid)?.label}</Tag>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { PagePharma });
