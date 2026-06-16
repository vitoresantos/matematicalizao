from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import inicializar_banco
from app.routers import auth_router, jogo_router, motor_router

app = FastAPI(
    title="Plataforma Matematicalização API",
    description="Motor matemático e gestão de partidas do jogo RPG Financeiro.",
    version="1.0.0"
)

# Configuração de CORS: Como está com ["*"], ele já aceita requisições da Vercel perfeitamente!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, substitua pelo seu domínio oficial da Vercel/HostGator
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Executa o mapeamento e criação das tabelas no startup do servidor
@app.on_event("startup")
def on_startup():
    inicializar_banco()

# Vínculo das rotas modulares
# 🟢 AJUSTADO: Mudamos o prefixo de "/auth" para "/api/v1/auth" para bater com o Axios do Frontend!
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Autenticação"])

app.include_router(jogo_router, prefix="/jogo", tags=["Partidas"])
app.include_router(motor_router, prefix="/motor", tags=["Motor Matemático"])

@app.get("/")
def check_status():
    return {"status": "Online", "mensagem": "Servidor do Matematicalização operando com sucesso!"}