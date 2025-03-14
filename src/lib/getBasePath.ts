export default function getBasePath() {
  const base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${process.env.DEPLOYMENT_URL}`;
  return base_url;
}
