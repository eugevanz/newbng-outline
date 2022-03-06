import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DocumentDetails from "../../components/document-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";

function Document() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [owner, setOwner] = useState(null);
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  useEffect(
    () =>
      fetch("/api/documents").then((data) =>
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
            <DocumentDetails data={data} owner={owner}></DocumentDetails>
          </div>

          <div>
            <Delete item={data} table="documents"></Delete>
          </div>
        </div>
      )}
    </div>
  );
}
export default Document;