"""Initial migration

Revision ID: f32fb0c3146f
Revises: 
Create Date: 2024-07-21 23:31:38.471810

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'f32fb0c3146f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('integracao',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_trava', sa.Integer(), nullable=False),
    sa.Column('codcontrole', sa.Integer(), nullable=False),
    sa.Column('sucesso', sa.Boolean(), nullable=True),
    sa.Column('mensagem', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('integracao', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_integracao_codcontrole'), ['codcontrole'], unique=False)
        batch_op.create_index(batch_op.f('ix_integracao_id_trava'), ['id_trava'], unique=False)

    with op.batch_alter_table('empresa', schema=None) as batch_op:
        batch_op.add_column(sa.Column('hrinicio', sa.String(length=10), nullable=True))
        batch_op.add_column(sa.Column('hrfinal', sa.String(length=10), nullable=True))
        batch_op.add_column(sa.Column('logomarca', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('tokenbot', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('limiteparc', sa.Integer(), nullable=True))

    with op.batch_alter_table('roles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cancelar', sa.Boolean(), nullable=False))

    with op.batch_alter_table('trava', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cotacao', sa.Numeric(precision=10, scale=2), nullable=False))
        batch_op.add_column(sa.Column('desagio', sa.Numeric(precision=10, scale=2), nullable=False))
        batch_op.alter_column('quantidade',
               existing_type=mysql.DECIMAL(precision=10, scale=2),
               type_=sa.Numeric(precision=10, scale=3),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trava', schema=None) as batch_op:
        batch_op.alter_column('quantidade',
               existing_type=sa.Numeric(precision=10, scale=3),
               type_=mysql.DECIMAL(precision=10, scale=2),
               existing_nullable=False)
        batch_op.drop_column('desagio')
        batch_op.drop_column('cotacao')

    with op.batch_alter_table('roles', schema=None) as batch_op:
        batch_op.drop_column('cancelar')

    with op.batch_alter_table('empresa', schema=None) as batch_op:
        batch_op.drop_column('limiteparc')
        batch_op.drop_column('tokenbot')
        batch_op.drop_column('logomarca')
        batch_op.drop_column('hrfinal')
        batch_op.drop_column('hrinicio')

    with op.batch_alter_table('integracao', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_integracao_id_trava'))
        batch_op.drop_index(batch_op.f('ix_integracao_codcontrole'))

    op.drop_table('integracao')
    # ### end Alembic commands ###
