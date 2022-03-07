import Script from "next/script";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.11.1/dist/js/uikit.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.11.1/dist/js/uikit-icons.min.js"></Script>
      <div className="uk-padding-small" data-uk-grid>
        <Nav></Nav>
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp; 