import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import BackButton from "../../components/back-button";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import Image from "next/image";
import { useForm } from "react-hook-form";
import moment from "moment";

function Profile() {
  const {
    query: { id }
  } = useRouter();
  const { user } = Auth.useUser();
  const [profile, setProfile] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [logs, setLogs] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [projects, setProjects] = useState(null);
  const [tasks, setTasks] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user &&
      supabase
        .from("profiles")
        .update(formData)
        .eq("id", id)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
  }

  useEffect(
    () =>
      id &&
      supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .then((data) => setProfile(data.data.shift())),
    [id]
  );

  useEffect(
    () =>
      profile &&
      supabase
        .from("documents")
        .select("*")
        .eq("user_id", profile.id)
        .then((data) => setDocuments(data.data)),
    [profile]
  );

  useEffect(
    () =>
      profile &&
      supabase
        .from("logs")
        .select("*")
        .eq("user_id", profile.id)
        .then((data) => setLogs(data.data)),
    [profile]
  );

  useEffect(
    () =>
      profile &&
      supabase
        .from("milestones")
        .select("*")
        .eq("user_id", profile.id)
        .then((data) => setMilestones(data.data)),
    [profile]
  );

  useEffect(
    () =>
      profile &&
      supabase
        .from("projects")
        .select("*")
        .eq("user_id", profile.id)
        .then((data) => setProjects(data.data)),
    [profile]
  );

  useEffect(
    () =>
      profile &&
      supabase
        .from("tasks")
        .select("*")
        .eq("user_id", profile.id)
        .then((data) => setTasks(data.data)),
    [profile]
  );

  return (
    <div className="uk-width-expand@m">
      <div className="uk-child-width-1-2@m" data-uk-grid="masonry: true">
        <div>
          <BackButton page="profiles" />
        </div>

        <div>
          {profile && (
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
                      {profile.name}
                    </h5>
                    <p className="uk-text-meta uk-margin-remove-top">
                      {profile.email}
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
                  placeholder={profile.name}
                  disabled={!checked}
                ></input>

                <input
                  {...register("email")}
                  className="uk-input uk-form-small uk-border-rounded uk-margin"
                  type="text"
                  id="form-stacked-text"
                  placeholder={profile.email}
                  disabled={!checked}
                ></input>

                <div className="uk-width-1-2">
                  <select
                    {...register("status")}
                    className="uk-select uk-form-small uk-border-rounded uk-margin"
                    disbaled={!checked}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>

                <div className="uk-text-small uk-margin">
                  <code>Updated on</code>
                  {moment(profile.updated_at).format("MMMM Do YYYY")}
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
              title="User's documents"
              table="documents"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {logs && (
            <ReadAllRows
              data={logs}
              title="User's logs"
              table="logs"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {milestones && (
            <ReadAllRows
              data={milestones}
              title="User's milestones"
              table="milestones"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {projects && (
            <ReadAllRows
              data={projects}
              title="User's projects"
              table="projects"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {tasks && (
            <ReadAllRows
              data={tasks}
              title="User's tasks"
              table="projects"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {profile && <Delete item={profile} table="profiles"></Delete>}
        </div>
      </div>
    </div>
  );
}
export default Profile;
