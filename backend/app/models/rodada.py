from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

# Evita conflitos de importação com a Partida
if TYPE_CHECKING:
    from .partida import Partida

class HistoricoRodada(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    partida_id: str = Field(foreign_key="partida.id")
    numero_rodada: int
    grupo_id: int
    dado_aluno: int
    dado_mundo: Optional[int] = Field(default=None)
    partida: "Partida" = Relationship(back_populates="rodadas")