from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import inicializar_banco
from app.routers import auth, jogo, motor_matematico

app = FastAPI(
    title="Plataforma Matematicalização API",
    description="Motor matemático e gestão de partidas do jogo RPG Financeiro.",
    version="1.0.0"
)

# Configuração de CORS: Permite que o frontend da HostGator envie requisições com segurança
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, substitua pelo seu domínio: ["https://www.matematicalizacao.com.br"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Executa o mapeamento e criação das tabelas no startup do servidor
@app.on_event("startup")
def on_startup():
    inicializar_banco()

# Vínculo das rotas modulares
app.include_router(auth.router)
app.include_router(jogo.router)
app.include_router(motor_matematico.router)

@app.get("/")
def check_status():
    return {"status": "Online", "mensagem": "Servidor do Matematicalização operando com sucesso!"}