from flask import Blueprint, jsonify, request
import click
from flask.cli import with_appcontext
from .models import Movies, Genre, db, MoviesSchema, GenreSchema, genre_association
import csv

main = Blueprint('main', __name__, static_folder='static')


@main.route('/')
def index():
    return 'Index'


@main.route('api/genres')
def getGenres():
    genres = Genre.query.all()
    genre_schema = GenreSchema(many=True)
    result = jsonify(genre_schema.dump(genres))
    return result


@main.route('api/movies')
def getmovies():
    _sortBy = request.args.get('sortBy')
    _type = request.args.get('type')
    _language = request.args.get('language')
    _genreSearch = request.args.get('search')

    movie_schema = MoviesSchema(many=True)
    if _sortBy and _type or _sortBy and _language or _language and _genreSearch:
        return jsonify({"error": "Not allowed"})
    if _type and _language:
        result = Movies.query.filter(Movies.language.ilike(
            "%"+_language+"%") & Movies.type.ilike("%" + _type + "%")).all()
        result = jsonify(movie_schema.dump(result))
        return result
    if _sortBy:
        result = Movies.query.order_by(getattr(Movies, _sortBy)).all()
        result = jsonify(movie_schema.dump(result))
        return result
    elif _genreSearch:
        result = Movies.query.join(genre_association).join(Genre).filter(
            Genre.name.ilike("%" + _genreSearch + "%")).all()
        result = jsonify(movie_schema.dump(result))
        return result
    elif _type:
        result = Movies.query.filter(
            Movies.type.ilike("%" + _type + "%")).all()
        result = jsonify(movie_schema.dump(result))
        return result
    elif _language:
        result = Movies.query.filter(
            Movies.language.ilike("%"+_language+"%")).all()
        result = jsonify(movie_schema.dump(result))
        return result
    else:
        movies = Movies.query.all()
        result = jsonify(movie_schema.dump(movies))
        return result

    # Filter by : Type, Lanugage
    # Search by : Genre
