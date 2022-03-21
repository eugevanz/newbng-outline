import moment from "moment";
import { useRouter } from "next/router";

function ReadAllRows({ data, title, table }) {
  const { push } = useRouter();

  return (
    <div className="uk-card uk-card-secondary uk-card-small uk-card-body uk-border-rounded">
      <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
        {title}
      </div>

      <ul className="uk-list uk-list-large uk-list-divider uk-margin">
        {data.map((item) => (
          <li key={item.id}>
            <a
              className="uk-link-toggle"
              href="#list-item"
              onClick={() => push(`/${table}/${item.id}`)}
              data-uk-scroll
            >
              <div className="uk-text-bold uk-link-text">{item.name}</div>
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
export default ReadAllRows;
