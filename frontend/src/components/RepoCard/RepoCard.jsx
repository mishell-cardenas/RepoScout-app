import PropTypes from "prop-types";
import { langColor } from "../../utils/langColors";
import { scoreToPercent } from "../../utils/scoring";
import "./RepoCard.css";

function formatCount(n) {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}k`;
  }
  return String(n);
}

function RepoCard(props) {
  const { repo, score, reasons, isTracked, onTrack } = props;

  return (
    <article className="repo-card">
      <div className="mb-2">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="repo-card-match-label">
            <i className="bi bi-rocket-takeoff"></i> Match score
          </span>
          <span className="repo-card-score-badge">
            {scoreToPercent(score)}% match
          </span>
        </div>
        <div className="repo-card-score-bar-outer">
          <div
            className="repo-card-score-bar-inner"
            style={{ width: `${scoreToPercent(score)}%` }}
          />
        </div>
      </div>
      <div className="d-flex align-items-center gap-2 mb-2">
        <i className="bi bi-journal-code repo-card-repo-icon"></i>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-card-name-link"
        >
          <span className="repo-card-owner">{repo.owner}</span>
          {" / "}
          <span className="repo-card-name">{repo.name}</span>
        </a>
      </div>

      <p className="repo-card-desc">
        {repo.description || "No description provided."}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="d-flex flex-wrap gap-1 mb-2">
          {repo.topics.slice(0, 4).map((topic) => (
            <span key={topic} className="repo-card-topic">
              {topic}
            </span>
          ))}
        </div>
      )}

      {reasons.length > 0 && (
        <div className="d-flex flex-wrap gap-1 mb-2">
          {reasons.map((reason, i) => (
            <span key={i} className="repo-card-reason-badge">
              {reason}
            </span>
          ))}
        </div>
      )}

      <div className="repo-card-stats">
        {repo.language && (
          <span className="repo-card-stat">
            <span
              className="repo-card-lang-dot"
              style={{ backgroundColor: langColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}

        <span className="repo-card-stat">
          <i className="bi bi-star"></i> {formatCount(repo.stars)}
        </span>

        <span className="repo-card-stat" title="Times forked">
          <i className="bi bi-diagram-2"></i> {formatCount(repo.forks || 0)}
        </span>

        <span className="repo-card-stat" title="Open issues + pull requests">
          <i className="bi bi-circle-fill repo-card-issue-dot"></i>{" "}
          {repo.openIssues || 0}
        </span>
      </div>

      <div className="d-flex gap-2 mt-2">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline-secondary repo-card-btn"
        >
          <i className="bi bi-box-arrow-up-right"></i> View
        </a>

        {onTrack && (
          <button
            type="button"
            className={`btn btn-sm repo-card-btn ${isTracked ? "btn-outline-success" : "btn-success"}`}
            onClick={() => onTrack(repo)}
            disabled={isTracked}
          >
            {isTracked ? (
              <>
                <i className="bi bi-check-lg"></i> Tracked
              </>
            ) : (
              <>
                <i className="bi bi-plus-lg"></i> Track
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
}

RepoCard.propTypes = {
  repo: PropTypes.shape({
    githubId: PropTypes.number,
    name: PropTypes.string.isRequired,
    fullName: PropTypes.string,
    owner: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    language: PropTypes.string,
    stars: PropTypes.number,
    forks: PropTypes.number,
    openIssues: PropTypes.number,
    topics: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  score: PropTypes.number.isRequired,
  reasons: PropTypes.arrayOf(PropTypes.string).isRequired,
  isTracked: PropTypes.bool,
  onTrack: PropTypes.func,
};

export default RepoCard;
