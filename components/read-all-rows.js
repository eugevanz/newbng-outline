import { useRouter } from "next/router";
import moment from "moment";
import { useEffect, useState } from "react";
import supabase from "../context/auth-context";

function ReadAllRows({ table, title }) {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    supabase
      .from(table)
      .select("*")
      .then((data) => setData(data.data));
  }, [table]);

  return (
    data && (
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
                onClick={() => router.push(`/${table}/${item.id}`)}
                data-uk-scroll
              >
                <div className="uk-text-bold uk-link-text">
                  {item.name.toUpperCase()}
                </div>
                <div className="uk-text-meta">
                  Created on {moment(item.created_at).format("MMMM Do YYYY")}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
export default ReadAllRows;
