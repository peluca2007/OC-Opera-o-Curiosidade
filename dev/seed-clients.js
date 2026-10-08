import { getClients, saveClients } from "../shared/services/client-service.js";

// Dados fictícios para conferir pesquisa, edição, dashboard e relatórios.
const exampleClients = [
  {
    name: "Ana Souza", email: "ana.exemplo@email.com", isActive: true,
    dateOfBirth: "1995-05-15", gender: "female", phone: "43990000001",
    address: "Rua Exemplo, 10 — Londrina, PR",
    othersInfo: "Prefere contato por e-mail no período da manhã.",
    interests: "Leitura, fotografia e caminhadas.",
    feelings: "Animada para conhecer novas atividades.",
    values: "Família, respeito e honestidade.", daysAgo: 0
  },
  {
    name: "Bruno Lima", email: "bruno.exemplo@email.com", isActive: false,
    dateOfBirth: "1988-11-23", gender: "male", phone: "11990000002",
    address: "Avenida Modelo, 25 — São Paulo, SP",
    othersInfo: "Cadastro inativo enquanto aguarda retorno.",
    interests: "Tecnologia, futebol e cinema.",
    feelings: "Inseguro sobre os próximos passos.",
    values: "Transparência e responsabilidade.", daysAgo: 1
  },
  {
    name: "Carla Mendes", email: "carla.exemplo@email.com", isActive: true,
    dateOfBirth: "2001-02-08", gender: "female", phone: "41990000003",
    address: "Rua Demonstração, 42 — Curitiba, PR",
    othersInfo: "Disponível para contato à tarde.",
    interests: "Música, culinária e viagens.",
    feelings: "Curiosa e confiante.",
    values: "Criatividade e colaboração.", daysAgo: 3
  },
  {
    name: "José Antônio da Silva", email: "jose.silva@example.com", isActive: true,
    dateOfBirth: "1976-07-19", gender: "male", phone: "21990000004",
    address: "Rua Fictícia, 80 — Rio de Janeiro, RJ",
    othersInfo: "Prefere conversar por telefone.",
    interests: "Jardinagem, história e artesanato.",
    feelings: "Tranquilo e disposto a participar.",
    values: "Compromisso e solidariedade.", daysAgo: 7
  },
  {
    name: "Márcia Gonçalves", email: "marcia.goncalves@example.com", isActive: false,
    dateOfBirth: "1983-09-12", gender: "female", phone: "31990000005",
    address: "Travessa Modelo, 12 — Belo Horizonte, MG",
    othersInfo: "Solicitou uma pausa nas atividades.",
    interests: "Dança e literatura brasileira.",
    feelings: "Precisa de tempo para reorganizar a rotina.",
    values: "Autonomia e bem-estar.", daysAgo: 15
  },
  {
    name: "Rafael Oliveira", email: "rafael.oliveira@example.com", isActive: true,
    dateOfBirth: "1999-04-30", gender: "male", phone: "51990000006",
    address: "Rua Exemplo, 150 — Porto Alegre, RS",
    othersInfo: "Disponível após as 18 horas.",
    interests: "Corrida, jogos de tabuleiro e programação.",
    feelings: "Motivado a desenvolver novas habilidades.",
    values: "Disciplina e aprendizado.", daysAgo: 32
  },
  {
    name: "Luísa Ferreira", email: "luisa.ferreira@example.com", isActive: true,
    dateOfBirth: "1992-12-05", gender: "female", phone: "81990000007",
    address: "Avenida Demonstração, 200 — Recife, PE",
    othersInfo: "Gosta de atividades em grupo.",
    interests: "Pintura, teatro e trabalho voluntário.",
    feelings: "Entusiasmada com novos encontros.",
    values: "Empatia e participação.", daysAgo: 60
  },
  {
    name: "Alex Santos", email: "alex.santos@example.com", isActive: false,
    dateOfBirth: "2003-06-21", gender: "other", phone: "71990000008",
    address: "Rua Modelo, 33 — Salvador, BA",
    othersInfo: "Aguardando confirmação de disponibilidade.",
    interests: "Design, música e esportes.",
    feelings: "Com expectativa para começar.",
    values: "Inclusão e liberdade.", daysAgo: 90
  },
  {
    name: "Maria Fernanda Albuquerque de Araújo", email: "fernanda.albuquerque@example.com", isActive: true,
    dateOfBirth: "1985-03-14", gender: "female", phone: "61990000009",
    address: "Quadra Exemplo, bloco B, apartamento 204 — Brasília, DF",
    othersInfo: "Quer receber um resumo das atividades antes de participar. Prefere encontros aos sábados pela manhã.",
    interests: "Educação, sustentabilidade e clubes de leitura.",
    feelings: "Confiante, mas preocupada em conciliar os encontros com o trabalho.",
    values: "Ética, diálogo e cuidado com o meio ambiente.", daysAgo: 120
  },
  {
    name: "Pedro Costa", email: "pedro.costa@example.com", isActive: true,
    dateOfBirth: "1997-08-09", gender: "male", phone: "85990000010",
    address: "Rua Fictícia, 75 — Fortaleza, CE",
    othersInfo: "", interests: "Ciclismo e fotografia.",
    feelings: "", values: "Amizade e respeito.", daysAgo: 180
  },
  {
    name: "Débora Nascimento", email: "debora.nascimento@example.com", isActive: false,
    dateOfBirth: "1990-10-27", gender: "female", phone: "91990000011",
    address: "Avenida Exemplo, 90 — Belém, PA",
    othersInfo: "Cadastro antigo para testar os relatórios.",
    interests: "Culinária regional e artes.",
    feelings: "Saudade das atividades em grupo.",
    values: "Tradição e comunidade.", daysAgo: 270
  },
  {
    name: "João Victor Ribeiro", email: "joao.ribeiro@example.com", isActive: true,
    dateOfBirth: "2000-01-16", gender: "male", phone: "62990000012",
    address: "Rua Demonstração, 101 — Goiânia, GO",
    othersInfo: "", interests: "", feelings: "", values: "", daysAgo: 365
  }
];

function createRegistrationDate(daysAgo) {
  const registrationDate = new Date();
  registrationDate.setDate(registrationDate.getDate() - daysAgo);
  return registrationDate.toISOString();
}

export function seedClients() {
  const clients = getClients();
  let addedCount = 0;

  exampleClients.forEach(example => {
    // Não duplica exemplos nem sobrescreve os dados que você já editou.
    const alreadyExists = clients.some(client => client.email === example.email);
    if (alreadyExists) return;

    const newClient = {
      id: crypto.randomUUID(),
      name: example.name,
      email: example.email,
      isActive: example.isActive,
      dateOfBirth: example.dateOfBirth,
      gender: example.gender,
      phone: example.phone,
      address: example.address,
      othersInfo: example.othersInfo,
      interests: example.interests,
      feelings: example.feelings,
      values: example.values,
      createdAt: createRegistrationDate(example.daysAgo)
    };

    clients.push(newClient);
    addedCount++;
  });

  if (addedCount > 0) saveClients(clients);
  console.info("Seed: " + addedCount + " clientes adicionados. Total: " + clients.length + ".");
  return addedCount;
}
