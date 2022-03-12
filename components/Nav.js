import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import supabase from "../context/auth-context";
import { Auth } from "@supabase/ui";

function Nav() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState("sign_in");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") setAuthView("update_password");
        if (event === "USER_UPDATED" || event === "SIGNED_OUT") {
          setTimeout(() => setAuthView("sign_in"), 1000);
          setUser(null);
        }
        if (event === "SIGNED_IN") setUser(session.user);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <div className="uk-width-1-4@m">
      {!user && (
        <div className="uk-card uk-card-small uk-card-body uk-margin-large-bottom">
          <Auth
            supabaseClient={supabase}
            view={authView}
            socialLayout="vertical"
            socialButtonSize="xlarge"
          ></Auth>
        </div>
      )}

      {authView === "update_password" && (
        <Auth.UpdatePassword supabaseClient={supabase}></Auth.UpdatePassword>
      )}

      {user && (
        <div className="uk-card uk-card-small uk-card-body uk-border-rounded">
          <ul className="uk-tab-right" data-uk-tab>
            <li className="uk-active">
              <a href="#dashboard" onClick={() => router.push("/")}>
                <span
                  data-uk-icon="icon: calendar"
                  className="uk-margin-small-right"
                ></span>
                Dashboard
              </a>
            </li>

            <li>
              <a
                href="#projects"
                onClick={() =>
                  user ? router.push("/projects") : router.push("/")
                }
              >
                <span
                  data-uk-icon="icon: database"
                  className="uk-margin-small-right"
                ></span>
                Projects
              </a>
            </li>

            <li>
              <a
                href="#milestones"
                onClick={() =>
                  user ? router.push("/milestones") : router.push("/")
                }
              >
                <span
                  data-uk-icon="icon: check"
                  className="uk-margin-small-right"
                ></span>
                Milestones
              </a>
            </li>

            <li>
              <a
                href="#tasks"
                onClick={() =>
                  user ? router.push("/tasks") : router.push("/")
                }
              >
                <span
                  data-uk-icon="icon: list"
                  className="uk-margin-small-right"
                ></span>
                Tasks
              </a>
            </li>

            <li>
              <a
                href="#logs"
                onClick={() => (user ? router.push("/logs") : router.push("/"))}
              >
                <span
                  data-uk-icon="icon: clock"
                  className="uk-margin-small-right"
                ></span>
                Timesheets
              </a>
            </li>

            <li>
              <a
                href="#documents"
                onClick={() =>
                  user ? router.push("/documents") : router.push("/")
                }
              >
                <span
                  data-uk-icon="icon: folder"
                  className="uk-margin-small-right"
                ></span>
                Documents
              </a>
            </li>

            <li>
              <a
                href="#users"
                onClick={() =>
                  user ? router.push("/profiles") : router.push("/")
                }
              >
                <span
                  data-uk-icon="icon: users"
                  className="uk-margin-small-right"
                ></span>
                Users
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default Nav;
