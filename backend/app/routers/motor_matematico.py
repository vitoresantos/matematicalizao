from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.database import obter_sessao
from app.models.partida import Partida
from app.models.grupo import Grupo
from app.models.rodada import Rodada
from app.core.formulas import calcular_rendimento

router = APIRouter(prefix="/api/motor", tags=["Motor de Cálculo"])

@router.post("/lancar-rodada")
def processar_turno_grupo(payload: dict, db: Session = Depends(obter_sessao)):
    partida_id = payload.get("partida_id")
    grupo_id = payload.get("grupo_id")
    dado_aluno = payload.get("dado_aluno")
    
    partida = db.get(Partida, partida_id)
    grupo = db.exec(select(Grupo).where((Grupo.partida_id == partida_id) & (Grupo.numero_grupo == grupo_id))).first()
    
    if not partida or grupo:
        raise HTTPException(status_code=404, detail="Partida ou Grupo não localizados.")
        
    # Salva o histórico operacional do lançamento da mesa
    historico = Rodada(
        partida_id=partida_id,
        numero_rodada=partida.rodada_atual,
        grupo_id=grupo_id,
        dado_aluno=dado_aluno
    )
    db.add(historico)
    
    # --- EXEMPLO DO FLUXO DO MOTOR MATEMÁTICO ---
    # Transforma o tempo dinâmico de anos da rodada (t) em meses de investimento
    meses_da_rodada = partida.anos_por_rodada * 12
    
    # Simulação de processamento de um aporte em Ativo Fictício (Taxa de 1% am)
    valor_aporte = payload.get("slot1_valor", 0.0)
    tipo_aporte = payload.get("slot1_tipo", "capital_unico")
    
    rendimento_calculado = calcular_rendimento(valor_aporte, 0.01, meses_da_rodada, tipo_aporte)
    
    # Atualiza o balanço financeiro em tempo real
    grupo.caixa_livre -= valor_aporte
    grupo.saldo_investido += rendimento_calculado
    
    db.add(grupo)
    db.commit()
    
    return {
        "status": "Sucesso", 
        "novo_caixa": grupo.caixa_livre, 
        "novo_saldo_investido": grupo.saldo_investido
    }

@router.post("/evento-mundo")
def aplicar_evento_global(payload: dict, db: Session = Depends(obter_sessao)):
    partida_id = payload.get("partida_id")
    dado_mundo = payload.get("dado_mundo") # Número de 1 a 6 tirado pelo professor
    
    partida = db.get(Partida, partida_id)
    if not partida:
        raise HTTPException(status_code=404, detail="Partida não encontrada.")
        
    # Regra Proporcional do Matematicalização para os Eventos de Mundo
    gatilho_1 = (partida.total_rodadas / 2) - 1
    gatilho_2 = partida.total_rodadas - 2
    
    if partida.rodada_atual != gatilho_1 and partida.rodada_atual != gatilho_2:
        raise HTTPException(status_code=400, detail="Esta rodada atual não é considerada uma Rodada do Mundo.")
        
    # Busca todas as mesas daquela partida específica para aplicar os efeitos macroeconômicos
    grupos_da_sala = db.exec(select(Grupo).where(Grupo.partida_id == partida_id)).all()
    
    for g in grupos_da_sala:
        if dado_mundo == 1: # Crash de Mercado: Confisca 30% dos ativos de risco
            g.saldo_investido *= 0.70
        elif dado_mundo == 4: # Incentivo Fiscal: Bônus de R$ 500 no caixa livre
            g.caixa_livre += 500.00
        db.add(g)
        
    # Vira a rodada do jogo no banco após o impacto global ser consolidado nas carteiras
    partida.rodada_atual += 1
    db.add(partida)
    db.commit()
    
    return {"mensagem": f"Evento de Mundo {dado_mundo} processado. Jogo avançou para a Rodada {partida.rodada_atual}."}