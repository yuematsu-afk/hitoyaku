// ヒトヤク — Implementation notes for Claude Code handoff

function ArtboardNotes() {
  return (
    <div style={{width:'100%',minHeight:'100%',padding:'56px 64px',background:'var(--bg-base)',fontFamily:'var(--font-sans)',color:'var(--ink-1)'}}>
      <header style={{marginBottom:48,maxWidth:880}}>
        <div style={{fontSize:12,letterSpacing:'.2em',color:'var(--brand-deep)',fontWeight:600,marginBottom:14}}>— IMPLEMENTATION NOTES</div>
        <h1 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:44,lineHeight:1.4,margin:0}}>
          Claude Code 実装メモ
        </h1>
        <p style={{marginTop:18,fontSize:15,color:'var(--ink-2)',lineHeight:1.95}}>
          Next.js (App Router) + TypeScript + Tailwind CSS での実装を想定。コンポーネント名・データモデル・ファイル構成を整理しました。
        </p>
      </header>

      <NoteSection title="Tech Stack">
        <ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'8px 32px',fontSize:14,color:'var(--ink-1)'}}>
          <li>• Next.js 14+ (App Router)</li>
          <li>• TypeScript</li>
          <li>• Tailwind CSS (tokens.css を CSS variables として読み込み)</li>
          <li>• React Hook Form + Zod (フォームバリデーション)</li>
          <li>• Headless UI / Radix (Accordion, Select)</li>
          <li>• MDX or CMS (薬剤師プロフィール)</li>
          <li>• next/image (画像最適化)</li>
          <li>• next/font (Noto Sans JP / Noto Serif JP)</li>
        </ul>
      </NoteSection>

      <NoteSection title="Recommended file structure">
        <pre style={mono}>
{`app/
├─ layout.tsx                # SiteHeader / SiteFooter / metadata
├─ page.tsx                  # トップ
├─ pharmacists/
│  ├─ page.tsx               # 一覧 (filter は client component)
│  └─ [id]/page.tsx          # 詳細
├─ consult/page.tsx          # 相談フォーム
├─ corporate/page.tsx        # 法人向け
├─ pharmacist-join/page.tsx  # 薬剤師参加
├─ faq/page.tsx
└─ contact/page.tsx

components/
├─ ui/                       # Button, Tag, Field, Input...
├─ layout/                   # Header, Footer, Breadcrumb, MobileBottomCTA
├─ marketing/                # Hero, FeatureCards, FlowSteps, EntryCard
├─ pharmacist/               # PharmacistCard, FilterPanel, PharmacistHero
├─ form/                     # ConsultationForm, CorporateForm, JoinForm
└─ shared/                   # FAQ, Disclaimer, SectionHead

lib/
├─ pharmacists.ts            # data fetch / types
├─ types.ts                  # Pharmacist, ConsultCategory...
└─ form-schemas.ts           # zod schemas

styles/
├─ tokens.css                # CSS variables (this design)
└─ globals.css
`}
        </pre>
      </NoteSection>

      <NoteSection title="Pharmacist data model (TypeScript)">
        <pre style={mono}>
{`type PharmacistStatus = 'online' | 'busy' | 'off';

type Pharmacist = {
  id: string;
  name: string;
  nameKana: string;
  photo: string;            // URL or null → placeholder
  title: string;            // 肩書・資格
  pharmacyName: string;
  location: string;         // "東京都・港区"
  specialties: SpecialtyId[];
  consultationCategories: ConsultCategoryId[];
  languages: string[];      // ["日本語", "English"]
  onlineAvailable: boolean;
  inPersonAvailable: boolean;
  shortMessage: string;     // ≤60文字 — カード/Heroで表示
  profile: string;          // 自己紹介本文
  career: string[];         // ["YYYY 〜"]
  consultationStyle: string;
  availableMethods: ('LINE'|'オンライン面談'|'店舗相談'|'メール'|'電話')[];
  tags: string[];           // 検索用追加タグ
  yearsOfExperience: number;
  status: PharmacistStatus;
  contactButtonLabel?: string; // 任意カスタム
};`}
        </pre>
      </NoteSection>

      <NoteSection title="Components inventory">
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          <ComponentList title="共通" items={['Header','GlobalNav','MobileMenu','MobileBottomCTA','Footer','Breadcrumb','SectionHead','Button','Tag','StatusDot','FAQAccordion','Disclaimer','Field','Input','Textarea','Select','Checkbox','Radio']}/>
          <ComponentList title="マーケティング" items={['HeroSection','ProblemCards','FeatureCards','PickIllustration','HowItWorksSteps','TrustStats','EntryCard','FinalCTA','DualEntrySection']}/>
          <ComponentList title="薬剤師" items={['PharmacistCard (large/medium/row/compact)','PharmacistList','PharmacistFilter','PharmacistProfileHero','SpecialtyTags','ConsultationCategoryCards','PharmacistMessageBox','RelatedPharmacists','ConsultationCTA']}/>
          <ComponentList title="フォーム" items={['UserConsultationForm','CorporateInquiryForm','PharmacistJoinForm','ContactForm','ConsentCheckbox','MedicalDisclaimerBox']}/>
          <ComponentList title="法人向け" items={['CorpHero','CorpProblemCards','CorpMerits','UseCaseCards','CorpFlow','CorpForm']}/>
          <ComponentList title="薬剤師向け" items={['PharmaHero','JoinBenefits','ProfilePreview','JoinFlow','JoinForm']}/>
        </div>
      </NoteSection>

      <NoteSection title="Responsive breakpoints">
        <div style={{display:'flex',gap:14}}>
          {[{l:'Mobile',v:'– 640px'},{l:'Tablet',v:'641 – 1024px'},{l:'Desktop',v:'1025 – 1440px'},{l:'Wide',v:'1441px –'}].map(b=>(
            <div key={b.l} style={{flex:1,background:'#fff',border:'1px solid var(--line-soft)',borderRadius:'var(--r-12)',padding:'18px 20px'}}>
              <div style={{fontSize:13,fontWeight:600,color:'var(--ink-1)'}}>{b.l}</div>
              <div style={{fontSize:12,color:'var(--ink-3)',fontFamily:'var(--font-mono)',marginTop:4}}>{b.v}</div>
            </div>
          ))}
        </div>
        <ul style={{marginTop:20,padding:0,listStyle:'none',display:'flex',flexDirection:'column',gap:8,fontSize:13,color:'var(--ink-2)',lineHeight:1.85}}>
          <li>• Mobile: シングルカラム / Hero は写真上→テキスト下 / 画面下部に sticky CTA(薬剤師を探す + 相談する)</li>
          <li>• Tablet: 2カラム / フィルターはトップに collapse 表示</li>
          <li>• Desktop: 上記デザインのまま (1200px container)</li>
          <li>• ヒーロー見出しは clamp() で滑らかに縮小</li>
        </ul>
      </NoteSection>

      <NoteSection title="Accessibility checklist">
        <ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'10px 24px',fontSize:13,color:'var(--ink-2)',lineHeight:1.85}}>
          <li>✓ 全テキスト・ボタンは WCAG AA 以上のコントラスト</li>
          <li>✓ フォーカスリング (shadow-focus) を全 interactive 要素に</li>
          <li>✓ ボタン・リンクは最低 44×44px のタップ領域</li>
          <li>✓ aria-label / aria-expanded を Accordion / Menu に</li>
          <li>✓ フォームは label + required + aria-describedby (hint/error)</li>
          <li>✓ skip-to-main-content リンクを Header 先頭に</li>
          <li>✓ 装飾 SVG には aria-hidden="true"</li>
          <li>✓ prefers-reduced-motion で fade-up を抑制</li>
        </ul>
      </NoteSection>

      <NoteSection title="SEO & 医療表現の配慮">
        <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10,fontSize:13,color:'var(--ink-2)',lineHeight:1.85}}>
          <li>• 見出しは h1→h2→h3 の順序を厳格に守る (ページごとに h1 は1つ)</li>
          <li>• 薬剤師詳細ページは構造化データ (Person, MedicalOrganization, healthcare-related schema) を追加</li>
          <li>• メタ description は「薬剤師を選んで気軽に相談」を軸に、各ページで個別記述</li>
          <li>• 「完治」「治療できる」「必ず改善」「診断」等は使用禁止。<br/>　 → ESLint/Stylelint 風のテキストチェックを CI に組み込み推奨</li>
          <li>• Disclaimer は全 CTA セクション直前 or 直後に配置</li>
        </ul>
      </NoteSection>

      <NoteSection title="Open questions / 次のアクション">
        <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10,fontSize:13,color:'var(--ink-2)',lineHeight:1.85}}>
          <li>① 薬剤師写真の撮影トーン (背景色・服装・表情) を決定</li>
          <li>② 相談料の料金体系を確定 (無料/有料/サブスク?)</li>
          <li>③ LINE 連携の技術仕様確定 (公式アカウント?個別チャット?)</li>
          <li>④ 薬剤師管理画面 (受付状況の切替・相談一覧) を別アプリで設計</li>
          <li>⑤ 法人向け管理ダッシュボード設計</li>
          <li>⑥ 薬機法・薬剤師法を確認のうえコピーを最終確定 (法務レビュー)</li>
        </ul>
      </NoteSection>
    </div>
  );
}

const mono = {
  fontFamily:'var(--font-mono)', fontSize:12, lineHeight:1.7,
  background:'#1F2A24', color:'#E6EFE8',
  padding:'24px 28px', borderRadius:'var(--r-16)',
  overflow:'auto', margin:0,
};

function NoteSection({title, children}) {
  return (
    <section style={{marginBottom:48}}>
      <h2 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:22,color:'var(--ink-1)',margin:'0 0 18px',paddingBottom:12,borderBottom:'1px solid var(--line-soft)'}}>{title}</h2>
      {children}
    </section>
  );
}

function ComponentList({title, items}) {
  return (
    <div style={{background:'#fff',border:'1px solid var(--line-soft)',borderRadius:'var(--r-16)',padding:'20px 24px'}}>
      <div style={{fontSize:12,fontWeight:600,color:'var(--brand-deep)',marginBottom:12,letterSpacing:'.1em'}}>{title.toUpperCase()}</div>
      <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:6,fontSize:13,color:'var(--ink-2)'}}>
        {items.map(i=> <li key={i} style={{lineHeight:1.6}}>• {i}</li>)}
      </ul>
    </div>
  );
}

Object.assign(window, { ArtboardNotes });
