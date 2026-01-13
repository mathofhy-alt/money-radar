import Script from "next/script";

export default function GoogleAdSense() {
    const pid = process.env.NEXT_PUBLIC_ADSENSE_ID;

    if (!pid) return null;

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pid}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
