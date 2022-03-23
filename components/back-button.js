import { useRouter } from "next/router";

function BackButton({ page }) {
  const { push } = useRouter();

  return (
    <a
      href="#back"
      className="uk-icon-button"
      data-uk-icon="icon:close; ratio: 1.2"
      onClick={() => push(`/${page}`)}
    >
      &#8203;
    </a>
  );
}
export default BackButton;
