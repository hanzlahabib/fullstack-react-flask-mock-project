from . import create_app
import click
from flask.cli import with_appcontext
from .models import Movies, Genre, db, MoviesSchema, genre_association
import csv


@click.command(name='loadcsv')
@with_appcontext
def loadcsv():
    db.drop_all()
    db.create_all()
    with open('static/movies.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        for line in csv_reader:
            movie = Movies(name=line[0], type=line[1],
                           language=line[2], runtime=line[3])
            # new_genre1.movies.append(movie)
            db.session.add(movie)
        db.session.commit()
    click.echo('Added Movies successfully')
    with open('static/genre.csv', 'r') as genre_file:
        csv_reader = csv.reader(genre_file)
        for line in csv_reader:
            genre = Genre(name=line[0])
            db.session.add(genre)
        db.session.commit()
    click.echo('Added Genres Successfully')
    with open('static/relation.csv', 'r') as relation_csv:
        csv_reader = csv.reader(relation_csv)
        for line in relation_csv:
            statement = genre_association.insert().values(
                movie_id=line[0], genre_id=line[1])
            db.session.execute(statement)
            db.session.commit()
    click.echo('Added relation Successfully')


@click.command(name='setup')
@with_appcontext
def setup():
    db.drop_all()
    db.create_all()
