import { addClient } from "../../shared/services/client-service.js";

function registerClient() {
  let errorMsgElement = document.getElementById("message");
  let successMsgElement = document.getElementById("messageAprove");
  
  errorMsgElement.style.display = "none";
  successMsgElement.style.display = "none";
  errorMsgElement.textContent = ""; 

  let isActiveClient = document.getElementById("activeOrNo").checked;
  let nameClient = document.getElementById("name").value.trim();
  let emailClient = document.getElementById("email").value.trim();
  let dateClient = document.getElementById("dateOfBirth").value.trim(); 
  let genderClient = document.getElementById("gender").value.trim();
  let phoneClient = document.getElementById("phone").value.trim();
  let addressClient = document.getElementById("address").value.trim();
  let othersInfoClient = document.getElementById("othersInfo").value.trim();
  let interestsClient = document.getElementById("interests").value.trim();
  let feelingsClient = document.getElementById("feelings").value.trim(); 
  let valuesClient = document.getElementById("values").value.trim();

  let errors = [];

  if (!nameClient || !emailClient || !dateClient || !genderClient || !phoneClient || !addressClient) {
    errors.push("Todos os campos obrigatórios devem ser preenchidos.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailClient && !emailRegex.test(emailClient)) {
    errors.push("O formato do e-mail é inválido.");
  }

  const cleanPhoneClient = phoneClient.replace(/\D/g, ''); 
  if (phoneClient && cleanPhoneClient.length < 10) {
    errors.push("O telefone deve conter pelo menos 10 dígitos (incluindo DDD).");
  }

  if (dateClient) {
    const inputDate = new Date(dateClient);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
    if (inputDate >= today) {
      errors.push("A data de nascimento deve ser anterior à data atual.");
    }
  }

  if (errors.length > 0) {
    errorMsgElement.textContent = errors.join(" ");
    errorMsgElement.style.display = "block";
    return; 
  }

 let newClient = {
    isActive: isActiveClient,
    name: nameClient,
    email: emailClient,
    dateOfBirth: dateClient,
    gender: genderClient,
    phone: cleanPhoneClient, 
    address: addressClient,
    othersInfo: othersInfoClient,
    interests: interestsClient,
    feelings: feelingsClient,
    values: valuesClient,
    createdAt: new Date().toISOString()
  };

  try {
    addClient(newClient);
  } catch (error) {
    console.error("Erro ao salvar cliente:", error);
    errorMsgElement.textContent = "Não foi possível salvar o cadastro. Verifique os dados salvos neste navegador.";
    errorMsgElement.style.display = "block";
    return;
  }

  successMsgElement.style.display = "block";

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("dateOfBirth").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  document.getElementById("othersInfo").value = "";
  document.getElementById("interests").value = "";
  document.getElementById("feelings").value = "";
  document.getElementById("values").value = "";
}


// O evento é conectado aqui porque funções de módulos não são globais.
document.getElementById("save-client").addEventListener("click", registerClient);

