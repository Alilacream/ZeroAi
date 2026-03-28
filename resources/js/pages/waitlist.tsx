import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import Navigation from '@/Zeroai_Components/utils/Navbar';
import '../../css/waitlist.css';

// ─── Custom Cursor ──────────────────────────────────────────────────────────
function Cursor() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const move = (e: MouseEvent) => {
            el.style.left = e.clientX + 'px';
            el.style.top = e.clientY + 'px';
        };

        const grow = () => el.classList.add('big');
        const shrink = () => el.classList.remove('big');

        document.addEventListener('mousemove', move);

        const targets = document.querySelectorAll(
            'a, button, input, .who-fill',
        );
        targets.forEach((t) => {
            t.addEventListener('mouseenter', grow);
            t.addEventListener('mouseleave', shrink);
        });

        return () => {
            document.removeEventListener('mousemove', move);
            targets.forEach((t) => {
                t.removeEventListener('mouseenter', grow);
                t.removeEventListener('mouseleave', shrink);
            });
        };
    }, []);

    return <div id="zai-cursor" ref={ref} />;
}

// ─── useReveal Hook ─────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);

    return [ref, visible] as const;
}

// ─── Reveal Component ───────────────────────────────────────────────────────
interface RevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

function Reveal({ children, delay = 0, className = '' }: RevealProps) {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            className={`reveal ${visible ? 'on' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

// ─── Hero Section ───────────────────────────────────────────────────────────
function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const r = heroRef.current?.getBoundingClientRect();
        if (!r || !glowRef.current) return;
        glowRef.current.style.left = e.clientX - r.left + 'px';
        glowRef.current.style.top = e.clientY - r.top + 'px';
    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="hero-section"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 'clamp(100px, 14vw, 140px) 48px 100px',
                overflow: 'hidden',
            }}
        >
            <div className="hero-grid-bg" />

            <div
                ref={glowRef}
                className="hero-glow"
                style={{
                    position: 'absolute',
                    width: 700,
                    height: 700,
                    background:
                        'radial-gradient(circle, rgba(242,237,230,.045) 0%, transparent 65%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    transform: 'translate(-50%,-50%)',
                }}
            />

            <div
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 14,
                    border: '1px solid var(--border-mid)',
                    padding: '10px 22px',
                    marginBottom: 48,
                    position: 'relative',
                    overflow: 'hidden',
                    animation: 'fadeUp .8s cubic-bezier(.16,1,.3,1) both',
                    animationDelay: '200ms',
                }}
            >
                <div className="hero-cert-shimmer" />
                <div
                    className="cert-dot-blink"
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--white)',
                        flexShrink: 0,
                    }}
                />
                <span
                    style={{
                        fontFamily: 'var(--ff-l)',
                        fontSize: 10,
                        letterSpacing: '.22em',
                        color: 'var(--white)',
                        textTransform: 'uppercase',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    Verified Human Content
                </span>
                <span
                    style={{
                        fontFamily: 'var(--ff-l)',
                        fontSize: 10,
                        color: 'var(--cream)',
                        opacity: 0.35,
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    CERT: X7F3 · 19 MAR 2026 · 98.7%
                </span>
            </div>

            <h1
                style={{
                    fontFamily: 'var(--ff-d)',
                    fontSize: 'clamp(64px, 10.5vw, 136px)',
                    lineHeight: 0.93,
                    letterSpacing: '-.01em',
                    marginBottom: 36,
                    maxWidth: 960,
                }}
            >
                <span className="hero-line">
                    <span
                        className="hero-word"
                        style={{ animationDelay: '180ms' }}
                    >
                        The Internet
                    </span>
                </span>
                <span className="hero-line">
                    <span
                        className="hero-word"
                        style={{ animationDelay: '320ms' }}
                    >
                        Is Full Of Fakes.
                    </span>
                </span>
                <span className="hero-line" style={{ marginTop: '.08em' }}>
                    <span
                        className="hero-word"
                        style={{
                            animationDelay: '480ms',
                            color: 'var(--cream)',
                            opacity: 0.38,
                        }}
                    >
                        Your Work
                    </span>
                </span>
                <span className="hero-line">
                    <span
                        className="hero-word"
                        style={{ animationDelay: '620ms' }}
                    >
                        Shouldn't Be.
                    </span>
                </span>
            </h1>

            <p
                style={{
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: 'var(--cream)',
                    opacity: 0.65,
                    maxWidth: 400,
                    marginBottom: 52,
                    animation: 'fadeUp 1s cubic-bezier(.16,1,.3,1) both',
                    animationDelay: '700ms',
                }}
            >
                The AI-Free label for human content.
                <br />
                One badge. Trusted everywhere.
            </p>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 18,
                    animation: 'fadeUp 1s cubic-bezier(.16,1,.3,1) both',
                    animationDelay: '850ms',
                }}
            >
                <a href="#waitlist" className="btn-wipe">
                    <span>Join The Waitlist</span>
                </a>
                <span
                    style={{
                        fontFamily: 'var(--ff-l)',
                        fontSize: 10,
                        letterSpacing: '.22em',
                        textTransform: 'uppercase',
                        color: 'var(--cream)',
                        opacity: 0.28,
                    }}
                >
                    Image · Video · Audio · Multimodal
                </span>
            </div>

            <div
                style={{
                    position: 'absolute',
                    bottom: 44,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10,
                    animation: 'fadeUp 1s ease both',
                    animationDelay: '1200ms',
                }}
            >
                <div
                    className="scroll-drip"
                    style={{
                        width: 1,
                        height: 52,
                        background:
                            'linear-gradient(to bottom, rgba(242,237,230,.5), transparent)',
                    }}
                />
                <span
                    style={{
                        fontFamily: 'var(--ff-l)',
                        fontSize: 9,
                        letterSpacing: '.32em',
                        color: 'var(--white)',
                        opacity: 0.22,
                        textTransform: 'uppercase',
                    }}
                >
                    Scroll
                </span>
            </div>
        </section>
    );
}

// ─── Marquee Section ────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
    'AI-Free Label',
    'Truth Seeker',
    'Human Certified',
    'Cryptographic Watermark',
    'Five-Layer Verification',
    'Universal Trust Layer',
];

function Marquee() {
    const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
    return (
        <div
            style={{
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                padding: '18px 0',
                overflow: 'hidden',
            }}
        >
            <div className="marquee-track">
                {items.map((item, i) => (
                    <span
                        key={i}
                        style={{
                            fontFamily: 'var(--ff-l)',
                            fontSize: 10,
                            letterSpacing: '.28em',
                            textTransform: 'uppercase',
                            color: 'var(--cream)',
                            opacity: 0.32,
                            margin: '0 28px',
                        }}
                    >
                        {item}
                        <span style={{ marginLeft: 28, fontSize: 8 }}>●</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

// ─── Problem Section ────────────────────────────────────────────────────────
function Problem() {
    return (
        <section
            id="problem"
            style={{
                background: 'var(--white)',
                color: 'var(--bg)',
                padding: '88px 56px',
            }}
        >
            <div style={{ maxWidth: 1220, margin: '0 auto' }}>
                <Reveal>
                    <p
                        style={{
                            fontFamily: 'var(--ff-l)',
                            fontSize: 10,
                            letterSpacing: '.3em',
                            textTransform: 'uppercase',
                            color: 'var(--bg)',
                            opacity: 0.3,
                            marginBottom: 48,
                        }}
                    >
                        The Problem
                    </p>
                </Reveal>

                <Reveal delay={80}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(280px, 1fr))',
                            border: '1px solid rgba(8,8,8,.1)',
                        }}
                    >
                        {[
                            {
                                who: 'For Buyers',
                                line: "Can't Tell\nWhat's Real.",
                                detail: 'Licenses AI portfolios. Shares fake images. Pays for machine-made work presented as human.',
                            },
                            {
                                who: 'For Creators',
                                line: "Can't Prove\nThey're Human.",
                                detail: 'Photographers, illustrators, writers — undercut by AI with no way to distinguish their craft.',
                            },
                        ].map((cell, i) => (
                            <div
                                key={i}
                                className="prob-cell-hover"
                                style={{
                                    padding: '44px 48px',
                                    borderRight:
                                        i === 0
                                            ? '1px solid rgba(8,8,8,.08)'
                                            : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: 'var(--ff-l)',
                                        fontSize: 10,
                                        letterSpacing: '.25em',
                                        textTransform: 'uppercase',
                                        color: '#888',
                                        marginBottom: 14,
                                    }}
                                >
                                    {cell.who}
                                </div>
                                <div
                                    style={{
                                        fontFamily: 'var(--ff-d)',
                                        fontSize: 'clamp(28px, 3vw, 42px)',
                                        lineHeight: 1.0,
                                        color: 'var(--bg)',
                                        marginBottom: 14,
                                    }}
                                >
                                    {cell.line.split('\n').map((l, j) => (
                                        <span
                                            key={j}
                                            style={{ display: 'block' }}
                                        >
                                            {l}
                                        </span>
                                    ))}
                                </div>
                                <div
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 300,
                                        lineHeight: 1.8,
                                        color: '#666',
                                    }}
                                >
                                    {cell.detail}
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={160}>
                    <div
                        style={{
                            border: '1px solid rgba(8,8,8,.1)',
                            borderTop: 'none',
                            padding: '36px 48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 32,
                            background: 'var(--bg)',
                            flexWrap: 'wrap',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'var(--ff-d)',
                                fontSize: 'clamp(32px, 4vw, 56px)',
                                color: 'var(--white)',
                                lineHeight: 0.95,
                            }}
                        >
                            There Is No Label
                            <br />
                            For Human Work.
                        </div>
                        <div
                            style={{
                                fontFamily: 'var(--ff-l)',
                                fontSize: 11,
                                letterSpacing: '.18em',
                                textTransform: 'uppercase',
                                color: 'var(--cream)',
                                opacity: 0.45,
                                maxWidth: 320,
                                lineHeight: 1.8,
                                textAlign: 'right',
                            }}
                        >
                            Like the padlock on a secure website — trust
                            shouldn't require effort. It should just be there.
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

// ─── How It Works Section ───────────────────────────────────────────────────
const HOW_CARDS = [
    {
        num: '01',
        title: 'Truth Seeker Scans',
        body: 'Our detection engine confirms: this is human-made. Confidence score attached. Multimodal — image, video, audio.',
        icon: (
            <svg
                viewBox="0 0 36 36"
                fill="none"
                style={{
                    width: 32,
                    height: 32,
                    marginBottom: 24,
                    color: 'var(--white)',
                    opacity: 0.7,
                }}
            >
                <ellipse
                    cx="18"
                    cy="18"
                    rx="17"
                    ry="9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                />
                <circle
                    cx="18"
                    cy="18"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.4"
                />
                <circle cx="18" cy="18" r="2.5" fill="currentColor" />
            </svg>
        ),
    },
    {
        num: '02',
        title: 'A Certificate Is Issued',
        body: 'Cryptographically signed. An invisible watermark embeds your certificate ID into the pixels — surviving compression, resizing, re-uploading.',
        icon: (
            <svg
                viewBox="0 0 36 36"
                fill="none"
                style={{
                    width: 32,
                    height: 32,
                    marginBottom: 24,
                    color: 'var(--white)',
                    opacity: 0.7,
                }}
            >
                <rect
                    x="5"
                    y="3"
                    width="26"
                    height="31"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.4"
                />
                <line
                    x1="10"
                    y1="12"
                    x2="26"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="1.4"
                />
                <line
                    x1="10"
                    y1="18"
                    x2="26"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="1.4"
                />
                <line
                    x1="10"
                    y1="24"
                    x2="18"
                    y2="24"
                    stroke="currentColor"
                    strokeWidth="1.4"
                />
                <circle
                    cx="27"
                    cy="29"
                    r="5.5"
                    fill="#0e0e0e"
                    stroke="currentColor"
                    strokeWidth="1.4"
                />
                <path
                    d="M24.7 29l1.4 1.4 2.8-2.8"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        num: '03',
        title: 'Badge Appears. Silently.',
        body: 'The browser extension runs five checks in the background. No clicks. If all pass — verified. The AI-Free label appears automatically.',
        icon: (
            <svg
                viewBox="0 0 36 36"
                fill="none"
                style={{
                    width: 32,
                    height: 32,
                    marginBottom: 24,
                    color: 'var(--white)',
                    opacity: 0.7,
                }}
            >
                <path
                    d="M18 3L4 9v9.5C4 27 10 33 18 35.5 26 33 32 27 32 18.5V9L18 3z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                />
                <path
                    d="M11 18l5 5 9-9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

function HowItWorks() {
    return (
        <section
            style={{
                background: 'var(--bg-dim)',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                padding: '96px 56px',
            }}
        >
            <div style={{ maxWidth: 1220, margin: '0 auto' }}>
                <Reveal>
                    <p
                        style={{
                            fontFamily: 'var(--ff-l)',
                            fontSize: 10,
                            letterSpacing: '.3em',
                            textTransform: 'uppercase',
                            color: 'var(--cream)',
                            opacity: 0.35,
                            marginBottom: 48,
                        }}
                    >
                        How It Works
                    </p>
                </Reveal>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(260px, 1fr))',
                    }}
                >
                    {HOW_CARDS.map((card, i) => (
                        <Reveal key={i} delay={i * 110}>
                            <div
                                className="how-card-hover"
                                style={{
                                    padding: '52px 44px',
                                    borderRight:
                                        i < HOW_CARDS.length - 1
                                            ? '1px solid var(--border)'
                                            : 'none',
                                    height: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: 'var(--ff-l)',
                                        fontSize: 10,
                                        letterSpacing: '.3em',
                                        color: 'var(--cream)',
                                        opacity: 0.2,
                                        marginBottom: 32,
                                    }}
                                >
                                    {card.num}
                                </div>
                                {card.icon}
                                <h3
                                    style={{
                                        fontFamily: 'var(--ff-d)',
                                        fontSize: 26,
                                        letterSpacing: '.06em',
                                        color: 'var(--white)',
                                        lineHeight: 1.1,
                                        marginBottom: 12,
                                    }}
                                >
                                    {card.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 300,
                                        lineHeight: 1.85,
                                        color: 'var(--cream)',
                                        opacity: 0.5,
                                    }}
                                >
                                    {card.body}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Fakeproof Section ──────────────────────────────────────────────────────
const SCENARIOS = [
    {
        title: 'Badge Copied Onto AI Image',
        desc: 'No watermark in pixels. Badge present — watermark absent. Verification fails.',
        status: 'Rejected',
        ok: false,
    },
    {
        title: 'Photo Stolen — Badge Stripped',
        desc: 'Watermark extracted. Certificate X7F3 belongs to a different creator. Mismatch detected.',
        status: 'Flagged',
        ok: false,
    },
    {
        title: 'Original Certified Content',
        desc: 'All five checks pass. Certificate valid. Creator: Sara K. · 19 Mar 2026 · 98.7%',
        status: 'Verified',
        ok: true,
    },
];

function Fakeproof() {
    return (
        <section style={{ background: 'var(--bg)', padding: '96px 56px' }}>
            <div style={{ maxWidth: 1220, margin: '0 auto' }}>
                <Reveal>
                    <p
                        style={{
                            fontFamily: 'var(--ff-l)',
                            fontSize: 10,
                            letterSpacing: '.3em',
                            textTransform: 'uppercase',
                            color: 'var(--cream)',
                            opacity: 0.35,
                            marginBottom: 48,
                        }}
                    >
                        Tamper-Proof By Design
                    </p>
                </Reveal>
                <Reveal delay={80}>
                    <h2
                        style={{
                            fontFamily: 'var(--ff-d)',
                            fontSize: 'clamp(44px, 5.5vw, 84px)',
                            lineHeight: 0.93,
                            maxWidth: 760,
                            marginBottom: 64,
                        }}
                    >
                        Three Layers.
                        <br />
                        All Must Agree.
                        <br />
                        <span className="text-gradient-cream">
                            Fake One —
                            <br />
                            The Others Expose You.
                        </span>
                    </h2>
                </Reveal>
                <Reveal delay={160}>
                    <div style={{ border: '1px solid var(--border)' }}>
                        {SCENARIOS.map((sc, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto',
                                    alignItems: 'center',
                                    gap: 48,
                                    padding: '34px 44px',
                                    borderBottom:
                                        i < SCENARIOS.length - 1
                                            ? '1px solid var(--border)'
                                            : 'none',
                                    transition: 'background .3s',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                        'rgba(242,237,230,.018)')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                        'transparent')
                                }
                            >
                                <div>
                                    <div
                                        style={{
                                            fontFamily: 'var(--ff-d)',
                                            fontSize: 20,
                                            letterSpacing: '.07em',
                                            color: 'var(--white)',
                                            marginBottom: 6,
                                        }}
                                    >
                                        {sc.title}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 300,
                                            lineHeight: 1.75,
                                            color: 'var(--cream)',
                                            opacity: 0.42,
                                        }}
                                    >
                                        {sc.desc}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        flexShrink: 0,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 7,
                                            height: 7,
                                            borderRadius: '50%',
                                            background: sc.ok
                                                ? 'var(--white)'
                                                : 'transparent',
                                            border: sc.ok
                                                ? 'none'
                                                : '1px solid rgba(242,237,230,.25)',
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: 'var(--ff-l)',
                                            fontSize: 10,
                                            letterSpacing: '.22em',
                                            textTransform: 'uppercase',
                                            color: sc.ok
                                                ? 'var(--white)'
                                                : 'var(--cream)',
                                            opacity: sc.ok ? 1 : 0.65,
                                        }}
                                    >
                                        {sc.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
                <Reveal delay={220}>
                    <p
                        style={{
                            marginTop: 36,
                            fontFamily: 'var(--ff-l)',
                            fontSize: 11,
                            letterSpacing: '.14em',
                            color: 'var(--cream)',
                            opacity: 0.28,
                            maxWidth: 520,
                            lineHeight: 1.85,
                        }}
                    >
                        Faking all three layers simultaneously is
                        cryptographically impossible.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}

// ─── Who It's For Section ───────────────────────────────────────────────────
const WHO_CARDS = [
    {
        idx: '01',
        title: 'Creators',
        tags: ['Photographers', 'Illustrators', 'Writers', 'Videographers'],
        body: 'Prove your work is human-made. Stand out in a market flooded with AI output.',
    },
    {
        idx: '02',
        title: 'Consumers',
        tags: ['Buyers', 'Creative Directors', 'Editors', 'Journalists'],
        body: 'Know what is real before you license it, share it, or act on it. Automatically.',
    },
    {
        idx: '03',
        title: 'Platforms',
        tags: ['Behance', 'Shutterstock', 'Substack', 'Any Platform'],
        body: 'Offer an AI-Free filter to your users. One API. Full trust layer, instantly.',
    },
];

function WhoItsFor() {
    const gridRef = useRef<HTMLDivElement>(null);
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        const el = gridRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setEntered(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.2 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            id="who"
            style={{
                background: 'var(--bg)',
                borderTop: '1px solid var(--border)',
                overflow: 'hidden',
                padding: '96px 56px',
            }}
        >
            <div style={{ maxWidth: 1220, margin: '0 auto' }}>
                <Reveal>
                    <p
                        style={{
                            fontFamily: 'var(--ff-l)',
                            fontSize: 10,
                            letterSpacing: '.3em',
                            textTransform: 'uppercase',
                            color: 'var(--cream)',
                            opacity: 0.35,
                            marginBottom: 64,
                        }}
                    >
                        Who It's For
                    </p>
                </Reveal>
                <div
                    ref={gridRef}
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: 2,
                    }}
                >
                    {WHO_CARDS.map((card, i) => (
                        <div
                            key={i}
                            className={`who-fill who-card-enter ${entered ? 'in' : ''}`}
                            style={{
                                background: 'var(--bg-dim)',
                                border: '1px solid var(--border)',
                                padding: '64px 44px 60px',
                                transitionDelay: `${i * 100}ms`,
                            }}
                        >
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <span
                                    className="who-idx-el"
                                    style={{
                                        fontFamily: 'var(--ff-l)',
                                        fontSize: 10,
                                        letterSpacing: '.3em',
                                        color: 'var(--cream)',
                                        opacity: 0.25,
                                        marginBottom: 40,
                                        display: 'block',
                                        transition: 'color .3s, opacity .3s',
                                    }}
                                >
                                    {card.idx}
                                </span>
                                <h3
                                    className="who-h3-el"
                                    style={{
                                        fontFamily: 'var(--ff-d)',
                                        fontSize: 64,
                                        lineHeight: 0.88,
                                        color: 'var(--white)',
                                        marginBottom: 24,
                                        transition: 'color .3s',
                                    }}
                                >
                                    {card.title}
                                </h3>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 7,
                                        marginBottom: 28,
                                    }}
                                >
                                    {card.tags.map((tag, j) => (
                                        <span
                                            key={j}
                                            className="who-tag-el"
                                            style={{
                                                fontFamily: 'var(--ff-l)',
                                                fontSize: 9,
                                                letterSpacing: '.18em',
                                                textTransform: 'uppercase',
                                                padding: '5px 11px',
                                                border: '1px solid var(--border-mid)',
                                                color: 'var(--cream)',
                                                opacity: 0.5,
                                                transition:
                                                    'border-color .3s, color .3s, opacity .3s',
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p
                                    className="who-p-el"
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 300,
                                        lineHeight: 1.8,
                                        color: 'var(--cream)',
                                        opacity: 0.45,
                                        transition: 'color .3s, opacity .3s',
                                    }}
                                >
                                    {card.body}
                                </p>
                            </div>
                            <div
                                className="who-arrow-el"
                                style={{
                                    position: 'absolute',
                                    bottom: 40,
                                    right: 44,
                                    fontFamily: 'var(--ff-d)',
                                    fontSize: 22,
                                    letterSpacing: '.08em',
                                    color: 'var(--white)',
                                    opacity: 0,
                                    transform: 'translate(-6px, 6px)',
                                    transition:
                                        'opacity .35s .1s, transform .35s .1s, color .3s',
                                }}
                            >
                                →
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Waitlist Form Section ──────────────────────────────────────────────────
function Waitlist() {
    const [submitted, setSubmitted] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>(
        'success',
    );
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const { post, processing, reset, data, setData } = useForm<{ email: string }>({
        email: '',
    });

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!data.email || !data.email.includes('@')) {
            setSnackbarMessage('Please enter a valid email address.');
            setSnackbarType('error');
            setShowSnackbar(true);
            return;
        }

        post('/waitlist', {
            email: data.email,
            onSuccess: () => {
                setSubmitted(true);
                setSnackbarMessage("You're on the list. We'll be in touch.");
                setSnackbarType('success');
                setShowSnackbar(true);
                reset();
            },
            onError: (error) => {
                setSnackbarMessage(error.email || 'Something went wrong.');
                setSnackbarType('error');
                setShowSnackbar(true);
            },
        });
    };

    useEffect(() => {
        if (showSnackbar) {
            const timer = setTimeout(() => {
                setShowSnackbar(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [showSnackbar]);

    return (
        <section
            id="waitlist"
            style={{
                background: 'var(--white)',
                color: 'var(--bg)',
                textAlign: 'center',
                padding: '96px 56px',
            }}
        >
            <div style={{ maxWidth: 1220, margin: '0 auto' }}>
                <Reveal>
                    <p
                        style={{
                            fontFamily: 'var(--ff-l)',
                            fontSize: 10,
                            letterSpacing: '.3em',
                            textTransform: 'uppercase',
                            color: 'var(--bg)',
                            opacity: 0.28,
                            marginBottom: 48,
                        }}
                    >
                        Early Access
                    </p>
                </Reveal>
                <Reveal delay={80}>
                    <h2
                        style={{
                            fontFamily: 'var(--ff-d)',
                            fontSize: 'clamp(80px, 14vw, 180px)',
                            lineHeight: 0.88,
                            color: 'var(--bg)',
                            marginBottom: 24,
                        }}
                    >
                        Be
                        <br />
                        First.
                    </h2>
                </Reveal>
                <Reveal delay={160}>
                    <p
                        style={{
                            fontSize: 13,
                            fontWeight: 300,
                            color: '#888',
                            marginBottom: 52,
                        }}
                    >
                        ZeroAI is in development. One email when we launch.
                    </p>
                </Reveal>
                <Reveal delay={240}>
                    {!submitted ? (
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                display: 'flex',
                                maxWidth: 520,
                                margin: '0 auto 20px',
                                flexWrap: 'wrap',
                            }}
                        >
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSubmit(e);
                                }}
                                placeholder="your@email.com"
                                disabled={processing}
                                className="waitlist-input"
                            />
                            <button
                                type="submit"
                                disabled={processing}
                                className="waitlist-btn"
                            >
                                {processing ? 'Joining...' : 'Join Waitlist'}
                            </button>
                        </form>
                    ) : (
                        <div
                            style={{
                                fontFamily: 'var(--ff-l)',
                                fontSize: 12,
                                letterSpacing: '.2em',
                                textTransform: 'uppercase',
                                color: '#1a6e1a',
                                marginBottom: 16,
                            }}
                        >
                            ✓ You're on the list. We'll be in touch.
                        </div>
                    )}
                    <p
                        style={{
                            fontFamily: 'var(--ff-l)',
                            fontSize: 10,
                            letterSpacing: '.2em',
                            color: 'var(--bg)',
                            opacity: 0.28,
                            textTransform: 'uppercase',
                        }}
                    >
                        No spam. No noise.
                    </p>
                </Reveal>
            </div>

            {showSnackbar && (
                <div className="snackbar">
                    <div
                        className={`snackbar-content ${snackbarType === 'success' ? 'snackbar-success' : 'snackbar-error'}`}
                    >
                        {snackbarType === 'success' ? (
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ width: 18, height: 18, flexShrink: 0 }}
                            >
                                <path
                                    d="M20 6L9 17l-5-5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ) : (
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ width: 18, height: 18, flexShrink: 0 }}
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M12 8v4m0 4h.01"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        )}
                        <span style={{ flex: 1 }}>{snackbarMessage}</span>
                        <button
                            onClick={() => setShowSnackbar(false)}
                            className="snackbar-close"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ width: 16, height: 16 }}
                            >
                                <path
                                    d="M18 6L6 18M6 6l12 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
    return (
        <footer
            style={{
                background: 'var(--bg)',
                borderTop: '1px solid var(--border)',
                padding: '28px 56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 10,
            }}
        >
            {['© 2026 ZeroAI', 'Powered by Truth Seeker'].map((t, i) => (
                <span
                    key={i}
                    style={{
                        fontFamily: 'var(--ff-l)',
                        fontSize: 10,
                        letterSpacing: '.18em',
                        textTransform: 'uppercase',
                        color: 'var(--white)',
                        opacity: 0.18,
                    }}
                >
                    {t}
                </span>
            ))}
        </footer>
    );
}

// ─── Main Page Component ────────────────────────────────────────────────────
export default function ZeroAILanding() {
    return (
        <>
            <Head title="ZeroAI — The AI-Free Label" />
            <Cursor />
            <Navigation />
            <main className="waitlist-page">
                <Hero />
                <Marquee />
                <Problem />
                <HowItWorks />
                <Fakeproof />
                <WhoItsFor />
                <Waitlist />
            </main>
            <Footer />
        </>
    );
}
