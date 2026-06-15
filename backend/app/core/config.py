import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Lê a variável DATABASE_URL da Render. Se não achar, usa o SQLite local.
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./matematicalizacao.db")

    # Configuração do Pydantic v2 para ignorar variáveis extras do ambiente sem travar
    model_config = SettingsConfigDict(case_sensitive=True, ignore_extra_attribs=True)

settings = Settings()