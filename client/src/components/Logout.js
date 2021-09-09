import React from "react";

// Logout button removes the token from session storage and reloads the page:

export default function Logout() {
  return (
    <button
      onClick={() => {
        window.sessionStorage.clear();
        window.location.reload();
      }}
    >
      Logout
    </button>
  );
}
