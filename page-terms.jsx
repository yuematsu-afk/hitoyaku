// ヒトヤク — Terms of Service Pages

function TermsBreadcrumb({ title }) {
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
          <a href="#" onClick={(e)=>{e.preventDefault(); window.HY_NAV?.('top');}} style={{color:'var(--ink-2)'}}>トップ</a>
          <span style={{margin:'0 8px'}}>›</span>
          <span style={{color:'var(--ink-1)'}}>{title}</span>
        </div>
      </div>
    </div>
  );
}

function ArticleBlock({ num, title, items, id }) {
  return (
    <div id={id} style={{paddingBottom:48, borderBottom:'1px solid var(--line-soft)', marginBottom:48}}>
      <h2 style={{
        fontFamily:'var(--font-serif)', fontWeight:600, fontSize:18,
        color:'var(--ink-1)', margin:'0 0 20px',
        display:'flex', gap:14, alignItems:'baseline',
        lineHeight:1.5,
      }}>
        <span style={{
          color:'var(--brand-deep)', flexShrink:0,
          fontSize:13, fontWeight:600, letterSpacing:'.05em',
          background:'var(--brand-wash)', padding:'3px 10px',
          borderRadius:'var(--r-pill)', alignSelf:'center',
        }}>{num}</span>
        <span>{title}</span>
      </h2>
      <div style={{fontSize:15, lineHeight:2, color:'var(--ink-2)'}}>
        {items.map((item, i) => {
          if (item.type === 'p') {
            return (
              <p key={i} style={{margin:'0 0 14px', lineHeight:2}}>{item.text}</p>
            );
          }
          if (item.type === 'num') {
            return (
              <div key={i} style={{
                display:'flex', gap:10, alignItems:'flex-start',
                margin:'0 0 10px', paddingLeft:8,
              }}>
                <span style={{
                  color:'var(--brand-deep)', fontWeight:600, flexShrink:0,
                  minWidth:24, fontFamily:'var(--font-serif)',
                }}>{item.n}．</span>
                <span style={{lineHeight:2}}>{item.text}</span>
              </div>
            );
          }
          if (item.type === 'enum') {
            return (
              <div key={i} style={{
                display:'flex', gap:8, alignItems:'flex-start',
                margin:'0 0 6px', paddingLeft:40,
              }}>
                <span style={{flexShrink:0, minWidth:22, color:'var(--ink-1)', fontWeight:500}}>{item.n}</span>
                <span style={{lineHeight:2}}>{item.text}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

function TableOfContents({ articles }) {
  return (
    <nav style={{
      background:'var(--bg-soft)', borderRadius:'var(--r-16)',
      padding:'24px 20px', marginBottom:48,
    }}>
      <div style={{
        fontSize:11, letterSpacing:'.18em', color:'var(--brand-deep)',
        fontWeight:600, marginBottom:14,
      }}>目　次</div>
      <ol style={{margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:2}}>
        {articles.map((a, i) => (
          <li key={i}>
            <a href={`#article-${i}`}
               onClick={(e)=>{
                 e.preventDefault();
                 document.getElementById(`article-${i}`)?.scrollIntoView({behavior:'smooth', block:'start'});
               }}
               style={{
                 display:'flex', gap:12, alignItems:'baseline',
                 padding:'5px 8px', borderRadius:'var(--r-8)',
                 fontSize:13, color:'var(--ink-2)', textDecoration:'none',
                 transition:'background .12s',
               }}
               onMouseEnter={(e)=>e.currentTarget.style.background='var(--brand-wash)'}
               onMouseLeave={(e)=>e.currentTarget.style.background='transparent'}>
              <span style={{
                color:'var(--brand-deep)', fontWeight:600, flexShrink:0,
                fontSize:12, minWidth:52,
              }}>{a.num}</span>
              <span>{a.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function TermsLayout({ title, subtitle, articles, otherTerms }) {
  const isMobile = useIsMobile();
  return (
    <div style={{background:'var(--bg-base)'}}>
      <SiteHeader/>
      <TermsBreadcrumb title={title}/>

      <section style={{background:'var(--brand-wash)', padding: isMobile ? '36px 0' : '64px 0'}}>
        <div className="container">
          {!isMobile && (
            <div style={{fontSize:12, letterSpacing:'.2em', color:'var(--brand-deep)', fontWeight:600, marginBottom:14}}>
              — TERMS OF SERVICE
            </div>
          )}
          <h1 style={{
            fontFamily:'var(--font-serif)', fontWeight:600,
            fontSize: isMobile ? '22px' : 'clamp(26px, 3vw, 40px)',
            lineHeight:1.4, margin:'0 0 12px', color:'var(--ink-1)',
          }}>{title}</h1>
          {subtitle && (
            <p style={{fontSize:13, color:'var(--ink-3)', margin:0}}>{subtitle}</p>
          )}
        </div>
      </section>

      <section style={{padding: isMobile ? '40px 0 80px' : '72px 0 100px'}}>
        <div className="container">
          <div style={{
            maxWidth: isMobile ? '100%' : 860,
            margin:'0 auto',
          }}>
            <div style={{
              background:'#fff', border:'1px solid var(--line-soft)',
              borderRadius:'var(--r-16)',
              padding: isMobile ? '16px 20px' : '18px 28px',
              marginBottom:40, fontSize:13, color:'var(--ink-2)', lineHeight:1.9,
              display:'flex', gap:12, alignItems:'flex-start',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{flexShrink:0, marginTop:2}}>
                <circle cx="12" cy="12" r="9" stroke="var(--brand-deep)" strokeWidth="1.6"/>
                <path d="M12 8v4M12 15v.5" stroke="var(--brand-deep)" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span>本規約は日本語を正文とします。本規約への同意は本サービスのご利用をもって行われるものとします。</span>
            </div>

            <TableOfContents articles={articles}/>

            {articles.map((a, i) => (
              <ArticleBlock key={i} id={`article-${i}`} num={a.num} title={a.title} items={a.items}/>
            ))}

            {otherTerms && (
              <div style={{
                background:'var(--brand-wash)', borderRadius:'var(--r-16)',
                padding: isMobile ? '20px' : '28px 32px',
                marginTop:16,
              }}>
                <div style={{fontSize:13, fontWeight:600, color:'var(--brand-deep)', marginBottom:8}}>
                  {otherTerms.label}
                </div>
                <p style={{fontSize:13, color:'var(--ink-2)', lineHeight:1.8, margin:'0 0 12px'}}>
                  {otherTerms.desc}
                </p>
                <Button size="sm" variant="deep" onClick={()=>window.HY_NAV?.(otherTerms.go)}>
                  {otherTerms.label}を見る
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter/>
    </div>
  );
}

// ── ヒトヤク利用規約（一般利用者向け）────────────────────────

const TERMS_USER_ARTICLES = [
  {
    num:'第１条', title:'（目的及び定義）',
    items:[
      {type:'p', text:'本規約は、オンライン服薬指導及びオンライン相談に関するサービスであるヒトヤク（以下「本サービス」といいます。）を運営するＳＡＳＡＥＲＵ合同会社（以下「当社」といいます。）が提供するサービスの利用条件及び一般利用者（以下「利用者」といいます。）と当社の権利義務関係を定めることを目的とします。'},
    ]
  },
  {
    num:'第２条', title:'（定義）',
    items:[
      {type:'p', text:'本規約において使用する以下の用語は、以下の各号に定める意味を有します。'},
      {type:'enum', n:'⑴', text:'「オンライン服薬指導」とは、医薬品、医療機器等の品質、有効性及び安全性の確保等に関する法律施行規則第１５条の１３第２項第１項が定める「オンライン服薬指導」をいいます。'},
      {type:'enum', n:'⑵', text:'「オンライン相談」とは、医薬品に関する一般的な情報提供や生活上の健康相談等を、薬剤師または登録販売者がインターネット上の通信手段（ビデオ通話、チャット、メッセージ機能等）を用いて行う非対面形式のコミュニケーションをいいます。なお、オンライン相談は処方箋に基づく服薬指導や薬の交付を目的とするものではなく、医療行為または薬機法上の服薬指導には該当しません。'},
      {type:'enum', n:'⑶', text:'「利用者情報」とは、利用者が本サービスに登録した際に設定したＩＤ、パスワード及び本サービス利用に使用するLINEアカウント情報を指します。'},
      {type:'enum', n:'⑷', text:'「患者」とは、オンライン服薬指導又はオンライン相談を受ける者を指します。'},
      {type:'enum', n:'⑸', text:'「通信機器」とは、スマートフォン、タブレット端末及びコンピューター機器を指します。'},
      {type:'enum', n:'⑹', text:'「登録薬剤師」とは、利用者からオンライン服薬指導又はオンライン相談の依頼を受ける者をいいます。'},
      {type:'enum', n:'⑺', text:'「登録薬局」とは、登録薬剤師が所属する薬局をいいます。'},
      {type:'enum', n:'⑻', text:'「登録販売者」とは、薬局、店舗販売業及び配置販売業において、一般用医薬品（第２類医薬品、第３類医薬品）の販売等を担う者をいいます。'},
      {type:'enum', n:'⑼', text:'「登録薬剤師等」とは、登録薬局、登録薬剤師及び登録販売者をいいます。'},
    ]
  },
  {
    num:'第３条', title:'（本規約の適用）',
    items:[
      {type:'num', n:'１', text:'本規約は、本サービスの利用者に適用されます。利用者は、本規約に同意した上で、本サービスを利用してください。'},
      {type:'num', n:'２', text:'利用者と患者が別の者である場合、利用者は、患者をして、本規約に規定する事項を遵守させ、かつ、必要な同意又は承諾をさせるものとします。'},
    ]
  },
  {
    num:'第４条', title:'（利用登録）',
    items:[
      {type:'num', n:'１', text:'利用者は、本規約を承認の上、当社所定の方法により利用登録を申請するものとします。'},
      {type:'num', n:'２', text:'当社は、登録申請者が以下のいずれかに該当すると判断した場合、登録を拒否することがあります。'},
      {type:'enum', n:'⑴', text:'過去に規約違反があった場合'},
      {type:'enum', n:'⑵', text:'反社会的勢力に関与していると認められる場合'},
      {type:'enum', n:'⑶', text:'その他、当社が不適切と判断した場合'},
      {type:'num', n:'３', text:'利用者は、本条1項に基づき登録した利用者情報に変更が発生した場合、直ちに、利用者情報の変更手続を行わなければなりません。'},
      {type:'num', n:'４', text:'利用者は、本サービス上のアカウントを第三者に対して利用、貸与、譲渡、売買又は質入等をしてはなりません。'},
    ]
  },
  {
    num:'第５条', title:'（ＩＤ・パスワードの管理）',
    items:[
      {type:'num', n:'１', text:'利用者は、ＩＤ及びパスワードの管理責任を負うものとします。'},
      {type:'num', n:'２', text:'当社は、利用者による管理不備、使用過誤、第三者による使用等により生じた損害について一切責任を負いません。'},
    ]
  },
  {
    num:'第６条', title:'（本サービスの利用等）',
    items:[
      {type:'num', n:'１', text:'利用者は、本サービスを通じて、自らの本サービス上での選択に応じて、登録薬剤師から、利用者本人又は患者に対するオンライン服薬指導又はオンライン相談を受けることができます。'},
      {type:'num', n:'２', text:'利用者と患者が別の者である場合、本サービスを通じてオンライン服薬指導又はオンライン相談を利用することができる患者の範囲は、利用者が代理権（当社による患者の個人情報の取扱いについて、患者に代わって同意する代理権（法定代理権を含みます。）とします。）を有する本人に限ります。'},
      {type:'num', n:'３', text:'本サービスの利用に係る権利は、利用者本人のみに付与されるものです。利用者は、本規約に別途規定する場合を除き、当該権利を第三者に譲渡し、貸与することはできません。'},
      {type:'num', n:'４', text:'本サービスは、利用者と登録薬剤師等とのマッチング及びオンライン相談の場を提供するプラットフォームであり、診断や治療行為を行うものではありません。提供される情報は、医薬品等に関する一般的な情報提供及び助言にとどまります。オンライン服薬指導に関する契約は、登録薬局と患者との間で成立します。'},
      {type:'num', n:'５', text:'本サービスは、医療行為の提供を行うものではなく、保険診療や処方行為は本サービスの対象外です。'},
      {type:'num', n:'６', text:'本サービスを利用するにあたって必要な通信機器、ソフトウェア、通信手段などは、利用者自らの費用及び責任で用意する必要があります。'},
      {type:'num', n:'７', text:'利用者の通信環境や端末の状態によりサービスが正常に利用できない場合、当社は一切の責任を負いません。'},
      {type:'num', n:'８', text:'利用者が本サービス内で外部サービス（Ｚｏｏｍ等）を利用する場合、その利用に伴うトラブル・損害について当社は責任を負いません。'},
    ]
  },
  {
    num:'第７条', title:'（オンライン服薬指導の利用）',
    items:[
      {type:'num', n:'１', text:'オンライン服薬指導は、薬機法その他の適用ある法令に従って実施されるものです。利用者は、次の事項を十分に理解した上で、オンライン服薬指導を利用してください。'},
      {type:'enum', n:'⑴', text:'オンライン服薬指導の実施の可否は登録薬剤師が判断するものであり、登録薬剤師の指示に従って対面による服薬指導を実施しなければならない場合があること'},
      {type:'enum', n:'⑵', text:'特に、注射薬、吸入薬等の使用にあたり手技が必要な薬剤については、オンライン服薬指導の実施が困難とする事情があるという理由で、対面による服薬指導を実施する必要が生じ得ること'},
      {type:'num', n:'２', text:'オンライン服薬指導を利用するにあたっては、次の事項を実施する必要があります。'},
      {type:'enum', n:'⑴', text:'患者は、自らのプライバシーに配慮して、自宅その他の患者が物理的に外部から隔離される空間においてオンライン服薬指導を利用する必要があります。'},
      {type:'enum', n:'⑵', text:'患者は、登録薬剤師から本人証明を求められる場合、運転免許証その他の本人確認書類をもって本人証明を実施する必要があります。'},
    ]
  },
  {
    num:'第８条', title:'（薬の配送）',
    items:[
      {type:'p', text:'薬の配送は、登録薬局が実施します。当社は、薬の配送に関して、患者に対して何らの直接の責任を負いません。'},
    ]
  },
  {
    num:'第９条', title:'（本サービスの料金）',
    items:[
      {type:'p', text:'利用者が有料相談を利用する場合、事前に定められた金額をオンライン決済にて支払うものとします。'},
    ]
  },
  {
    num:'第１０条', title:'（禁止事項等）',
    items:[
      {type:'p', text:'利用者は、本サービスを利用するにあたり、次の事項を遵守する必要があります。'},
      {type:'num', n:'１', text:'虚偽の情報に基づき処方箋を取得しないこと及び同一の処方箋に基づき複数の薬局から薬を取得しないこと'},
      {type:'num', n:'２', text:'法令、裁判所の判決、決定若しくは命令又は法令上拘束力のある行政措置に違反しないこと'},
      {type:'num', n:'３', text:'犯罪行為若しくは不法行為又はこれらを援助し、若しくは助長する行為その他公の秩序又は善良の風俗を害するおそれのある行為をしないこと'},
      {type:'num', n:'４', text:'当社又は第三者の著作権、商標権、特許権などの知的財産権、名誉権、プライバシー権その他の権利・利益を侵害しないこと'},
      {type:'num', n:'５', text:'以下の表現を行わないこと'},
      {type:'enum', n:'⑴', text:'暴力的な表現'},
      {type:'enum', n:'⑵', text:'露骨な性的表現'},
      {type:'enum', n:'⑶', text:'児童ポルノ・児童虐待に相当する表現'},
      {type:'enum', n:'⑷', text:'人種、国籍、信条、性別、社会的身分、門地などによる差別につながる表現'},
      {type:'enum', n:'⑸', text:'自殺、自傷行為、薬物乱用などを誘引又は助長する表現'},
      {type:'enum', n:'⑹', text:'悪態、罵り言葉その他の暴言を用いた表現'},
      {type:'enum', n:'⑺', text:'反社会的な内容を含み、他人に不快感を与える表現'},
      {type:'num', n:'６', text:'第三者になりすまさないこと'},
      {type:'num', n:'７', text:'意図的に虚偽の情報を流布しないこと'},
      {type:'num', n:'８', text:'以下を目的とした利用その他オンライン服薬指導又はオンライン相談を利用する目的と異なる目的での利用をしないこと'},
      {type:'enum', n:'⑴', text:'性行為やわいせつな行為'},
      {type:'enum', n:'⑵', text:'面識のない第三者との出会いや交際'},
      {type:'enum', n:'⑶', text:'嫌がらせや誹謗中傷'},
      {type:'enum', n:'⑷', text:'他人の個人情報などを不正に収集・開示・提供すること'},
      {type:'enum', n:'⑸', text:'宗教活動又は宗教団体への勧誘'},
      {type:'enum', n:'⑹', text:'反社会的勢力に対する利益供与その他反社会的勢力への協力'},
      {type:'num', n:'９', text:'本サービスの運営を妨害し、又は支障を与える行為をしないこと（下記を含みますがこれらに限りません）。'},
      {type:'enum', n:'⑴', text:'本サービスのサーバー又はネットワークシステムに支障を与える行為'},
      {type:'enum', n:'⑵', text:'技術的手段を利用して本サービスを不正に操作する行為'},
      {type:'enum', n:'⑶', text:'本サービスの不具合を意図的に利用する行為'},
      {type:'enum', n:'⑷', text:'当社に対して同様の質問を必要以上に繰り返すなど不当な問合せ又は要求をする行為'},
      {type:'enum', n:'⑸', text:'不当な目的又は様態でのリバースエンジニアリング、逆アセンブルを行う行為その他の方法でソフトウェア等を解析する行為'},
      {type:'num', n:'１０', text:'上記各号の禁止行為を援助又は助長する行為をしないこと'},
      {type:'num', n:'１１', text:'その他当社が不適当と合理的に判断する行為をしないこと'},
    ]
  },
  {
    num:'第１１条', title:'（レビュー等の投稿）',
    items:[
      {type:'num', n:'１', text:'利用者は、事実に基づいた内容を投稿するものとし、誹謗中傷、虚偽、誤解を与える内容の投稿を行ってはなりません。'},
      {type:'num', n:'２', text:'当社は、違反が確認された場合、当該投稿を削除し、必要に応じてアカウントの停止等を行うことができます。'},
    ]
  },
  {
    num:'第１２条', title:'（本サービスの退会等）',
    items:[
      {type:'num', n:'１', text:'利用者は、当社が別途本サービス上で提示する方法により、いつでも本サービスを退会することができます。'},
      {type:'num', n:'２', text:'当社は、利用者が本規約に違反していると判断する場合、何らの催告を要することなく、本サービスの退会又は利用停止その他当社が適切と合理的に判断する措置をとることができます。なお、当社は、これらの措置の判断基準について問合せがあった場合でも、これに回答する義務を負いません。'},
      {type:'num', n:'３', text:'当社は、前項に掲げる場合のほか、以下の場合、何らの催告を要することなく、本サービスの退会又は利用停止その他当社が適切と判断する措置をとることができます。'},
      {type:'enum', n:'⑴', text:'登録薬剤師又は登録薬局その他第三者からのクレームが頻発している場合'},
      {type:'enum', n:'⑵', text:'当社の責めに帰すべき事由によらずに利用者との連絡がとれない場合'},
      {type:'enum', n:'⑶', text:'オンライン服薬指導又はオンライン相談の実施が1年以上行われていない場合'},
      {type:'enum', n:'⑷', text:'破産手続開始、民事再生手続開始又はこれらに類似する倒産手続開始の申立てがあった場合'},
      {type:'enum', n:'⑸', text:'反社会的勢力であることが判明した場合又は反社会的勢力との何らかの交流若しくは関与を行っていることが判明した場合'},
      {type:'enum', n:'⑹', text:'風説の流布、偽計、威力その他の不正な手段を用いて当社又は第三者の信用を毀損する場合'},
      {type:'enum', n:'⑺', text:'利用者との信頼関係が失われたと当社が合理的に判断する場合'},
      {type:'enum', n:'⑻', text:'その他利用者への本サービスの提供が不適切であると当社が合理的に判断する場合'},
    ]
  },
  {
    num:'第１３条', title:'（本サービスの中断・変更・終了）',
    items:[
      {type:'num', n:'１', text:'当社は、以下の場合、本サービスの提供を中断することができます。'},
      {type:'enum', n:'⑴', text:'本サービスの提供に必要な設備の保守点検、工事などを定期的に、又は緊急に行う場合'},
      {type:'enum', n:'⑵', text:'本サービスの提供に用いる設備に障害、故障などが生じた場合'},
      {type:'enum', n:'⑶', text:'国、地方自治体その他の公的機関から当社に対して本サービスの提供を中断するよう要請があった場合'},
      {type:'enum', n:'⑷', text:'停電、火災、地震、労働争議その他不可抗力により本サービスの提供が困難な場合'},
      {type:'enum', n:'⑸', text:'運用上又は技術上の理由から本サービスの提供を中断する必要がある場合'},
      {type:'num', n:'２', text:'当社は、以下の各号のいずれかに該当する場合に、本サービスの内容を変更することができます。'},
      {type:'enum', n:'⑴', text:'本サービスの機能追加、改善等、本サービスの内容の変更が利用者の一般の利益に適合するとき'},
      {type:'enum', n:'⑵', text:'前号に該当しない場合において、本サービスの内容の変更の必要性、変更後の内容の相当性、その他の変更に係る事情に照らして合理性があるとき'},
      {type:'num', n:'３', text:'当社は、利用者に事前に周知した上で、本サービスの提供を終了することができます。'},
      {type:'num', n:'４', text:'本条１項及び２項の本サービスの中断・変更により利用者に損害が生じても、当社は一切責任を負いません。'},
    ]
  },
  {
    num:'第１４条', title:'（利用者の責任等）',
    items:[
      {type:'num', n:'１', text:'利用者は、自らの責任において本サービスを利用するものとします。'},
      {type:'num', n:'２', text:'不適正なオンライン服薬指導及びオンライン相談の利用の防止のため、利用者は、自らの責任において、利用者又は患者に関して本サービス上で登録する情報を正確かつ最新の内容に保つものとします。'},
      {type:'num', n:'３', text:'利用者は、利用者の故意又は過失により当社が直接的又は間接的に何らかの損害（弁護士費用の負担を含みます。）を被った場合、当社の請求に従って直ちにこれを補償しなければなりません。'},
      {type:'num', n:'４', text:'オンライン服薬指導による服薬指導、オンライン相談又は薬の配送に関連して生じた問合せ、苦情、請求、紛争等について、利用者は、登録薬剤師、登録薬局、配送業者と直接連絡をとり、これを解決するものとします。当社は、自らの責めに帰すべき事由によるものを除き、これらの苦情等の解決に関与する義務を負いません。'},
    ]
  },
  {
    num:'第１５条', title:'（当社の責任）',
    items:[
      {type:'num', n:'１', text:'当社は、利用者又は患者が本サービスの利用に関して被った損害について賠償の責任を負い、かつ、当該賠償額の上限は６０万円とします。ただし、当社の責めに帰することができない事由によるものであるときは、この限りではありません。'},
      {type:'num', n:'２', text:'前項の定めにかかわらず、当社は、自らの故意又は重過失によらずして利用者又は患者に損害が生じた場合、通常生ずべき損害のみ賠償する責任を負い、逸失利益、データの消失その他の特別の事情によって生じた損害を賠償する責任を負わないものとし、かつ、当該賠償額の上限は６０万円とします。'},
    ]
  },
  {
    num:'第１６条', title:'（著作権及び知的財産権）',
    items:[
      {type:'num', n:'１', text:'本サービス内のすべてのデータ、文章、画像、ソフトウェア等に関する著作権は当社に帰属します。'},
      {type:'num', n:'２', text:'利用者は、当社の事前許可なく、これらの著作物を私的利用の範囲を超えて複製、公衆送信、頒布、出版などを行ってはなりません。'},
      {type:'num', n:'３', text:'本サービスに関する知的財産権は当社に帰属し、無断使用を禁じます。'},
    ]
  },
  {
    num:'第１７条', title:'（未成年者の利用）',
    items:[
      {type:'p', text:'１８歳未満の利用者は、保護者の同意を得たうえでのみ本サービスを利用できるものとします。'},
    ]
  },
  {
    num:'第１８条', title:'（免責事項）',
    items:[
      {type:'num', n:'１', text:'当社は、本サービスにおける提供情報の正確性等について保証せず、利用により生じた損害について一切責任を負いません。'},
      {type:'num', n:'２', text:'登録薬剤師等による情報提供・助言は、一般的な医薬品情報に基づくものであり、利用者の健康状態に応じた個別具体的な診断や治療に代わるものではありません。当社は、利用者の判断により当該情報を用いたことによる一切の損害について責任を負いません。'},
      {type:'num', n:'３', text:'利用者と登録薬剤師等との間で生じた一切のトラブル、損害、紛争について、当社は関与せず、責任を負いません。'},
      {type:'num', n:'４', text:'本サービスに掲載された情報等の正確性、完全性、有用性、特定目的への適合性等について、当社はいかなる保証も行いません。'},
      {type:'num', n:'５', text:'当社は、本規約に別途規定する場合を除き、(i)セキュリティなどに関する欠陥、エラーやバグその他不具合がないこと、(ii)本サービスの安全性、信頼性、正確性、完全性、有効性及び特定の目的への適合性並びに(iii)本サービスが第三者の権利を侵害していないことを明示的にも黙示的にも保証しません。'},
    ]
  },
  {
    num:'第１９条', title:'（個人情報の取扱い）',
    items:[
      {type:'p', text:'当社は、利用者の個人情報を別途定めるプライバシーポリシーに従って適切に取り扱います。'},
    ]
  },
  {
    num:'第２０条', title:'（反社会的勢力の排除）',
    items:[
      {type:'p', text:'利用者は、反社会的勢力に該当せず、将来にわたり関与しないことを保証します。'},
    ]
  },
  {
    num:'第２１条', title:'（規約の変更）',
    items:[
      {type:'num', n:'１', text:'当社は、次の各号のいずれかに該当する場合、利用者の承諾を得ることなく本規約を変更又は新たな内容を追加することができるものとします。'},
      {type:'enum', n:'⑴', text:'変更が利用者の一般の利益に適合するとき。'},
      {type:'enum', n:'⑵', text:'変更が契約の目的に反せず、変更の必要性、内容の相当性等に照らして合理的であるとき。'},
      {type:'num', n:'２', text:'本規約の変更内容は、効力発生日の１０日前までに当社ホームページにて表示するものとします。'},
    ]
  },
  {
    num:'第２２条', title:'（連絡方法）',
    items:[
      {type:'p', text:'本サービスに関する当社から利用者への連絡は、利用者が登録した電話番号への架電又は電子メールへの送信により行います。'},
    ]
  },
  {
    num:'第２３条', title:'（準拠法及び合意管轄）',
    items:[
      {type:'p', text:'本規約は日本法に準拠し、紛争は京都地方裁判所を専属的合意管轄裁判所とします。'},
    ]
  },
];

// ── 登録薬剤師等利用規約 ─────────────────────────────────────

const TERMS_PHARMA_ARTICLES = [
  {
    num:'第１条', title:'（目的）',
    items:[
      {type:'p', text:'本規約は、ＳＡＳＡＥＲＵ合同会社（以下「当社」といいます。）が運営するオンライン服薬指導及びオンライン相談に関するサービスであるヒトヤク（以下「本サービス」といいます）に登録された薬剤師等が、本サービスを通じて、専門家として本サービスの一般利用者に対しサービスを提供する際の基本的取決めを定めるものです。'},
    ]
  },
  {
    num:'第２条', title:'（定義）',
    items:[
      {type:'p', text:'本規約において使用する以下の用語は、以下の各号に定める意味を有します。'},
      {type:'enum', n:'⑴', text:'「オンライン服薬指導」とは、医薬品、医療機器等の品質、有効性及び安全性の確保等に関する法律施行規則第１５条の１３第２項第１項が定める「オンライン服薬指導」をいいます。'},
      {type:'enum', n:'⑵', text:'「オンライン相談」とは、医薬品に関する一般的な情報提供や生活上の健康相談等を、薬剤師または登録販売者がインターネット上の通信手段（ビデオ通話、チャット、メッセージ機能等）を用いて行う非対面形式のコミュニケーションをいいます。なお、オンライン相談は処方箋に基づく服薬指導や薬の交付を目的とするものではなく、医療行為または薬機法上の服薬指導には該当しません。'},
      {type:'enum', n:'⑶', text:'「登録薬剤師」とは、利用者からオンライン服薬指導又はオンライン相談の依頼を受ける者をいいます。'},
      {type:'enum', n:'⑷', text:'「登録薬局」とは、登録薬剤師が所属する薬局をいいます。'},
      {type:'enum', n:'⑸', text:'「登録販売者」とは、薬局、店舗販売業及び配置販売業において、一般用医薬品（第２類医薬品、第３類医薬品）の販売等を担う者をいいます。'},
      {type:'enum', n:'⑹', text:'「登録薬剤師等」とは、登録薬局、登録薬剤師及び登録販売者をいいます。'},
      {type:'enum', n:'⑺', text:'「一般利用者」とは、オンライン服薬指導、オンライン相談を受ける者又は本サービスを利用する者（登録薬剤師等を除く）を指します。'},
    ]
  },
  {
    num:'第３条', title:'（医療従事者としての行動基準）',
    items:[
      {type:'num', n:'１', text:'登録薬剤師等は、専門職としての責任を認識し、一般利用者に対して適切かつ丁寧な対応を行うものとします。'},
      {type:'num', n:'２', text:'登録薬局は登録薬剤師をして、本規約に規定する事項を遵守させ、かつ、必要な同意又は承諾をさせるものとします。'},
      {type:'num', n:'３', text:'提供する説明・助言には、医薬的根拠を明示し、科学的・客観的な正確性を担保するよう努めてください。'},
      {type:'num', n:'４', text:'不確かな情報の提供や、社会通念上又は業界の倫理に照らして不適切な言動をしてはなりません。'},
      {type:'num', n:'５', text:'一般利用者に対して、医療従事者としての倫理と責任を持った言動を行ってください。'},
      {type:'num', n:'６', text:'医療広告ガイドラインや薬剤師法等の関連法規に留意し、オンライン上での服薬指導行為は、法令、ガイドライン等に従って行うこと。'},
    ]
  },
  {
    num:'第４条', title:'（資格有効性の維持）',
    items:[
      {type:'p', text:'登録薬剤師等は、薬剤師免許又は登録販売者資格を常に有効な状態に保ち、停止・取消等が発生した場合は直ちに当社に報告する義務を負います。'},
    ]
  },
  {
    num:'第５条', title:'（利用登録）',
    items:[
      {type:'num', n:'１', text:'登録薬剤師等は、本規約を承認の上、当社所定の方法により利用登録を申請するものとします。'},
      {type:'num', n:'２', text:'当社は、登録申請者が以下のいずれかに該当すると判断した場合、登録を拒否することがあります。'},
      {type:'enum', n:'⑴', text:'過去に規約違反又は本サービスの利用契約違反があった場合'},
      {type:'enum', n:'⑵', text:'反社会的勢力に関与していると認められる場合'},
      {type:'enum', n:'⑶', text:'その他、当社が不適切と判断した場合'},
      {type:'num', n:'３', text:'登録薬剤師等は、本条1項に基づき登録した利用者情報に変更が発生した場合、直ちに、利用者情報の変更手続を行わなければなりません。'},
      {type:'num', n:'４', text:'登録薬剤師等は、本サービス上のアカウントを第三者に対して利用、貸与、譲渡、売買又は質入等をしてはなりません。'},
    ]
  },
  {
    num:'第６条', title:'（ＩＤ・パスワードの管理）',
    items:[
      {type:'num', n:'１', text:'登録薬剤師等は、ＩＤ及びパスワードの管理責任を負うものとします。'},
      {type:'num', n:'２', text:'当社は、登録薬剤師等による管理不備、使用過誤、第三者による使用等により生じた損害について一切責任を負いません。'},
    ]
  },
  {
    num:'第７条', title:'（禁止事項等）',
    items:[
      {type:'p', text:'登録薬剤師等は、本サービスを利用するにあたり、次の事項を遵守する必要があります。'},
      {type:'num', n:'１', text:'法令、裁判所の判決、決定若しくは命令又は法令上拘束力のある行政措置に違反しないこと'},
      {type:'num', n:'２', text:'犯罪行為若しくは不法行為又はこれらを援助し、若しくは助長する行為その他公の秩序又は善良の風俗を害するおそれのある行為をしないこと'},
      {type:'num', n:'３', text:'当社又は第三者の著作権、商標権、特許権などの知的財産権、名誉権、プライバシー権その他の権利・利益を侵害しないこと'},
      {type:'num', n:'４', text:'登録薬局が、当該登録薬局に所属する登録薬剤師以外の薬剤師に対し、本サービスを通じていかなる方法においても勧誘行為（採用、業務委託、営業など）を行わないこと'},
      {type:'num', n:'５', text:'本サービスで得た情報・ノウハウ等を利用して、同種又は類似のマッチングプラットフォームを自ら運営する、又は第三者に提供すること'},
      {type:'num', n:'６', text:'以下の表現を行わないこと'},
      {type:'enum', n:'⑴', text:'暴力的な表現'},
      {type:'enum', n:'⑵', text:'露骨な性的表現'},
      {type:'enum', n:'⑶', text:'児童ポルノ・児童虐待に相当する表現'},
      {type:'enum', n:'⑷', text:'人種、国籍、信条、性別、社会的身分、門地などによる差別につながる表現'},
      {type:'enum', n:'⑸', text:'自殺、自傷行為、薬物乱用などを誘引又は助長する表現'},
      {type:'enum', n:'⑹', text:'悪態、罵り言葉その他の暴言を用いた表現'},
      {type:'enum', n:'⑺', text:'反社会的な内容を含み、他人に不快感を与える表現'},
      {type:'num', n:'７', text:'第三者になりすまさないこと'},
      {type:'num', n:'８', text:'意図的に虚偽の情報を流布しないこと'},
      {type:'num', n:'９', text:'以下を目的とした利用その他オンライン服薬指導又はオンライン相談を利用する目的と異なる目的での利用をしないこと'},
      {type:'enum', n:'⑴', text:'性行為やわいせつな行為'},
      {type:'enum', n:'⑵', text:'面識のない第三者との出会いや交際'},
      {type:'enum', n:'⑶', text:'嫌がらせや誹謗中傷'},
      {type:'enum', n:'⑷', text:'他人の個人情報などを不正に収集・開示・提供すること'},
      {type:'enum', n:'⑸', text:'宗教活動又は宗教団体への勧誘'},
      {type:'enum', n:'⑹', text:'反社会的勢力に対する利益供与その他反社会的勢力への協力'},
      {type:'num', n:'１０', text:'本サービスの運営を妨害し、又は支障を与える行為をしないこと（下記を含みますがこれらに限りません）。'},
      {type:'enum', n:'⑴', text:'本サービスのサーバー又はネットワークシステムに支障を与える行為'},
      {type:'enum', n:'⑵', text:'技術的手段を利用して本サービスを不正に操作する行為'},
      {type:'enum', n:'⑶', text:'本サービスの不具合を意図的に利用する行為'},
      {type:'enum', n:'⑷', text:'当社に対して同様の質問を必要以上に繰り返すなど不当な問合せ又は要求をする行為'},
      {type:'enum', n:'⑸', text:'不当な目的又は様態でのリバースエンジニアリング、逆アセンブルを行う行為その他の方法でソフトウェア等を解析する行為'},
      {type:'num', n:'１１', text:'上記各号の禁止行為を援助又は助長する行為をしないこと'},
      {type:'num', n:'１２', text:'その他当社が不適当と合理的に判断する行為をしないこと'},
    ]
  },
  {
    num:'第８条', title:'（本サービスの中断・変更・終了）',
    items:[
      {type:'num', n:'１', text:'当社は、以下の場合、本サービスの提供を中断することができます。'},
      {type:'enum', n:'⑴', text:'本サービスの提供に必要な設備の保守点検、工事などを定期的に、又は緊急に行う場合'},
      {type:'enum', n:'⑵', text:'本サービスの提供に用いる設備に障害、故障などが生じた場合'},
      {type:'enum', n:'⑶', text:'国、地方自治体その他の公的機関から当社に対して本サービスの提供を中断するよう要請があった場合'},
      {type:'enum', n:'⑷', text:'停電、火災、地震、労働争議その他不可抗力により本サービスの提供が困難な場合'},
      {type:'enum', n:'⑸', text:'運用上又は技術上の理由から本サービスの提供を中断する必要がある場合'},
      {type:'num', n:'２', text:'当社は、以下の各号のいずれかに該当する場合に、本サービスの内容を変更することができます。'},
      {type:'enum', n:'⑴', text:'本サービスの機能追加、改善等、本サービスの内容の変更が登録薬剤師等の一般の利益に適合するとき'},
      {type:'enum', n:'⑵', text:'前号に該当しない場合において、本サービスの内容の変更の必要性、変更後の内容の相当性、その他の変更に係る事情に照らして合理性があるとき'},
      {type:'num', n:'３', text:'当社は、登録薬剤師等に事前に周知した上で、本サービスの提供を終了することができます。'},
      {type:'num', n:'４', text:'本条１項及び２項の本サービスの中断・変更により登録薬剤師等に損害が生じても、当社は一切責任を負いません。'},
    ]
  },
  {
    num:'第９条', title:'（免責事項）',
    items:[
      {type:'num', n:'１', text:'当社は、本サービスにおける提供情報の正確性等について保証せず、利用により生じた損害について一切責任を負いません。'},
      {type:'num', n:'２', text:'一般利用者と登録薬剤師等との間で生じた一切のトラブル、損害、紛争について、当社は関与せず、責任を負いません。'},
      {type:'num', n:'３', text:'本サービスに掲載された情報等の正確性、完全性、有用性、特定目的への適合性等について、当社はいかなる保証も行いません。'},
      {type:'num', n:'４', text:'当社は、本規約に別途規定する場合を除き、(i)セキュリティなどに関する欠陥、エラーやバグその他不具合がないこと、(ii)本サービスの安全性、信頼性、正確性、完全性、有効性及び特定の目的への適合性並びに(iii)本サービスが第三者の権利を侵害していないことを明示的にも黙示的にも保証しません。'},
    ]
  },
  {
    num:'第１０条', title:'（登録薬剤師等の責任等）',
    items:[
      {type:'num', n:'１', text:'登録薬剤師等は、自らの責任において本サービスを利用するものとします。'},
      {type:'num', n:'２', text:'登録薬局は、所属する薬剤師の本サービスにおける行動について、必要かつ合理的な管理を行うものとします。'},
      {type:'num', n:'３', text:'登録薬剤師等は、登録薬剤師等の故意又は過失により当社が直接的又は間接的に何らかの損害（弁護士費用の負担を含みます。）を被った場合、当社の請求に従って直ちにこれを補償しなければなりません。'},
      {type:'num', n:'４', text:'オンライン服薬指導による服薬指導、オンライン相談又は薬の配送に関連して生じた問合せ、苦情、請求、紛争等について、登録薬剤師等は、自らの責任でこれを解決するものとします。当社は、自らの責めに帰すべき事由によるものを除き、これらの苦情等の解決に関与する義務を負いません。'},
    ]
  },
  {
    num:'第１１条', title:'（当社の責任）',
    items:[
      {type:'num', n:'１', text:'当社は、登録薬剤師等が本サービスの利用に関して被った損害について賠償の責任を負い、かつ、当該賠償額の上限はシステム利用料の１年分に相当する額とします。ただし、当社の責めに帰することができない事由によるものであるときは、この限りではありません。'},
      {type:'num', n:'２', text:'前項の定めにかかわらず、当社は、自らの故意又は重過失によらずして登録薬剤師等に損害が生じた場合、通常生ずべき損害のみ賠償する責任を負い、逸失利益、データの消失その他の特別の事情によって生じた損害を賠償する責任を負いません。'},
    ]
  },
  {
    num:'第１２条', title:'（著作権及び知的財産権）',
    items:[
      {type:'num', n:'１', text:'本サービス内のすべてのデータ、文章、画像、ソフトウェア等に関する著作権は当社に帰属します。'},
      {type:'num', n:'２', text:'登録薬剤師等は、当社の事前許可なく、これらの著作物を私的利用の範囲を超えて複製、公衆送信、頒布、出版などを行ってはなりません。'},
      {type:'num', n:'３', text:'本サービスに関する知的財産権は当社に帰属し、無断使用を禁じます。'},
    ]
  },
  {
    num:'第１３条', title:'（システム利用料と支払義務）',
    items:[
      {type:'num', n:'１', text:'登録薬局は、当社との契約に基づき、月額利用料を支払うものとします。'},
      {type:'num', n:'２', text:'支払期日、支払方法、延滞時の措置については別途契約書又は当社が定める条件に従うものとします。'},
    ]
  },
  {
    num:'第１４条', title:'（規約の変更）',
    items:[
      {type:'num', n:'１', text:'当社は、次の各号のいずれかに該当する場合、登録薬剤師等の承諾を得ることなく本規約を変更又は新たな内容を追加することができるものとします。'},
      {type:'enum', n:'⑴', text:'変更が登録薬剤師等の一般の利益に適合するとき。'},
      {type:'enum', n:'⑵', text:'変更が契約の目的に反せず、変更の必要性、内容の相当性等に照らして合理的であるとき。'},
      {type:'num', n:'２', text:'本規約の変更内容は、効力発生日の１０日前までに当社ホームページにて表示するものとします。'},
    ]
  },
  {
    num:'第１５条', title:'（通知義務）',
    items:[
      {type:'p', text:'登録薬局は、次の各号に定める事項を行う場合、事前に書面をもって当社に通知するものとします。'},
      {type:'enum', n:'⑴', text:'合併、会社分割、株式交換、株式移転等の組織に関する重大な変更'},
      {type:'enum', n:'⑵', text:'事業の全部又は一部の譲渡'},
      {type:'enum', n:'⑶', text:'株主を全議決権の３分の１を超えて変動させる等、支配権に実質的な変動を生じさせる行為'},
      {type:'enum', n:'⑷', text:'本店所在地、商号、代表者等の変更'},
      {type:'enum', n:'⑸', text:'登録薬剤師の薬剤師免許に停止・取消等が発生した場合'},
    ]
  },
];

function PageTermsUser() {
  return (
    <TermsLayout
      title="ヒトヤク利用規約"
      subtitle="一般利用者の方向けの利用規約です。弁護士確認済み。"
      articles={TERMS_USER_ARTICLES}
      otherTerms={{
        label:'登録薬剤師等利用規約',
        desc:'薬剤師・薬局として登録いただく方向けの規約はこちらからご確認いただけます。',
        go:'terms-pharma',
      }}
    />
  );
}

function PageTermsPharma() {
  return (
    <TermsLayout
      title="登録薬剤師等利用規約"
      subtitle="薬剤師・薬局として登録いただく方向けの利用規約です。弁護士確認済み。"
      articles={TERMS_PHARMA_ARTICLES}
      otherTerms={{
        label:'ヒトヤク利用規約',
        desc:'一般利用者の方向けの規約はこちらからご確認いただけます。',
        go:'terms',
      }}
    />
  );
}

// ── プライバシーポリシー ──────────────────────────────────────

const PRIVACY_ARTICLES = [
  {
    num:'第１条', title:'（基本方針）',
    items:[
      {type:'p', text:'ＳＡＳＡＥＲＵ合同会社（以下「当社」といいます。）は、本サービス「ヒトヤク」の運営において取得する個人情報を、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）その他関連法令・ガイドラインを遵守し、適切かつ安全に取り扱うことをお約束します。'},
      {type:'p', text:'当社は、個人情報をみだりに収集・利用せず、利用者のプライバシーを尊重した運営を行います。'},
    ]
  },
  {
    num:'第２条', title:'（事業者情報）',
    items:[
      {type:'p', text:'本ポリシーにおける個人情報の管理責任者は以下のとおりです。'},
      {type:'num', n:'名称', text:'ＳＡＳＡＥＲＵ合同会社'},
      {type:'num', n:'代表者', text:'植松 勇樹'},
      {type:'num', n:'所在地', text:'京都府京都市山科区小野御所ノ内町５−１'},
      {type:'num', n:'連絡先', text:'info@hito-yaku.com'},
    ]
  },
  {
    num:'第３条', title:'（取得する個人情報）',
    items:[
      {type:'p', text:'当社は、本サービスの提供にあたり、以下の個人情報を取得します。'},
      {type:'num', n:'１', text:'相談フォームを通じて取得する情報'},
      {type:'enum', n:'⑴', text:'お名前（ニックネーム可）'},
      {type:'enum', n:'⑵', text:'メールアドレスまたは連絡先'},
      {type:'enum', n:'⑶', text:'相談内容（健康状態・服薬状況・受診履歴等を含む場合があります）'},
      {type:'enum', n:'⑷', text:'相談を希望する薬剤師の指定情報'},
      {type:'num', n:'２', text:'薬剤師・薬局登録フォームを通じて取得する情報'},
      {type:'enum', n:'⑴', text:'氏名、所属薬局名、所在地'},
      {type:'enum', n:'⑵', text:'薬剤師免許番号その他の資格情報'},
      {type:'enum', n:'⑶', text:'専門分野、対応可能言語、経歴・自己紹介'},
      {type:'enum', n:'⑷', text:'連絡先（メールアドレス、電話番号）'},
      {type:'num', n:'３', text:'法人お問い合わせフォームを通じて取得する情報'},
      {type:'enum', n:'⑴', text:'会社名・部署名、担当者氏名'},
      {type:'enum', n:'⑵', text:'メールアドレス、電話番号'},
      {type:'enum', n:'⑶', text:'お問い合わせ内容'},
      {type:'num', n:'４', text:'サービス利用時に自動的に取得する情報'},
      {type:'enum', n:'⑴', text:'IPアドレス、ブラウザ種別・バージョン'},
      {type:'enum', n:'⑵', text:'アクセス日時、参照元URL'},
      {type:'enum', n:'⑶', text:'Cookie情報（詳細は第９条をご参照ください）'},
    ]
  },
  {
    num:'第４条', title:'（個人情報の利用目的）',
    items:[
      {type:'p', text:'当社は、取得した個人情報を以下の目的のために利用します。'},
      {type:'num', n:'１', text:'本サービス（薬剤師とのマッチング・オンライン相談・オンライン服薬指導）の提供・運営'},
      {type:'num', n:'２', text:'利用者への相談受付の確認・回答・進捗のご連絡'},
      {type:'num', n:'３', text:'薬剤師・薬局の登録審査・プロフィール掲載'},
      {type:'num', n:'４', text:'本サービスに関する重要なお知らせ（規約変更・サービス停止等）の通知'},
      {type:'num', n:'５', text:'利用者からのお問い合わせへの対応'},
      {type:'num', n:'６', text:'本サービスの品質向上・不正利用防止・安全管理のための統計的分析'},
      {type:'num', n:'７', text:'法令上の義務（行政機関・司法機関からの適法な要請への対応を含む）の履行'},
      {type:'p', text:'当社は、上記の利用目的を超えて個人情報を利用する場合は、あらかじめご本人の同意を取得します。'},
    ]
  },
  {
    num:'第５条', title:'（個人情報の安全管理）',
    items:[
      {type:'num', n:'１', text:'当社は、取得した個人情報への不正アクセス、紛失、破壊、改ざん、漏えい等を防止するため、合理的な安全管理措置を講じます。'},
      {type:'num', n:'２', text:'個人情報を取り扱う従業者・業務委託先に対し、個人情報の適正な取扱いについて必要かつ適切な監督を行います。'},
      {type:'num', n:'３', text:'当社はSSL/TLSによる通信の暗号化を実施しています。ただし、インターネット上の通信には完全なセキュリティを保証できない場合があることをご了承ください。'},
    ]
  },
  {
    num:'第６条', title:'（第三者への提供）',
    items:[
      {type:'num', n:'１', text:'当社は、以下の場合を除き、ご本人の同意なく個人情報を第三者に提供しません。'},
      {type:'enum', n:'⑴', text:'法令に基づく場合（裁判所・警察・行政機関等からの適法な照会・命令への対応）'},
      {type:'enum', n:'⑵', text:'人の生命・身体・財産の保護のために必要であり、ご本人の同意取得が困難な場合'},
      {type:'enum', n:'⑶', text:'公衆衛生の向上または児童の健全な育成のために特に必要であり、ご本人の同意取得が困難な場合'},
      {type:'enum', n:'⑷', text:'国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合'},
      {type:'num', n:'２', text:'当社は、本サービスを通じてマッチングが成立した薬剤師・薬局に対し、相談対応に必要な範囲でご相談者の情報を開示する場合があります。その場合、開示前にご本人の同意を取得します。'},
    ]
  },
  {
    num:'第７条', title:'（個人情報の取扱いの委託）',
    items:[
      {type:'num', n:'１', text:'当社は、利用目的の達成に必要な範囲において、個人情報の取扱いを第三者に委託する場合があります。'},
      {type:'num', n:'２', text:'委託先として、以下のサービスを利用しています。'},
      {type:'enum', n:'⑴', text:'Web3Forms（フォーム送信処理サービス）：当社への問い合わせ・相談内容の送信処理に利用します。送信されたデータは当社のメールアドレスへ転送され、Web3Formsのサーバーには一定期間保持される場合があります。'},
      {type:'enum', n:'⑵', text:'Google LLC（Google Analytics）：アクセス解析のために利用します。詳細は第９条をご参照ください。'},
      {type:'num', n:'３', text:'当社は、委託先に対し個人情報保護法に基づく適切な監督を行い、個人情報の安全管理に努めます。'},
    ]
  },
  {
    num:'第８条', title:'（要配慮個人情報の取扱い）',
    items:[
      {type:'num', n:'１', text:'本サービスへのご相談内容には、健康状態、既往症、服用中の医薬品、受診履歴等、個人情報保護法第２条第３項に定める要配慮個人情報が含まれる場合があります。'},
      {type:'num', n:'２', text:'当社は、要配慮個人情報を、相談フォームへの入力・送信をもってご本人の同意を得た上で取得し、本サービスの提供（担当薬剤師への相談内容の連携を含む）にのみ利用します。'},
      {type:'num', n:'３', text:'要配慮個人情報は、第６条の場合を除き、ご本人の同意なく第三者に提供しません。'},
    ]
  },
  {
    num:'第９条', title:'（Cookie及びアクセス解析ツールの利用）',
    items:[
      {type:'num', n:'１', text:'当社は、Google LLC が提供する Google Analytics（GA4）を利用してアクセス状況を解析しています。Google Analytics は、Cookieを使用して、氏名・メールアドレス等の個人を特定できる情報を含まない形で、ページの閲覧数・滞在時間・流入元等の統計情報を収集します。'},
      {type:'num', n:'２', text:'Google Analytics によって収集されたデータは、Google のプライバシーポリシーに従って管理されます。詳細はGoogleのウェブサイトをご確認ください。'},
      {type:'num', n:'３', text:'Google Analytics によるデータ収集を無効にするには、Google が提供する「Google アナリティクス オプトアウト アドオン」をご利用ください。'},
      {type:'num', n:'４', text:'当社は、Google Analytics 以外に、サービス改善を目的としてアクセスログ（IPアドレス、アクセス日時、参照元URL等）を一定期間保存します。これらの情報は、単独では個人を特定するものではありませんが、他の情報と組み合わせることで個人を特定できる場合があります。'},
    ]
  },
  {
    num:'第１０条', title:'（個人情報の開示・訂正・削除等の請求）',
    items:[
      {type:'num', n:'１', text:'ご本人は、当社が保有するご自身の個人情報について、個人情報保護法の定めに従い、開示・訂正・追加・削除・利用停止・消去・第三者提供の停止を請求することができます。'},
      {type:'num', n:'２', text:'請求は、第１２条に定める問い合わせ窓口にメールまたは書面にてご連絡ください。ご本人確認のため、氏名・メールアドレス等の情報をお知らせいただく場合があります。'},
      {type:'num', n:'３', text:'当社は、請求を受けた場合、合理的な期間内（原則として受付から２週間以内）に対応します。ただし、法令上保存が義務付けられている情報や業務遂行上必要な情報については、削除等のご要望に応じられない場合があります。'},
      {type:'num', n:'４', text:'開示等の請求に対しては、手数料は発生しません。'},
    ]
  },
  {
    num:'第１１条', title:'（本ポリシーの改定）',
    items:[
      {type:'num', n:'１', text:'当社は、法令の改正、サービス内容の変更その他必要に応じ、本ポリシーを改定することがあります。'},
      {type:'num', n:'２', text:'重要な変更を行う場合は、本ウェブサイト上で事前にお知らせします。改定後のポリシーは、当社ウェブサイトへの掲載をもって効力を生じるものとします。'},
      {type:'num', n:'３', text:'改定後に本サービスをご利用いただいた場合、改定後のポリシーに同意したものとみなします。'},
    ]
  },
  {
    num:'第１２条', title:'（お問い合わせ窓口）',
    items:[
      {type:'p', text:'個人情報の取扱いに関するご意見・ご質問・苦情・開示等の請求については、以下の窓口までお問い合わせください。'},
      {type:'num', n:'名称', text:'ＳＡＳＡＥＲＵ合同会社　個人情報問い合わせ窓口'},
      {type:'num', n:'担当', text:'代表　植松 勇樹'},
      {type:'num', n:'メール', text:'info@hito-yaku.com'},
      {type:'num', n:'所在地', text:'京都府京都市山科区小野御所ノ内町５−１'},
      {type:'p', text:'受付時間：平日 10:00〜18:00（土日祝・年末年始を除く）'},
    ]
  },
];

function PagePrivacy() {
  return (
    <TermsLayout
      title="プライバシーポリシー"
      subtitle="個人情報の取扱いについて定めた方針です。"
      articles={PRIVACY_ARTICLES}
    />
  );
}

// ── 特定商取引法に基づく表記 ────────────────────────────────

function PageTokutei() {
  const isMobile = useIsMobile();
  const rows = [
    { label:'販売業者',           value:'ＳＡＳＡＥＲＵ合同会社' },
    { label:'代表者',             value:'植松 勇樹' },
    { label:'所在地',             value:'京都府京都市山科区小野御所ノ内町５−１' },
    { label:'お問い合わせ',       value:'info@hito-yaku.com\nメールにてお問い合わせください。お問い合わせへの返答は原則として平日10:00〜18:00に行います。' },
    { label:'サービス名',         value:'ヒトヤク（オンライン服薬指導・薬剤師相談サービス）' },
    { label:'料金',               value:'・一般利用者：現在無料（将来有料化予定。変更の際は事前にサイト上でお知らせします）\n・薬局法人・法人のお客様：別途お問い合わせください' },
    { label:'支払方法',           value:'別途お問い合わせください' },
    { label:'支払時期',           value:'別途お問い合わせください' },
    { label:'サービス提供時期',   value:'ご登録・審査完了後、速やかにご利用いただけます' },
    { label:'キャンセル・解約',   value:'別途お問い合わせください' },
    { label:'動作環境',           value:'インターネット接続環境が必要です。最新版のWebブラウザ（Chrome・Safari・Firefox・Edge等）を推奨します' },
    { label:'特記事項',           value:'本サービスは健康・服薬相談サービスです。医療行為の提供ではなく、医師の診断・治療に代わるものではありません' },
  ];
  return (
    <div style={{background:'var(--bg-base)'}}>
      <SiteHeader/>
      <TermsBreadcrumb title="特定商取引法に基づく表記"/>

      <section style={{background:'var(--brand-wash)', padding: isMobile ? '36px 0' : '64px 0'}}>
        <div className="container">
          {!isMobile && (
            <div style={{fontSize:12, letterSpacing:'.2em', color:'var(--brand-deep)', fontWeight:600, marginBottom:14}}>
              — SPECIFIED COMMERCIAL TRANSACTIONS ACT
            </div>
          )}
          <h1 style={{
            fontFamily:'var(--font-serif)', fontWeight:600,
            fontSize: isMobile ? '22px' : 'clamp(26px, 3vw, 40px)',
            lineHeight:1.4, margin:'0 0 12px', color:'var(--ink-1)',
          }}>特定商取引法に基づく表記</h1>
          <p style={{fontSize:13, color:'var(--ink-3)', margin:0}}>
            特定商取引に関する法律第11条に基づく表示です。
          </p>
        </div>
      </section>

      <section style={{padding: isMobile ? '40px 0 80px' : '72px 0 100px'}}>
        <div className="container">
          <div style={{maxWidth: isMobile ? '100%' : 860, margin:'0 auto'}}>
            <table style={{
              width:'100%', borderCollapse:'collapse',
              fontSize:15, lineHeight:1.9,
            }}>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} style={{borderBottom:'1px solid var(--line-soft)'}}>
                    <th style={{
                      width: isMobile ? '7em' : '12em',
                      padding: isMobile ? '16px 12px 16px 0' : '20px 24px 20px 0',
                      verticalAlign:'top', textAlign:'left',
                      fontSize:13, fontWeight:600, color:'var(--ink-3)',
                      whiteSpace:'nowrap', flexShrink:0,
                    }}>{row.label}</th>
                    <td style={{
                      padding: isMobile ? '16px 0' : '20px 0',
                      color:'var(--ink-1)', verticalAlign:'top',
                    }}>
                      {row.value.split('\n').map((line, j) => (
                        <React.Fragment key={j}>
                          {j > 0 && <br/>}
                          {line}
                        </React.Fragment>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{
              marginTop:48, background:'var(--brand-wash)',
              borderRadius:'var(--r-16)', padding: isMobile ? '20px' : '24px 32px',
              fontSize:13, color:'var(--ink-2)', lineHeight:1.9,
            }}>
              料金・支払・解約条件の詳細については、下記よりお問い合わせください。
              <div style={{marginTop:12}}>
                <Button size="sm" variant="deep" onClick={()=>window.HY_NAV?.('consult')}>
                  お問い合わせはこちら
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter/>
    </div>
  );
}

Object.assign(window, { PageTermsUser, PageTermsPharma, PagePrivacy, PageTokutei });
