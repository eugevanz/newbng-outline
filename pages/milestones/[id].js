import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import BackButton from "../../components/back-button";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import moment from "moment";
import Image from "next/image";
import { useForm } from "react-hook-form";

function Milestone() {
  const {
    query: { id }
  } = useRouter();
  const { user } = Auth.useUser();
  const [milestone, setMilestone] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user &&
      supabase
        .from("milestones")
        .update(formData)
        .eq("id", id)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
  }

  useEffect(
    () =>
      id &&
      supabase
        .from("milestones")
        .select("*")
        .eq("id", id)
        .then((data) => setMilestone(data.data.shift())),
    [id]
  );

  useEffect(
    () =>
      milestone &&
      supabase
        .from("profiles")
        .select("name")
        .eq("id", milestone.user_id)
        .then((data) => setOwner(data.data)),
    [milestone]
  );

  useEffect(
    () =>
      milestone &&
      supabase
        .from("projects")
        .select("*")
        .eq("id", milestone.project_id)
        .then((data) => setProject(data.data)),
    [milestone]
  );

  useEffect(
    () =>
      milestone &&
      supabase
        .from("tasks")
        .select("*")
        .eq("milestone_id", milestone.id)
        .then((data) => setTasks(data.data)),
    [milestone]
  );

  return (
    <div className="uk-width-expand@m">
      <div className="uk-child-width-1-2@m" data-uk-grid="masonry: true">
        <div>
          <BackButton page="milestones" />
        </div>

        <div>
          {milestone && (
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
                      {milestone.name}
                    </h5>
                    <p className="uk-text-meta uk-margin-remove-top">
                      {milestone.user_id}
                    </p>
                  </div>
                </div>
              </div>

              <div className="uk-card-body">
                <input
                  {...register("name")}
                  className="uk-input uk-form-small"
                  type="text"
                  id="form-stacked-text"
                  placeholder={milestone.name}
                  disbaled={!checked}
                ></input>

                {project && (
                  <div className="uk-text-small">
                    <code>Project</code> {project.name}
                  </div>
                )}

                <div className="uk-width-1-2">
                  <select
                    {...register("status")}
                    className="uk-select uk-form-small"
                    disbaled={!checked}
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="uk-text-small uk-margin">
                  <code>Created on</code>
                  {moment(milestone.created_at).format("MMMM Do YYYY")}
                </div>

                <div className="uk-grid-small" data-uk-grid>
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
                        placeholder={moment(milestone.start_date).format(
                          "MMMM DD YYYY"
                        )}
                        disbaled={!checked}
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
                        placeholder={moment(milestone.end_date).format(
                          "MMMM DD YYYY"
                        )}
                        disbaled={!checked}
                      ></input>
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
            </div>
          )}
        </div>

        <div>
          {tasks && (
            <ReadAllRows
              data={tasks}
              title={`${milestone.name} tasks`}
              table="tasks"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {milestone && <Delete item={milestone} table="milestones"></Delete>}
        </div>
      </div>
    </div>
  );
}
export default Milestone;
