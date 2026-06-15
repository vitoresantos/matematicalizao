from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, func
from app.database import obter_sessao
from app.models.partida import Partida

router = APIRouter(prefix="/api/partidas", tags=["Gestão de Partidas"])

@router.post("/criar")
def criar_partida(partida: Partida, db: Session = Depends(obter_sessao)):
    # Conta quantas partidas ativas o professor já possui no banco de dados
    total_partidas = db.exec(select(func.count(Partida.id)).where(Partida.professor_id == partida.professor_id)).one()
    
    if total_partidas >= 10:
        raise HTTPException(
            status_code=403, 
            detail="Limite do plano gratuito atingido! Você não pode ter mais de 10 partidas salvas simultaneamente."
        )
    
    # Verifica se o identificador já existe
    id_existente = db.get(Partida, partida.id)
    if id_existente:
        raise HTTPException(status_code=400, detail="O ID desta partida já está em uso por outra turma.")
        
    db.add(partida)
    db.commit()
    db.refresh(partida)
    return {"mensagem": "Atividade configurada e pronta para o início!", "partida_id": partida.id}