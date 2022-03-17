import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import Image from "next/image";
import { useForm } from "react-hook-form";
import moment from "moment";

function ProjectGroups(props) {
  // const { push } = useRouter();
  const user = supabase.auth.user();
  const [project_group, setProject_group] = useState(null);
  const [groups, setGroups] = useState(null);
  const [projects, setProjects] = useState(null);
  const { register, handleSubmit } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user &&
      supabase
        .from("project_groups")
        .update(formData)
        .eq("id", project_group.id)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
  }

  // useEffect(() => !user && push("/"));

  useEffect(
    () =>
      supabase
        .from("project_groups")
        .select("*")
        .then((data) => setGroups(data.data)),
    []
  );

  useEffect(
    () =>
      project_group &&
      supabase
        .from("projects")
        .select("*")
        .eq("project_group_id", project_group.id)
        .then((data) => setProjects(data.data)),
    [project_group]
  );

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="project_groups"></SearchAcrossProjects>
        </div>

        <div>
          {groups && (
            <ReadAllRows
              data={groups}
              title="All Project Groups"
              setSelection={setProject_group}
            ></ReadAllRows>
          )}
        </div>

        <div>
          {project_group && (
            <div
              id="details"
              className="uk-card uk-card-primary uk-card-small uk-border-rounded"
            >
              <div className="uk-card-header">
                <Image
                  alt="profile"
                  className="uk-border-circle"
                  width="40"
                  height="40"
                  src="https://rawcdn.githack.com/eugevanz/newbng-outline/a1c909c10479fc190d7e9f885ee0d0d934b03e1a/public/art-hauntington-jzY0KRJopEI-unsplash.jpg"
                ></Image>
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
                      placeholder={project_group.name}
                    ></input>
                  </div>

                  <div className="uk-width-expand">
                    <label
                      className="uk-form-label uk-text-meta"
                      htmlFor="form-stacked-text"
                    >
                      Created on{" "}
                      {moment(project_group.created_at).format("MMMM DD YYYY")}
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
          {projects && (
            <ReadAllRows data={projects} title="User's projects"></ReadAllRows>
          )}
        </div>

        <div>
          {project_group && (
            <Delete item={project_group} table="project_groups"></Delete>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProjectGroups;
