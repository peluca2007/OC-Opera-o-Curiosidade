const exemplos = [
  { name: "Ana Souza", email: "ana.exemplo@email.com", isActive: true, daysAgo: 2 },
  { name: "Bruno Lima", email: "bruno.exemplo@email.com", isActive: false, daysAgo: 18 },
  { name: "Carla Mendes", email: "carla.exemplo@email.com", isActive: true, daysAgo: 45 }
];

const clientes = JSON.parse(localStorage.getItem("clientsList") || "[]");

for(const exemplo of exemplos) {
  if (clientes.some(cliente => cliente.email === exemplo.email)) continue;

  const dataCadastro = new Date();
  dataCadastro.setDate(dataCadastro.getDate() - exemplo.daysAgo);

  clientes.push({
    name: exemplo.name,
    email: exemplo.email,
    isActive: exemplo.isActive,
    dateOfBirth: "2000-05-15",
    gender: "other",
    phone: "43999999999",
    address: "Endereço fictício",
    othersInfo: "",
    interests: "",
    feelings: "",
    values: "",
    createdAt: dataCadastro.toISOString()
  });
}

localStorage.setItem("clientsList", JSON.stringify(clientes));

//<script src="../seedTest.js"></script>