// ヒトヤク — Pharmacist Join (薬剤師・薬局向け) Page
const WEB3FORMS_KEY_PHARMA = '6f940260-0fae-4c1b-bbf0-412140515fec';

function PagePharma() {
  const isMobile = useIsMobile();
  const [tier, setTier] = React.useState('standard');
  const [formStatus, setFormStatus] = React.useState('idle');
  const [formStatusSimple, setFormStatusSimple] = React.useState('idle');
  const [formStatusStandard, setFormStatusStandard] = React.useState('idle');
  const [specs, setSpecs] = React.useState([]);
  const [methods, setMethods] = React.useState([]);
  const [online, setOnline] = React.useState('');
  const [career, setCareer] = React.useState(['', '', '']);
  const [customTags, setCustomTags] = React.useState([]);
  const [customTagInput, setCustomTagInput] = React.useState('');
  const [photoFile, setPhotoFile] = React.useState(null);
  const [photoPreview, setPhotoPreview] = React.useState(null);
  const formRef = React.useRef(null);
  const formRefStandard = React.useRef(null);

  const MAX_TAG_LEN = 15;
  const addCustomTag = () => {
    const val = customTagInput.trim();
    if (val && !customTags.includes(val)) setCustomTags(prev => [...prev, val]);
    setCustomTagInput('');
  };
  const handleCustomTagKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addCustomTag(); }
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };
  const toggleSpec = (id) => setSpecs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleMethod = (m) => setMethods(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  const updateCareer = (i, val) => setCareer(prev => prev.map((c, j) => j === i ? val : c));
  const addCareer = () => setCareer(prev => [...prev, '']);
  const removeCareer = (i) => setCareer(prev => prev.filter((_, j) => j !== i));
  const specLabels = () => specs.map(id => window.HY_DATA.SPECIALTIES.find(s => s.id === id)?.label).filter(Boolean);

  const scrollToForm = () => {
    document.getElementById('pharma-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // 簡易版: Web3Forms で運営にメール通知
  const handleSubmitSimple = async (e) => {
    e.preventDefault();
    setFormStatusSimple('sending');
    const fd = new FormData(e.target);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY_PHARMA,
          subject: 'ヒトヤク 薬剤師登録希望（簡易）',
          from_name: 'ヒトヤク',
          replyto: fd.get('email') || '',
          お名前: fd.get('name') || '',
          メールアドレス: fd.get('email') || '',
          得意分野: [...specLabels(), ...customTags].join('、'),
        }),
      });
      const data = await res.json();
      setFormStatusSimple(data.success ? 'success' : 'error');
    } catch {
      setFormStatusSimple('error');
    }
  };

  // 標準版: Supabase（コアフィールドのみ）
  const handleSubmitStandard = async (e) => {
    e.preventDefault();
    setFormStatusStandard('sending');
    const fd = new FormData(formRefStandard.current);
    const payload = {
      name: fd.get('name') || '',
      name_kana: fd.get('name_kana') || '',
      title: fd.get('title') || '',
      pharmacy_name: fd.get('affiliation') || '',
      location: fd.get('location') || '',
      years_of_experience: parseInt(fd.get('years_of_experience') || '0', 10),
      email: fd.get('email') || '',
      specialties: specs,
      available_methods: methods,
      short_message: fd.get('short_message') || '',
      tags: [...specLabels(), ...customTags],
      review_status: 'pending',
    };
    try {
      const { error } = await window.HY_SUPABASE.from('pharmacists').insert(payload);
      setFormStatusStandard(error ? 'error' : 'success');
    } catch {
      setFormStatusStandard('error');
    }
  };

  // 詳細版: Supabase（全フィールド）
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    const fd = new FormData(formRef.current);
    let photoUrl = null;
    if (photoFile) {
      const ext = photoFile.name.split('.').pop();
      const fileName = `${Date.now()}.${ext}`;
      const { error: uploadError } = await window.HY_SUPABASE.storage
        .from('photos')
        .upload(fileName, photoFile, { contentType: photoFile.type });
      if (!uploadError) {
        const { data: { publicUrl } } = window.HY_SUPABASE.storage
          .from('photos')
          .getPublicUrl(fileName);
        photoUrl = publicUrl;
      }
    }
    const payload = {
      photo: photoUrl,
      name: fd.get('pharmacist_name') || '',
      name_kana: fd.get('name_kana') || '',
      title: fd.get('title') || '',
      pharmacy_name: fd.get('affiliation') || '',
      location: fd.get('location') || '',
      years_of_experience: parseInt(fd.get('years_of_experience') || '0', 10),
      email: fd.get('email') || '',
      specialties: specs,
      available_methods: methods,
      online_preference: online,
      online_available: online !== '店舗のみ希望',
      in_person_available: true,
      short_message: fd.get('short_message') || '',
      profile: fd.get('profile') || '',
      career: career.filter(c => c.trim()),
      consultation_style: fd.get('consultation_style') || '',
      tags: [...specLabels(), ...customTags],
      review_status: 'pending',
    };
    try {
      const { error } = await window.HY_SUPABASE.from('pharmacists').insert(payload);
      setFormStatus(error ? 'error' : 'success');
    } catch {
      setFormStatus('error');
    }
  };

  const SHead = ({ n, title }) => (
    <div style={{display:'flex',alignItems:'center',gap:14,borderBottom:'1px solid var(--line-soft)',paddingBottom:14,marginBottom:24}}>
      <span style={{fontFamily:'var(--font-serif)',fontSize:26,fontWeight:600,color:'var(--brand-deep)'}}>{n}</span>
      <span style={{fontSize:15,fontWeight:600,color:'var(--ink-1)'}}>{title}</span>
    </div>
  );

  const SuccessBox = ({ msg }) => (
    <div style={{textAlign:'center', padding:'40px 0'}}>
      <div style={{width:56,height:56,borderRadius:'50%',background:'var(--brand-wash)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',color:'var(--brand)'}}>
        {Ico.check}
      </div>
      <div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:600,color:'var(--ink-1)',marginBottom:10}}>ありがとうございました</div>
      <p style={{fontSize:14,color:'var(--ink-2)',lineHeight:1.9,maxWidth:440,margin:'0 auto'}}>{msg}</p>
    </div>
  );

  const SpecSelector = () => (
    <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
      {window.HY_DATA.SPECIALTIES.map(s=>(
        <span key={s.id} onClick={()=>toggleSpec(s.id)} style={{
          display:'inline-block', fontSize:13, padding:'7px 14px',
          borderRadius:'var(--r-pill)', fontWeight:500, cursor:'pointer',
          border:'1px solid '+(specs.includes(s.id)?'var(--brand)':'var(--line-mid)'),
          background:specs.includes(s.id)?'var(--brand-wash)':'transparent',
          color:specs.includes(s.id)?'var(--brand-deep)':'var(--ink-2)',
          transition:'all .15s',
        }}>{s.label}</span>
      ))}
    </div>
  );

  const CustomTagInput = () => (
    <div>
      <div style={{display:'flex',flexWrap:'wrap',gap:6,alignItems:'center',
        border:'1px solid var(--line-mid)',borderRadius:'var(--r-12)',
        padding:'8px 12px',minHeight:44,background:'#fff'}}>
        {customTags.map((t,i)=>(
          <span key={i} style={{
            display:'inline-flex',alignItems:'center',gap:4,
            fontSize:13,padding:'5px 10px',borderRadius:'var(--r-pill)',
            background:'var(--brand-wash)',color:'var(--brand-deep)',
            border:'1px solid var(--brand)',fontWeight:500,
          }}>
            {t}
            <button type="button" onClick={()=>setCustomTags(prev=>prev.filter((_,j)=>j!==i))}
              style={{background:'none',border:'none',cursor:'pointer',color:'var(--brand-deep)',
                fontSize:14,lineHeight:1,padding:'0 2px',fontFamily:'inherit'}}>×</button>
          </span>
        ))}
        <input
          value={customTagInput}
          onChange={e=>setCustomTagInput(e.target.value.slice(0, MAX_TAG_LEN))}
          onKeyDown={handleCustomTagKey}
          onBlur={addCustomTag}
          placeholder={customTags.length===0 ? 'キーワードを入力してEnter' : '追加する'}
          style={{border:'none',outline:'none',fontSize:13,fontFamily:'inherit',
            color:'var(--ink-1)',background:'transparent',minWidth:140,flex:1}}
        />
      </div>
      <div style={{fontSize:11,color:'var(--ink-3)',marginTop:4}}>
        1タグ{MAX_TAG_LEN}文字以内。Enterまたはカンマで追加。「減薬相談」「妊娠中の薬」など自由に。
      </div>
    </div>
  );

  return (
    <div style={{background:'var(--bg-base)'}}>
      <SiteHeader current="pharma"/>
      <Breadcrumb items={[{label:'トップ',go:'top'},{label:'薬剤師・薬局の方へ'}]}/>

      {/* Hero */}
      <section style={{padding: isMobile ? '40px 0 56px' : '48px 0 96px', background:'var(--brand-wash)'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 32 : 64, alignItems:'center'}}>
          <div>
            <div style={{fontSize:12, letterSpacing:'.2em', color:'var(--brand-deep)', fontWeight:600, marginBottom:18}}>— FOR PHARMACISTS</div>
            <h1 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:'clamp(36px,4.4vw,56px)',lineHeight:1.4,margin:0,color:'var(--ink-1)'}}>
              あなたの専門性を、<br/>生涯を通じて<br/>必要とされる力に。
            </h1>
            <p style={{marginTop:24, fontSize:16, lineHeight:1.95, color:'var(--ink-2)', maxWidth:520}}>
              ヒトヤクは、薬剤師が自分の専門性を発信し、あなたを必要としている患者と出会える場所です。
              一度きりの相談ではなく、生涯を通じた健康パートナーになれる——そんな新しい薬剤師の働き方を、ここから始めてください。
            </p>
            <div style={{marginTop:32, display:'flex',gap:12,flexWrap:'wrap'}}>
              <Button size="lg" variant="deep" iconRight={Ico.arrow} onClick={scrollToForm}>薬剤師として参加する</Button>
              <Button size="lg" variant="ghost" onClick={scrollToForm}>薬局法人として問い合わせる</Button>
            </div>
          </div>
          <PharmaHeroVisual isMobile={isMobile}/>
        </div>
      </section>

      {/* Shift Vision */}
      <section style={{padding: isMobile ? '56px 0' : '120px 0'}}>
        <div className="container">
          <SectionHead eyebrow="薬剤師の、あたらしい働き方" title={<>「薬を渡す」から、<br/>「健康パートナー」へ。</>}/>
          <p style={{marginTop:16, fontSize:15, lineHeight:2, color:'var(--ink-2)', maxWidth:560}}>
            処方箋調剤のその先で、患者の生涯に寄り添う薬剤師が求められています。ヒトヤクは、その一歩を踏み出す場所です。
          </p>
          <div style={{marginTop: isMobile ? 32 : 56, display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 32}}>
            <div style={{background:'var(--bg-soft)', borderRadius:'var(--r-20)', padding: isMobile ? '28px 24px' : '40px 36px'}}>
              <div style={{fontSize:11, letterSpacing:'.2em', color:'var(--ink-3)', fontWeight:600, marginBottom:24}}>— これまでの薬剤師</div>
              {[
                '処方箋に合わせて薬を渡す',
                '患者は薬局に来た人だけ',
                '立地に縛られた働き方',
                '一度きりの接点で終わる',
              ].map((item, i) => (
                <div key={i} style={{display:'flex', gap:12, alignItems:'flex-start', fontSize:14, color:'var(--ink-3)', marginBottom: i < 3 ? 14 : 0, lineHeight:1.7}}>
                  <span style={{flex:'0 0 16px', marginTop:3, opacity:.5}}>—</span>{item}
                </div>
              ))}
            </div>
            <div style={{background:'var(--brand-wash)', border:'2px solid var(--brand)', borderRadius:'var(--r-20)', padding: isMobile ? '28px 24px' : '40px 36px', position:'relative'}}>
              <div style={{
                position:'absolute', top:-14, left:24,
                background:'var(--brand)', color:'#fff',
                fontSize:11, fontWeight:600, padding:'4px 14px',
                borderRadius:'var(--r-pill)', letterSpacing:'.1em',
              }}>ヒトヤクで実現できること</div>
              {[
                '患者の生涯に寄り添う健康パートナーになる',
                '自分の専門性を求める患者と全国でつながる',
                '立地に依存しないオンラインの相談接点を持つ',
                'あなたを「かかりつけ」として選んでもらえる',
              ].map((item, i) => (
                <div key={i} style={{display:'flex', gap:12, alignItems:'flex-start', fontSize:14, color:'var(--ink-1)', marginBottom: i < 3 ? 14 : 0, lineHeight:1.7}}>
                  <span style={{flex:'0 0 16px', color:'var(--brand)', marginTop:3}}>{Ico.check}</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section style={{background:'var(--bg-soft)', padding: isMobile ? '56px 0' : '120px 0'}}>
        <div className="container">
          <SectionHead eyebrow="参加することで変わること" title={<>薬剤師としての、<br/>あたらしい一歩。</>}/>
          <div style={{marginTop: isMobile ? 32 : 56, display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24}}>
            {[
              {n:'01',t:'あなたを探している患者に会える',d:'漢方、女性の健康、子育て、外国語対応——あなたの専門性を求めている患者が、全国にいます。'},
              {n:'02',t:'専門性が、患者に直接届く',d:'プロフィール・人柄・相談スタンスを発信。患者は「合いそう」と感じてから相談してきます。'},
              {n:'03',t:'かかりつけ薬剤師として選ばれる',d:'一度きりではなく、LINEや継続相談を通じて、患者の生涯の健康パートナーへ発展できます。'},
            ].map(b=>(
              <div key={b.n} style={{background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-20)', padding: isMobile ? '24px 20px' : '36px 32px'}}>
                <div style={{fontFamily:'var(--font-serif)',fontSize:42,fontWeight:600,color:'var(--brand-deep)',marginBottom:18}}>{b.n}</div>
                <div style={{fontSize: isMobile ? 16 : 18,fontWeight:600,color:'var(--ink-1)',marginBottom:12,lineHeight:1.5}}>{b.t}</div>
                <div style={{fontSize:14,color:'var(--ink-2)',lineHeight:1.95}}>{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Pharmacy Corporations */}
      <section style={{background:'var(--accent-warm-soft)', padding: isMobile ? '56px 0' : '80px 0'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 64, alignItems:'center'}}>
            <div>
              <div style={{fontSize:12, letterSpacing:'.2em', color:'#8B5A2B', fontWeight:600, marginBottom:18}}>— FOR PHARMACY CORPORATIONS</div>
              <h2 style={{fontFamily:'var(--font-serif)', fontWeight:600, fontSize:'clamp(26px,3vw,40px)', lineHeight:1.45, margin:'0 0 24px', color:'var(--ink-1)'}}>
                薬局法人の方へ。<br/>自社薬剤師を、<br/>全国の患者と繋げる。
              </h2>
              <div style={{display:'flex', flexDirection:'column', gap:18}}>
                {[
                  {t:'自社薬剤師の専門性を「見える化」', d:'プロフィール掲載で、薬剤師一人ひとりの強みを全国に発信。薬局ブランドの向上に直結します。'},
                  {t:'立地に依存しない全国の患者接点', d:'オンライン相談を通じて、エリアを超えた患者との長期的な関係を築けます。'},
                  {t:'薬剤師の活躍が売上に貢献', d:'かかりつけ患者の継続利用が、薬局全体の売上向上につながります。'},
                ].map((b,i)=>(
                  <div key={i} style={{display:'flex', gap:14, alignItems:'flex-start'}}>
                    <span style={{flex:'0 0 20px', color:'#8B5A2B', marginTop:3}}>{Ico.check}</span>
                    <div>
                      <div style={{fontSize:15, fontWeight:600, color:'var(--ink-1)', marginBottom:4}}>{b.t}</div>
                      <div style={{fontSize:13, color:'var(--ink-2)', lineHeight:1.9}}>{b.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:32}}>
                <Button variant="accent" iconRight={Ico.arrow} onClick={scrollToForm}>薬局法人として問い合わせる</Button>
              </div>
            </div>
            <div style={{background:'#fff', borderRadius:'var(--r-24)', padding: isMobile ? '28px 24px' : '40px 36px', border:'1px solid rgba(139,90,43,.15)', boxShadow:'var(--shadow-1)'}}>
              <div style={{fontFamily:'var(--font-serif)', fontSize:18, fontWeight:600, color:'var(--ink-1)', marginBottom:28}}>導入のポイント</div>
              {[
                {v:'全国', l:'オンラインで対応できるエリア'},
                {v:'0円', l:'掲載・導入の初期費用'},
                {v:'複数名', l:'同一法人内の薬剤師を同時掲載可'},
              ].map((s,i)=>(
                <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 0', borderBottom: i < 2 ? '1px solid var(--line-soft)' : 'none'}}>
                  <div style={{fontSize:13, color:'var(--ink-2)', lineHeight:1.7}}>{s.l}</div>
                  <div style={{fontFamily:'var(--font-serif)', fontSize:30, fontWeight:600, color:'#8B5A2B', marginLeft:16}}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section style={{background:'var(--brand-deep)',padding: isMobile ? '56px 0' : '80px 0'}}>
        <div className="container">
          <header style={{textAlign:'center',maxWidth:720,margin:'0 auto'}}>
            <div style={{fontSize:12,letterSpacing:'.2em',color:'rgba(255,255,255,.6)',fontWeight:600,marginBottom:16}}>— 参加条件・費用</div>
            <h2 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:'clamp(28px,3.4vw,44px)',lineHeight:1.35,margin:'0 0 18px',color:'#fff'}}>初期費用は無料。<br/>副業・兼業の方も歓迎します。</h2>
          </header>
          <div style={{marginTop: isMobile ? 32 : 48, display:'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? 12 : 20}}>
            {[
              {v:'無料', l:'初期費用・登録費用'},
              {v:'副業OK', l:'現職の薬局勤務のまま参加可'},
              {v:'自由', l:'相談受付・時間帯の管理'},
              {v:'2週間', l:'申し込みから掲載まで（目安）'},
            ].map((s,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.16)',borderRadius:'var(--r-20)',padding:'24px',textAlign:'center'}}>
                <div style={{fontFamily:'var(--font-serif)',fontSize:36,fontWeight:600,color:'#fff',letterSpacing:'-.01em'}}>{s.v}</div>
                <div style={{marginTop:8,fontSize:13,color:'rgba(255,255,255,.75)',lineHeight:1.6}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How profile appears */}
      <section style={{background:'var(--bg-soft)',padding: isMobile ? '56px 0' : '120px 0'}}>
        <div className="container" style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',gap: isMobile ? 40 : 64,alignItems:'center'}}>
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
      <section style={{padding: isMobile ? '56px 0' : '120px 0'}}>
        <div className="container">
          <SectionHead eyebrow="参加の流れ" title="フォームを送るだけ。最短1〜2週間で掲載。"/>
          <div style={{marginTop: isMobile ? 32 : 56, display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 20 : 24}}>
            {[
              {n:'01',t:'フォームを記入',d:'得意分野・プロフィール・写真などをフォームに入力して送信。'},
              {n:'02',t:'運営が内容を確認',d:'掲載内容を確認します。必要に応じてメールでご連絡します。'},
              {n:'03',t:'承認・掲載開始',d:'確認完了次第、プロフィールを掲載します（目安: 1〜2週間）。'},
              {n:'04',t:'相談を受け取る',d:'相談者からのメッセージをご希望の方法で受け取ります。'},
            ].map(s=>(
              <div key={s.n}>
                <div style={{fontFamily:'var(--font-serif)',fontSize:32,fontWeight:600,color:'var(--brand-deep)'}}>{s.n}</div>
                <div style={{fontSize: isMobile ? 14 : 16,fontWeight:600,color:'var(--ink-1)',marginTop:8,marginBottom:6}}>{s.t}</div>
                <div style={{fontSize:13,color:'var(--ink-2)',lineHeight: isMobile ? 2.0 : 1.85}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ for pharmacists */}
      <section style={{background:'var(--bg-soft)', padding: isMobile ? '56px 0' : '80px 0'}}>
        <div className="container-narrow">
          <SectionHead align="center" eyebrow="よくある質問" title="参加前に気になること。"/>
          <div style={{marginTop:40}}>
            <FAQ items={[
              { q:'登録・参加に費用はかかりますか?', a:'個人薬剤師の方の登録は無料です。将来的に有料プランを導入する場合は、事前にご案内いたします。' },
              { q:'今の薬局に勤めながら参加できますか?', a:'はい、副業・兼業として参加いただけます。受付時間・相談の受け入れ状況はご自身で自由に設定できます。勤務先への確認が必要かどうかはご自身でご判断ください。' },
              { q:'相談はどのように届きますか?', a:'患者さんがプロフィールを見て、相談フォームから連絡します。メール・LINEなど、ご希望の方法でお受け取りいただけます。' },
              { q:'どんな相談が多いですか?', a:'飲み合わせ・副作用・市販薬の選び方・受診の目安・漢方・サプリなど、日常的な「薬の疑問」が中心です。処方箋調剤や診断は対象外です。' },
              { q:'プロフィールは自分で作成できますか?', a:'はい、フォームに入力していただくだけです。写真・キャッチコピー・経歴・得意分野など、全項目ご自身で設定できます。' },
              { q:'掲載後にプロフィールを変更できますか?', a:'変更したい場合は運営（info@hito-yaku.com）までご連絡ください。対応いたします。' },
            ]}/>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="pharma-contact" style={{padding: isMobile ? '40px 0 56px' : '40px 0 120px'}}>
        <div className="container-narrow">
          <SectionHead align="center" eyebrow="薬剤師登録" title="あなたに合った方法で登録を。"/>

          {/* Tier selector */}
          <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 8 : 12, margin:'40px 0'}}>
            {[
              {id:'simple',  label:'簡易登録', time:'約1分',  detail:'名前・メール・得意分野'},
              {id:'standard',label:'標準登録', time:'約3分',  detail:'基本情報＋一言メッセージ', recommended:true},
              {id:'full',    label:'詳細登録', time:'約10分', detail:'写真・経歴・自己紹介文'},
            ].map(t=>(
              <button key={t.id} type="button" onClick={()=>setTier(t.id)} style={{
                position:'relative', padding: isMobile ? '14px 8px' : '20px 16px',
                borderRadius:'var(--r-20)',
                border:`2px solid ${tier===t.id ? 'var(--brand)' : 'var(--line-soft)'}`,
                background: tier===t.id ? 'var(--brand-wash)' : '#fff',
                cursor:'pointer', fontFamily:'inherit', textAlign:'center',
                transition:'all .15s',
              }}>
                {t.recommended && (
                  <span style={{
                    position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)',
                    background:'var(--accent-warm)', color:'#fff',
                    fontSize:10, fontWeight:600, padding:'3px 10px',
                    borderRadius:'var(--r-pill)', whiteSpace:'nowrap',
                  }}>おすすめ</span>
                )}
                <div style={{fontWeight:600, fontSize: isMobile ? 13 : 15, color: tier===t.id ? 'var(--brand-deep)' : 'var(--ink-1)', marginBottom:4}}>{t.label}</div>
                <div style={{fontSize:11, color:'var(--ink-3)', marginBottom: isMobile ? 0 : 4}}>{t.time}</div>
                {!isMobile && <div style={{fontSize:11, color:'var(--ink-3)', lineHeight:1.5}}>{t.detail}</div>}
              </button>
            ))}
          </div>

          <div style={{background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-24)', padding: isMobile ? '28px 20px' : '40px 48px'}}>

            {/* 簡易版 */}
            {tier === 'simple' && (
              formStatusSimple === 'success'
                ? <SuccessBox msg="運営より2営業日以内にご連絡いたします。ヒアリング後、プロフィールの作成をサポートします。"/>
                : (
                  <form onSubmit={handleSubmitSimple}>
                    <div style={{display:'flex', flexDirection:'column', gap:20}}>
                      <Field label="お名前" required><Input name="name" placeholder="例: 田中 花子" required/></Field>
                      <Field label="メールアドレス" required><Input name="email" type="email" placeholder="例: tanaka@example.com" required/></Field>
                      <Field label="得意分野 (1つ以上)" required><SpecSelector/></Field>
                      <Field label="その他・オリジナルキーワード（任意）"><CustomTagInput/></Field>
                    </div>
                    <div style={{marginTop:32, textAlign:'center'}}>
                      <p style={{fontSize:13, color:'var(--ink-3)', marginBottom:16}}>送信後、運営より2営業日以内にご連絡いたします。</p>
                      {specs.length === 0 && <p style={{fontSize:13,color:'var(--ink-3)',marginBottom:12}}>得意分野を1つ以上選択してください</p>}
                      <Button size="lg" variant="deep" iconRight={Ico.arrow} disabled={formStatusSimple==='sending' || specs.length===0}>
                        {formStatusSimple==='sending' ? '送信中...' : '連絡を希望する'}
                      </Button>
                      {formStatusSimple==='error' && <p style={{marginTop:12,fontSize:13,color:'#c0392b'}}>送信に失敗しました。</p>}
                    </div>
                  </form>
                )
            )}

            {/* 標準版 */}
            {tier === 'standard' && (
              formStatusStandard === 'success'
                ? <SuccessBox msg="登録申請を受け付けました。内容を確認のうえ、2週間以内に掲載いたします。"/>
                : (
                  <form ref={formRefStandard} onSubmit={handleSubmitStandard}>
                    <div style={{display:'flex', flexDirection:'column', gap:32}}>
                      <div>
                        <SHead n="01" title="基本情報"/>
                        <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:20}}>
                          <Field label="お名前" required><Input name="name" placeholder="例: 田中 花子" required/></Field>
                          <Field label="ふりがな"><Input name="name_kana" placeholder="例: たなか はなこ"/></Field>
                          <Field label="肩書き" required><Input name="title" placeholder="例: 薬剤師 / 管理薬剤師" required/></Field>
                          <Field label="経験年数" required><Input name="years_of_experience" type="number" min="1" max="60" placeholder="例: 10" required/></Field>
                          <Field label="ご所属"><Input name="affiliation" placeholder="例: みどり薬局"/></Field>
                          <Field label="ご所在地"><Input name="location" placeholder="例: 東京都・港区"/></Field>
                        </div>
                      </div>
                      <div>
                        <SHead n="02" title="専門性・対応方法"/>
                        <div style={{display:'flex', flexDirection:'column', gap:20}}>
                          <Field label="得意分野 (1つ以上)" required><SpecSelector/></Field>
                          <Field label="その他・オリジナルキーワード（任意）"><CustomTagInput/></Field>
                          <Field label="相談方法 (複数選択可)">
                            <div style={{display:'flex',gap: isMobile ? 12 : 24, flexWrap:'wrap'}}>
                              {['LINE','オンライン面談','店舗相談','メール'].map(m=>(
                                <label key={m} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:14,cursor:'pointer'}}>
                                  <input type="checkbox" checked={methods.includes(m)} onChange={()=>toggleMethod(m)} style={{accentColor:'var(--brand)'}}/>{m}
                                </label>
                              ))}
                            </div>
                          </Field>
                        </div>
                      </div>
                      <div>
                        <SHead n="03" title="一言メッセージ・連絡先"/>
                        <div style={{display:'flex', flexDirection:'column', gap:20}}>
                          <Field label="キャッチコピー（一言メッセージ）" required>
                            <Textarea name="short_message" placeholder="例: 「こんなこと聞いていいの?」そんな疑問に、気軽に答えられる薬剤師でいたいと思っています。" rows={2} required/>
                            <div style={{fontSize:11,color:'var(--ink-3)',marginTop:4}}>60文字程度。</div>
                          </Field>
                          <Field label="メールアドレス" required>
                            <Input name="email" type="email" placeholder="メールアドレス" required/>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div style={{marginTop:40, textAlign:'center'}}>
                      {specs.length === 0 && <p style={{fontSize:13,color:'var(--ink-3)',marginBottom:12}}>得意分野を1つ以上選択してください</p>}
                      <Button size="lg" variant="deep" iconRight={Ico.arrow} disabled={formStatusStandard==='sending' || specs.length===0}>
                        {formStatusStandard==='sending' ? '送信中...' : '登録申請する'}
                      </Button>
                      {formStatusStandard==='error' && <p style={{marginTop:12,fontSize:13,color:'#c0392b'}}>送信に失敗しました。</p>}
                    </div>
                  </form>
                )
            )}

            {/* 詳細版 */}
            {tier === 'full' && (
              formStatus === 'success'
                ? <SuccessBox msg="登録申請を受け付けました。内容を確認のうえ、審査が完了次第プロフィールを掲載いたします。掲載までに2週間程度いただく場合がございます。"/>
                : (
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div style={{display:'flex', flexDirection:'column', gap:48}}>

                      <div>
                        <SHead n="01" title="基本情報"/>
                        <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:20}}>
                          <Field label="お名前" required><Input name="pharmacist_name" placeholder="例: 中村 結衣" required/></Field>
                          <Field label="ふりがな"><Input name="name_kana" placeholder="例: なかむら ゆい"/></Field>
                          <Field label="肩書き" required><Input name="title" placeholder="例: 薬剤師 / 管理薬剤師" required/></Field>
                          <Field label="経験年数" required>
                            <Input name="years_of_experience" type="number" min="1" max="60" placeholder="例: 10" required/>
                          </Field>
                          <Field label="ご所属(薬局・法人名)"><Input name="affiliation" placeholder="例: みどり薬局 表参道店"/></Field>
                          <Field label="ご所在地"><Input name="location" placeholder="例: 東京都・港区"/></Field>
                        </div>
                        <div style={{marginTop:20}}>
                          <Field label="プロフィール写真">
                            <div style={{display:'flex', gap:16, alignItems:'center', flexWrap:'wrap'}}>
                              {photoPreview && (
                                <img src={photoPreview} alt="プレビュー" style={{
                                  width:80, height:80, borderRadius:'var(--r-12)',
                                  objectFit:'cover', border:'1px solid var(--line-soft)',
                                }}/>
                              )}
                              <label style={{
                                display:'inline-flex', alignItems:'center', gap:8,
                                padding:'10px 20px', borderRadius:'var(--r-pill)',
                                border:'1px solid var(--line-mid)', background:'#fff',
                                fontSize:13, color:'var(--ink-1)', cursor:'pointer', fontFamily:'inherit',
                              }}>
                                {photoPreview ? '写真を変更' : '写真を選択'}
                                <input type="file" accept="image/*" onChange={handlePhotoChange} style={{display:'none'}}/>
                              </label>
                              {!photoPreview && <span style={{fontSize:12, color:'var(--ink-3)'}}>JPG・PNG推奨。顔写真があると信頼感が上がります。</span>}
                            </div>
                          </Field>
                        </div>
                      </div>

                      <div>
                        <SHead n="02" title="専門性・対応方法"/>
                        <div style={{display:'flex', flexDirection:'column', gap:20}}>
                          <Field label="得意分野 (複数選択可)" required><SpecSelector/></Field>
                          <Field label="オリジナルキーワード（任意）">
                            <div style={{display:'flex',flexWrap:'wrap',gap:6,alignItems:'center',
                              border:'1px solid var(--line-mid)',borderRadius:'var(--r-12)',
                              padding:'8px 12px',minHeight:44,background:'#fff'}}>
                              {customTags.map((t,i)=>(
                                <span key={i} style={{
                                  display:'inline-flex',alignItems:'center',gap:4,
                                  fontSize:13,padding:'5px 10px',borderRadius:'var(--r-pill)',
                                  background:'var(--brand-wash)',color:'var(--brand-deep)',
                                  border:'1px solid var(--brand)',fontWeight:500,
                                }}>
                                  {t}
                                  <button type="button" onClick={()=>setCustomTags(prev=>prev.filter((_,j)=>j!==i))}
                                    style={{background:'none',border:'none',cursor:'pointer',color:'var(--brand-deep)',
                                      fontSize:14,lineHeight:1,padding:'0 2px',fontFamily:'inherit'}}>×</button>
                                </span>
                              ))}
                              <input
                                value={customTagInput}
                                onChange={e=>setCustomTagInput(e.target.value.slice(0, MAX_TAG_LEN))}
                                onKeyDown={handleCustomTagKey}
                                onBlur={addCustomTag}
                                placeholder={customTags.length===0 ? 'キーワードを入力してEnter' : '追加する'}
                                style={{border:'none',outline:'none',fontSize:13,fontFamily:'inherit',
                                  color:'var(--ink-1)',background:'transparent',minWidth:140,flex:1}}
                              />
                            </div>
                            <div style={{fontSize:11,color:'var(--ink-3)',marginTop:4}}>
                              1タグ{MAX_TAG_LEN}文字以内。Enterまたはカンマで追加。「減薬相談」「妊娠中の薬」など自由に。
                            </div>
                          </Field>
                          <Field label="相談方法 (複数選択可)">
                            <div style={{display:'flex',gap: isMobile ? 12 : 24, flexWrap:'wrap'}}>
                              {['LINE','オンライン面談','店舗相談','メール'].map(m=>(
                                <label key={m} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:14,cursor:'pointer'}}>
                                  <input type="checkbox" checked={methods.includes(m)} onChange={()=>toggleMethod(m)} style={{accentColor:'var(--brand)'}}/>{m}
                                </label>
                              ))}
                            </div>
                          </Field>
                          <Field label="オンライン対応">
                            <div style={{display:'flex',gap: isMobile ? 16 : 24, flexWrap:'wrap'}}>
                              {['可','店舗のみ希望','要相談'].map(t=>(
                                <label key={t} style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:14,cursor:'pointer'}}>
                                  <input type="radio" name="online" value={t} checked={online===t} onChange={()=>setOnline(t)} style={{accentColor:'var(--brand)'}}/>{t}
                                </label>
                              ))}
                            </div>
                          </Field>
                        </div>
                      </div>

                      <div>
                        <SHead n="03" title="プロフィール"/>
                        <div style={{display:'flex', flexDirection:'column', gap:20}}>
                          <Field label="キャッチコピー（一言メッセージ）" required>
                            <Textarea name="short_message" placeholder="例: 「こんなこと聞いていいの?」そんな疑問に、気軽に答えられる薬剤師でいたいと思っています。" rows={2} required/>
                            <div style={{fontSize:11,color:'var(--ink-3)',marginTop:4}}>患者さんへのひと言。60文字程度。</div>
                          </Field>
                          <Field label="自己紹介文" required>
                            <Textarea name="profile" placeholder="経歴の流れ・得意な相談分野・薬剤師になった理由など、ご自由にお書きください。" rows={6} required/>
                          </Field>
                          <Field label="経歴（箇条書き）">
                            <div style={{display:'flex', flexDirection:'column', gap:8}}>
                              {career.map((c, i) => (
                                <div key={i} style={{display:'flex', gap:8, alignItems:'center'}}>
                                  <Input value={c} onChange={e => updateCareer(i, e.target.value)}
                                    placeholder={i===0 ? '例: 大手調剤薬局にてOTC・調剤を担当' : i===1 ? '例: 薬剤師として5年以上のキャリアを積む' : '例: 2024年 みどり薬局を開局・管理薬剤師として運営'}/>
                                  {career.length > 1 && (
                                    <button type="button" onClick={()=>removeCareer(i)} style={{
                                      flex:'0 0 32px',width:32,height:32,border:'1px solid var(--line-mid)',
                                      borderRadius:'50%',background:'#fff',cursor:'pointer',
                                      color:'var(--ink-3)',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',
                                    }}>×</button>
                                  )}
                                </div>
                              ))}
                              <button type="button" onClick={addCareer} style={{
                                display:'inline-flex',alignItems:'center',gap:6,
                                background:'none',border:'1px dashed var(--line-mid)',
                                borderRadius:'var(--r-pill)',padding:'8px 16px',
                                fontSize:13,color:'var(--brand-deep)',cursor:'pointer',fontFamily:'inherit',
                              }}>+ 経歴を追加</button>
                            </div>
                          </Field>
                          <Field label="相談スタンス" required>
                            <Textarea name="consultation_style" placeholder="例: 背景から丁寧に伺い、患者さんが納得できる選択肢を一緒に探します。" rows={3} required/>
                            <div style={{fontSize:11,color:'var(--ink-3)',marginTop:4}}>あなたの相談への向き合い方を一言で。</div>
                          </Field>
                        </div>
                      </div>

                      <div>
                        <SHead n="04" title="連絡先"/>
                        <Field label="メールアドレス" required>
                          <Input name="email" type="email" placeholder="メールアドレス" required/>
                        </Field>
                      </div>

                    </div>
                    <div style={{marginTop:40, textAlign:'center'}}>
                      {specs.length === 0 && <p style={{fontSize:13,color:'var(--ink-3)',marginBottom:12}}>得意分野を1つ以上選択してください</p>}
                      <Button size="lg" variant="deep" iconRight={Ico.arrow}
                        disabled={formStatus==='sending' || specs.length === 0}>
                        {formStatus === 'sending' ? '送信中...' : '登録申請する'}
                      </Button>
                      {formStatus === 'error' && (
                        <p style={{marginTop:12,fontSize:13,color:'#c0392b'}}>送信に失敗しました。もう一度お試しください。</p>
                      )}
                    </div>
                  </form>
                )
            )}

          </div>
        </div>
      </section>

      <SiteFooter/>
    </div>
  );
}

function PharmaHeroVisual({ isMobile }) {
  const { PHARMACISTS } = window.HY_DATA;

  if (isMobile) {
    return (
      <div style={{background:'#fff',borderRadius:'var(--r-24)',boxShadow:'var(--shadow-2)',padding:'20px 16px'}}>
        <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
          <PharmacistPhoto p={PHARMACISTS[1]} size={64} rounded="var(--r-12)"/>
          <div style={{minWidth:0}}>
            <StatusDot status="online"/>
            <div style={{fontFamily:'var(--font-serif)',fontSize:18,fontWeight:600,marginTop:4}}>{PHARMACISTS[1].name}</div>
            <div style={{fontSize:11,color:'var(--ink-3)',marginTop:2}}>{PHARMACISTS[1].title.split(' /')[0]}</div>
          </div>
        </div>
        <div style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.85,marginTop:14}}>「{PHARMACISTS[1].shortMessage}」</div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:12}}>
          {PHARMACISTS[1].specialties.slice(0,3).map(sid=>{const s=window.HY_DATA.SPECIALTIES.find(x=>x.id===sid);return s?<Tag key={sid} tone="brand" size="sm">{s.label}</Tag>:null;})}
        </div>
        <div style={{marginTop:14,background:'var(--accent-warm)',color:'#fff',padding:'10px 16px',borderRadius:'var(--r-12)',fontSize:13,fontWeight:600,display:'inline-block'}}>
          新着相談: 3件
        </div>
      </div>
    );
  }

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
          {PHARMACISTS[1].specialties.slice(0,3).map(sid=>{const s=window.HY_DATA.SPECIALTIES.find(x=>x.id===sid);return s?<Tag key={sid} tone="brand" size="sm">{s.label}</Tag>:null;})}
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
