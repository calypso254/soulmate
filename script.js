
async function sendToMake() {
  const persona = document.getElementById("persona").value;
  const copy = document.getElementById("copy").value;

  const responseEl = document.getElementById("response");
  responseEl.textContent = "Sending...";

  try {
    const res = await fetch("https://hook.us1.make.com/qv4nysn1ilxu1jx7ez67yampsgkpm671", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ persona, copy })
    });

    const data = await res.json();
    responseEl.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    responseEl.textContent = "Error: " + err.message;
  }
}
