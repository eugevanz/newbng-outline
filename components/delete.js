import { useState } from "react";

function Delete({ item, table }) {
  const [checked, setChecked] = useState(false);

  async function onDelete() {
    fetch(`/api/${table}`, {
      method: "DELETE",
      body: JSON.stingify({ id: item.id }),
      headers: { "Content-Type": "application/json" }
    });
  }

  return (
    <div className="uk-card uk-card-danger uk-card-body uk-border-rounded uk-card-small">
      <div className="uk-text-small uk-margin">
        <span data-uk-icon="icon: warning">&#8203;</span> This action cannot be
        undone
      </div>
      <div className="uk-width-1-1">
        <button
          type="submit"
          className="uk-button uk-border-rounded uk-button-danger uk-width-expand@s"
          onClick={onDelete}
          disabled={!checked}
        >
          Delete
        </button>
      </div>

      <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <label>
          <input
            className="uk-checkbox uk-text-meta"
            type="checkbox"
            onChange={(e) => setChecked(!checked)}
          ></input>{" "}
          <span className="uk-text-meta">Confirm delete.</span>
        </label>
      </div>
    </div>
  );
}
export default Delete;