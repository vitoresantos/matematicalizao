from sqlmodel import SQLModel, create_engine, Session
from app.core.config import settings

# Ajuste técnico para o SQLite aceitar múltiplas requisições simultâneas em testes
connect_args = {"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}

engine = create_engine(settings.DATABASE_URL, echo=False, connect_args=connect_args)

def inicializar_banco():
    SQLModel.metadata.create_all(engine)

def obter_sessao():
    with Session(engine) as sessao:
        yield sessao