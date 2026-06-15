export function validarCPF(cpf) {
    const strCPF = String(cpf).replace(/[^\d]/g, ''); // Remove pontos e traços
    
    if (strCPF.length !== 11 || /^(\d)\1{10}$/.test(strCPF)) return false;
    
    let soma = 0;
    let resto;
    
    // Valida primeiro dígito verificador
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(strCPF.substring(9, 10))) return false;
    
    // Valida segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(strCPF.substring(10, 11))) return false;
    
    return true;
  }