import { useRouter } from "next/router";
import moment from "moment";
import supabase from "../context/auth-context";

const user = supabase.auth.user();

export async function getStaticProps() {
  const { data: project_groups } = await supabase
    .from("project_groups")
    .select("*")
    .eq("user_id", user.id);

  return { props: { project_groups } };
}

function MyProjectGroups({ project_groups }) {
  const router = useRouter();

  return (
    <div className="uk-card uk-card-body uk-border-rounded">
      <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
        My Project Groups
      </div>

      <ul className="uk-list uk-list-large uk-list-divider uk-margin">
        {project_groups.map((item) => (
          <li key={item.id}>
            <a
              className="uk-link-toggle"
              href="#list-item"
              onClick={() => router.push(`/project_groups/${item.id}`)}
              data-uk-scroll
            >
              <div className="uk-text-bold uk-link-text">{item.name}</div>
              <div className="uk-text-meta">
                Created on {moment(item.created_at).format("MMMM Do YYYY")}
              </div>
              <div className="uk-text-default uk-text-truncate">
                {item.description}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MyProjectGroups;
