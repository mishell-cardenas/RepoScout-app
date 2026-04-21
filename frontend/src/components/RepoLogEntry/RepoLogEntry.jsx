import PropTypes from "prop-types";
import "./RepoLogEntry.css";
import { useState } from "react";

function RepoLogEntry({ onAddLog, repoName }) {
  const [formData, setFormData] = useState({
    date: "",
    focusArea: "",
    filesModified: "",
    bugsFixed: "",
    learned: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.date.trim() === "" ||
      formData.focusArea.trim() === "" ||
      formData.filesModified.trim() === "" ||
      formData.bugsFixed.trim() === "" ||
      formData.learned.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newLogEntry = {
      id: Date.now(),
      repoName: repoName,
      date: formData.date + "T00:00:00",
      focusArea: formData.focusArea,
      filesModified: formData.filesModified,
      bugsFixed: formData.bugsFixed,
      learned: formData.learned,
    };

    onAddLog(newLogEntry);

    setFormData({
      date: "",
      focusArea: "",
      filesModified: "",
      bugsFixed: "",
      learned: "",
    });
  }

  return (
    <div className="contribution-form-wrapper">
      <form className="contribution-form" onSubmit={handleSubmit}>
        <div className="contribution-field-group">
          <label htmlFor="date" className="contribution-label">
            Date:
          </label>
          <input
            id="date"
            type="date"
            name="date"
            className="contribution-datetime-input"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="contribution-field-group">
          <label htmlFor="focusArea" className="contribution-label">
            Focus area:
          </label>
          <textarea
            id="focusArea"
            name="focusArea"
            className="contribution-textarea"
            value={formData.focusArea}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="contribution-field-group">
          <label htmlFor="filesModified" className="contribution-label">
            Files you worked on (list paths):
          </label>
          <p className="contribution-help">
            Type the filenames or paths you touched, comma-separated. This is a
            text description. No files are uploaded.
          </p>
          <textarea
            id="filesModified"
            name="filesModified"
            className="contribution-textarea"
            placeholder="e.g., src/App.jsx, README.md"
            value={formData.filesModified}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="contribution-field-group">
          <label htmlFor="bugsFixed" className="contribution-label">
            Bugs fixed:
          </label>
          <textarea
            id="bugsFixed"
            name="bugsFixed"
            className="contribution-textarea"
            value={formData.bugsFixed}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="contribution-field-group">
          <label htmlFor="learned" className="contribution-label">
            What I learned:
          </label>
          <textarea
            id="learned"
            name="learned"
            className="contribution-textarea"
            value={formData.learned}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="contribution-button-row">
          <button type="submit" className="contribution-submit-button">
            Add Entry
          </button>
        </div>
      </form>
    </div>
  );
}
RepoLogEntry.propTypes = {
  onAddLog: PropTypes.func.isRequired,
  repoName: PropTypes.string.isRequired,
};

export default RepoLogEntry;
