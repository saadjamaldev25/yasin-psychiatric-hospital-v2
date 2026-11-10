// Builds every page of the site from shared pieces. Run: node build.js
const fs = require('fs'), path = require('path');
const ROOT = __dirname, SRC = path.join(ROOT, 'src');
const OLD = 'https://saadjamaldev25.github.io/yasin-psychiatric-hospital/';
const IMG = '{A}'; // placeholder, replaced per page with the relative path to this site's assets folder
const TEL = 'tel:+923307997999', PHONE = '+92 330 7997999';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=24.9138151%2C67.0307668';

// One-off: split the original single-file homepage into css, js and section fragments.
if (!fs.existsSync(SRC)) {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  fs.mkdirSync(SRC); fs.mkdirSync(path.join(ROOT, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(SRC, 'base.css'), html.match(/<style>([\s\S]*?)<\/style>/)[1].trim() + '\n');
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  fs.writeFileSync(path.join(ROOT, 'assets', 'site.js'), scripts[scripts.length - 1][1].trim() + '\n');
  const main = html.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
  const names = ['hero', 'about', 'services', 'doctors', 'approach', 'visit', 'faqs', 'contact'];
  main.split(/(?=<section)/).filter(s => s.trim().startsWith('<section')).forEach((s, i) =>
    fs.writeFileSync(path.join(SRC, names[i] + '.html'), s.trim() + '\n'));
}

const EXTRA_CSS = `
/* inner pages */
.nav ul a[aria-current="page"]{background:var(--mint);color:var(--green-deep);font-weight:600}
.page-hero{padding:clamp(40px,6vw,76px) 0 clamp(44px,6vw,80px);background:var(--mint-soft);position:relative;overflow:hidden;border-bottom:1px solid var(--line)}
.page-hero::before{content:"";position:absolute;right:-140px;top:-180px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,var(--amber-soft),transparent 68%)}
.page-hero::after{content:"";position:absolute;right:8%;bottom:-120px;width:240px;height:240px;border-radius:50%;border:40px solid rgba(15,74,69,.06)}
.page-hero .wrap{position:relative;z-index:1}
.page-hero h1{font-size:clamp(2.3rem,5vw,3.9rem);max-width:16ch}
.page-hero .lead{margin-top:18px}
.crumb{font-size:.86rem;color:var(--ink-soft);margin-bottom:26px;display:flex;gap:8px;flex-wrap:wrap}
.crumb a{color:var(--green-mid);font-weight:600}
.crumb a:hover{text-decoration:underline}
.hero-ico{width:62px;height:62px;border-radius:18px;background:var(--green);color:var(--amber);display:grid;place-items:center;margin-bottom:22px}
.hero-ico svg{width:30px;height:30px}
.page-hero + .contact{padding-top:clamp(44px,6vw,80px)}
.page-hero + .services{margin-top:clamp(40px,6vw,72px)}
.detail{display:grid;grid-template-columns:1.25fr .75fr;gap:clamp(28px,5vw,64px);align-items:start}
.prose p{color:var(--ink-soft);font-size:1.08rem;margin:18px 0 28px;max-width:60ch}
.side{background:var(--green);color:#fff;border-radius:var(--r);padding:30px;position:sticky;top:110px}
.side small{font-size:.74rem;text-transform:uppercase;letter-spacing:.1em;color:#9fd1c3;font-weight:700}
.side .big{font-family:var(--serif);font-size:1.7rem;display:block;margin:8px 0 14px}
.side p{color:#b9d3cb;font-size:.93rem;margin-bottom:20px}
.soft{background:var(--mint-soft)}
.light .svc{background:var(--paper);border-color:var(--line);grid-column:span 2;min-height:0}
.light .svc:hover{background:var(--paper);box-shadow:var(--shadow);border-color:var(--mint)}
.light .svc h3{color:var(--ink)}
.light .svc p{color:var(--ink-soft)}
.light .svc .ico{background:var(--mint);color:var(--green)}
.light .svc .more{color:var(--green-mid)}
.steps.four{grid-template-columns:repeat(4,1fr)}
.cta-band{padding:0 0 clamp(64px,9vw,110px)}
.cta-band .inner{background:var(--green);color:#fff;border-radius:clamp(24px,4vw,40px);padding:clamp(30px,5vw,56px);display:flex;justify-content:space-between;align-items:center;gap:28px;flex-wrap:wrap;position:relative;overflow:hidden}
.cta-band .inner::after{content:"";position:absolute;right:-60px;top:-90px;width:260px;height:260px;border-radius:50%;border:42px solid rgba(255,255,255,.06)}
.cta-band p{color:#b9d3cb;margin-top:8px}
.cta-band .btn{position:relative;z-index:1}
.soft + .cta-band,.approach + .cta-band{padding-top:clamp(64px,9vw,110px)}
@media (max-width:960px){.detail{grid-template-columns:1fr}.side{position:static}.steps.four{grid-template-columns:1fr 1fr}.light .svc{grid-column:span 3}}
@media (max-width:620px){.steps.four{grid-template-columns:1fr}.light .svc{grid-column:span 6}}
`;
fs.writeFileSync(path.join(ROOT, 'assets', 'site.css'), fs.readFileSync(path.join(SRC, 'base.css'), 'utf8') + EXTRA_CSS);

const frag = n => fs.readFileSync(path.join(SRC, n + '.html'), 'utf8');
const arrow = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const phoneIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.100 1 .400 1.900.700 2.800a2 2 0 0 1-.500 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.400c.900.300 1.800.600 2.800.700a2 2 0 0 1 1.700 2z"/></svg>';
const ico = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

const SERVICES = [
  { slug: 'consultations-and-second-opinions', name: 'Consultations &amp; second opinions', title: 'Psychiatric Consultation & Second Opinions in Nazimabad',
    short: 'Outpatient assessment and review of an existing diagnosis or treatment plan.',
    body: 'The psychiatrist asks about your symptoms, medical history and concerns. If you are seeking a second opinion, the team can review earlier reports and discuss whether another assessment would help clarify your options.',
    icon: ico('<path d="M21 12a8 8 0 0 1-11.800 7L4 20l1.100-4.600A8 8 0 1 1 21 12z"/><path d="M9 11h6M9 14h4"/>') },
  { slug: 'inpatient-admission', name: 'Inpatient psychiatric care', title: 'Inpatient Psychiatric Care in Karachi',
    short: 'Structured hospital care for patients who need closer monitoring.',
    body: 'The hospital offers inpatient psychiatric care. A care plan may include individual or group therapy and medication management, depending on the assessment. Call reception to ask about the admissions process.',
    icon: ico('<path d="M3 18v-7a2 2 0 0 1 2-2h9a4 4 0 0 1 4 4v5M3 14h18M21 18v-4M3 18v2M21 18v2"/><circle cx="7.500" cy="11.500" r="1.200"/>') },
  { slug: 'rehabilitation-for-substance-abuse-and-dependence', name: 'Substance use rehabilitation', title: 'Substance Use Rehabilitation in Karachi',
    short: 'Support for people experiencing drug, alcohol or prescription medication dependence.',
    body: 'The team considers each person’s circumstances when planning rehabilitation. The programme includes help with coping strategies and follow-up as part of recovery. Call to ask about arranging an assessment.',
    icon: ico('<path d="M12 21c-4-2.500-8-6-8-10.500A4.500 4.500 0 0 1 12 8a4.500 4.500 0 0 1 8 2.500C20 15 16 18.500 12 21z"/>') },
  { slug: 'pharmacy-quality-medication', name: 'Hospital pharmacy', title: 'Psychiatric Hospital Pharmacy in Nazimabad',
    short: 'An on-site pharmacy that dispenses prescribed psychiatric medication.',
    body: 'The pharmacy works with the psychiatry team to dispense prescribed medicines. Contact the pharmacy if you have questions about an existing prescription or how to return unwanted medicine.',
    icon: ico('<rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-45 12 12)"/><path d="m8.500 8.500 7 7"/>') },
  { slug: 'telepsychiatry', name: 'Telepsychiatry', title: 'Online Psychiatric Consultations | Telepsychiatry Karachi',
    short: 'Remote psychiatric appointments and follow-up when an online visit is suitable.',
    body: 'Remote visits can include assessment, treatment discussions and follow-up. Contact reception to confirm availability and whether an online consultation is suitable for your needs.',
    icon: ico('<rect x="3" y="6" width="12" height="12" rx="2.500"/><path d="m15 10.500 6-3v9l-6-3"/>') },
];

const NAV = [['home', '', 'Home'], ['services', 'our-services/', 'Services'], ['about', 'about/', 'About'], ['doctors', 'our-doctors/', 'Doctors'], ['faqs', 'faqs/', 'FAQs'], ['contact', 'contact-us/', 'Contact']];

const svcCard = (s, R, n) => `<a class="svc reveal" href="${R}${s.slug}/"><div class="top"><span class="ico">${s.icon}</span>${n ? `<span class="num">0${n}</span>` : ''}</div><h3>${s.name}</h3><p>${s.short}</p><span class="more">Learn more ${arrow.replace(' class="arrow"', '')}</span></a>`;

const pageHero = (R, crumbs, h1, lead, icon) => `<section class="page-hero"><div class="wrap">
  <nav class="crumb" aria-label="Breadcrumb"><a href="${R}">Home</a>${crumbs.map(c => ` <span>/</span> ${c[1] ? `<a href="${R}${c[1]}">${c[0]}</a>` : `<span>${c[0]}</span>`}`).join('')}</nav>
  ${icon ? `<span class="hero-ico">${icon}</span>` : '<span class="eyebrow">Yasin Psychiatric Hospital</span>'}
  <h1>${h1}</h1><p class="lead">${lead}</p>
</div></section>`;

const ctaBand = `<section class="cta-band"><div class="wrap"><div class="inner reveal">
  <div><h2>Speak with our reception team</h2><p>Ask about appointments, admissions or telepsychiatry.</p></div>
  <a class="btn btn-amber" href="${TEL}">${phoneIco}Call ${PHONE}</a>
</div></div></section>`;

// Fix links inside fragments for the page they are placed on.
const fix = (h, R) => h.split(OLD + 'assets/').join('\u0000').split(OLD).join(R).split('\u0000').join(IMG);
const inner = h => h.replace(' style="padding-top:0"', '');

function layout({ R, key, title, desc, main }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Yasin Psychiatric Hospital</title>
<meta name="description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${R}assets/site.css">
</head>
<body>
<script>document.documentElement.classList.add('js')</script>
<a class="skip" href="#main">Skip to content</a>
<div class="topbar"><div class="wrap">
  <span class="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.200 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>G-2, Swiss Tower, Block 1 Nazimabad, Karachi</span>
  <span>Reception&nbsp; <a href="${TEL}">${PHONE}</a></span>
</div></div>
<header class="site" id="top"><div class="wrap nav">
  <a class="logo" href="${R}"><img src="${IMG}logo.png" alt="Yasin Psychiatric Hospital home" width="300" height="100"></a>
  <nav aria-label="Main"><ul id="menu">
    ${NAV.map(n => `<li><a href="${R}${n[1]}"${n[0] === key ? ' aria-current="page"' : ''}>${n[2]}</a></li>`).join('\n    ')}
  </ul></nav>
  <a class="btn btn-primary" href="${TEL}">${phoneIco}Book an appointment</a>
  <button class="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
</div></header>
<main id="main">
${main}
</main>
<footer class="site"><div class="wrap">
  <div class="foot">
    <div><img src="${IMG}logo-white.png" alt="Yasin Psychiatric Hospital" width="300" height="100" loading="lazy"><p>Healing minds, restoring hope. Psychiatric care for patients and families in Nazimabad, Karachi.</p></div>
    <div><h4>Services</h4><ul>${SERVICES.map(s => `<li><a href="${R}${s.slug}/">${s.name}</a></li>`).join('')}</ul></div>
    <div><h4>Hospital</h4><ul><li><a href="${R}about/">About</a></li><li><a href="${R}our-doctors/">Doctors</a></li><li><a href="${R}faqs/">FAQs</a></li><li><a href="${R}contact-us/">Contact</a></li><li><a href="${TEL}">${PHONE}</a></li></ul></div>
  </div>
  <div class="copy"><span>© <span id="yr">2026</span> Yasin Psychiatric Hospital. All rights reserved.</span><a href="#top">Back to top ↑</a></div>
</div></footer>
<a class="callbar" href="${TEL}">${phoneIco}Call reception</a>
<script src="${R}assets/site.js"></script>
</body>
</html>
`;
}

function write(rel, opts) {
  const R = rel ? '../' : './';
  const out = path.join(ROOT, rel, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, layout({ ...opts, R, main: fix(opts.main(R), R) }).split('{A}').join(R + 'assets/'));
  console.log('built', rel || '(home)');
}

const journey = `<section><div class="wrap">
  <div class="sec-head reveal"><div><span class="eyebrow">What to expect</span><h2>Your <em>care journey</em></h2></div></div>
  <div class="steps four">
    <div class="step reveal"><h3>Initial consultation</h3><p>Share your symptoms, history and concerns.</p></div>
    <div class="step reveal"><h3>Assessment</h3><p>Review the findings with your clinician.</p></div>
    <div class="step reveal"><h3>Treatment</h3><p>Discuss a plan based on the assessment.</p></div>
    <div class="step reveal"><h3>Follow-up</h3><p>Review progress and adjust care as needed.</p></div>
  </div>
</div></section>`;

write('', { key: 'home', title: 'Psychiatric Hospital in Nazimabad, Karachi',
  desc: 'Yasin Psychiatric Hospital offers outpatient consultations, inpatient psychiatric care, substance use rehabilitation, an on-site pharmacy and telepsychiatry in Nazimabad, Karachi.',
  main: () => ['hero', 'about', 'services', 'doctors', 'approach', 'visit', 'faqs', 'contact'].map(frag).join('\n') });

write('our-services', { key: 'services', title: 'Psychiatry Services in Karachi',
  desc: 'Explore outpatient, inpatient and remote psychiatry services at Yasin Psychiatric Hospital, Nazimabad, Karachi.',
  main: R => pageHero(R, [['Psychiatry services']], 'Psychiatry <em>services</em>', 'Explore the hospital’s outpatient, inpatient and remote services.')
    + frag('services') + journey + ctaBand });

SERVICES.forEach(s => write(s.slug, { key: 'services', title: s.title, desc: s.short.replace(/&amp;/g, '&'),
  main: R => pageHero(R, [['Our services', 'our-services/'], [s.name]], s.name, s.short, s.icon)
    + `<section><div class="wrap detail">
  <div class="prose reveal"><span class="eyebrow">What to expect</span><h2>How this service works</h2><p>${s.body}</p><a class="btn btn-ghost" href="${R}contact-us/">Contact the hospital ${arrow}</a></div>
  <aside class="side reveal"><small>Arrange this service</small><a class="big" href="${TEL}">${PHONE}</a><p>Call reception to confirm clinic hours and your doctor’s availability before travelling.</p><a class="btn btn-amber" href="${TEL}">${phoneIco}Call reception</a></aside>
</div></section>
<section class="soft light"><div class="wrap">
  <div class="sec-head reveal"><div><span class="eyebrow">Explore more</span><h2>Other hospital <em>services</em></h2></div><a class="btn btn-ghost" href="${R}our-services/">All services</a></div>
  <div class="svc-grid">${SERVICES.filter(o => o !== s).slice(0, 3).map(o => svcCard(o, R)).join('')}</div>
</div></section>` + ctaBand }));

write('about', { key: 'about', title: 'About Us',
  desc: 'Yasin Psychiatric Hospital offers outpatient evaluation, inpatient care and pharmacy services in Nazimabad, Karachi.',
  main: R => pageHero(R, [['About the hospital']], 'About the <em>hospital</em>', 'Yasin Psychiatric Hospital offers outpatient evaluation, inpatient care and pharmacy services in Nazimabad, Karachi.')
    + frag('about') + frag('approach') + frag('doctors') + ctaBand });

write('our-doctors', { key: 'doctors', title: 'Our Psychiatrists in Karachi',
  desc: 'Meet the psychiatry team at Yasin Psychiatric Hospital, Nazimabad, Karachi.',
  main: R => pageHero(R, [['Meet our psychiatrists']], 'Meet our <em>psychiatrists</em>', 'The psychiatry team supports patients through consultation, inpatient care and follow-up.')
    + frag('doctors') + frag('approach') + ctaBand });

write('faqs', { key: 'faqs', title: 'Patient FAQs',
  desc: 'Answers to common questions about appointments, follow-up and medication enquiries at Yasin Psychiatric Hospital.',
  main: R => pageHero(R, [['Patient FAQs']], 'Patient <em>FAQs</em>', 'Answers to common questions about appointments, follow-up and medication enquiries.')
    + inner(frag('faqs')).replace('<h2>Frequently asked <em>questions</em></h2>', '<h2>Common <em>questions</em></h2>') });

write('contact-us', { key: 'contact', title: 'Appointments & Contact',
  desc: 'Contact Yasin Psychiatric Hospital reception for appointments, admissions and general enquiries. G-2, Swiss Tower, Block 1 Nazimabad, Karachi.',
  main: R => pageHero(R, [['Contact the hospital']], 'Contact the <em>hospital</em>', 'Speak to reception for appointments, admissions and general enquiries.')
    + frag('contact') + frag('visit') });
