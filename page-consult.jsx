// ヒトヤク — Consultation Form Page
const WEB3FORMS_KEY = '6f940260-0fae-4c1b-bbf0-412140515fec';

function PageConsult({ pharmacistId, mode: initialMode }) {
  const { PHARMACISTS, CONSULT_CATEGORIES } = window.HY_DATA;
  const [mode, setMode] = React.useState(initialMode || (pharmacistId ? 'direct' : 'ops'));
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    name:'', contact:'', contactType:'email',
    pharmacist: pharmacistId || '',
    category:'', body:'', medications:'no',
    methodPref:[], consent1:false, consent2:false,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));
  const toggleMethod = (m) => upd('methodPref', form.methodPref.includes(m) ? form.methodPref.filter(x=>x!==m) : [...form.methodPref, m]);

  const selectedP = PHARMACISTS.find(x=>x.id===form.pharmacist);
  const canSubmit = form.name && form.contact && form.body && form.consent1;

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const payload = {
        '相談先': mode === 'direct' ? `薬剤師に直接（${selectedP?.name || form.pharmacist}）` : 'ヒトヤク運営',
        'お名前': form.name,
        '連絡方法': form.contactType === 'line' ? 'LINE' : 'メール',
        '連絡先': form.contact,
        '相談カテゴリ': CONSULT_CATEGORIES.find(c=>c.id===form.category)?.label || form.category,
        '服用中の薬': form.medications === 'yes' ? 'あり' : form.medications === 'no' ? 'なし' : '不明',
        '希望連絡方法': form.methodPref.join(', ') || '未選択',
        '相談内容': form.body,
        '同意確認': `医師代替ではない: ${form.consent1}、規約同意: ${form.consent2}`,
      };
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: 'ヒトヤク 新しいご相談', ...payload }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(3);
        // デバッグ: Web3Formsの応答を確認
        window._w3fMsg = data.message;
        alert('Web3Forms応答: ' + data.message);
      } else {
        setSubmitError('Web3Formsエラー: ' + (data.message || '不明'));
      }
    } catch {
      setSubmitError('通信エラーが発生しました。インターネット接続をご確認ください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{background:'var(--bg-base)'}}>
      <SiteHeader current="consult"/>
      <Breadcrumb items={[{label:'トップ',go:'top'},{label:'相談する'}]}/>
      <section style={{padding:'40px 0 80px'}}>
        <div className="container-narrow">
          <div style={{textAlign:'center', marginBottom:48}}>
            <div style={{fontSize:12, letterSpacing:'.2em', color:'var(--brand-deep)', fontWeight:600, marginBottom:14}}>
              — CONSULT
            </div>
            <h1 style={{fontFamily:'var(--font-serif)', fontWeight:600, fontSize:'clamp(28px,3.4vw,40px)', lineHeight:1.5, margin:0, color:'var(--ink-1)'}}>
              ご相談内容をお送りください。
            </h1>
            <p style={{marginTop:18, fontSize:15, color:'var(--ink-2)', lineHeight:1.95, maxWidth: 560, margin:'18px auto 0'}}>
              直接薬剤師に送るか、ヒトヤク運営に相談して薬剤師を紹介してもらうか、お選びいただけます。
            </p>
          </div>

          {step === 1 && (
            <div style={{display:'flex', flexDirection:'column', gap:14, marginBottom:48}}>
              <h2 style={{fontSize:14, letterSpacing:'.16em', color:'var(--ink-3)', fontWeight:600, margin:'0 0 4px'}}>STEP 1 / 相談先を選ぶ</h2>
              <Radio checked={mode==='direct'} onChange={()=>setMode('direct')}
                desc={selectedP ? `${selectedP.name}に直接ご相談を送ります。プロフィールを確認したうえでお選びください。` : '気になる薬剤師を選んで直接ご相談いただけます。'}>
                薬剤師に直接相談する
              </Radio>
              <Radio checked={mode==='ops'} onChange={()=>setMode('ops')}
                desc="ヒトヤク運営がまず内容を伺い、ご相談に合いそうな薬剤師をご紹介します。「誰に相談していいか分からない」場合はこちらがおすすめです。">
                ヒトヤク運営に相談する
              </Radio>
              <div style={{marginTop:24, textAlign:'right'}}>
                <Button variant="deep" iconRight={Ico.arrow} onClick={()=>setStep(2)}>次へ進む</Button>
              </div>
            </div>
          )}

          {step >= 2 && (
            <div style={{background:'#fff', border:'1px solid var(--line-soft)', borderRadius:'var(--r-24)', padding:'40px 48px', boxShadow:'var(--shadow-1)'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, paddingBottom:16, borderBottom:'1px solid var(--line-soft)'}}>
                <div>
                  <div style={{fontSize:11, letterSpacing:'.2em', color:'var(--brand-deep)', fontWeight:600}}>STEP 2 / 相談内容</div>
                  <div style={{marginTop:6, fontSize:14, color:'var(--ink-2)'}}>
                    送信先: <strong style={{color:'var(--ink-1)'}}>{mode==='direct' ? (selectedP?.name || '薬剤師') : 'ヒトヤク運営'}</strong>
                  </div>
                </div>
                <button onClick={()=>setStep(1)} style={{background:'none',border:0,color:'var(--brand-deep)',fontSize:12,textDecoration:'underline',cursor:'pointer'}}>送信先を変える</button>
              </div>

              <div style={{display:'flex', flexDirection:'column', gap:24}}>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
                  <Field label="お名前またはニックネーム" required>
                    <Input placeholder="例: たけし" value={form.name} onChange={(e)=>upd('name',e.target.value)}/>
                  </Field>
                  <Field label="連絡方法" required>
                    <Select value={form.contactType} onChange={(e)=>upd('contactType',e.target.value)}>
                      <option value="email">メール</option>
                      <option value="line">LINE</option>
                    </Select>
                  </Field>
                </div>
                <Field label={form.contactType==='line'?'LINE ID':'メールアドレス'} required
                  hint="返信先としてのみ使います。第三者に共有することはありません。">
                  <Input type={form.contactType==='line'?'text':'email'}
                    placeholder={form.contactType==='line'?'例: @takeshi':'例: takeshi@example.com'}
                    value={form.contact} onChange={(e)=>upd('contact',e.target.value)}/>
                </Field>
                {mode==='direct' && (
                  <Field label="相談したい薬剤師" required>
                    <Select value={form.pharmacist} onChange={(e)=>upd('pharmacist',e.target.value)}>
                      <option value="">選択してください</option>
                      {PHARMACISTS.map(p=>(
                        <option key={p.id} value={p.id}>{p.name} / {p.title.split(' /')[0]}</option>
                      ))}
                    </Select>
                  </Field>
                )}
                <Field label="相談カテゴリ" required>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {CONSULT_CATEGORIES.map(c=>(
                      <button key={c.id} type="button" onClick={()=>upd('category',c.id)} style={{
                        padding:'10px 16px', borderRadius:'var(--r-pill)',
                        border:`1px solid ${form.category===c.id?'var(--brand)':'var(--line-mid)'}`,
                        background: form.category===c.id?'var(--brand)':'#fff',
                        color: form.category===c.id?'#fff':'var(--ink-1)',
                        fontSize:13, fontFamily:'inherit', cursor:'pointer', transition:'all .15s',
                      }}>{c.label}</button>
                    ))}
                  </div>
                </Field>
                <Field label="服用中のお薬がありますか?">
                  <div style={{display:'flex',gap:24}}>
                    {[{v:'yes',l:'はい(処方薬・市販薬・サプリ等)'},{v:'no',l:'いいえ'},{v:'unsure',l:'分からない'}].map(o=>(
                      <label key={o.v} style={{display:'inline-flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:14,color:'var(--ink-1)'}}>
                        <input type="radio" name="meds" checked={form.medications===o.v} onChange={()=>upd('medications',o.v)} style={{accentColor:'var(--brand)'}}/>
                        {o.l}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label="ご希望の相談方法 (複数選択可)">
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    {['LINE','メール','オンライン面談','店舗相談'].map(m=>(
                      <button key={m} type="button" onClick={()=>toggleMethod(m)} style={{
                        padding:'10px 16px', borderRadius:'var(--r-pill)',
                        border:`1px solid ${form.methodPref.includes(m)?'var(--brand)':'var(--line-mid)'}`,
                        background: form.methodPref.includes(m)?'var(--brand-wash)':'#fff',
                        color: form.methodPref.includes(m)?'var(--brand-deep)':'var(--ink-1)',
                        fontSize:13, fontFamily:'inherit', cursor:'pointer',
                      }}>{m}</button>
                    ))}
                  </div>
                </Field>
                <Field label="相談内容" required
                  hint="お薬の名前、症状の経過、気になっていることを、書ける範囲で。書きにくければ、運営にお伝えいただければ整理いたします。">
                  <Textarea placeholder="例: 高血圧の薬を飲んでいる父が、市販のサプリを始めたいと言っています。安全か確認したいです。"
                    value={form.body} onChange={(e)=>upd('body',e.target.value)} rows={6}/>
                </Field>

                <Disclaimer/>

                <div style={{display:'flex',flexDirection:'column',gap:12, paddingTop:8}}>
                  <Checkbox checked={form.consent1} onChange={()=>upd('consent1', !form.consent1)}>
                    ヒトヤクが医師の診断や治療に代わるものではないことを理解しました。<span style={{color:'var(--danger)'}}>(必須)</span>
                  </Checkbox>
                  <Checkbox checked={form.consent2} onChange={()=>upd('consent2', !form.consent2)}>
                    利用規約とプライバシーポリシーに同意します。<span style={{color:'var(--danger)'}}>(必須)</span>
                  </Checkbox>
                </div>

                {submitError && (
                  <div style={{
                    background:'#FFF0F0', border:'1px solid #FFCDD2',
                    borderRadius:'var(--r-12)', padding:'14px 18px',
                    fontSize:13, color:'#C62828', lineHeight:1.6,
                  }}>{submitError}</div>
                )}

                <div style={{marginTop:16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <button onClick={()=>setStep(1)} style={{background:'none',border:0,color:'var(--ink-2)',fontSize:13,cursor:'pointer'}}>← 戻る</button>
                  <Button size="lg" variant="deep" disabled={!canSubmit || submitting}
                    onClick={handleSubmit} iconRight={submitting ? null : Ico.arrow}
                    style={{opacity: (canSubmit && !submitting)?1:.5, cursor: (canSubmit && !submitting)?'pointer':'not-allowed'}}>
                    {submitting ? '送信中...' : 'この内容で送信する'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{marginTop:32, background:'var(--brand-wash)', borderRadius:'var(--r-24)', padding:'56px 48px', textAlign:'center'}}>
              <div style={{width:64,height:64,borderRadius:'50%',background:'var(--brand-deep)',color:'#fff',display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:24}}>
                {Ico.check}
              </div>
              <h2 style={{fontFamily:'var(--font-serif)',fontSize:28,fontWeight:600,color:'var(--ink-1)',margin:'0 0 14px'}}>ご相談を受け付けました。</h2>
              <p style={{fontSize:15, color:'var(--ink-2)', lineHeight:1.95, maxWidth:520, margin:'0 auto 28px'}}>
                {mode==='direct' ? (selectedP?.name || '担当薬剤師') : 'ヒトヤク運営'} より、{form.contactType==='line'?'LINE':'メール'}でご返信いたします。<br/>
                通常24時間以内、混雑時は2営業日程度お時間をいただく場合があります。
              </p>
              <Button variant="ghost" onClick={()=>window.HY_NAV?.('top')}>トップに戻る</Button>
            </div>
          )}
        </div>
      </section>
      <SiteFooter/>
    </div>
  );
}

Object.assign(window, { PageConsult });
