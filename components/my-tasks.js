import { useRouter } from "next/router";
import moment from "moment";
import supabase from "../context/auth-context";

const user = supabase.auth.user();

export async function getStaticProps() {
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id);

  return { props: { tasks } };
}

function MyTasks({ tasks }) {
  const router = useRouter();

  return (
    <div className="uk-card uk-card-body uk-border-rounded">
      <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
        My Tasks
      </div>

      <ul className="uk-list uk-list-large uk-list-divider uk-margin">
        {tasks.map((item) => (
          <li key={item.id}>
            <a
              className="uk-link-toggle"
              href="#list-item"
              onClick={() => router.push(`/tasks/${item.id}`)}
              data-uk-scroll
            >
              <div className="uk-text-bold uk-link-text">
                {item.name.toUpperCase()}
              </div>
              <div className="uk-text-meta">
                Created on {moment(item.created_at).format("MMMM DD YYYY")}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MyTasks;
