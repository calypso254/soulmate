async function sendToMake() {
  const persona = document.getElementById("persona").value;
  const copy = document.getElementById("copy").value;
  const testAll = document.getElementById("testAll").checked;
  const responseEl = document.getElementById("response");

  responseEl.textContent = "Sending...";

  try {
    const res = await fetch("https://hook.us1.make.com/qv4nysn1ilxu1jx7ez67yampsgkpm671", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ persona, copy, testAll })
    });

    const data = await res.json();

    const { score, reaction, suggestions, purchase_likelihood } = data;

    responseEl.innerHTML = `
      <strong>Score:</strong> ${score}<br>
      <strong>Reaction:</strong> ${reaction}<br>
      <strong>Suggestions:</strong> ${suggestions}<br>
      <strong>Purchase Likelihood:</strong> ${purchase_likelihood}
    `;
  } catch (err) {
    responseEl.textContent = "Error: " + err.message;
  }
}
