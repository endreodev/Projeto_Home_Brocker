"""CAMPO DOLLAR NEGOCIADO NA TRAVA

Revision ID: fbdebb195019
Revises: 5eebb5a2dce7
Create Date: 2024-09-03 23:50:21.221467

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fbdebb195019'
down_revision = '5eebb5a2dce7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('empresa', schema=None) as batch_op:
        batch_op.add_column(sa.Column('token_skn', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('appkey_skn', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('username_skn', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('password_skn', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('empresa', schema=None) as batch_op:
        batch_op.drop_column('password_skn')
        batch_op.drop_column('username_skn')
        batch_op.drop_column('appkey_skn')
        batch_op.drop_column('token_skn')

    # ### end Alembic commands ###
