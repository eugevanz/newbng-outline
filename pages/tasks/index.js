import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import AddAttachment from "../../components/add-attachment";
import moment from "moment";
import Image from "next/image";
import { useForm } from "react-hook-form";

function Tasks() {
  const user = supabase.auth.user();
  // const { push } = useRouter();
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [my, setMy] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);
  const { register, handleSubmit } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user &&
      supabase
        .from("tasks")
        .update(formData)
        .eq("id", task.id)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
  }

  // useEffect(() => !user && push("/"));

  useEffect(
    () =>
      supabase
        .from("tasks")
        .select("*")
        .then((data) => setTasks(data.data)),
    []
  );

  useEffect(
    () =>
      user &&
      supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .then((data) => setMy(data.data)),
    [user]
  );

  useEffect(
    () =>
      task &&
      supabase
        .from("profiles")
        .select("*")
        .eq("user_id", task.user_id)
        .then((data) => setOwner(data.data.shift())),
    [task]
  );

  useEffect(
    () =>
      task &&
      supabase
        .from("projects")
        .select("name")
        .eq("id", task.project_id)
        .then((data) => setProject(data.data.shift())),
    [task]
  );

  return (
    <div className="uk-width-expand@m">
      <div className="uk-child-width-1-2@m" data-uk-grid="masonry: true">
        <div>
          <SearchAcrossProjects title="tasks"></SearchAcrossProjects>
        </div>

        <div>
          {tasks && (
            <ReadAllRows
              data={tasks}
              title="All Tasks"
              setSelection={setTask}
            ></ReadAllRows>
          )}
        </div>

        <div>
          {my && (
            <div className="uk-card uk-card-body uk-border-rounded">
              <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
                My Tasks
              </div>

              <ul className="uk-list uk-list-large uk-list-divider uk-margin">
                {my.map((item) => (
                  <li key={item.id}>
                    <a
                      className="uk-link-toggle"
                      href="#list-item"
                      onClick={() => setTask(item)}
                      data-uk-scroll
                    >
                      <div className="uk-text-bold uk-link-text">
                        {item.name.toUpperCase()}
                      </div>
                      <div className="uk-text-meta">
                        Created on{" "}
                        {moment(item.created_at).format("MMMM DD YYYY")}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          {owner & project && (
            <div
              id="details"
              className="uk-card uk-card-primary uk-card-small uk-border-rounded"
            >
              <div className="uk-card-header">
                <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                  <div className="uk-width-auto">
                    <Image
                      alt="profile"
                      className="uk-border-circle"
                      width="40"
                      height="40"
                      src="https://rawcdn.githack.com/eugevanz/newbng-outline/a1c909c10479fc190d7e9f885ee0d0d934b03e1a/public/art-hauntington-jzY0KRJopEI-unsplash.jpg"
                    ></Image>
                  </div>
                  <div className="uk-width-expand">
                    {<div className="uk-text-bold">{owner.name}</div>}
                  </div>
                </div>
              </div>

              <div className="uk-card-body">
                <form
                  name="update-form"
                  className="uk-form-stacked uk-margin uk-accordion-content"
                  onSubmit={handleSubmit(onSubmit)}
                  data-uk-grid
                  hidden
                >
                  <div className="uk-width-expand">
                    <input
                      {...register("name")}
                      className="uk-input uk-form-small"
                      type="text"
                      id="form-stacked-text"
                      placeholder={task.name}
                    ></input>
                  </div>

                  <div className="uk-width-1-2">
                    <div className="uk-form-controls">
                      <select
                        {...register("status")}
                        className="uk-select uk-form-small"
                        disabled={true}
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="uk-width-expand">
                    <label
                      className="uk-form-label uk-text-meta"
                      htmlFor="form-stacked-text"
                    >
                      Created on{" "}
                      {moment(task.created_at).format("MMMM DD YYYY")}
                    </label>
                  </div>

                  <div className="uk-width-expand">
                    <label
                      className="uk-form-label uk-text-meta"
                      htmlFor="form-stacked-text"
                    >
                      Project: {project.name}
                    </label>
                  </div>

                  <div className="uk-width-1-2">
                    <label
                      className="uk-form-label uk-text-meta"
                      htmlFor="form-stacked-text"
                    >
                      Start Date
                    </label>
                    <div className="uk-form-controls">
                      <input
                        {...register("start_date")}
                        className="uk-input uk-form-small"
                        id="form-stacked-text"
                        type="text"
                        placeholder={moment(task.start_date).format(
                          "MMMM DD YYYY"
                        )}
                      ></input>
                    </div>
                  </div>

                  <div className="uk-width-1-2">
                    <label
                      className="uk-form-label uk-text-meta"
                      htmlFor="form-stacked-text"
                    >
                      End Date
                    </label>
                    <div className="uk-form-controls">
                      <input
                        {...register("end_date")}
                        className="uk-input uk-form-small"
                        id="form-stacked-text"
                        type="text"
                        placeholder={moment(task.end_date).format(
                          "MMMM DD YYYY"
                        )}
                      ></input>
                    </div>
                  </div>

                  <div className="uk-width-1-1@s">
                    <button
                      type="submit"
                      className="uk-button uk-button-primary uk-width-expand@s"
                      disabled={!checked}
                    >
                      Update
                    </button>
                  </div>

                  <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    <label>
                      <input
                        className="uk-checkbox uk-text-meta"
                        type="checkbox"
                        onChange={(e) => setchecked(!checked)}
                      ></input>{" "}
                      <span className="uk-text-meta">Confirm update.</span>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        <div>
          <AddAttachment></AddAttachment>
        </div>

        <div>{task && <Delete item={task} table="tasks"></Delete>}</div>
      </div>
    </div>
  );
}
export default Tasks;
