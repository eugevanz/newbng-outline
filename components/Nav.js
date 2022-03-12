import { useRouter } from "next/router";
import Image from "next/image";
import supabase from "../context/auth-context";
import Auth from "./auth";

function Nav() {
  const router = useRouter();
  const user = supabase.auth.user();

  return (
    <div className="uk-width-1-4@m">
      {!user ? (
        <Auth></Auth>
      ) : (
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
