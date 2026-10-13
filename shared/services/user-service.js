export const users = [
  {id: "1", name: "Admin", email: 'admin@oc.com', password: 'admin123' },
  {id: "2", name: "Luciano", email: 'luciano@oc.com', password: 'luciano123' },
];

export function getLoggedUser() {
  const loggedUserId = localStorage.getItem("loggedUserId");

  return users.find(user => user.id === loggedUserId);
}

