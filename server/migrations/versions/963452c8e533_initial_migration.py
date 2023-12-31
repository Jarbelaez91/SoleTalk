"""initial migration

Revision ID: 963452c8e533
Revises: 
Create Date: 2023-08-16 18:25:04.805435

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '963452c8e533'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sneakers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name_of_sneaker', sa.String(), nullable=False),
    sa.Column('category', sa.String(), nullable=True),
    sa.Column('name_of_brand', sa.String(), nullable=True),
    sa.Column('release_date', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Float(), nullable=True),
    sa.Column('review', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('sneaker_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['sneaker_id'], ['sneakers.id'], name=op.f('fk_reviews_sneaker_id_sneakers')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_reviews_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('users')
    op.drop_table('sneakers')
    # ### end Alembic commands ###
