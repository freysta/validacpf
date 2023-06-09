function validarFormulario() {
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let digit = remainder < 2 ? 0 : 11 - remainder;
    if (parseInt(cpf.charAt(9)) !== digit) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    remainder = sum % 11;
    digit = remainder < 2 ? 0 : 11 - remainder;
    if (parseInt(cpf.charAt(10)) !== digit) {
      return false;
    }

    return true;
  }

  const form = document.querySelector("form");
  const cpfInput = document.getElementById("cpf");

  cpfInput.addEventListener("input", function (event) {
    this.value = formatarCPF(this.value);
  });

  function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove tudo o que não é dígito
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca um ponto entre o terceiro e o quarto dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca um ponto entre o terceiro e o quarto dígitos novamente (para o segundo bloco de números)
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca um hífen entre o terceiro e o quarto dígitos
    return cpf;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const telefoneInput = document.getElementById("telefone");

    telefoneInput.addEventListener("input", function (event) {
      this.value = this.value.replace(/\D/g, "");
    });

    const primeiroNome = document.getElementById("validationName").value;
    const sobrenome = document.getElementById("validationLastName").value;
    const email = document.getElementById("validationEmail").value;
    const cpf = cpfInput.value;

    if (!primeiroNome || !sobrenome || !email || !cpf) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (cpf.length !== 14 || !validarCPF(cpf)) {
      alert("CPF inválido.");
      return;
    }

    alert("Formulário enviado com sucesso!");
    form.reset();
  });
}

(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  validarFormulario();
})();
