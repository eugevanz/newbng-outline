import supabase from "../context/auth-context";
import { useForm } from "react-hook-form";
import Image from "next/image";

function Auth() {
  const { register, handleSubmit, reset } = useForm();

  async function onSubmit({ email }) {
    try {
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
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
        <div className="uk-card-header uk-margin-large-bottom">
          <div className="uk-grid-collapse" data-uk-grid>
            <div className="uk-width-auto">
              <Image
                width="70"
                height="56"
                src="/NEWBGNG logo.001.png"
                alt="company-logo"
              ></Image>
            </div>
            <div className="uk-width-expand">
              <span className="uk-text-large uk-text-bold">
                NEWBNG
                {/* <span className="uk-text-small" role="img" aria-label="NEWBNG">
                  ®️
                </span> */}
              </span>
              &nbsp;
              <div className="uk-text-meta">Project Management</div>
            </div>
          </div>
        </div>
        <div className="uk-card-body">
          <span className="uk-text-meta uk-text-bold">
            Sign in via magic link with your email below
          </span>

          <div className="uk-margin-top">
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
