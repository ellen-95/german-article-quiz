function Main({ children, className = "" }) {
  return <main className={`main ${className}`.trim()}>{children}</main>;
}

export default Main;
