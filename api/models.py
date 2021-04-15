from . import db, ma

genre_association = db.Table('genre_association',
                             db.Column('movie_id', db.Integer,
                                       db.ForeignKey('movies.id')),
                             db.Column('genre_id', db.Integer,
                                       db.ForeignKey('genre.id'))
                             )


class Users(db.Model):
    # primary keys are required by SQLAlchemy
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    # this is temporary, in real life roles should be association table
    roles = db.Column(db.String(1000))


class Movies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    type = db.Column(db.String(20))
    language = db.Column(db.String(20))
    runtime = db.Column(db.Integer)
    genre = db.relationship('Genre', secondary=genre_association,
                            backref=db.backref('movies', lazy='joined'))


class Genre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))


class GenreSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Genre

    id = ma.auto_field()
    name = ma.auto_field()


class MoviesSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Movies

    id = ma.auto_field()
    name = ma.auto_field()
    type = ma.auto_field()
    language = ma.auto_field()
    runtime = ma.auto_field()
    genre = ma.Nested(GenreSchema, many=True)
