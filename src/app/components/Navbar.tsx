import { useState } from "react";

function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        Options ⌄
      </button>

      {open && (
        <div className="dropdown mt-">
          <p>Profile</p>
          <p>Settings</p>
          <p>Logout</p>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
