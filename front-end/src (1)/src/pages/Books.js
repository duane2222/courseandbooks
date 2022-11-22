import React from 'react';
import axios from 'axios';

class Books extends React.Component {
    state = {
        name: '',
        price: '',
        course: '',
        books: [],
        error: ''
    }
    
    componentDidMount = () => {
        this.getBooks();
    };
    
    getBooks = () => {
        axios.get('/api/books')
            .then((response) =>
            {
                const data = response.data;
                this.setState({ books: data});
                console.log('Data got');
                console.log(data);
            })
            .catch(() => {
                console.log('error');
            });
    }
    
    deleteBook = (book) => {
        axios.delete('/api/books/' + book)
            .then(() =>
            {
                this.resetUserInputs();
                this.getBooks();
                console.log('Deleted');
            })
            .catch(() => {
                console.log('error');
            });
    }
    
    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };
    
    submit = (event) => {
    event.preventDefault();
    if(this.state.name == '' || this.state.price == '' || this.state.course == ''){
        this.setState({error: "Invalid Book"});
        return;
    }
    
    this.setState({error: "Thanks for your submission"});
    const payload = {
      name: this.state.name,
      price: this.state.price,
      course: this.state.course
    };


    axios({
      url: '/api/books',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getBooks();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
  };
  
  resetUserInputs = () => {
    this.setState({
      name: '',
      price: '',
      course: ''
    });
  };
    
displayBooks = (books) => {
    console.log("im displ");
    console.log(books);
    if (books.length == 0) return null;

    console.log("im displaying")
    return books.books.map((books, index) => (
      <div key={index} className="blog-post__display">
        <h3>{books.name}</h3>
        <p>${books.price}</p>
        <p>{books.course}</p>
        <button onClick={() => this.deleteBook(books.id)}>Delete</button>
        </div>
    ));
  };
    
    render() {
        return(
            <div className="app">
            <h1>Books works</h1>
            <form onSubmit={this.submit}>
            <h2>{this.state.error}</h2>
            <div className="form-input">
            <input
              placeholder="name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            >
            </input>
          </div>
          <div className="form-input">
            <input
              placeholder="price"
              name="price"
              type="number"
              value={this.state.price}
              onChange={this.handleChange}
            >
            </input>
          </div>
          <div className="form-input">
            <input
              placeholder="course"
              name="course"
              type="text"
              value={this.state.course}
              onChange={this.handleChange}
            >
            </input>
          </div>

          <button>Submit</button>
        </form>

        <div className="books">
        <h2>Current Booklist</h2>
          {this.displayBooks(this.state.books)}
        </div>
            </div>
        )
    }
}   


export default Books;