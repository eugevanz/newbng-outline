import "../styles/globals.css";
import Script from "next/script";
import { Auth } from "@supabase/ui";
import supabase from "../context/auth-context";
import Nav from "../components/Nav";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.11.1/dist/js/uikit.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.11.1/dist/js/uikit-icons.min.js"></Script>

      <Auth.UserContextProvider supabaseClient={supabase}>
        <div className="uk-padding-small" data-uk-grid="parallax:96">
          <Nav></Nav>
          <div className="uk-width-expand">
            <Navbar></Navbar>
            <Component {...pageProps} />
          </div>
        </div>
      </Auth.UserContextProvider>
    </>
  );
}
export default MyApp;
