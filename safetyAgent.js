export function SafetyAgent(tox, mis, fake) {
  const issues = [];

  if (tox && tox.toxic) issues.push("Toxic Content");
  if (mis && mis.misinfo) issues.push("Misinformation");
  if (fake && fake.fake_media) issues.push("Fake Media");

  return issues.length === 0
    ? "Safe"
    : "Unsafe: " + issues.join(", ");
}
