import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import moment from "moment";
import { useForm } from "react-hook-form";
import Image from "next/image";

function Documents() {
  // const {push} = useRouter();
  const user = supabase.auth.user();
  const [document, setDocument] = useState(null);
  const [docs, setDocs] = useState(null);
  const [my, setMy] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);
  const { register, handleSubmit } = useForm();
  const [checked, setchecked] = useState(false);

  function onSubmit(formData) {
    user & document &&
      supabase
        .from("documents")
        .update(formData)
        .eq("id", document.id)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
  }

  // useEffect(() => !user && push("/"));

  useEffect(
    () =>
      supabase
        .from("documents")
        .select("*")
        .then((data) => setDocs(data.data)),
    []
  );

  useEffect(
    () =>
      user &&
      supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)
        .then((data) => setMy(data.data)),
    [user]
  );

  useEffect(
    () =>
      document &&
      supabase
        .from("profiles")
        .select("name")
        .eq("user_id", document.user_id)
        .then((data) => setOwner(data.data.shift())),
    [document]
  );

  useEffect(
    () =>
      document &&
      supabase
        .from("tasks")
        .select("*")
        .eq("id", document.task_id)
        .then((data) => setTask(data.data.shift())),
    [document]
  );

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="documents"></SearchAcrossProjects>
        </div>

        <div>
          {docs && (
            <ReadAllRows
              data={docs}
              title="All documents"
              setSelection={setDocument}
            ></ReadAllRows>
          )}
        </div>

        <div>
          {my && (
            <div className="uk-card uk-card-body uk-border-rounded">
              <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
                My Documents
              </div>

              <ul className="uk-list uk-list-large uk-list-divider uk-margin">
                {my.map((item) => (
                  <li key={item.id}>
                    <a
                      className="uk-link-toggle"
                      href="#list-item"
                      onClick={() => setDocument(item)}
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
          {owner & task && (
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
                    {<div className="uk-text-bold">{owner.name}</div>}
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
                      placeholder={document.name}
                    ></input>
                  </div>

                  <div className="uk-width-expand">
                    <span className="uk-label">Task</span>
                    <label
                      className="uk-form-label uk-text-meta"
                      htmlFor="form-stacked-text"
                    >
                      <a href={`#${task.name}`}>{task.name}</a>
                    </label>
                  </div>

                  <div className="uk-width-expand">
                    <label
                      className="uk-form-label uk-text-meta"
                      htmlFor="form-stacked-text"
                    >
                      Created on{" "}
                      {moment(document.created_at).format("MMMM DD YYYY")}
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
          {document && <Delete item={document} table="documents"></Delete>}
        </div>
      </div>
    </div>
  );
}
export default Documents;
