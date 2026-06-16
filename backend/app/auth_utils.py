from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt

# Configuração da criptografia de senha (Bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 🚨 Chave secreta para assinar os tokens JWT
SECRET_KEY = "sua_chave_secreta_super_segura_do_rpg_financeiro"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440 # Token dura 1 dia (24 horas)

def verificar_senha(senha_pura: str, senha_hash: str) -> bool:
    """Compara a senha digitada no login com o hash salvo no banco"""
    return pwd_context.verify(senha_pura, senha_hash)

def gerar_senha_hash(senha_pura: str) -> str:
    """Gera o hash seguro para salvar no banco de dados na hora do cadastro"""
    return pwd_context.hash(senha_pura)

def criar_token_acesso(dados: dict) -> str:
    """Gera o Token JWT que o React vai salvar no navegador"""
    dados_copia = dados.copy()
    tempo_expiracao = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    dados_copia.update({"exp": tempo_expiracao})
    return jwt.encode(dados_copia, SECRET_KEY, algorithm=ALGORITHM)