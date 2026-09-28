const registrations = [
  { name: 'Stephanie Nichols', email: 'stephanienichols@gmail.com', status: 'Ativo' },
  { name: 'Jeffrey Kane', email: 'jeffrey_kane@yahoo.com', status: 'Ativo' },
  { name: 'Darin Miller', email: 'darinmiller01@gmail.com', status: 'Ativo' },
  { name: 'Andrew Stuart', email: 'andrewstuart@outlook.com', status: 'Ativo' },
  { name: 'Valerie Aguilar', email: 'valerie_aguilar@gmail.com', status: 'Inativo' },
];

function renderStats() {
  const totalCount = registrations.length;
  const pendingCount = registrations.filter((registration) => registration.status === 'Inativo').length;

  document.querySelector('#total-registrations p').textContent = totalCount;
  document.querySelector('#registrations-peding p').textContent =pendingCount;
}

function renderTable() {
  const tableBody = document.querySelector('#last-registrations tbody');
  tableBody.innerHTML = '';

  registrations.forEach((registration) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${registration.name}</td>
      <td>${registration.email}</td>
      <td>${registration.status}</td>
    `;
    tableBody.appendChild(row);
  });
}

renderStats();
renderTable();