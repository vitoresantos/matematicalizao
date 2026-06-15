from typing import Optional
from sqlmodel import SQLModel, Field

class HistoricoRodada(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    partida_id: str = Field(index=True)
    numero_rodada: int
    grupo_id: int
    dado_aluno: int
    dado_mundo: Optional[int] = Field(default=None)