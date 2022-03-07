import { useRouter } from "next/router";
import moment from "moment";
import supabase from "../context/auth-context";

const user = supabase.auth.user();

export async function getStaticProps() {
  const { data: logs } = await supabase
    .from("logs")
    .select("*")
    .eq("user_id", user.id);

  return { props: { logs } };
}

function MyLogs({ logs }) {
  const router = useRouter();

  return (
    <div className="uk-card uk-card-body uk-border-rounded">
      <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
        My Timesheet
      </div>

      <ul className="uk-list uk-list-large uk-list-divider uk-margin">
        {logs.map((item) => (
          <li key={item.id}>
            <a
              className="uk-link-toggle"
              href="#list-item"
              onClick={() => router.push(`/logs/${item.id}`)}
              data-uk-scroll
            >
              <div className="uk-text-bold uk-link-text">
                Started on {moment(item.start_date).format("MMMM Do YYYY")}
              </div>
              <div className="uk-text-meta">
                Ended {moment(item.start_date).format("MMMM Do YYYY")}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MyLogs;
