from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import obter_sessao
from app.models.usuario import Usuario

router = APIRouter(prefix="/api/auth", tags=["Autenticação"])

@router.post("/cadastro", status_code=status.HTTP_201_CREATED)
def cadastrar_professor(usuario: Usuario, db: Session = Depends(obter_sessao)):
    # 1. Limpa o CPF tirando pontos e traços
    cpf_limpo = "".join(filter(str.isdigit, usuario.cpf))
    if len(cpf_limpo) != 11:
        raise HTTPException(status_code=400, detail="CPF deve conter exatamente 11 dígitos numéricos.")
    
    # 2. Confere duplicidade
    usuario.cpf = cpf_limpo
    existente = db.exec(select(Usuario).where((Usuario.email == usuario.email) | (Usuario.cpf == cpf_limpo))).first()
    if existente:
        raise HTTPException(status_code=400, detail="E-mail ou CPF já registrado na plataforma.")
    
    # Em produção: aplicar criptografia na senha aqui (ex: passlib/bcrypt)
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return {"mensagem": "Professor cadastrado com sucesso!", "usuario_id": usuario.id}

@router.post("/login")
def login_professor(credenciais: dict, db: Session = Depends(obter_sessao)):
    user = db.exec(select(Usuario).where(Usuario.email == credenciais.get("email"))).first()
    if not user or user.senha_hash != credenciais.get("senha"):
        raise HTTPException(status_code=401, detail="Credenciais de acesso inválidas.")
    return {"mensagem": "Acesso autorizado!", "usuario_id": user.id, "nome": user.nome}