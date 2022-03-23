import { useRouter } from "next/router";
import Image from "next/image";
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
    <div className="uk-width-1-4@m uk-margin-medium-top">
      {user ? (
        <div className="uk-card uk-card-small uk-card-body">
          <Image
            className="uk-border-circle"
            width="70"
            height="70"
            src="https://rawcdn.githack.com/eugevanz/newbng-outline/a1c909c10479fc190d7e9f885ee0d0d934b03e1a/public/art-hauntington-jzY0KRJopEI-unsplash.jpg"
            alt="hauntington"
          ></Image>

          <div className="uk-text-large uk-text-bold">
            {user?.user_metadata?.full_name ?? "NoName"}
          </div>
          <div className="uk-text-meta">{user?.email}</div>
        </div>
      ) : (
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
      )}

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
        <div className="uk-card uk-card-small uk-card-body">
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
                href="#project_groups"
                onClick={() =>
                  user ? router.push("/project_groups") : router.push("/")
                }
              >
                <span
                  data-uk-icon="icon: database"
                  className="uk-margin-small-right"
                ></span>
                Project Groups
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

          <div className="uk-grid-collapse uk-margin-large" data-uk-grid>
            <div className="uk-width-auto">
              <Image
                width="35"
                height="26"
                src="https://rawcdn.githack.com/eugevanz/newbng-outline/a1c909c10479fc190d7e9f885ee0d0d934b03e1a/public/NEWBGNG logo.001.png"
                alt="company-logo"
              ></Image>
            </div>
            <div className="uk-width-expand">
              <span className="uk-text-meta uk-text-bold">NEWBNG</span>
              <span className="uk-text-meta">
                {" "}
                Professional Project Management
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Nav;
