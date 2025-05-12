async function sendToMake() {
  const persona = document.getElementById("persona").value;
  const copy = document.getElementById("copy").value;
  const testAll = document.getElementById("testAll").checked;
  const responseEl = document.getElementById("response");

  responseEl.textContent = "Sending...";

  // Hardcoded list of personas for testAll mode
  const allPersonas = [
    "Stacy the Stylish Teacher",
    "Claire the Corporate Queen",
    "Sam the Journal Addict",
    "Brittany the Bride-to-Be",
    "Melissa the Pen Collector"
  ];

  try {
    const res = await fetch("https://hook.us1.make.com/qv4nysn1ilxu1jx7ez67yampsgkpm671", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        persona,
        copy,
        testAll,
        all_personas: testAll ? allPersonas : null
      })
    });

    const data = await res.json();

    // Check if response is an array (testAll mode)
    if (Array.isArray(data)) {
      responseEl.innerHTML = data.map(item => `
        <hr>
        <strong>Persona:</strong> ${item.persona}<br>
        <strong>Score:</strong> ${item.score}<br>
        <strong>Reaction:</strong> ${item.reaction}<br>
        <strong>Suggestions:</strong> ${item.suggestions}<br>
        <strong>Purchase Likelihood:</strong> ${item.purchase_likelihood}
      `).join('');
    } else {
      // Single-persona response
      const { score, reaction, suggestions, purchase_likelihood } = data;

      responseEl.innerHTML = `
        <strong>Score:</strong> ${score}<br>
        <strong>Reaction:</strong> ${reaction}<br>
        <strong>Suggestions:</strong> ${suggestions}<br>
        <strong>Purchase Likelihood:</strong> ${purchase_likelihood}
      `;
    }
  } catch (err) {
    responseEl.textContent = "Error: " + err.message;
  }
}
