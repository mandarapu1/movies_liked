import React, { Component } from "react";
import { getMovies } from '../services/fakeMovieService';
import Like from './like';

class  Movies extends Component {
    state = { 
        movies: getMovies()
        
     };

    handleLike = movie => {
        console.log('Like clicked',movie);
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]}
        movies.index.liked = !movies.index.liked;
        this.setState({movies});
    }

     handleDelete = (movie) => {
         console.log(movie);
         const movies = this.state.movies.filter(m => m._id !== movie._id);
         this.setState( {movies: movies} );
     };

    render() { 

        const count = this.state.movies.length;

        if (count === 0) return <p>There are no movies in the database</p>
        return (
            <React.Fragment>
            <p>Showing {count } movies in the database</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                  {this.state.movies.map(movie => (
                     <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name} </td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <Like liked={movie.liked} onClick={ movie => this.handleLike(movie)}
                        />
                        <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                   ) ) }
                </tbody>
            </table>
            </React.Fragment>
        )

    }
}
 
export default Movies;
