import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import Image from "next/image";
import { useForm } from "react-hook-form";
import moment from "moment";

function Profiles() {
  // const { push } = useRouter();
  const user = supabase.auth.user();
  const [profile, setProfile] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [logs, setLogs] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [projects, setProjects] = useState(null);
  const [tasks, setTasks] = useState(null);
  const { register, handleSubmit } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user &&
      supabase
        .from("profiles")
        .update(formData)
        .eq("id", profile.id)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
  }

  // useEffect(() => !user && push("/"));

  useEffect(
    () =>
      supabase
        .from("profiles")
        .select("*")
        .then((data) => setProfiles(data.data)),
    []
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
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="profiles"></SearchAcrossProjects>
        </div>

        <div>
          {profiles && (
            <ReadAllRows
              data={profiles}
              title="All Profiles"
              setSelection={setProfile}
            ></ReadAllRows>
          )}
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
                    {<div className="uk-text-bold">{profile.name}</div>}
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
                      placeholder={profile.name}
                    ></input>
                  </div>

                  <div className="uk-width-expand">
                    <input
                      {...register("email")}
                      className="uk-input uk-form-small"
                      type="text"
                      id="form-stacked-text"
                      placeholder={profile.email}
                    ></input>
                  </div>

                  <div className="uk-width-1-2">
                    <div className="uk-form-controls">
                      <select
                        {...register("status")}
                        className="uk-select uk-form-small"
                        disabled={true}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Basic">Basic</option>
                      </select>
                    </div>
                  </div>

                  <div className="uk-width-expand">
                    <label
                      className="uk-form-label uk-text-meta"
                      htmlFor="form-stacked-text"
                    >
                      Updated on{" "}
                      {moment(profile.updated_at).format("MMMM Do YYYY")}
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
          )}
        </div>

        <div>
          {documents && (
            <ReadAllRows
              data={documents}
              title="User's documents"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {logs && <ReadAllRows data={logs} title="User's logs"></ReadAllRows>}
        </div>

        <div>
          {milestones && (
            <ReadAllRows
              data={milestones}
              title="User's milestones"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {projects && (
            <ReadAllRows data={projects} title="User's projects"></ReadAllRows>
          )}
        </div>

        <div>
          {tasks && (
            <ReadAllRows data={tasks} title="User's tasks"></ReadAllRows>
          )}
        </div>

        <div>
          {profile && <Delete item={profile} table="profiles"></Delete>}
        </div>
      </div>
    </div>
  );
}
export default Profiles;
