import { useRouter } from "next/router";
import moment from "moment";

function MyLogs({ data }) {
  const router = useRouter();

  return (
    <div className="uk-card uk-card-body uk-border-rounded">
      <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
        My Timesheet
      </div>

      <ul className="uk-list uk-list-large uk-list-divider uk-margin">
        {data &&
          data.map((item) => (
            <li key={item.id}>
              <a
                className="uk-link-toggle"
                href="#list-item"
                onClick={() => router.push(`/logs/${item.id}`)}
                data-uk-scroll
              >
                <div className="uk-text-bold uk-link-text">
                  Started on {moment(item.start_date).format("MMMM DD YYYY")}
                </div>
                <div className="uk-text-meta">
                  Ended {moment(item.start_date).format("MMMM DD YYYY")}
                </div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default MyLogs;
