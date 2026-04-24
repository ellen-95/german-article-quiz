function Error({ message }) {
  return (
    <p className="error">
      <span>💥</span> {message || "Failed to load questions. Please try again."}
    </p>
  );
}

export default Error;
