import PropTypes from "prop-types"; // Import PropTypes for prop type validation

function ThemedButton({ content, propWidth, propPadding }) {
  return (
    <button
      className="themedButton"
      style={{
        border: "none",
        borderRadius: "100px",
        // background: "var(--primary-color, #872991)",
        width: propWidth,
        padding: propPadding,
      }}
    >
      {content}
    </button>
  );
}

export default ThemedButton;

ThemedButton.propTypes = {
  content: PropTypes.string.isRequired,
  propWidth: PropTypes.string.isRequired,
  propPadding: PropTypes.string.isRequired,
};
