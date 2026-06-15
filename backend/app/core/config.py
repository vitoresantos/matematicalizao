import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Se não houver variável de ambiente, cria um banco SQLite local automaticamente
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./matematicalizacao.db")

settings = Settings()