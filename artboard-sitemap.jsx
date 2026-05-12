// ヒトヤク — Sitemap / Information Architecture artboard

function ArtboardSitemap() {
  return (
    <div style={{
      width:'100%', minHeight:'100%', padding:'56px 64px',
      background:'var(--bg-base)', fontFamily:'var(--font-sans)',
    }}>
      <header style={{marginBottom:48, maxWidth: 880}}>
        <div style={{fontSize:12, letterSpacing:'.2em', color:'var(--brand-deep)', fontWeight:600, marginBottom:14}}>— SITE MAP / IA</div>
        <h1 style={{fontFamily:'var(--font-serif)', fontWeight:600, fontSize:44, lineHeight:1.4, margin:0, color:'var(--ink-1)'}}>
          ヒトヤク サービスサイト 情報設計
        </h1>
        <p style={{marginTop:18, fontSize:15, color:'var(--ink-2)', lineHeight:1.95}}>
          一般利用者・法人・薬剤師の3つの導線が並走できる階層構造。トップから1〜2クリックで主要アクションに到達できる設計。
        </p>
      </header>

      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32, marginBottom:56}}>
        <FlowColumn
          color="var(--brand-deep)" bg="var(--brand-wash)"
          eyebrow="ENTRY A · 一般利用者"
          title="薬剤師を選んで相談する"
          steps={[
            'トップ — サービス価値の把握',
            '薬剤師一覧 — 得意分野で絞り込み',
            '薬剤師詳細 — 人柄・専門性を確認',
            '相談する — フォーム送信',
            '返信 — LINE / オンライン / 店舗',
          ]}
          end="継続相談 / かかりつけ薬剤師化"
        />
        <FlowColumn
          color="#8B5A2B" bg="var(--accent-warm-soft)"
          eyebrow="ENTRY B · 法人ご担当者"
          title="福利厚生として導入する"
          steps={[
            'トップ → 法人の方へ',
            '法人ページ — 課題・メリット確認',
            'お問い合わせ — 資料請求',
            'オンライン商談 — 要件ヒアリング',
            '導入 — 従業員向け案内開始',
          ]}
          end="月次レポートで利用状況把握"
        />
        <FlowColumn
          color="var(--brand-deep)" bg="var(--bg-tint)"
          eyebrow="ENTRY C · 薬剤師・薬局"
          title="ヒトヤクに参加する"
          steps={[
            'トップ → 薬剤師・薬局の方へ',
            '参加ページ — メリット確認',
            '参加申込 — 資格・専門性を申請',
            '面談 — プロフィール作成',
            '掲載開始 — 受付状況を管理',
          ]}
          end="相談から継続関係に発展"
        />
      </div>

      <div style={{borderTop:'1px solid var(--line-mid)', paddingTop:48}}>
        <h2 style={{fontFamily:'var(--font-serif)', fontWeight:600, fontSize:24, color:'var(--ink-1)', margin:'0 0 32px'}}>
          ページ階層
        </h2>
        <TreeMap/>
      </div>

      <div style={{marginTop:64, display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:24}}>
        <Panel title="主要CTAの設計方針">
          <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10,fontSize:13,color:'var(--ink-2)',lineHeight:1.9}}>
            <li>• <strong>1次CTA</strong>(Brand-deep, 全ページ共通): 薬剤師を探す</li>
            <li>• <strong>2次CTA</strong>(Ghost, セーフティネット): ヒトヤクに相談する</li>
            <li>• <strong>導線別CTA</strong>(Accent warm): 法人向け資料請求</li>
            <li>• <strong>参加CTA</strong>(Brand-deep): 薬剤師として参加する</li>
            <li>• スマホでは 1次CTA を画面下部に sticky 固定</li>
          </ul>
        </Panel>
        <Panel title="コピー方針 — 使う/避ける">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,fontSize:12,lineHeight:1.85}}>
            <div>
              <div style={{color:'var(--brand-deep)',fontWeight:600,marginBottom:8}}>使う言葉</div>
              {['相談できる','不安を整理する','受診の目安を知る','自分に合った薬剤師','継続的に寄り添う','専門家に聞ける安心感'].map(w=>(
                <div key={w} style={{color:'var(--ink-1)',marginBottom:4}}>・ {w}</div>
              ))}
            </div>
            <div>
              <div style={{color:'var(--danger)',fontWeight:600,marginBottom:8}}>避ける言葉</div>
              {['完治','治療できる','必ず改善','診断','医師の代わり','すぐに治る'].map(w=>(
                <div key={w} style={{color:'var(--ink-3)',marginBottom:4,textDecoration:'line-through'}}>・ {w}</div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function FlowColumn({eyebrow, title, steps, end, color, bg}) {
  return (
    <div style={{background:bg, borderRadius:'var(--r-20)', padding:'28px 28px 32px'}}>
      <div style={{fontSize:11, letterSpacing:'.18em', fontWeight:600, color, marginBottom:10}}>{eyebrow}</div>
      <h3 style={{fontFamily:'var(--font-serif)', fontWeight:600, fontSize:20, color:'var(--ink-1)', margin:'0 0 24px', lineHeight:1.5}}>{title}</h3>
      <ol style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:0, position:'relative'}}>
        {steps.map((s,i)=>(
          <li key={i} style={{display:'flex', gap:14, paddingBottom:18, position:'relative'}}>
            <span style={{
              flex:'0 0 26px', width:26, height:26, borderRadius:'50%',
              background:'#fff', border:`1.5px solid ${color}`, color,
              fontFamily:'var(--font-serif)', fontSize:12, fontWeight:600,
              display:'flex', alignItems:'center', justifyContent:'center',
              position:'relative', zIndex:1,
            }}>{i+1}</span>
            <span style={{fontSize:13, color:'var(--ink-1)', lineHeight:1.7, paddingTop:3}}>{s}</span>
            {i < steps.length-1 && (
              <span style={{position:'absolute', left:13, top:26, bottom:-2, width:1, background: color, opacity:.3}}/>
            )}
          </li>
        ))}
      </ol>
      <div style={{
        marginTop:8, padding:'12px 16px',
        background:'#fff', borderRadius:'var(--r-12)',
        fontSize:12, color:'var(--ink-2)', borderLeft:`3px solid ${color}`,
      }}>
        <strong style={{color:'var(--ink-1)'}}>その先 →</strong> {end}
      </div>
    </div>
  );
}

function TreeMap() {
  const tree = [
    {p:'トップページ', c:[]},
    {p:'ヒトヤクとは', c:[]},
    {p:'薬剤師を探す', c:['薬剤師一覧','薬剤師詳細']},
    {p:'相談する', c:['薬剤師に相談','ヒトヤク運営に相談']},
    {p:'法人の方へ', c:[]},
    {p:'薬剤師・薬局の方へ', c:[]},
    {p:'よくある質問', c:['一般利用者向け','法人向け','薬剤師向け']},
    {p:'お問い合わせ', c:['一般','法人','薬剤師','その他']},
    {p:'フッター', c:['運営会社','利用規約','プライバシー','特商法']},
  ];
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14}}>
      {tree.map(n=>(
        <div key={n.p} style={{background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-12)', padding:'18px 20px'}}>
          <div style={{fontSize:14, fontWeight:600, color:'var(--ink-1)', marginBottom: n.c.length?10:0}}>{n.p}</div>
          {n.c.map(child=>(
            <div key={child} style={{fontSize:12, color:'var(--ink-2)', paddingLeft:14, marginTop:4, position:'relative'}}>
              <span style={{position:'absolute',left:0,top:0,color:'var(--ink-3)'}}>└</span> {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Panel({title, children}) {
  return (
    <div style={{background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-16)', padding:'24px 28px'}}>
      <div style={{fontSize:11, letterSpacing:'.18em', color:'var(--brand-deep)', fontWeight:600, marginBottom:14}}>— {title.toUpperCase()}</div>
      {children}
    </div>
  );
}

Object.assign(window, { ArtboardSitemap });
