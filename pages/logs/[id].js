import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import BackButton from "../../components/back-button";
import Delete from "../../components/delete";
import moment from "moment";
import Image from "next/image";
import { useForm } from "react-hook-form";

function Log() {
  const {
    query: { id }
  } = useRouter();
  const { user } = Auth.useUser();
  const [log, setLog] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user &&
      supabase
        .from("logs")
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
        .from("logs")
        .select("*")
        .eq("id", id)
        .then((data) => setLog(data.data.shift())),
    [id]
  );

  useEffect(
    () =>
      log &&
      supabase
        .from("profiles")
        .select("name")
        .eq("id", log.user_id)
        .then((data) => setOwner(data.data)),
    [log]
  );

  useEffect(
    () =>
      log &&
      supabase
        .from("tasks")
        .select("*")
        .eq("id", log.task_id)
        .then((data) => setTask(data.data)),
    [log]
  );

  return (
    <div className="uk-width-expand@m">
      <div className="uk-child-width-1-2@m" data-uk-grid="masonry: true">
        <div>
          <BackButton page="logs" />
        </div>

        <div>
          {log && (
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
                      {log.user_id}
                    </h5>
                  </div>
                </div>
              </div>

              <div className="uk-card-body">
                <input
                  {...register("start_date")}
                  className="uk-input uk-form-small"
                  id="form-stacked-text"
                  type="text"
                  placeholder={moment(log.start_date).format("MMMM DD YYYY")}
                  disbaled={!checked}
                ></input>

                <div className="uk-grid-small" data-uk-grid>
                  <div className="uk-width-1-2">
                    <label
                      className="uk-form-label uk-text-meta"
                      htmlFor="form-stacked-text"
                    >
                      Start Date
                    </label>
                    <div className="uk-form-controls"></div>
                  </div>

                  {task && (
                    <div className="uk-text-small">
                      <code>Task</code> {task.name}
                    </div>
                  )}

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
                        placeholder={moment(log.end_date).format(
                          "MMMM DD YYYY"
                        )}
                        disbaled={!checked}
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="uk-width-1-2">
                  <select
                    {...register("status")}
                    className="uk-select uk-form-small"
                    disabled={!checked}
                  >
                    <option value="Active">Pending</option>
                    <option value="Completed">Approved</option>
                  </select>
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

        <div>{log && <Delete item={log} table="logs"></Delete>}</div>
      </div>
    </div>
  );
}
export default Log;
