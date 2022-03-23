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

function ProjectGroup() {
  const {
    query: { id }
  } = useRouter();
  const { user } = Auth.useUser();
  const [project_group, setProject_group] = useState(null);
  const [projects, setProjects] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user &&
      supabase
        .from("project_groups")
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
        .from("project_groups")
        .select("*")
        .eq("id", id)
        .then((data) => setProject_group(data.data.shift())),
    [id]
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
      <div className="uk-child-width-1-2@m" data-uk-grid="masonry: true">
        <div>
          <BackButton page="project_groups" />
        </div>
        <div>
          {project_group && (
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
                      {project_group.name}
                    </h5>
                  </div>
                </div>
              </div>

              <div className="uk-card-body">
                <input
                  {...register("name")}
                  className="uk-input uk-form-small uk-border-rounded"
                  type="text"
                  id="form-stacked-text"
                  placeholder={project_group.name}
                  disabled={!checked}
                ></input>

                <div className="uk-text-small uk-margin">
                  <code>Created on</code>
                  {moment(project_group.created_at).format("MMMM Do YYYY")}
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
          {projects && (
            <ReadAllRows
              data={projects}
              title={`${project_group.name} projects`}
              table="projects"
            ></ReadAllRows>
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
export default ProjectGroup;
