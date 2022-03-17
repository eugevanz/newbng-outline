import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import moment from "moment";
import Image from "next/image";
import { useForm } from "react-hook-form";

function Milestones() {
  const {push} = useRouter();
  const user = supabase.auth.user();
  const [milestone, setMilestone] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [my, setMy] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);
  const { register, handleSubmit } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user &&
      supabase
        .from("milestones")
        .update(formData)
        .eq("id", milestone.id)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
  }

  // useEffect(() => !user && push("/"));

  useEffect(
    () =>
      supabase
        .from("milestones")
        .select("*")
        .then((data) => setMilestones(data.data)),
    []
  );

  useEffect(
    () =>
      user &&
      supabase
        .from("milestones")
        .select("*")
        .eq("user_id", user.id)
        .then((data) => setMy(data.data)),
    [user]
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
        .single()
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
        .single()
        .then((data) => setTasks(data.data)),
    [milestone]
  );

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="milestones"></SearchAcrossProjects>
        </div>

        <div>
          {milestones && (
            <ReadAllRows
              data={milestones}
              title="All Milestones"
              setSelection={setMilestone}
            ></ReadAllRows>
          )}
        </div>

        <div>
          {my && (
            <div className="uk-card uk-card-body uk-border-rounded">
              <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
                My Milestones
              </div>

              <ul className="uk-list uk-list-large uk-list-divider uk-margin">
                {my.map((item) => (
                  <li key={item.id}>
                    <a
                      className="uk-link-toggle"
                      href="#list-item"
                      onClick={() => setMilestone(item)}
                      data-uk-scroll
                    >
                      <div className="uk-text-bold uk-link-text">
                        {item.name}
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
                    {<div className="uk-text-bold">{owner}</div>}
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
                      placeholder={milestone.name}
                    ></input>
                  </div>

                  <div className="uk-width-expand">
                    <span className="uk-label">Project</span>
                    <label
                      className="uk-form-label uk-text-meta"
                      htmlFor="form-stacked-text"
                    >
                      <a href={`#${project.name}`}>{project.name}</a>
                    </label>
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
                      {moment(milestone.created_at).format("MMMM DD YYYY")}
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
                        placeholder={moment(milestone.start_date).format(
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
                        placeholder={moment(milestone.end_date).format(
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
          {tasks && (
            <ReadAllRows data={tasks} title="Milestones tasks"></ReadAllRows>
          )}
        </div>

        <div>
          {milestone && <Delete item={milestone} table="milestones"></Delete>}
        </div>
      </div>
    </div>
  );
}
export default Milestones;
