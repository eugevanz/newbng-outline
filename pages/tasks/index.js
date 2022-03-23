import { useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import moment from "moment";
import { useRouter } from "next/router";

function Tasks() {
  const { user } = Auth.useUser();
  const [tasks, setTasks] = useState(null);
  const [my, setMy] = useState(null);

  useEffect(
    () =>
      supabase
        .from("tasks")
        .select("*")
        .then((data) => setTasks(data.data)),
    []
  );

  useEffect(
    () =>
      user &&
      supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .then((data) => setMy(data.data)),
    [user]
  );

  return (
    <div className="uk-width-expand@m">
      <div className="uk-child-width-1-2@m" data-uk-grid="masonry: true">
        <div>
          <SearchAcrossProjects title="tasks"></SearchAcrossProjects>
        </div>

        <div>
          {tasks && (
            <ReadAllRows
              data={tasks}
              title="All Tasks"
              table="tasks"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {my && (
            <div className="uk-card uk-card-body uk-border-rounded">
              <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
                My Tasks
              </div>
              <MyTasks my={my} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Tasks;

function MyTasks({ my }) {
  const { push } = useRouter();

  return (
    <ul className="uk-list uk-list-large uk-list-divider uk-margin">
      {my.map((item) => (
        <li key={item.id}>
          <a
            className="uk-link-toggle"
            href="#list-item"
            onClick={() => push(`/tasks/${item.id}`)}
          >
            <div className="uk-text-bold uk-link-text">{item.name}</div>
            <div className="uk-text-meta">
              Created on {moment(item.created_at).format("MMMM DD YYYY")}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
