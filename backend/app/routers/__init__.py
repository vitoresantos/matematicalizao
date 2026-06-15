from .auth import router as auth_router
from .jogo import router as jogo_router
from .motor_matematico import router as motor_router

__all__ = ["auth_router", "jogo_router", "motor_router"]