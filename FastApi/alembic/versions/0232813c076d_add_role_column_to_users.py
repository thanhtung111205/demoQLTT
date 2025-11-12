"""add role column to users

Revision ID: 0232813c076d
Revises: 56bfaea379a0
Create Date: 2025-11-12 00:53:07.921421

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0232813c076d'
down_revision: Union[str, Sequence[str], None] = '56bfaea379a0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
