// ヒトヤク — Interactive Prototype Router
// externalNav=true: registers _HY_NAV_INTERNAL for outer App to wrap; outer App owns HY_NAV + scroll.
// externalNav=false (default): registers HY_NAV directly (design canvas mode).

function HitoyakuPrototype({ initial, externalNav }) {
  const [route, setRoute] = React.useState(initial || { page: 'top' });
  const scrollerRef = React.useRef(null);

  React.useEffect(() => {
    const nav = (page, params={}) => {
      setRoute({ page, ...params });
      if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
    };
    if (externalNav) {
      window._HY_NAV_INTERNAL = nav;
      // also set HY_NAV so page components work before outer App wires up
      if (!window.HY_NAV) window.HY_NAV = nav;
    } else {
      window.HY_NAV = nav;
    }
    return () => {
      delete window._HY_NAV_INTERNAL;
      if (!externalNav) delete window.HY_NAV;
    };
  }, [externalNav]);

  let view;
  switch (route.page) {
    case 'list':    view = <PageList/>; break;
    case 'detail':  view = <PageDetail id={route.id}/>; break;
    case 'consult': view = <PageConsult pharmacistId={route.pharmacistId} mode={route.mode}/>; break;
    case 'corp':    view = <PageCorp/>; break;
    case 'pharma':  view = <PagePharma/>; break;
    case 'faq':     view = <PageFaqStub/>; break;
    case 'top':
    default:        view = <PageTop/>;
  }

  // In externalNav mode the outer .hy-app-scroll div owns scrolling; just flow naturally.
  if (externalNav) {
    return (
      <div style={{ width: '100%', background: 'var(--bg-base)' }}>
        {view}
      </div>
    );
  }

  return (
    <div ref={scrollerRef} className="hy-scroll" style={{
      width:'100%', height:'100%', overflowY:'auto', overflowX:'hidden',
      background:'var(--bg-base)',
    }}>
      {view}
      <MobileBottomCTA/>
    </div>
  );
}

// Stub FAQ page so nav works (full FAQ would be a separate artboard)
function PageFaqStub() {
  const opsItems = [
    {q:'相談料はかかりますか?', a:'初回の運営相談は無料です。薬剤師との相談はプロフィールに記載の料金体系をご確認ください。'},
    {q:'処方箋を出してもらえますか?', a:'ヒトヤクは医師の診療・処方を行いません。薬剤師による服薬・健康相談に特化しています。'},
    {q:'相談内容の秘密は守られますか?', a:'守秘義務に基づき厳重に管理いたします。第三者への共有はありません。'},
    {q:'家族の薬についても相談できますか?', a:'はい、ご家族の処方薬・市販薬・サプリの相談を多く受けています。'},
    {q:'病院に行くべきか相談できますか?', a:'はい、受診の目安についての相談も承ります。状況により受診をお勧めする場合があります。'},
  ];
  const corpItems = [
    {q:'導入の最低人数はありますか?', a:'50名以上を目安にご案内していますが、小規模でもご相談ください。'},
    {q:'産業医サービスとの併用はできますか?', a:'はい、産業医・産業保健サービスとは目的が異なるため併用しやすい設計です。'},
    {q:'利用実績を把握できますか?', a:'匿名集計の月次レポートをご提供します。'},
  ];
  const pharmaItems = [
    {q:'参加に費用はかかりますか?', a:'参加自体は無料です。報酬体系は別途ご説明します。'},
    {q:'掲載写真は自分で用意する必要がありますか?', a:'運営側で簡単な撮影サポートも可能です。'},
    {q:'相談の対応時間は決められますか?', a:'はい、対応可能な曜日・時間帯はご自身で設定いただけます。'},
  ];

  return (
    <div>
      <SiteHeader current="faq"/>
      <Breadcrumb items={[{label:'トップ',go:'top'},{label:'よくある質問'}]}/>
      <section style={{padding:'48px 0 80px'}}>
        <div className="container">
          <SectionHead align="center" eyebrow="FAQ" title="よくあるご質問"
            lede="一般利用者・法人ご担当者・薬剤師の方それぞれ向けにまとめました。"/>
        </div>
      </section>
      <section style={{padding:'0 0 120px'}}>
        <div className="container-narrow" style={{display:'flex',flexDirection:'column',gap:48}}>
          <FaqGroup title="一般利用者の方へ" items={opsItems}/>
          <FaqGroup title="法人ご担当者の方へ" items={corpItems}/>
          <FaqGroup title="薬剤師・薬局の方へ" items={pharmaItems}/>
        </div>
      </section>
      <SiteFooter/>
    </div>
  );
}

function FaqGroup({title, items}) {
  return (
    <div>
      <h2 style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:600,color:'var(--ink-1)',margin:'0 0 16px'}}>{title}</h2>
      <FAQ items={items} defaultOpen={-1}/>
    </div>
  );
}

// Mobile fixed bottom CTA — only visible at narrow widths (we toggle via container queries in TweakPanel for design canvas).
// In a real responsive site this would use a media query. Here we approximate.
function MobileBottomCTA() {
  // Hide unless route signals mobile preview
  if (!window.HY_MOBILE) return null;
  return (
    <div style={{
      position:'sticky', bottom:0, left:0, right:0, zIndex:60,
      background:'rgba(255,255,255,.95)', backdropFilter:'blur(8px)',
      borderTop:'1px solid var(--line-soft)', padding:'10px 16px',
      display:'flex', gap:8,
    }}>
      <Button variant="ghost" size="md" fullWidth onClick={()=>window.HY_NAV?.('consult')}>相談する</Button>
      <Button variant="deep" size="md" fullWidth onClick={()=>window.HY_NAV?.('list')}>薬剤師を探す</Button>
    </div>
  );
}

Object.assign(window, { HitoyakuPrototype });
