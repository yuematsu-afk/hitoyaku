// ヒトヤク — Shared UI Components
// Header, Footer, Button, Tag, FAQ, Form inputs, Pharmacist photo placeholder
// All consume design tokens from tokens.css

const { useState, useEffect, useRef, useMemo } = React;

// ─── Wordmark ────────────────────────────────────────────────
function Wordmark({ size = 22, color, sub = true }) {
  return (
    <a href="#top" onClick={(e)=>{e.preventDefault(); window.HY_NAV?.('top');}}
       style={{display:'inline-flex',alignItems:'baseline',gap:8,textDecoration:'none'}}>
      <span style={{
        fontFamily:'var(--font-serif)', fontWeight:600,
        fontSize:size, color: color || 'var(--ink-1)',
        letterSpacing:'.08em',
      }}>ヒトヤク</span>
      {sub && (
        <span style={{fontSize:10, color:'var(--ink-3)', letterSpacing:'.18em'}}>
          HITOYAKU
        </span>
      )}
    </a>
  );
}

// ─── Button ──────────────────────────────────────────────────
function Button({ variant='primary', size='md', icon, iconRight, children, onClick, href, fullWidth, ...rest }) {
  const base = {
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
    fontFamily:'inherit', fontWeight:500, border:'1px solid transparent',
    cursor:'pointer', transition:'background .18s, color .18s, border-color .18s, box-shadow .18s, transform .12s',
    textDecoration:'none', whiteSpace:'nowrap', width: fullWidth ? '100%' : undefined,
    lineHeight: 1,
  };
  const sizes = {
    sm: { padding:'10px 16px', fontSize:13, borderRadius:'var(--r-pill)' },
    md: { padding:'14px 24px', fontSize:15, borderRadius:'var(--r-pill)' },
    lg: { padding:'18px 32px', fontSize:16, borderRadius:'var(--r-pill)' },
  };
  const variants = {
    primary:  { background:'var(--brand)', color:'#fff', borderColor:'var(--brand)' },
    deep:     { background:'var(--brand-deep)', color:'#fff', borderColor:'var(--brand-deep)' },
    ghost:    { background:'transparent', color:'var(--ink-1)', borderColor:'var(--line-strong)' },
    soft:     { background:'var(--brand-wash)', color:'var(--brand-deep)', borderColor:'transparent' },
    accent:   { background:'var(--accent-warm)', color:'#fff', borderColor:'var(--accent-warm)' },
    link:     { background:'transparent', color:'var(--brand-deep)', borderColor:'transparent', padding: 0 },
  };
  const style = { ...base, ...sizes[size], ...variants[variant] };
  const El = href ? 'a' : 'button';
  return (
    <El href={href} onClick={onClick} style={style}
        onMouseEnter={(e)=>{ if (variant==='primary'||variant==='deep') e.currentTarget.style.background='var(--brand-deep)';
                             if (variant==='ghost') e.currentTarget.style.background='var(--bg-soft)';
                             if (variant==='accent') e.currentTarget.style.filter='brightness(.95)';
                             e.currentTarget.style.transform='translateY(-1px)';
                           }}
        onMouseLeave={(e)=>{ e.currentTarget.style.background = variants[variant].background;
                             e.currentTarget.style.filter='';
                             e.currentTarget.style.transform=''; }}
        {...rest}>
      {icon}
      <span>{children}</span>
      {iconRight}
    </El>
  );
}

// Tiny inline icons (stroke style, hand-rolled)
const Ico = {
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  search: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  filter: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  chat: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  line: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 11c0-4.4 4-8 9-8s9 3.6 9 8c0 2.7-1.5 5.1-3.9 6.7L17 22l-4.6-2.6c-.5.1-1 .1-1.4.1-5 0-9-3.6-9-8.5Z" stroke="currentColor" strokeWidth="1.6"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m5 12 5 5 9-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  plus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  globe: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" stroke="currentColor" strokeWidth="1.4"/></svg>,
  pin: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>,
  online: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 21h8M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  shop: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 9h18l-1 11H4L3 9Z" stroke="currentColor" strokeWidth="1.6"/><path d="M8 9V6a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6"/></svg>,
};

// ─── Tag / Pill ──────────────────────────────────────────────
function Tag({ children, tone='neutral', size='md', icon }) {
  const tones = {
    neutral: { bg:'var(--bg-soft)', fg:'var(--ink-2)', bd:'var(--line-soft)' },
    brand:   { bg:'var(--brand-wash)', fg:'var(--brand-deep)', bd:'transparent' },
    warm:    { bg:'var(--accent-warm-soft)', fg:'#8B5A2B', bd:'transparent' },
    outline: { bg:'transparent', fg:'var(--ink-2)', bd:'var(--line-mid)' },
    online:  { bg:'#EAF6EF', fg:'#2F7A52', bd:'transparent' },
    busy:    { bg:'#FBEFE0', fg:'#A05C2B', bd:'transparent' },
    off:     { bg:'#F1EFEA', fg:'var(--ink-3)', bd:'transparent' },
  };
  const t = tones[tone] || tones.neutral;
  const sizes = {
    sm: { fontSize:11, padding:'3px 8px' },
    md: { fontSize:12, padding:'5px 10px' },
    lg: { fontSize:13, padding:'7px 14px' },
  };
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:4,
      background: t.bg, color: t.fg, border:`1px solid ${t.bd}`,
      borderRadius:'var(--r-pill)', fontWeight:500, ...sizes[size],
    }}>{icon}{children}</span>
  );
}

// ─── Status dot ──────────────────────────────────────────────
function StatusDot({ status }) {
  const map = {
    online: { c:'var(--status-online)', label:'相談受付中' },
    busy:   { c:'var(--status-busy)',   label:'返信に時間がかかる場合あり' },
    off:    { c:'var(--status-off)',    label:'現在受付停止中' },
  };
  const m = map[status] || map.off;
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:12,color:'var(--ink-2)'}}>
      <span style={{width:8,height:8,borderRadius:'50%',background:m.c,boxShadow:status==='online'?`0 0 0 3px ${m.c}33`:'none'}}/>
      {m.label}
    </span>
  );
}

// ─── Section header (eyebrow + title + lede) ────────────────
function SectionHead({ eyebrow, title, lede, align='left', titleAs='h2' }) {
  const TitleEl = titleAs;
  return (
    <header style={{textAlign:align, maxWidth: align==='center'?720:'none', margin: align==='center'?'0 auto':'0'}}>
      {eyebrow && (
        <div style={{
          fontSize:12, letterSpacing:'.2em', color:'var(--brand-deep)',
          fontWeight:600, marginBottom:16,
        }}>— {eyebrow}</div>
      )}
      <TitleEl style={{
        fontFamily:'var(--font-serif)', fontWeight:600,
        fontSize:'clamp(28px, 3.4vw, 44px)', lineHeight:1.35,
        letterSpacing:'.01em', margin:'0 0 18px',
        color:'var(--ink-1)',
      }}>{title}</TitleEl>
      {lede && (
        <p style={{fontSize:16, lineHeight:1.9, color:'var(--ink-2)', margin:0, maxWidth: 640}}>
          {lede}
        </p>
      )}
    </header>
  );
}

// ─── Pharmacist photo ────────────────────────────────────────
function PharmacistPhoto({ p, size = 160, rounded = '50%', slotId }) {
  const hue = p.photoHue ?? 140;
  const bg = `linear-gradient(140deg, hsl(${hue} 32% 86%) 0%, hsl(${hue} 28% 74%) 100%)`;
  const photoSrc = p.photo || null;

  const inner = photoSrc ? (
    <img src={photoSrc} alt={p.name}
      style={{width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block'}}/>
  ) : (
    <div style={{
      width:'100%', height:'100%', background: bg,
      display:'flex', alignItems:'center', justifyContent:'center',
      color:`hsl(${hue} 40% 28%)`, fontFamily:'var(--font-serif)',
      fontSize: size*0.42, fontWeight:600, position:'relative', overflow:'hidden',
    }}>
      <span style={{position:'relative', zIndex:1}}>{p.name?.[0] || 'P'}</span>
      <svg viewBox="0 0 200 200" style={{position:'absolute',inset:0,opacity:.25}} preserveAspectRatio="none">
        <path d="M0,140 C50,110 100,170 200,130 L200,200 L0,200 Z" fill={`hsl(${hue} 38% 64%)`}/>
      </svg>
    </div>
  );

  return (
    <div style={{width:size, height:size, borderRadius:rounded, overflow:'hidden', flexShrink:0}}>{inner}</div>
  );
}

// ─── Header (global nav) ─────────────────────────────────────
function SiteHeader({ current, transparent }) {
  const nav = [
    { id:'top',     label:'ヒトヤクとは' },
    { id:'list',    label:'薬剤師を探す' },
    { id:'consult', label:'相談する' },
    { id:'corp',    label:'法人の方へ' },
    { id:'pharma',  label:'薬剤師・薬局の方へ' },
    { id:'faq',     label:'よくある質問' },
  ];
  return (
    <header style={{
      position:'sticky', top:0, zIndex:50,
      background: transparent ? 'rgba(250,250,247,.86)' : 'rgba(255,255,255,.92)',
      backdropFilter:'saturate(140%) blur(10px)',
      borderBottom:'1px solid var(--line-soft)',
    }}>
      <div className="container-wide" style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        height:'var(--nav-h)',
      }}>
        <Wordmark/>
        <nav style={{display:'flex', alignItems:'center', gap:32}}>
          {nav.map(n=>(
            <a key={n.id} href={`#${n.id}`}
               onClick={(e)=>{e.preventDefault(); window.HY_NAV?.(n.id);}}
               style={{
                 fontSize:13, color: current===n.id ? 'var(--brand-deep)' : 'var(--ink-2)',
                 fontWeight: current===n.id ? 600 : 500,
                 position:'relative', padding:'4px 0',
                 borderBottom: current===n.id ? '2px solid var(--brand)' : '2px solid transparent',
               }}>{n.label}</a>
          ))}
        </nav>
        <div style={{display:'flex',gap:8}}>
          <Button size="sm" variant="ghost" onClick={()=>window.HY_NAV?.('consult')}>
            ヒトヤクに相談する
          </Button>
          <Button size="sm" variant="primary" iconRight={Ico.arrow}
                  onClick={()=>window.HY_NAV?.('list')}>
            薬剤師を探す
          </Button>
        </div>
      </div>
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────────
function SiteFooter() {
  const Col = ({title, items}) => (
    <div>
      <div style={{fontSize:12, color:'var(--ink-3)', letterSpacing:'.16em', marginBottom:16}}>{title}</div>
      <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
        {items.map((it,i)=>(
          <li key={i}><a href="#" onClick={(e)=>{e.preventDefault(); it.go && window.HY_NAV?.(it.go);}}
                         style={{fontSize:14,color:'var(--ink-1)'}}>{it.label}</a></li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer style={{background:'var(--bg-soft)', borderTop:'1px solid var(--line-soft)', padding:'72px 0 32px', marginTop: 120}}>
      <div className="container-wide" style={{
        display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr 1fr', gap:48,
      }}>
        <div>
          <Wordmark size={24}/>
          <p style={{marginTop:16, fontSize:13, lineHeight:1.8, color:'var(--ink-2)', maxWidth: 320}}>
            ヒトヤクは、薬や体調の不安を、自分に合った薬剤師に気軽に相談できるサービスです。
          </p>
        </div>
        <Col title="サービス" items={[
          {label:'ヒトヤクとは', go:'top'},
          {label:'薬剤師を探す', go:'list'},
          {label:'相談する', go:'consult'},
          {label:'よくある質問', go:'faq'},
        ]}/>
        <Col title="ご利用の方へ" items={[
          {label:'法人の方へ', go:'corp'},
          {label:'薬剤師・薬局の方へ', go:'pharma'},
          {label:'お問い合わせ'},
        ]}/>
        <Col title="運営" items={[
          {label:'運営会社'},
          {label:'プレスリリース'},
          {label:'採用情報'},
        ]}/>
        <Col title="ご利用情報" items={[
          {label:'利用規約'},
          {label:'プライバシーポリシー'},
          {label:'特定商取引法表記'},
        ]}/>
      </div>
      <div className="container-wide" style={{
        marginTop:64, paddingTop:24, borderTop:'1px solid var(--line-mid)',
        display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--ink-3)',
      }}>
        <div>© 2026 Hitoyaku, Inc.</div>
        <div>ヒトヤクは薬剤師による健康・服薬相談サービスです。医師の診断や治療に代わるものではありません。</div>
      </div>
    </footer>
  );
}

// ─── FAQ Accordion ───────────────────────────────────────────
function FAQ({ items, defaultOpen=0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{borderTop:'1px solid var(--line-soft)'}}>
      {items.map((it, i)=>(
        <div key={i} style={{borderBottom:'1px solid var(--line-soft)'}}>
          <button onClick={()=>setOpen(open===i?-1:i)} style={{
            display:'flex', width:'100%', alignItems:'flex-start', justifyContent:'space-between',
            padding:'24px 8px', background:'none', border:'none', textAlign:'left', gap:16,
          }}>
            <span style={{display:'flex', gap:14, alignItems:'flex-start'}}>
              <span style={{fontFamily:'var(--font-serif)', color:'var(--brand-deep)', fontSize:14, marginTop:2}}>Q.</span>
              <span style={{fontSize:16, fontWeight:500, color:'var(--ink-1)', lineHeight:1.6}}>{it.q}</span>
            </span>
            <span style={{
              flex:'0 0 32px', height:32, borderRadius:'50%',
              background: open===i? 'var(--brand-deep)':'var(--bg-soft)',
              color: open===i? '#fff' : 'var(--ink-2)',
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              transition:'all .2s',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   style={{transform: open===i?'rotate(45deg)':'none', transition:'transform .2s'}}>
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </span>
          </button>
          {open===i && (
            <div className="fade-up" style={{padding:'0 8px 28px 36px', display:'flex',gap:14}}>
              <span style={{fontFamily:'var(--font-serif)', color:'var(--accent-warm)', fontSize:14}}>A.</span>
              <div style={{fontSize:14, lineHeight:1.9, color:'var(--ink-2)'}}>{it.a}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Form inputs ─────────────────────────────────────────────
function Field({ label, hint, required, children, error }) {
  return (
    <label style={{display:'flex',flexDirection:'column',gap:8}}>
      <span style={{fontSize:13, fontWeight:600, color:'var(--ink-1)', display:'flex', gap:8, alignItems:'center'}}>
        {label}
        {required && <span style={{
          fontSize:10, color:'#fff', background:'var(--accent-warm)',
          padding:'2px 6px', borderRadius:3, fontWeight:600,
        }}>必須</span>}
      </span>
      {children}
      {hint && !error && <span style={{fontSize:12, color:'var(--ink-3)'}}>{hint}</span>}
      {error && <span style={{fontSize:12, color:'var(--danger)'}}>{error}</span>}
    </label>
  );
}

const inputBase = {
  fontFamily:'inherit', fontSize:15, color:'var(--ink-1)',
  background:'#fff', border:'1px solid var(--line-mid)',
  borderRadius:'var(--r-12)', padding:'14px 16px',
  outline:'none', transition:'border-color .15s, box-shadow .15s',
  width:'100%',
};

function Input(props) {
  return <input {...props} style={{...inputBase, ...(props.style||{})}}
                onFocus={(e)=>{e.currentTarget.style.borderColor='var(--brand)'; e.currentTarget.style.boxShadow='var(--shadow-focus)';}}
                onBlur={(e)=>{e.currentTarget.style.borderColor='var(--line-mid)'; e.currentTarget.style.boxShadow='';}} />;
}
function Textarea(props) {
  return <textarea rows={5} {...props} style={{...inputBase, resize:'vertical', ...(props.style||{})}}
                   onFocus={(e)=>{e.currentTarget.style.borderColor='var(--brand)'; e.currentTarget.style.boxShadow='var(--shadow-focus)';}}
                   onBlur={(e)=>{e.currentTarget.style.borderColor='var(--line-mid)'; e.currentTarget.style.boxShadow='';}}/>;
}
function Select({children, ...props}) {
  return <select {...props} style={{...inputBase, appearance:'none',
    backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' fill='none' stroke='%237A857F' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
    backgroundRepeat:'no-repeat', backgroundPosition:'right 16px center', paddingRight:40,
    ...(props.style||{})}}>{children}</select>;
}
function Checkbox({checked, onChange, children}) {
  return (
    <label style={{display:'flex',gap:10,alignItems:'flex-start',cursor:'pointer',fontSize:14,lineHeight:1.7,color:'var(--ink-2)'}}>
      <span style={{
        flex:'0 0 20px', width:20, height:20, marginTop:3, borderRadius:5,
        border:`1.5px solid ${checked?'var(--brand)':'var(--line-strong)'}`,
        background:checked?'var(--brand)':'#fff',
        display:'inline-flex',alignItems:'center',justifyContent:'center',
        transition:'all .15s',
      }}>{checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="m5 12 5 5 9-11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</span>
      <input type="checkbox" checked={checked} onChange={onChange} style={{display:'none'}}/>
      <span>{children}</span>
    </label>
  );
}
function Radio({checked, onChange, children, desc}) {
  return (
    <label onClick={onChange} style={{
      display:'flex',gap:14,padding:'18px 20px',
      border:`1.5px solid ${checked?'var(--brand)':'var(--line-mid)'}`,
      background: checked?'var(--brand-wash)':'#fff',
      borderRadius:'var(--r-16)', cursor:'pointer',
      transition:'all .15s',
    }}>
      <span style={{
        flex:'0 0 20px', width:20, height:20, marginTop:2, borderRadius:'50%',
        border:`2px solid ${checked?'var(--brand)':'var(--line-strong)'}`,
        display:'inline-flex',alignItems:'center',justifyContent:'center',
      }}>{checked && <span style={{width:10,height:10,borderRadius:'50%',background:'var(--brand)'}}/>}</span>
      <div>
        <div style={{fontSize:15,fontWeight:600,color:'var(--ink-1)'}}>{children}</div>
        {desc && <div style={{fontSize:13,color:'var(--ink-2)',marginTop:4,lineHeight:1.7}}>{desc}</div>}
      </div>
    </label>
  );
}

// ─── Medical disclaimer box ──────────────────────────────────
function Disclaimer({ compact }) {
  return (
    <div style={{
      background:'var(--notice-bg)', border:`1px solid var(--notice-border)`,
      borderRadius:'var(--r-12)', padding: compact? '14px 18px':'20px 24px',
      display:'flex',gap:14, color:'var(--notice-ink)',
      fontSize: compact?12:13, lineHeight:1.8,
    }}>
      <span style={{flex:'0 0 auto',marginTop:2}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3 2 21h20L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M12 10v4M12 17v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      </span>
      <div>
        <strong style={{fontWeight:600}}>ヒトヤクは健康・服薬相談サービスです。</strong>
        医師の診断や治療に代わるものではありません。
        症状の重さや緊急性を感じる場合は、医療機関の受診をご検討ください。
      </div>
    </div>
  );
}

// Expose globally for other Babel scripts
Object.assign(window, {
  Wordmark, Button, Ico, Tag, StatusDot, SectionHead,
  PharmacistPhoto, SiteHeader, SiteFooter, FAQ,
  Field, Input, Textarea, Select, Checkbox, Radio, Disclaimer,
});
