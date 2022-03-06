import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TaskDetails from "../../components/task-details";
import AddAttachment from "../../components/add-attachment";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";

function Task() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [owner, setOwner] = useState(null);
  const [projectName, setProjectName] = useState(null);
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  useEffect(
    () =>
      supabase
        .from("tasks")
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

  useEffect(
    () =>
      data &&
      fetch("/api/projects").then((data) =>
        setProjectName(data.find((item) => item.id === data.project_id).name)
      ),
    [data]
  );

  return (
    <div className="uk-width-expand@m uk-margin">
      {user ? (
        <div
          className="uk-child-width-1-2@m"
          data-uk-grid="masonry: true; parallax: 60"
        >
          <div>
            <TaskDetails
              data={data}
              owner={owner}
              projectName={projectName}
            ></TaskDetails>
          </div>

          <div>
            <AddAttachment></AddAttachment>
          </div>

          <div>
            <Delete item={data} table="tasks"></Delete>
          </div>
        </div>
      ) : (
        <div className="uk-child-width-1-2@m" data-uk-spinner></div>
      )}
    </div>
  );
}
export default Task;
