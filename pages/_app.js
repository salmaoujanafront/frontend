import "../styles/globals.css";
import "../styles/style.css";
import "../styles/legalnotice.css";
import Head from "next/head";
import CookieConsent from "react-cookie-consent";
import Script from "next/script";
import Footer from "../components/Footer";
import ReactGA4 from "react-ga4";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {

  useEffect(() => {
    ReactGA4.initialize('G-NXLM9R29M9');
    ReactGA4.send({ hitType: "pageview", page: window.location.pathname });
  }, [])


  
  return (
    <>
     <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-1WFQ3BGZS0"></Script>
  <Script
   id='google-analytics'
   strategy="afterInteractive"
   dangerouslySetInnerHTML={{
    __html: `
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-1WFQ3BGZS0', {
      page_path: window.location.pathname,
     });
    `,
    }}
  />
      <Head>
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
        />
      </Head>
      <Component {...pageProps} />
      <CookieConsent
      style={{ display: 'flex', flexWrap: 'wrap'}} 
      buttonStyle={{ backgroundColor: "#008039", fontSize: "16px",color:"#fff" }} 
      buttonText="Accepter"
      enableDeclineButton
      declineButtonText='Refusé'
      declineButtonStyle={{ backgroundColor: "#008039", fontSize: "16px",color:"#fff" }}
      >
        <p style={{ width: '100%', fontSize: '20px', }}>
        Ce site thétiptop utilise des cookies pour vous offrir une expérience de navigation personnalisée. En continuant à utiliser ce site, vous acceptez notre politique de confidentialité ?
        </p>
      </CookieConsent>
      <Footer />
    </>
  );
}

export default MyApp;
