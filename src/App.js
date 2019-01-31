import React, { Component } from 'react';

class App extends Component {
  state = {
    filter: '',
    lessons: [],
  };
  componentDidMount() {
    this.fetchLessons();
  }
  onChangeFilter = e => {
    const filter = e.target.value;
    this.setState({ filter }, this.fetchLessons);
  };
  fetchLessons = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const { filter } = this.state;
      fetch(`/api/lessons?filter=${filter}`)
        .then(rs => rs.json())
        .then(lessons => this.setState({ lessons }));
    }, 300); // debounce
  };
  render() {
    const { filter, lessons } = this.state;
    return (
      <div>
        <input
          value={filter}
          onChange={this.onChangeFilter}
        />
        <ul>
          {lessons.map(lesson => (
            <li key={lesson.id}>{lesson.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
