import React, { useState } from "react";

function SettingsPage() {
  // State variables to track user preferences
  const [showNotifications, setShowNotifications] = useState(true);
  const [theme, setTheme] = useState("light");

  // Event handler for toggling notification preference
  function handleToggleNotifications() {
    setShowNotifications(!showNotifications);
  }

  // Event handler for changing theme preference
  function handleChangeTheme(event) {
    setTheme(event.target.value);
  }

  return (
    <div>
      <h1>Settings</h1>

      <label>
        <input
          type="checkbox"
          checked={showNotifications}
          onChange={handleToggleNotifications}
        />
        Show notifications
      </label>

      <br />

      <label>
        Theme:
        <select value={theme} onChange={handleChangeTheme}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>

      <br />

      <button>Save</button>
    </div>
  );
}

export default SettingsPage;
