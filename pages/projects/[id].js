import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProjectDetails from "../../components/project-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";

function Project() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [owner, setOwner] = useState(null);
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  useEffect(
    () =>
      supabase
        .from("projects")
        .select("*")
        .then((data) =>
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
            <ProjectDetails data={data} owner={owner}></ProjectDetails>
          </div>

          <div>
            <Delete item={data} table="tasks"></Delete>
          </div>
        </div>
      )}
    </div>
  );
}
export default Project;
