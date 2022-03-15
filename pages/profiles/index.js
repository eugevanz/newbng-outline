import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import ProfileDetails from "../../components/profile-details";

export async function getStaticProps() {
  const { data: project_groups } = await supabase
    .from("project_groups")
    .select("*");
  const { data: projects } = await supabase.from("projects").select("*");

  return {
    props: { project_groups, projects },
    revalidate: 1 // In seconds
  };
}

function Profiles(props) {
  const router = useRouter();
  const user = supabase.auth.user();
  const [profile, setProfile] = useState(null);

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
          {props.profiles && (
            <ReadAllRows
              data={props.profiles}
              title="All Profiles"
              setSelection={setProfile}
            ></ReadAllRows>
          )}
        </div>

        <div>{profile && <ProfileDetails data={profile}></ProfileDetails>}</div>

        <div>
          {profile & props.documents && (
            <ReadAllRows
              data={props.documents.filter(
                (item) => item.user_id === profile.id
              )}
              title="User's documents"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {profile & props.logs && (
            <ReadAllRows
              data={props.logs.filter((item) => item.user_id === profile.id)}
              title="User's logs"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {profile & props.milestones && (
            <ReadAllRows
              data={props.milestones.filter(
                (item) => item.user_id === profile.id
              )}
              title="User's milestones"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {profile & props.projects && (
            <ReadAllRows
              data={props.projects.filter(
                (item) => item.user_id === profile.id
              )}
              title="User's projects"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {profile & props.tasks && (
            <ReadAllRows
              data={props.tasks.filter((item) => item.user_id === profile.id)}
              title="User's tasks"
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
export default Profiles;
