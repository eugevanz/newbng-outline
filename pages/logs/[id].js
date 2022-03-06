import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LogDetails from "../../components/log-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";

function Log() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [owner, setOwner] = useState(null);
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  useEffect(
    () =>
      fetch("/api/logs").then((data) =>
        setData(data.find((item) => item.id === router.query.id))
      ),
    [router.query.id]
  );

  useEffect(
    () =>
      data &&
      fetch(`/api/owner/${data.user_id}`).then((data) => setOwner(data)),
    [data]
  );

  return (
    <div className="uk-width-expand@m">
      {user && (
        <div
          className="uk-child-width-1-2@m js-filter"
          data-uk-grid="masonry: true; parallax: 60"
        >
          <div>
            <LogDetails data={data} owner={owner}></LogDetails>
          </div>

          <div>
            <Delete item={data} table="logs"></Delete>
          </div>
        </div>
      )}
    </div>
  );
}
export default Log;