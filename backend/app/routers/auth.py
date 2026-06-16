from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlmodel import Session, select
from app.database import get_db  
from app.models.usuario import Usuario
from app import auth_utils

# Mantém o objeto router que o seu main.py já espera
router = APIRouter()

class CadastroSchema(BaseModel):
    nome: str
    email: EmailStr
    cpf: str
    senha: str

@router.post("/cadastro", status_code=status.HTTP_201_CREATED)
def cadastrar_usuario(dados: CadastroSchema, db: Session = Depends(get_db)):
    email_existe = db.exec(select(Usuario).where(Usuario.email == dados.email)).first()
    if email_existe:
        raise HTTPException(status_code=400, detail="Este e-mail já está cadastrado.")
        
    cpf_existe = db.exec(select(Usuario).where(Usuario.cpf == dados.cpf)).first()
    if cpf_existe:
        raise HTTPException(status_code=400, detail="Este CPF já está cadastrado.")

    senha_criptografada = auth_utils.gerar_senha_hash(dados.senha)

    novo_usuario = Usuario(
        nome=dados.nome,
        email=dados.email,
        cpf=dados.cpf,
        senha_hash=senha_criptografada
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    
    return {"message": "Cadastro realizado com sucesso!"}

@router.post("/login")
def login_usuario(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    usuario = db.exec(select(Usuario).where(Usuario.email == form_data.username)).first()

    if not usuario or not auth_utils.verificar_senha(form_data.password, usuario.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos."
        )

    token_acesso = auth_utils.criar_token_acesso(
        dados={"sub": usuario.email, "nome": usuario.nome, "id": usuario.id}
    )

    return {"access_token": token_acesso, "token_type": "bearer"}