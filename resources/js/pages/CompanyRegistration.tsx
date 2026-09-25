import { useEffect, useState } from 'react';
import SEO from '@/components/SEO';

type ShareMetrics = {
    status: 'pending' | 'connected';
    currency: string;

    shares: number;
    face_value_per_share: number;

    total_assets: number | null;
    total_liabilities: number | null;
    net_assets: number | null;

    estimated_book_value_per_share: number | null;

    source: string | null;
    last_updated: string | null;
    message?: string;
};

const companyDetails = [
    {
        label: 'Legal Company Name',
        value: 'AYAMIL CODERS (SMC-PRIVATE) LIMITED',
    },
    {
        label: 'SECP CUIN',
        value: '0357981',
    },
    {
        label: 'FBR Registration No.',
        value: 'K075347',
    },
    {
        label: 'Company Type',
        value: 'Single Member Company (SMC-Private) Limited',
    },
    {
        label: 'Liability',
        value: 'Limited by shares',
    },
    {
        label: 'Principal Sector',
        value: 'Information Technology',
    },
    {
        label: 'Financial Year End',
        value: '30 June',
    },
];

const capitalDetails = [
    {
        label: 'Authorized Capital',
        value: 'PKR 10,000',
    },
    {
        label: 'Paid-up Capital',
        value: 'PKR 10,000',
    },
    {
        label: 'Ordinary Shares',
        value: '1,000',
    },
    {
        label: 'Official Face Value',
        value: 'PKR 10 per share',
    },
];

function formatPKR(value: number | null) {
    if (value === null) {
        return '—';
    }

    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

export default function CompanyRegistration() {
    const [metrics, setMetrics] =
        useState<ShareMetrics | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const style = document.createElement('style');

        style.id = 'company-registration-page-css';

        style.textContent = `
            .company-reg-hero {
                padding: 88px 60px 64px;
                position: relative;
                overflow: hidden;
                text-align: center;
                background: var(--bg2);
                border-bottom: 1px solid var(--brd);
            }

            .company-reg-wrap {
                max-width: 1060px;
                margin: 0 auto;
            }

            .company-reg-hero-inner {
                position: relative;
                z-index: 2;
                max-width: 820px;
                margin: 0 auto;
            }

            .company-reg-title {
                font-family: var(--disp);
                font-size: clamp(30px, 5vw, 50px);
                font-weight: 800;
                letter-spacing: -.03em;
                line-height: 1.15;
                margin: 10px 0 16px;
            }

            .company-reg-lead {
                color: var(--txt2);
                font-size: 15px;
                line-height: 1.8;
                max-width: 720px;
                margin: 0 auto;
            }

            .company-reg-badges {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 10px;
                margin-top: 24px;
            }

            .company-reg-badge {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                padding: 8px 13px;
                border-radius: 999px;
                border: 1px solid var(--brd2);
                background: var(--card-bg);
                color: var(--txt2);
                font-family: var(--mono);
                font-size: 11px;
            }

            .company-reg-dot {
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background: var(--green);
                box-shadow:
                    0 0 10px rgba(45, 211, 111, .55);
            }

            .company-reg-section {
                padding: 64px 60px;
                border-bottom: 1px solid var(--brd);
            }

            .company-reg-section.alt {
                background: var(--bg2);
            }

            .company-reg-head {
                max-width: 760px;
                margin-bottom: 28px;
            }

            .company-reg-head h2 {
                font-family: var(--disp);
                font-size: clamp(22px, 4vw, 34px);
                font-weight: 800;
                letter-spacing: -.02em;
                margin: 7px 0 9px;
            }

            .company-reg-head p {
                color: var(--txt3);
                font-size: 14px;
                line-height: 1.75;
            }

            .company-reg-grid {
                display: grid;
                grid-template-columns:
                    repeat(2, minmax(0, 1fr));
                gap: 14px;
            }

            .company-reg-card {
                background: var(--card-bg);
                border: 1px solid var(--brd);
                border-radius: var(--r-lg);
                padding: 20px;
            }

            .company-reg-card.primary {
                border-color:
                    rgba(41, 121, 242, .30);

                background:
                    linear-gradient(
                        145deg,
                        rgba(41, 121, 242, .08),
                        var(--card-bg)
                    );
            }

            .company-reg-label {
                color: var(--txt3);
                font-family: var(--mono);
                font-size: 10px;
                letter-spacing: .09em;
                text-transform: uppercase;
                margin-bottom: 8px;
            }

            .company-reg-value {
                color: var(--txt);
                font-family: var(--disp);
                font-size: 15px;
                font-weight: 650;
                line-height: 1.55;
                overflow-wrap: anywhere;
            }

            .share-live {
                border: 1px solid
                    rgba(41, 121, 242, .25);

                border-radius: var(--r-xl);

                padding: 28px;

                background:
                    linear-gradient(
                        145deg,
                        rgba(41, 121, 242, .10),
                        rgba(45, 211, 111, .035)
                    );
            }

            .share-live-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 14px;
                margin-bottom: 24px;
            }

            .share-live-status {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                padding: 7px 10px;
                border-radius: 999px;
                border: 1px solid var(--brd);
                font-family: var(--mono);
                font-size: 10px;
                color: var(--txt3);
            }

            .share-live-status.connected {
                border-color:
                    rgba(45, 211, 111, .30);

                color: var(--green);
            }

            .share-live-value {
                font-family: var(--disp);
                font-size: clamp(28px, 5vw, 44px);
                font-weight: 800;
                letter-spacing: -.03em;
                margin-bottom: 6px;
            }

            .share-live-sub {
                color: var(--txt3);
                font-size: 12px;
                line-height: 1.6;
            }

            .share-stats {
                display: grid;
                grid-template-columns:
                    repeat(3, minmax(0, 1fr));
                gap: 12px;
                margin-top: 24px;
            }

            .share-stat {
                padding: 15px;
                border-radius: var(--r-md);
                background: var(--card-bg);
                border: 1px solid var(--brd);
            }

            .share-warning {
                margin-top: 18px;
                padding: 14px 16px;
                border-radius: var(--r-md);
                border: 1px solid
                    rgba(41, 121, 242, .18);
                background:
                    rgba(41, 121, 242, .06);
                color: var(--txt3);
                font-size: 12px;
                line-height: 1.7;
            }

            .company-object {
                padding: 26px;
                border: 1px solid var(--brd);
                border-radius: var(--r-xl);
                background: var(--card-bg);
            }

            .company-object p {
                color: var(--txt2);
                font-size: 14px;
                line-height: 1.85;
                margin: 0;
            }

            @media (max-width: 767px) {
                .company-reg-hero {
                    padding: 64px 24px 44px;
                }

                .company-reg-section {
                    padding: 44px 20px;
                }

                .company-reg-grid {
                    grid-template-columns: 1fr;
                }

                .share-stats {
                    grid-template-columns: 1fr;
                }

                .share-live-top {
                    align-items: flex-start;
                    flex-direction: column;
                }
            }
        `;

        const previous =
            document.getElementById(
                'company-registration-page-css'
            );

        previous?.remove();

        document.head.appendChild(style);

        return () => {
            style.remove();
        };
    }, []);

    useEffect(() => {
        let active = true;

        async function loadMetrics() {
            try {
                const response =
                    await fetch('/api/company/share-value', {
                        headers: {
                            Accept: 'application/json',
                        },
                    });

                if (!response.ok) {
                    throw new Error(
                        'Unable to fetch company metrics'
                    );
                }

                const data: ShareMetrics =
                    await response.json();

                if (active) {
                    setMetrics(data);
                    setLoading(false);
                }
            } catch {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadMetrics();

        // Public page refreshes the latest server value
        // every 60 seconds.
        const interval = window.setInterval(
            loadMetrics,
            60_000
        );

        return () => {
            active = false;
            window.clearInterval(interval);
        };
    }, []);

    const bookValue =
        metrics?.estimated_book_value_per_share ??
        null;

    const connected =
        metrics?.status === 'connected';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',

        name: 'Ayamil Coders',

        legalName:
            'AYAMIL CODERS (SMC-PRIVATE) LIMITED',

        url: 'https://ayamilcoders.com',

        identifier: [
            {
                '@type': 'PropertyValue',
                name: 'SECP CUIN',
                value: '0357981',
            },
            {
                '@type': 'PropertyValue',
                name: 'FBR Registration Number',
                value: 'K075347',
            },
        ],
    };

    return (
        <>
            <SEO
                title="Company Registration & Legal Information"
                description="Public company registration information for AYAMIL CODERS (SMC-PRIVATE) LIMITED including SECP CUIN, FBR registration, share capital and live estimated book value per share."
                keywords="Ayamil Coders registration, SECP CUIN 0357981, FBR K075347, AYAMIL CODERS SMC PRIVATE LIMITED"
                url="https://ayamilcoders.com/company-registration"
                schema={schema}
            />

            <section className="company-reg-hero">
                <div
                    style={{
                        position: 'absolute',
                        width: '460px',
                        height: '460px',
                        borderRadius: '50%',
                        filter: 'blur(100px)',
                        background:
                            'rgba(41,121,242,.08)',
                        top: '-170px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        pointerEvents: 'none',
                    }}
                />

                <div className="company-reg-hero-inner">
                    <span className="section-lbl">
                        Official Company Information
                    </span>

                    <h1 className="company-reg-title">
                        AYAMIL CODERS{' '}
                        <span className="shimmer-txt">
                            (SMC-PRIVATE) LIMITED
                        </span>
                    </h1>

                    <p className="company-reg-lead">
                        Selected public legal,
                        registration and capital
                        information for Ayamil Coders.
                    </p>

                    <div className="company-reg-badges">
                        <span className="company-reg-badge">
                            <span className="company-reg-dot" />
                            SECP Registered
                        </span>

                        <span className="company-reg-badge">
                            CUIN 0357981
                        </span>

                        <span className="company-reg-badge">
                            FBR K075347
                        </span>
                    </div>
                </div>
            </section>

            <section className="company-reg-section">
                <div className="company-reg-wrap">
                    <div className="company-reg-head">
                        <span className="section-lbl">
                            Registration
                        </span>

                        <h2>
                            Legal Entity Information
                        </h2>

                        <p>
                            Public company-level information
                            only. Personal identity details
                            are not published here.
                        </p>
                    </div>

                    <div className="company-reg-grid">
                        {companyDetails.map(
                            (item, index) => (
                                <div
                                    key={item.label}
                                    className={
                                        index < 3
                                            ? 'company-reg-card primary'
                                            : 'company-reg-card'
                                    }
                                >
                                    <div className="company-reg-label">
                                        {item.label}
                                    </div>

                                    <div className="company-reg-value">
                                        {item.value}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            <section className="company-reg-section alt">
                <div className="company-reg-wrap">
                    <div className="company-reg-head">
                        <span className="section-lbl">
                            Share Capital
                        </span>

                        <h2>
                            Registered Capital Structure
                        </h2>
                    </div>

                    <div className="company-reg-grid">
                        {capitalDetails.map((item) => (
                            <div
                                key={item.label}
                                className="company-reg-card"
                            >
                                <div className="company-reg-label">
                                    {item.label}
                                </div>

                                <div className="company-reg-value">
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="company-reg-section">
                <div className="company-reg-wrap">
                    <div className="company-reg-head">
                        <span className="section-lbl">
                            Financial Indicator
                        </span>

                        <h2>
                            Estimated Book Value per Share
                        </h2>

                        <p>
                            Automatically calculated from
                            the latest synced company
                            financial snapshot.
                        </p>
                    </div>

                    <div className="share-live">
                        <div className="share-live-top">
                            <div>
                                <div className="company-reg-label">
                                    Estimated Book Value
                                    per Share
                                </div>

                                <div className="share-live-value">
                                    {loading
                                        ? 'Loading…'
                                        : connected
                                          ? formatPKR(
                                                bookValue
                                            )
                                          : 'Not connected'}
                                </div>

                                <div className="share-live-sub">
                                    Formula: Net Assets ÷
                                    1,000 ordinary shares
                                </div>
                            </div>

                            <div
                                className={
                                    connected
                                        ? 'share-live-status connected'
                                        : 'share-live-status'
                                }
                            >
                                <span
                                    className={
                                        connected
                                            ? 'company-reg-dot'
                                            : ''
                                    }
                                />

                                {connected
                                    ? 'Live data connected'
                                    : 'API integration pending'}
                            </div>
                        </div>

                        <div className="share-stats">
                            <div className="share-stat">
                                <div className="company-reg-label">
                                    Official Face Value
                                </div>

                                <div className="company-reg-value">
                                    PKR 10.00
                                </div>
                            </div>

                            <div className="share-stat">
                                <div className="company-reg-label">
                                    Net Assets
                                </div>

                                <div className="company-reg-value">
                                    {connected
                                        ? formatPKR(
                                              metrics?.net_assets ??
                                                  null
                                          )
                                        : '—'}
                                </div>
                            </div>

                            <div className="share-stat">
                                <div className="company-reg-label">
                                    Last Updated
                                </div>

                                <div className="company-reg-value">
                                    {metrics?.last_updated
                                        ? new Date(
                                              metrics.last_updated
                                          ).toLocaleString(
                                              'en-PK'
                                          )
                                        : 'Waiting for sync'}
                                </div>
                            </div>
                        </div>

                        <div className="share-warning">
                            This is an estimated book value
                            based on company financial
                            records. It is not a stock-market
                            price, public trading price or
                            offer to buy or sell shares.
                        </div>
                    </div>
                </div>
            </section>

            <section className="company-reg-section alt">
                <div className="company-reg-wrap">
                    <div className="company-reg-head">
                        <span className="section-lbl">
                            Principal Business
                        </span>

                        <h2>
                            Information Technology &
                            Software Services
                        </h2>
                    </div>

                    <div className="company-object">
                        <p>
                            The company's principal business
                            includes software development,
                            data processing, computer and
                            technology services, IT
                            consultancy, software and
                            hardware related services,
                            training, and permitted software
                            and hardware trading activities,
                            subject to any approvals required
                            by relevant authorities.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
