import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import moment from "moment";

function Projects() {
  const { push } = useRouter();
  const { user } = Auth.useUser();
  const [projects, setProjects] = useState(null);
  const [my, setMy] = useState(null);

  // useEffect(() => !user && push("/"));

  useEffect(
    () =>
      supabase
        .from("projects")
        .select("*")
        .then((data) => setProjects(data.data)),
    []
  );

  useEffect(
    () =>
      user &&
      supabase
        .from("projects")
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
          <SearchAcrossProjects title="projects"></SearchAcrossProjects>
        </div>

        <div>
          {projects && (
            <ReadAllRows
              data={projects}
              title="All Projects"
              table="projects"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {my && (
            <div className="uk-card uk-card-body uk-border-rounded">
              <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
                My Projects
              </div>

              <ul className="uk-list uk-list-large uk-list-divider uk-margin">
                {my.map((item) => (
                  <li key={item.id}>
                    <a
                      className="uk-link-toggle"
                      href="#list-item"
                      onClick={() => push(`/projects/${item.id}`)}
                      data-uk-scroll
                    >
                      <div className="uk-text-bold uk-link-text">
                        {item.name}
                      </div>
                      <div className="uk-text-meta">
                        Created on{" "}
                        {moment(item.created_at).format("MMMM DD YYYY")}
                      </div>
                      <div className="uk-text-default uk-text-truncate">
                        {item.description}
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
export default Projects;
