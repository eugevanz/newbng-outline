import { useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import moment from "moment";
import { useRouter } from "next/router";

function Logs() {
  const { push } = useRouter();
  const { user } = Auth.useUser();
  const [logs, setLogs] = useState(null);
  const [my, setMy] = useState(null);

  useEffect(
    () =>
      supabase
        .from("logs")
        .select("*")
        .then((data) => setLogs(data.data)),
    []
  );

  useEffect(
    () =>
      user &&
      supabase
        .from("logs")
        .select("*")
        .eq("user_id", user.id)
        .then((data) => setMy(data.data)),
    [user]
  );

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="logs"></SearchAcrossProjects>
        </div>

        <div>
          {logs && (
            <ReadAllRows
              data={logs}
              title="All Logs"
              table="logs"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {my && (
            <div className="uk-card uk-card-body uk-border-rounded">
              <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
                My Timesheet
              </div>

              <ul className="uk-list uk-list-large uk-list-divider uk-margin">
                {my.map((item) => (
                  <li key={item.id}>
                    <a
                      className="uk-link-toggle"
                      href="#list-item"
                      onClick={() => push(`/logs/${item.id}`)}
                    >
                      <div className="uk-text-bold uk-link-text">
                        Started on{" "}
                        {moment(item.start_date).format("MMMM DD YYYY")}
                      </div>
                      <div className="uk-text-meta">
                        Ended {moment(item.start_date).format("MMMM DD YYYY")}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Logs;
