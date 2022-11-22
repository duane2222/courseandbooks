import React from 'react';
import axios from 'axios';

class Courses extends React.Component {
    state = {
        name: '',
        semester: '',
        teacher: '',
        courses: [],
        error: ''
    }
    
    componentDidMount = () => {
        this.getCourses();
    };
    
    getCourses = () => {
        axios.get('/api/courses')
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
    
    deleteCourse = (course) => {
        axios.delete('/api/courses/' + course)
            .then(() =>
            {
                this.resetUserInputs();
                this.getCourses();
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
    
    if(this.state.name == '' || this.state.semester == '' || this.state.teacher == ''){
        this.setState({error: "Invalid Course"});
        return;
    }
    
    this.setState({error: "Thanks for your submission"});

    const payload = {
      name: this.state.name,
      semester: this.state.semester,
      teacher: this.state.teacher
    };


    axios({
      url: '/api/courses',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getCourses();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
  };
  
  resetUserInputs = () => {
    this.setState({
      name: '',
      semester: '',
      teacher: ''
    });
  };
    
displayCourses = (courses) => {
    console.log("im displ");
    if (courses.length == 0) return null;

    console.log("im displaying")
    return courses.courses.map((courses, index) => (
      <div key={index} className="blog-post__display">
        <h3>{courses.name}</h3>
        <p>{courses.semester}</p>
        <p>{courses.teacher}</p>
        <button onClick={() => this.deleteCourse(courses.id)}>Delete</button>
        </div>
    ));
  };
    
    render() {
        return(
            <div className="app">
            <h1>Courses works</h1>
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
              placeholder="semester"
              name="semester"
              type="text"
              value={this.state.semester}
              onChange={this.handleChange}
            >
            </input>
          </div>
          <div className="form-input">
            <input
              placeholder="teacher"
              name="teacher"
              type="text"
              value={this.state.teacher}
              onChange={this.handleChange}
            >
            </input>
          </div>

          <button>Submit</button>
        </form>

        <div className="courses">
        <h2>Current Courses</h2>
          {this.displayCourses(this.state.courses)}
        </div>
            </div>
        )
    }
}   


export default Courses;