document.addEventListener("DOMContentLoaded", () => {
  let clients = [];

  try {
    const stored = JSON.parse(localStorage.getItem("clientsList") || "[]");
    clients = Array.isArray(stored) ? stored : [];
  } catch (error) {
    const note = document.getElementById("report-note");
    note.textContent = "Não foi possível ler os cadastros salvos neste navegador.";
    note.hidden = false;
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const totalCount = clients.length;



  const registeredThisMonth = (value) => {
    const date = new Date(value);

    return !Number.isNaN(date.getTime()) &&
      date.getFullYear() === currentYear &&
      date.getMonth() + 1 === currentMonth;
  };

   document.getElementById("count-all").textContent = totalCount;

  document.getElementById("count-active").textContent =
    clients.filter(client => client.isActive).length;

  document.getElementById("count-inactive").textContent =
    clients.filter(client => !client.isActive).length;

  document.getElementById("count-this-month").textContent =
    clients.filter(client => registeredThisMonth(client.createdAt)).length;

}); 