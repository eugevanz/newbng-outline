import moment from "moment";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import supabase from "../context/auth-context";

function ProfileDetails({ data }) {
  const user = supabase.auth.user();
  const { register, handleSubmit } = useForm();
  const [checked, setchecked] = useState(false);

  async function onSubmit(formData) {
    user &&
      fetch("/api/profiles", {
        method: "PUT",
        body: JSON.stingify({ formData, id: data.id }),
        headers: { "Content-Type": "application/json" }
      });
  }

  return (
    data && (
      <div
        id="details"
        className="uk-card uk-card-primary uk-card-small uk-border-rounded">
        <div className="uk-card-header">
          <div className="uk-grid-small uk-flex-middle" data-uk-grid>
            <div className="uk-width-auto">
              <Image
                alt="profile"
                className="uk-border-circle"
                width="40"
                height="40"
                src="/art-hauntington-jzY0KRJopEI-unsplash.jpg"></Image>
            </div>
            <div className="uk-width-expand">
              {<div className="uk-text-bold">{data.name}</div>}
            </div>
          </div>
        </div>

        <div className="uk-card-body">
          <form
            name="update-form"
            className="uk-form-stacked uk-margin uk-accordion-content"
            onSubmit={handleSubmit(onSubmit)}
            data-uk-grid
            hidden>
            <div className="uk-width-expand">
              <input
                {...register("name")}
                className="uk-input uk-form-small"
                type="text"
                id="form-stacked-text"
                placeholder={data.name}></input>
            </div>

            <div className="uk-width-expand">
              <input
                {...register("email")}
                className="uk-input uk-form-small"
                type="text"
                id="form-stacked-text"
                placeholder={data.email}></input>
            </div>

            <div className="uk-width-1-2">
              <div className="uk-form-controls">
                <select
                  {...register("status")}
                  className="uk-select uk-form-small"
                  disabled={true}>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
            </div>

            <div className="uk-width-expand">
              <label
                className="uk-form-label uk-text-meta"
                htmlFor="form-stacked-text">
                Updated on {moment(data.updated_at).format("MMMM Do YYYY")}
              </label>
            </div>

            <div className="uk-width-1-1@s">
              <button
                type="submit"
                className="uk-button uk-button-primary uk-width-expand@s"
                disabled={!checked}>
                Update
              </button>
            </div>

            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label>
                <input
                  className="uk-checkbox uk-text-meta"
                  type="checkbox"
                  onChange={(e) => setchecked(!checked)}></input>{" "}
                <span className="uk-text-meta">Confirm update.</span>
              </label>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
export default ProfileDetails;
