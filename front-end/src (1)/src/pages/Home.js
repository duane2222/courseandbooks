import React from 'react';
import axios from 'axios';

class Home extends React.Component {
    
    state = {
        courses: [],
        books: [],
        time: 5000
    }
    
    componentDidMount = async() => {
        await this.getBooks();
        await this.getCourses();
        
    };
    
    getBooks =  async() => {
        await axios.get('/api/books')
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
    
    getCourses =  async() => {
        await axios.get('/api/courses')
            .then((response) =>
            {
                const data = response.data;
                this.setState({ courses: data});
                console.log('Data got');
                console.log(data);
            })
            .catch(() => {
                console.log('error');
            });
    }
    pname(id, books) {
        console.log(books)
        console.log(books.books)
        
        let r = books.books.map((books, index) => {
            if(books.course == id){ 
                    console.log('if')
                    return (books.name, books.price)
            }
        });
        
        
        console.log('in r')
        
        console.log(r)
        if (r.length == 0){
            console.log('nul')
            return <p>No needed books</p>;
        }
        else {
            return r;
        }
    }
    
displayAll = (courses, books) => {
    console.log("im displ");
    console.log(books);

    if (courses.length == 0) return null;
    return courses.courses.map((courses, index) => (
      <div key={index} className="blog-post__display">
        <h3>{courses.name}</h3>
        <p>{courses.semester}</p>
        <p>{courses.teacher}</p>
        <h3>Books needed</h3>
        <p>{this.pname(courses.name, books)}</p>
        </div>
    ));
  };
    
    render() {
        return(
            <div className="app">
            <h1>Home</h1>

        <div className="courses">
        <h2>Current Courses</h2>
          {this.displayAll(this.state.courses, this.state.books)}
        </div>
        </div>
        )
    }
}   


export default Home;