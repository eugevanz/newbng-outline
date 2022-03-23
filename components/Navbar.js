import Image from "next/image";
import { useState, useEffect } from "react";
import supabase from "../context/auth-context";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") setUser(null);
        if (event === "SIGNED_IN") setUser(session.user);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <>
      <nav
        className="uk-navbar-container uk-navbar-transparent uk-padding-small uk-margin-right"
        data-uk-navbar
      >
        {user && (
          <div className="uk-navbar-right">
            <div>
              <a
                href="#signout"
                className="uk-button uk-button-danger uk-button-small uk-border-rounded"
                onClick={() => supabase.auth.signOut()}
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
