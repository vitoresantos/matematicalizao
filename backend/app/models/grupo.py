from typing import Optional
from sqlmodel import SQLModel, Field, Relationship

class Grupo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    numero_grupo: int
    nomes_alunos: str
    nome_personagem: str
    profissao_id: int
    
    # Balanços Financeiros dinâmicos
    caixa_livre: float = Field(default=1000.00)
    saldo_investido: float = Field(default=0.00)
    
    partida_id: str = Field(foreign_key="partida.id")
    partida: "Partida" = Relationship(back_populates="grupos")