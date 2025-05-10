
async function sendToMake() {
  const persona = document.getElementById("persona").value;
  const copy = document.getElementById("copy").value;

  const responseEl = document.getElementById("response");
  responseEl.textContent = "Sending...";

  try {
    const res = await fetch("https://hook.make.com/your-placeholder-webhook", {
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
