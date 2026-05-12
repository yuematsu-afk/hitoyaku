// ヒトヤク — Design System artboard (tokens reference)

function ArtboardSystem() {
  return (
    <div style={{width:'100%',minHeight:'100%',padding:'56px 64px',background:'var(--bg-base)',fontFamily:'var(--font-sans)'}}>
      <header style={{marginBottom:48,maxWidth:880}}>
        <div style={{fontSize:12,letterSpacing:'.2em',color:'var(--brand-deep)',fontWeight:600,marginBottom:14}}>— DESIGN SYSTEM</div>
        <h1 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:44,lineHeight:1.4,margin:0,color:'var(--ink-1)'}}>
          ヒトヤク デザインシステム
        </h1>
        <p style={{marginTop:18,fontSize:15,color:'var(--ink-2)',lineHeight:1.95}}>
          余白広めのライフスタイル系メディア基調 × 信頼感寄り。Tweaks パネルでメインカラーを4種類に切替可能。
        </p>
      </header>

      <Section title="Color · Brand">
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12}}>
          {[
            {n:'brand-deep',v:'#355E45',l:'CTA / ヘッダー'},
            {n:'brand',v:'#4A7A5C',l:'プライマリ'},
            {n:'brand-mid',v:'#84AB94',l:'装飾'},
            {n:'brand-soft',v:'#C9DDD3',l:'タグ・線'},
            {n:'brand-wash',v:'#E6EFE8',l:'広範囲ティント'},
          ].map(s=> <Swatch key={s.n} {...s}/>)}
        </div>
      </Section>

      <Section title="Color · Surface & Ink">
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,marginBottom:16}}>
          {[
            {n:'bg-base',v:'#FAFAF7',l:'ページ背景'},
            {n:'bg-soft',v:'#F5F2EC',l:'セクション交互'},
            {n:'bg-tint',v:'#EFEAE0',l:'強調セクション'},
            {n:'bg-card',v:'#FFFFFF',l:'カード'},
            {n:'line-soft',v:'#ECE7DD',l:'線・境界'},
          ].map(s=> <Swatch key={s.n} {...s}/>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
          {[
            {n:'ink-1',v:'#1F2A24',l:'本文・見出し'},
            {n:'ink-2',v:'#4A5A52',l:'副次テキスト'},
            {n:'ink-3',v:'#7A857F',l:'キャプション'},
            {n:'ink-4',v:'#B0B6B2',l:'プレースホルダー'},
          ].map(s=> <Swatch key={s.n} {...s} dark/>)}
        </div>
      </Section>

      <Section title="Color · Accent & Semantic">
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12}}>
          {[
            {n:'accent-warm',v:'#D89A6A',l:'法人向け強調'},
            {n:'accent-warm-soft',v:'#F4DFCA',l:'法人セクション'},
            {n:'accent-butter',v:'#F0E2CF',l:'温かさ'},
            {n:'accent-sky',v:'#BFD3DE',l:'装飾'},
            {n:'notice-bg',v:'#FBF7EC',l:'注意書き'},
          ].map(s=> <Swatch key={s.n} {...s}/>)}
        </div>
        <div style={{display:'flex',gap:14,marginTop:14}}>
          <Tag tone="online" size="lg">● 相談受付中</Tag>
          <Tag tone="busy" size="lg">● やや混雑</Tag>
          <Tag tone="off" size="lg">● 受付停止</Tag>
        </div>
      </Section>

      <Section title="Color · Brand variants (Tweakable)">
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
          {[
            {n:'green',vs:['#355E45','#4A7A5C','#C9DDD3','#E6EFE8']},
            {n:'mint',vs:['#2F6F66','#3F9088','#CCE5E1','#E8F2F0']},
            {n:'blue',vs:['#2C4F75','#4775A1','#D2DEEC','#E8EEF6']},
            {n:'beige',vs:['#6E4F2C','#9C7647','#E8D9C0','#F4ECDD']},
          ].map(p=>(
            <div key={p.n} style={{background:'#fff',border:'1px solid var(--line-soft)',borderRadius:'var(--r-16)',padding:18}}>
              <div style={{fontSize:12,color:'var(--ink-3)',marginBottom:10,letterSpacing:'.1em'}}>{p.n.toUpperCase()}</div>
              <div style={{display:'flex',gap:6}}>
                {p.vs.map((c,i)=> <div key={i} style={{flex:1,height:48,borderRadius:8,background:c}}/>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32}}>
          <div>
            <div style={{fontSize:11,color:'var(--ink-3)',letterSpacing:'.18em',marginBottom:14,fontWeight:600}}>SERIF · 見出し</div>
            <div style={{fontFamily:'var(--font-serif)',fontSize:48,lineHeight:1.35,fontWeight:600,color:'var(--ink-1)',marginBottom:8}}>聞ける人がいる、安心。</div>
            <div style={{fontSize:11,color:'var(--ink-3)'}}>Noto Serif JP · Weight 600 · 28〜72px</div>
          </div>
          <div>
            <div style={{fontSize:11,color:'var(--ink-3)',letterSpacing:'.18em',marginBottom:14,fontWeight:600}}>SANS · 本文</div>
            <div style={{fontFamily:'var(--font-sans)',fontSize:16,lineHeight:2,color:'var(--ink-1)',marginBottom:8}}>
              日常のちいさな疑問を、自分に合った薬剤師にゆっくり相談できる場所をつくりました。
            </div>
            <div style={{fontSize:11,color:'var(--ink-3)'}}>Noto Sans JP · Weight 400/500/600 · 12〜20px</div>
          </div>
        </div>
        <div style={{marginTop:32,display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:14}}>
          {[{l:'H1',s:48},{l:'H2',s:36},{l:'H3',s:24},{l:'Body+',s:17},{l:'Body',s:15},{l:'Caption',s:12}].map(t=>(
            <div key={t.l} style={{background:'var(--bg-soft)',borderRadius:'var(--r-12)',padding:'18px 16px'}}>
              <div style={{fontSize:11,color:'var(--ink-3)',marginBottom:8}}>{t.l} · {t.s}px</div>
              <div style={{fontFamily: t.s>=24?'var(--font-serif)':'var(--font-sans)',fontSize:Math.min(t.s,28),lineHeight:1.5,fontWeight:t.s>=24?600:500,color:'var(--ink-1)'}}>ヒトヤク</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Spacing · Radius · Shadow">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:32}}>
          <div>
            <div style={{fontSize:11,color:'var(--ink-3)',letterSpacing:'.18em',marginBottom:14,fontWeight:600}}>SPACING (4pt)</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[4,8,12,16,24,32,48,64,96].map(n=>(
                <div key={n} style={{display:'flex',alignItems:'center',gap:14}}>
                  <div style={{width:n,height:14,background:'var(--brand)',borderRadius:2}}/>
                  <span style={{fontSize:12,color:'var(--ink-2)'}}>--s-{n} / {n}px</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:11,color:'var(--ink-3)',letterSpacing:'.18em',marginBottom:14,fontWeight:600}}>RADIUS</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[{n:'4',v:4},{n:'8',v:8},{n:'12',v:12},{n:'16',v:16},{n:'20',v:20},{n:'24',v:24},{n:'pill',v:999}].map(r=>(
                <div key={r.n} style={{display:'flex',alignItems:'center',gap:14}}>
                  <div style={{width:64,height:32,background:'var(--brand-wash)',border:'1px solid var(--brand-soft)',borderRadius:r.v}}/>
                  <span style={{fontSize:12,color:'var(--ink-2)'}}>--r-{r.n}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:11,color:'var(--ink-3)',letterSpacing:'.18em',marginBottom:14,fontWeight:600}}>SHADOW</div>
            <div style={{display:'flex',flexDirection:'column',gap:18}}>
              {[
                {n:'shadow-1',v:'0 1px 2px rgba(31,42,36,.04), 0 1px 1px rgba(31,42,36,.03)',l:'subtle / card'},
                {n:'shadow-2',v:'0 4px 16px rgba(31,42,36,.06), 0 1px 3px rgba(31,42,36,.04)',l:'elevated / hover'},
                {n:'shadow-3',v:'0 16px 40px rgba(31,42,36,.10), 0 4px 12px rgba(31,42,36,.05)',l:'modal / overlay'},
              ].map(sh=>(
                <div key={sh.n} style={{display:'flex',alignItems:'center',gap:14}}>
                  <div style={{width:80,height:48,background:'#fff',borderRadius:8,boxShadow:sh.v}}/>
                  <div>
                    <div style={{fontSize:12,fontWeight:600,color:'var(--ink-1)'}}>--{sh.n}</div>
                    <div style={{fontSize:10,color:'var(--ink-3)'}}>{sh.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Components — Buttons">
        <div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
          <Button variant="deep">薬剤師を探す</Button>
          <Button variant="primary">プライマリ</Button>
          <Button variant="ghost">セカンダリ</Button>
          <Button variant="soft">ソフト</Button>
          <Button variant="accent">法人向けCTA</Button>
          <Button variant="deep" size="lg" iconRight={Ico.arrow}>大きい矢印付き</Button>
          <Button variant="ghost" size="sm">スモール</Button>
        </div>
      </Section>

      <Section title="Components — Tags">
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <Tag tone="brand">漢方</Tag>
          <Tag tone="brand">女性の健康</Tag>
          <Tag tone="warm">英語対応</Tag>
          <Tag tone="outline">飲み合わせ</Tag>
          <Tag tone="neutral">市販薬</Tag>
          <Tag tone="online"><span style={{width:6,height:6,borderRadius:'50%',background:'currentColor',display:'inline-block',marginRight:4}}/>受付中</Tag>
          <Tag tone="busy"><span style={{width:6,height:6,borderRadius:'50%',background:'currentColor',display:'inline-block',marginRight:4}}/>やや混雑</Tag>
        </div>
      </Section>

      <Section title="Components — Form">
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,maxWidth: 980}}>
          <Field label="入力" required><Input placeholder="プレースホルダー"/></Field>
          <Field label="セレクト"><Select><option>選択してください</option></Select></Field>
          <Field label="テキストエリア"><Textarea placeholder="複数行..."/></Field>
        </div>
        <div style={{marginTop:24, display:'flex', flexDirection:'column', gap:10, maxWidth:600}}>
          <Checkbox checked={true} onChange={()=>{}}>同意します(チェック済み)</Checkbox>
          <Checkbox checked={false} onChange={()=>{}}>同意します(未チェック)</Checkbox>
        </div>
      </Section>
    </div>
  );
}

function Section({title, children}) {
  return (
    <section style={{marginBottom:56}}>
      <h2 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:22,color:'var(--ink-1)',margin:'0 0 24px',paddingBottom:14,borderBottom:'1px solid var(--line-soft)'}}>{title}</h2>
      {children}
    </section>
  );
}

function Swatch({n,v,l,dark}) {
  return (
    <div style={{borderRadius:'var(--r-12)',overflow:'hidden',border:'1px solid var(--line-soft)'}}>
      <div style={{height:80,background:v}}/>
      <div style={{padding:'10px 12px',background:'#fff'}}>
        <div style={{fontSize:11,fontWeight:600,color:'var(--ink-1)'}}>--{n}</div>
        <div style={{fontSize:10,color:'var(--ink-3)',fontFamily:'var(--font-mono)',marginTop:2}}>{v}</div>
        <div style={{fontSize:10,color:'var(--ink-2)',marginTop:6}}>{l}</div>
      </div>
    </div>
  );
}

Object.assign(window, { ArtboardSystem });
