import { useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import moment from "moment";
import { useRouter } from "next/router";

function Documents() {
  const { push } = useRouter();
  const { user } = Auth.useUser();
  const [docs, setDocs] = useState(null);
  const [my, setMy] = useState(null);

  useEffect(
    () =>
      user &&
      supabase
        .from("documents")
        .select("*")
        .then((data) => setDocs(data.data)),
    [user]
  );

  useEffect(
    () =>
      user &&
      supabase
        .from("documents")
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
          <SearchAcrossProjects title="documents"></SearchAcrossProjects>
        </div>

        <div>
          {docs && (
            <ReadAllRows
              data={docs}
              title="All documents"
              table="documents"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {my && (
            <div className="uk-card uk-card-body uk-border-rounded">
              <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
                My Documents
              </div>

              <ul className="uk-list uk-list-large uk-list-divider uk-margin">
                {my.map((item) => (
                  <li key={item.id}>
                    <a
                      className="uk-link-toggle"
                      href="#list-item"
                      onClick={() => push(`/documents/${item.id}`)}
                    >
                      <div className="uk-text-bold uk-link-text">
                        {item.name}
                      </div>
                      <div className="uk-text-meta">
                        Created on{" "}
                        {moment(item.created_at).format("MMMM DD YYYY")}
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
export default Documents;
