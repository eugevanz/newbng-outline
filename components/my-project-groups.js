import { useRouter } from "next/router";
import moment from "moment";

function MyProjectGroups({ data }) {
  const router = useRouter();

  return (
    <div className="uk-card uk-card-body uk-border-rounded">
      <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
        My Project Groups
      </div>

      <ul className="uk-list uk-list-large uk-list-divider uk-margin">
        {data &&
          data.map((item) => (
            <li key={item.id}>
              <a
                className="uk-link-toggle"
                href="#list-item"
                onClick={() => router.push(`/project_groups/${item.id}`)}
                data-uk-scroll
              >
                <div className="uk-text-bold uk-link-text">{item.name}</div>
                <div className="uk-text-meta">
                  Created on {moment(item.created_at).format("MMMM DD YYYY")}
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
