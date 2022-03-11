import supabase from "../context/auth-context";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
// import {handleAuth} from '@supabase/supabase-auth-he'

function Auth() {
  const { register, handleSubmit, reset } = useForm();
  const { push } = useRouter();

  async function onSubmit({ email }) {
    try {
      const { error } = await supabase.auth.signIn({ email });
      if (!error) push("/");
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      reset();
    }
  }

  return (
    <form>
      <div className="uk-card uk-card-small uk-border-rounded uk-margin-bottom">
        <div className="uk-card-body">
          <span className="uk-text-meta uk-text-bold">
            Fill in your email, we'll send you a magic link.
          </span>

          <div className="uk-margin">
            <input
              {...register("email")}
              className="uk-input uk-form-small uk-border-rounded"
              type="email"
              id="form-stacked-text"
              placeholder="Your email"
            ></input>
          </div>
        </div>
        <div className="uk-card-footer uk-margin-large-bottom">
          <a
            href="#login"
            className="uk-button uk-button-primary uk-button-small uk-border-rounded uk-width-1-1"
            onClick={handleSubmit(onSubmit)}
          >
            Enter
          </a>
        </div>
      </div>
    </form>
  );
}
export default Auth;
