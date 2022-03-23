import { useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import moment from "moment";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";
import BackButton from "../../components/back-button";

function Document() {
  const {
    query: { id }
  } = useRouter();
  const { user } = Auth.useUser();
  const [document, setDocument] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user &&
      supabase
        .from("documents")
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
        .from("documents")
        .select("*")
        .eq("id", id)
        .then((data) => setDocument(data.data.shift())),
    [id]
  );

  useEffect(
    () =>
      document &&
      supabase
        .from("profiles")
        .select("name")
        .eq("user_id", document.user_id)
        .then((data) => setOwner(data.data)),
    [document]
  );

  useEffect(
    () =>
      document &&
      supabase
        .from("tasks")
        .select("*")
        .eq("id", document.task_id)
        .then((data) => setTask(data.data)),
    [document]
  );

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <BackButton page="documents" />
        </div>

        <div>
          {document && (
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
                      {document.name}
                    </h5>
                    <p className="uk-text-meta uk-margin-remove-top">
                      {document.user_id}
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
                  placeholder={document.name}
                  disbaled={!checked}
                ></input>

                {task && (
                  <div className="uk-text-small">
                    <code>Task</code> {task.name}
                  </div>
                )}

                <div className="uk-text-small uk-margin">
                  <code>Created on</code>
                  {moment(document.created_at).format("MMMM Do YYYY")}
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
          {document && <Delete item={document} table="documents"></Delete>}
        </div>
      </div>
    </div>
  );
}
export default Document;
