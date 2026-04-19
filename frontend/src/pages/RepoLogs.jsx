import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import RepoLogEntry from "../components/RepoLogEntry/RepoLogEntry.jsx";
import RepoLogsTimeline from "../components/RepoLogsTimeline/RepoLogsTimeline.jsx";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal.jsx";
import "./RepoLogs.css";

function RepoLogPage() {
  const [logs, setLogs] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [logToDelete, setLogToDelete] = useState(null);
  const { repoName } = useParams();

  useEffect(() => {
    async function fetchRepoLogs() {
      try {
        const response = await fetch(
          `/api/repo-logs?repoName=${encodeURIComponent(repoName)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repo logs.");
        }

        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching repo logs:", error);
      }
    }

    if (repoName) {
      fetchRepoLogs();
    }
  }, [repoName]);

  async function handleAddLog(newLogEntry) {
    try {
      const response = await fetch("/api/repo-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLogEntry),
      });

      if (!response.ok) {
        throw new Error("Failed to save repo log.");
      }

      const savedLog = await response.json();
      setLogs((prevLogs) => [savedLog, ...prevLogs]);
    } catch (error) {
      console.error("Error saving repo log:", error);
    }
  }

  function handleDeleteRequest(logId) {
    setLogToDelete(logId);
    setShowDeleteConfirm(true);
  }

  async function handleConfirmDelete() {
    try {
      const response = await fetch(`/api/repo-logs/${logToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete log.");
      }

      setLogs((prevLogs) => prevLogs.filter((log) => log._id !== logToDelete));
    } catch (error) {
      console.error("Error deleting log:", error);
    } finally {
      setShowDeleteConfirm(false);
      setLogToDelete(null);
    }
  }

  return (
    <div>
      <Navbar />
      <main className="project-log-page">
        <div className="project-log-container py-4 px-4 mt-3">
          <h1 className="project-log-page-title bi-journal-code">
            Repo: {repoName}
          </h1>

          <div className="project-log-layout">
            <div className="project-log-left">
              <RepoLogEntry repoName={repoName} onAddLog={handleAddLog} />
            </div>

            <div className="project-log-right">
              <RepoLogsTimeline
                logs={logs}
                setLogs={setLogs}
                onDeleteRequest={handleDeleteRequest}
              />
            </div>
          </div>
        </div>
      </main>

      <ConfirmModal
        show={showDeleteConfirm}
        title="Delete Log Entry"
        message="Are you sure you want to delete this log entry? This cannot be undone."
        confirmLabel="Delete Entry"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setLogToDelete(null);
        }}
      />
    </div>
  );
}

export default RepoLogPage;
