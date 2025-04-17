document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("join-form");
  const submissionsList = document.getElementById("submissions-list");

  // Cargar envíos almacenados
  function loadSubmissions() {
    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissionsList.innerHTML = "";

    submissions.forEach(entry => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${entry.name}</strong> (${entry.email})<br>
        <em>${entry.message}</em><br>
        <small>
          Found us via: ${entry.source} <br>
          Interested in: ${entry.interests || 'N/A'} <br>
          Subscribed: ${entry.newsletter ? 'Yes' : 'No'}
        </small>
      `;
      submissionsList.appendChild(li);
    });
  }

  // Manejar el envío del formulario
  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const source = form.source.value;
    const interests = form.interests.value.trim();
    const newsletter = form.newsletter.checked;

    if (!name || !email || !source) {
      alert("Please fill out all required fields.");
      return;
    }

    const newEntry = { name, email, message, source, interests, newsletter };

    try {
      const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
      submissions.push(newEntry);
      localStorage.setItem("submissions", JSON.stringify(submissions));
      form.reset();
      loadSubmissions();
      alert("Thank you for joining!");
    } catch (error) {
      console.error("Error saving form data:", error);
      alert("Oops! Something went wrong.");
    }
  });

  loadSubmissions();
});