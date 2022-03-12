import supabase from "../context/auth-context";
import { Auth } from "@supabase/ui";
import { useState, useEffect } from "react";

function Authentication() {
  const [authView, setAuthView] = useState("sign_in");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setAuthView("update_password");
      if (event === "USER_UPDATED")
        setTimeout(() => setAuthView("sign_in"), 1000);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <div className="uk-card uk-card-small uk-margin-large-bottom">
      <div className="uk-card-body">
        <Auth
          supabaseClient={supabase}
          providers={["google", "github"]}
          view={authView}
          socialLayout="vertical"
          socialButtonSize="xlarge"
        ></Auth>
      </div>
    </div>
  );
}
export default Authentication;
