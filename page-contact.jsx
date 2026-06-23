// ヒトヤク — Contact (お問い合わせ) Page
const WEB3FORMS_KEY_CONTACT = '6f940260-0fae-4c1b-bbf0-412140515fec';

function PageContact() {
  const isMobile = useIsMobile();
  const [formStatus, setFormStatus] = React.useState('idle');
  const formRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    const fd = new FormData(formRef.current);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY_CONTACT,
          subject: 'ヒトヤク お問い合わせ',
          from_name: 'ヒトヤク',
          replyto: fd.get('email') || '',
          お名前: fd.get('name') || '',
          メールアドレス: fd.get('email') || '',
          お問い合わせ種別: fd.get('category') || '',
          内容: fd.get('message') || '',
        }),
      });
      const data = await res.json();
      setFormStatus(data.success ? 'success' : 'error');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div style={{ background: 'var(--bg-base)' }}>
      <SiteHeader/>
      <Breadcrumb items={[{ label: 'トップ', go: 'top' }, { label: 'お問い合わせ' }]}/>

      <section style={{ padding: isMobile ? '40px 0 80px' : '64px 0 120px' }}>
        <div className="container-narrow">
          <SectionHead
            align="center"
            eyebrow="CONTACT"
            title="お問い合わせ"
          />
          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.9, marginTop: 16, marginBottom: 48 }}>
            サービスに関するご質問・ご意見・その他お問い合わせはこちらからどうぞ。<br/>
            通常2営業日以内にご返信いたします。
          </p>

          <div style={{ background: '#fff', border: '1px solid var(--line-soft)', borderRadius: 'var(--r-24)', padding: isMobile ? '28px 20px' : '40px 48px' }}>
            {formStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--brand-wash)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--brand)' }}>
                  {Ico.check}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink-1)', marginBottom: 10 }}>送信しました</div>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.9 }}>
                  お問い合わせありがとうございます。<br/>
                  2営業日以内にご返信いたします。
                </p>
                <div style={{ marginTop: 32 }}>
                  <Button variant="ghost" onClick={() => window.HY_NAV?.('top')}>トップへ戻る</Button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <Field label="お名前" required>
                    <Input name="name" placeholder="例: 田中 花子" required/>
                  </Field>
                  <Field label="メールアドレス" required>
                    <Input name="email" type="email" placeholder="例: tanaka@example.com" required/>
                  </Field>
                  <Field label="お問い合わせ種別" required>
                    <div style={{ position: 'relative' }}>
                      <select name="category" required style={{
                        width: '100%', padding: '12px 40px 12px 14px', fontSize: 14,
                        border: '1px solid var(--line-mid)', borderRadius: 'var(--r-12)',
                        background: '#fff', color: 'var(--ink-1)', fontFamily: 'inherit',
                        appearance: 'none',
                      }}>
                        <option value="">選択してください</option>
                        <option value="サービスについて">サービスについて</option>
                        <option value="薬剤師登録について">薬剤師登録について</option>
                        <option value="一般法人向けサービスについて">一般法人向けサービスについて</option>
                        <option value="アカウント・ログインについて">アカウント・ログインについて</option>
                        <option value="その他">その他</option>
                      </select>
                      <span style={{
                        position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                        pointerEvents: 'none', color: 'var(--ink-3)', fontSize: 11,
                      }}>▼</span>
                    </div>
                  </Field>
                  <Field label="お問い合わせ内容" required>
                    <Textarea name="message" placeholder="お問い合わせ内容をご記入ください。" rows={6} required/>
                  </Field>
                </div>
                <div style={{ marginTop: 32, textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 16 }}>
                    送信いただく前に<button type="button" onClick={() => window.HY_NAV?.('privacy')} style={{ background: 'none', border: 'none', color: 'var(--brand)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, textDecoration: 'underline', padding: 0 }}>プライバシーポリシー</button>をご確認ください。
                  </p>
                  <Button size="lg" variant="deep" iconRight={Ico.arrow} disabled={formStatus === 'sending'}>
                    {formStatus === 'sending' ? '送信中...' : '送信する'}
                  </Button>
                  {formStatus === 'error' && (
                    <p style={{ marginTop: 12, fontSize: 13, color: '#c0392b' }}>送信に失敗しました。時間をおいて再度お試しください。</p>
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

Object.assign(window, { PageContact });
