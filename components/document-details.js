import moment from "moment";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import supabase from "../context/auth-context";

function DocumentDetails({ data, owner, task }) {
  const user = supabase.auth.user();
  const { register, handleSubmit } = useForm();
  const [checked, setchecked] = useState(false);
  const router = useRouter();

  function onSubmit(formData) {
    user &&
      supabase
        .from("documents")
        .update(formData)
        .eq("id", data.id)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
  }

  return (
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
            {<div className="uk-text-bold">{owner && owner.name}</div>}
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
              placeholder={data.name}
            ></input>
          </div>

          <div className="uk-width-expand">
            <span className="uk-label">Task</span>
            <label
              className="uk-form-label uk-text-meta"
              htmlFor="form-stacked-text"
            >
              <a
                href={`#${task.name}`}
                onClick={() => router.push(`/tasks/${task.id}`)}
              >
                {task.name}
              </a>
            </label>
          </div>

          <div className="uk-width-expand">
            <label
              className="uk-form-label uk-text-meta"
              htmlFor="form-stacked-text"
            >
              Created on {moment(data.created_at).format("MMMM DD YYYY")}
            </label>
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
  );
}
export default DocumentDetails;
