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
        <div className="uk-navbar-right">
          {!user ? (
            <div className="uk-grid-collapse" data-uk-grid>
              <div className="uk-width-auto">
                <Image
                  width="70"
                  height="52"
                  src="https://rawcdn.githack.com/eugevanz/newbng-outline/a1c909c10479fc190d7e9f885ee0d0d934b03e1a/public/NEWBGNG logo.001.png"
                  alt="company-logo"
                ></Image>
              </div>
              <div className="uk-width-expand">
                <span className="uk-text-large uk-text-bold">NEWBNG</span>
                &nbsp;
                <div className="uk-text-meta">Project Management</div>
              </div>
            </div>
          ) : (
            <ul className="uk-navbar-nav">
              <li>
                <a href="#dropdown">
                  <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                    <div className="uk-width-auto">
                      <Image
                        className="uk-border-circle"
                        width="40"
                        height="40"
                        src="https://rawcdn.githack.com/eugevanz/newbng-outline/a1c909c10479fc190d7e9f885ee0d0d934b03e1a/public/art-hauntington-jzY0KRJopEI-unsplash.jpg"
                        alt="hauntington"
                      ></Image>
                    </div>
                    <div className="uk-width-expand uk-text-left">
                      <h3 className="uk-card-title uk-text-small uk-text-bold uk-margin-remove-bottom">
                        {user?.user_metadata?.full_name ?? "NoName"}
                      </h3>
                      <p className="uk-text-meta uk-margin-remove-top">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </a>
                <div className="uk-navbar-dropdown">
                  <a href="#signout" onClick={() => supabase.auth.signOut()}>
                    Sign out
                  </a>
                </div>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
