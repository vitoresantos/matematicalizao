def calcular_rendimento(capital_inicial: float, taxa_periodo: float, meses_rodada: int, tipo_aporte: str) -> float:
    """
    Aplica a regra algébrica de juros de acordo com a escolha da mesa.
    """
    if tipo_aporte == "capital_unico":
        # M = C * (1 + i)^t -> Onde t é o número de meses da rodada
        return capital_inicial * ((1 + taxa_periodo) ** meses_rodada)
    
    elif tipo_aporte == "parcela_mensal":
        # Fórmula de valor futuro de uma série de pagamentos (Aportes Mensais com o Salário)
        # FV = PMT * [((1 + i)^t - 1) / i]
        if taxa_periodo == 0:
            return capital_inicial * meses_rodada
        return capital_inicial * (((1 + taxa_periodo) ** meses_rodada - 1) / taxa_periodo)
    
    return capital_inicial