import { useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import AddAttachment from "../../components/add-attachment";
import BackButton from "../../components/back-button";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function Task() {
  const {
    query: { id }
  } = useRouter();
  const { user } = Auth.useUser();
  const [task, setTask] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [logs, setLogs] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user &&
      supabase
        .from("tasks")
        .update(formData)
        .eq("id", id)
        .then((data) => {
          reset();
          console.log(data);
        })
        .catch((error) => console.error(error));
  }

  useEffect(
    () =>
      id &&
      supabase
        .from("tasks")
        .select("*")
        .eq("id", id)
        .then((data) => setTask(data.data.shift())),
    [id]
  );

  useEffect(
    () =>
      task &&
      supabase
        .from("profiles")
        .select("*")
        .eq("id", task.user_id)
        .then((data) => setOwner(data.data)),
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

  useEffect(
    () =>
      task &&
      supabase
        .from("documents")
        .select("*")
        .eq("task_id", task.id)
        .then((data) => setDocuments(data.data)),
    [task]
  );

  useEffect(
    () =>
      task &&
      supabase
        .from("logs")
        .select("*")
        .eq("task_id", task.id)
        .then((data) => setLogs(data.data)),
    [task]
  );

  return (
    <div className="uk-width-expand@m">
      <div className="uk-child-width-1-2@m" data-uk-grid="masonry: true">
        <div>
          <BackButton page="tasks" />
        </div>

        <div>
          {task && (
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
                    <h5 className="uk-text-bold uk-margin-remove-bottom">
                      {task.name}
                    </h5>
                    <p className="uk-text-meta uk-margin-remove-top">
                      {task.user_id}
                    </p>
                  </div>
                </div>
              </div>

              <div className="uk-card-body">
                <input
                  {...register("name")}
                  className="uk-input uk-form-small uk-border-rounded"
                  type="text"
                  id="form-stacked-text"
                  placeholder={task.name}
                  disabled={!checked}
                ></input>

                <div className="uk-width-1-2 uk-margin">
                  <select
                    {...register("status")}
                    className="uk-select uk-form-small uk-border-rounded"
                    disabled={!checked}
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="uk-text-small">
                  <code>Created on</code>
                  {moment(task.created_at).format("MMMM DD YYYY")}
                </div>

                {project && (
                  <div className="uk-text-small">
                    <code>Project</code> {project.name}
                  </div>
                )}

                <div className="uk-grid-small uk-margin" data-uk-grid>
                  <div className="uk-width-1-2">
                    <label
                      className="uk-form-label uk-text-small uk-text-bold"
                      htmlFor="form-stacked-text"
                    >
                      Start Date
                    </label>
                    <div className="uk-form-controls">
                      <input
                        {...register("start_date")}
                        className="uk-input uk-form-small uk-border-rounded"
                        id="form-stacked-text"
                        type="text"
                        placeholder={moment(task.start_date).format(
                          "MMMM DD YYYY"
                        )}
                        disabled={!checked}
                      ></input>
                    </div>
                  </div>

                  <div className="uk-width-1-2">
                    <label
                      className="uk-form-label uk-text-small uk-text-bold"
                      htmlFor="form-stacked-text"
                    >
                      End Date
                    </label>
                    <div className="uk-form-controls">
                      <input
                        {...register("end_date")}
                        className="uk-input uk-form-small uk-border-rounded"
                        id="form-stacked-text"
                        type="text"
                        placeholder={moment(task.end_date).format(
                          "MMMM DD YYYY"
                        )}
                        disabled={!checked}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>

              <div className="uk-card-footer">
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="uk-button uk-button-default uk-border-rounded"
                  disabled={!checked}
                >
                  Update
                </button>

                <div className="uk-margin">
                  <label>
                    <input
                      className="uk-checkbox"
                      type="checkbox"
                      onChange={(e) => {
                        setchecked(!checked);
                        reset();
                      }}
                    ></input>
                    <span className="uk-text-bold uk-margin-small-left">
                      Edit
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {documents && (
            <ReadAllRows
              data={documents}
              title={`'${task.name}' documents`}
              table="documents"
            ></ReadAllRows>
          )}
        </div>

        <div>
          <AddAttachment></AddAttachment>
        </div>

        <div>
          {logs && (
            <ReadAllRows
              data={logs}
              title={`'${task.name}' logs`}
              table="logs"
            ></ReadAllRows>
          )}
        </div>

        <div>{task && <Delete item={task} table="tasks"></Delete>}</div>
      </div>
    </div>
  );
}
export default Task;
