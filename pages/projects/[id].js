import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import ReadAllRows from "../../components/read-all-rows";
import moment from "moment";
import Image from "next/image";
import { useForm } from "react-hook-form";

function Projects() {
  const {
    query: { id },
    push
  } = useRouter();
  const { user } = Auth.useUser();
  const [project, setProject] = useState(null);
  const [owner, setOwner] = useState(null);
  const [tasks, setTasks] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user &&
      supabase
        .from("projects")
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
        .from("projects")
        .select("*")
        .eq("id", id)
        .then((data) => setProject(data.data.shift())),
    [id]
  );

  useEffect(
    () =>
      project &&
      supabase
        .from("profiles")
        .select("*")
        .eq("id", project.user_id)
        .then((data) => setOwner(data.data)),
    [project]
  );

  useEffect(
    () =>
      project &&
      supabase
        .from("tasks")
        .select("*")
        .eq("project_id", project.id)
        .then((data) => setTasks(data.data)),
    [project]
  );

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <a
            href="#back"
            className="uk-icon-button"
            data-uk-icon="icon:close; ratio: 1.2"
            onClick={() => push("/projects")}
          >
            &#8203;
          </a>
        </div>
        <div>
          {owner && (
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
                      {project.name}
                    </h5>
                    <p className="uk-text-meta uk-margin-remove-top">
                      <div className="uk-text-meta">{project.user_id}</div>
                    </p>
                  </div>
                </div>
              </div>

              <div className="uk-card-body">
                <input
                  {...register("name")}
                  className="uk-input uk-form-small uk-border-rounded uk-margin"
                  type="text"
                  id="form-stacked-text"
                  placeholder={project.name}
                  disabled={!checked}
                ></input>
                <textarea
                  {...register("description")}
                  className="uk-textarea uk-form-small uk-border-rounded"
                  id="form-stacked-text"
                  rows="7"
                  placeholder={project.description}
                  disabled={!checked}
                ></textarea>

                <div className="uk-text-meta uk-margin">
                  Created on {moment(project.created_at).format("MMMM Do YYYY")}
                </div>
                <div className="uk-grid-small" data-uk-grid>
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
                        className="uk-input uk-form-small"
                        id="form-stacked-text"
                        type="text"
                        placeholder={moment(project.start_date).format(
                          "MMMM Do YYYY"
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
                        className="uk-input uk-form-small"
                        id="form-stacked-text"
                        type="text"
                        placeholder={moment(project.end_date).format(
                          "MMMM Do YYYY"
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
          {tasks && (
            <ReadAllRows
              data={tasks}
              title={`'${project.name}' tasks`}
              table="tasks"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {project && <Delete item={project} table="projects"></Delete>}
        </div>
      </div>
    </div>
  );
}
export default Projects;
