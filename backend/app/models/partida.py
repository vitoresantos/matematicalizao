from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

# Se o Python reclamar de nome não definido, isso injeta o Usuário na checagem de tipos
if TYPE_CHECKING:
    from .usuario import Usuario
    from .grupo import Grupo

class Partida(SQLModel, table=True):
    id: str = Field(primary_key=True, index=True) # ID Único digitado pelo professor
    turma: str
    total_rodadas: int
    anos_por_rodada: int
    quantidade_grupos: int
    rodada_atual: int = Field(default=1)
    
    professor_id: int = Field(foreign_key="usuario.id")
    professor: "Usuario" = Relationship(back_populates="partidas")
    
    grupos: List["Grupo"] = Relationship(back_populates="partida", cascade_delete=True)