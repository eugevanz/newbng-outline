import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProjectGroupDetails from "../../components/project-group-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";

function ProjectGroups() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  useEffect(
    () =>
      fetch("/api/project_groups").then((data) =>
        setData(data.find((item) => item.id === router.query.id))
      ),
    [router.query.id]
  );

  return (
    <div className="uk-width-expand@m">
      {user && (
        <div
          className="uk-child-width-1-2@m js-filter"
          data-uk-grid="masonry: true; parallax: 60">
          <div>
            <ProjectGroupDetails data={data}></ProjectGroupDetails>
          </div>

          <div>
            <Delete item={data} table="project_groups"></Delete>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProjectGroups;
