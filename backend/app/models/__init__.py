# Primeiro importa o Usuário (base de tudo)
from .usuario import Usuario

# Depois importa os modelos que dependem do Usuário
from .partida import Partida
from .grupo import Grupo
from .rodada import Rodada

# Exporta todos para ficarem visíveis para o banco de dados
__all__ = ["Usuario", "Partida", "Grupo", "Rodada"]