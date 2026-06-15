from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class Usuario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    email: str = Field(unique=True, index=True)
    cpf: str = Field(unique=True, index=True)
    senha_hash: str
    
    # Se o professor for deletado, deleta todas as suas partidas criadas automaticamente
    partidas: List["Partida"] = Relationship(back_populates="professor", cascade_delete=True)