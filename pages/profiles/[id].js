import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProfileDetails from "../../components/profile-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";

function Profile() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  useEffect(
    () =>
      fetch("/api/profiles").then((data) =>
        setData(data.find((item) => item.id === router.query.id))
      ),
    [router.query.id]
  );

  return (
    <div className="uk-width-expand@m">
      {user && (
        <div
          className="uk-child-width-1-2@m js-filter"
          data-uk-grid="masonry: true; parallax: 60"
        >
          <div>
            <ProfileDetails data={data}></ProfileDetails>
          </div>

          <div>
            <Delete item={data} table="profiles"></Delete>
          </div>
        </div>
      )}
    </div>
  );
}
export default Profile;