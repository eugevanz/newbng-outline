import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import useProfileStore from "../../context/store-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import ProfileDetails from "../../components/profile-details";

function Profiles() {
  const {
    profiles,
    setProfile,
    profile,
    documents,
    logs,
    milestones,
    projects,
    tasks
  } = useProfileStore();
  const router = useRouter();
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

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
          {profiles ? (
            <ReadAllRows
              data={profiles}
              title="All Profiles"
              setSelection={setProfile}
            ></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {profile ? (
            <ProfileDetails data={profile}></ProfileDetails>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {documents ? (
            <ReadAllRows
              data={documents}
              title="User's documents"
            ></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {logs ? (
            <ReadAllRows data={logs} title="User's logs"></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {milestones ? (
            <ReadAllRows
              data={milestones}
              title="User's milestones"
            ></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {projects ? (
            <ReadAllRows data={projects} title="User's projects"></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {tasks ? (
            <ReadAllRows data={tasks} title="User's tasks"></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {profile ? (
            <Delete item={profile} table="profiles"></Delete>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Profiles;
