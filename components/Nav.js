import { useRouter } from "next/router";
import Image from "next/image";
import supabase from "../context/auth-context";
import Auth from "./auth";

function Nav() {
  const router = useRouter();
  const user = supabase.auth.user();

  return (
    <div className="uk-width-1-4@m">
      <div className="uk-child-width-1-1 uk-grid-small" data-uk-grid>
        <div className="uk-margin-large-bottom">
          <div className="uk-grid-collapse" data-uk-grid>
            <div className="uk-width-auto">
              <Image
                width="70"
                height="52"
                src="/NEWBGNG logo.001.png"
                alt="company-logo"
              ></Image>
            </div>
            <div className="uk-width-expand">
              <span className="uk-text-large uk-text-bold">NEWBNG</span>
              &nbsp;
              <div className="uk-text-meta">Project Management</div>
            </div>
          </div>
        </div>

        {!user && (
          <div>
            <Auth></Auth>
          </div>
        )}

        {user && (
          <div>
            <div className="uk-card uk-card-small uk-card-body uk-border-rounded">
              <button className="uk-button uk-button-link uk-margin uk-inline">
                <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                  <div className="uk-width-auto">
                    <Image
                      className="uk-border-circle"
                      width="40"
                      height="40"
                      src="/art-hauntington-jzY0KRJopEI-unsplash.jpg"
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

                <div data-uk-dropdown="mode: click">
                  <ul className="uk-nav uk-dropdown-nav">
                    <li className="uk-text-meta">{user?.email}</li>
                    <li>
                      <a
                        href="#signout"
                        onClick={() => supabase.auth.signOut()}
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </button>
            </div>
          </div>
        )}

        <div>
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
                  onClick={() =>
                    user ? router.push("/logs") : router.push("/")
                  }
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
        </div>
      </div>
    </div>
  );
}
export default Nav;
