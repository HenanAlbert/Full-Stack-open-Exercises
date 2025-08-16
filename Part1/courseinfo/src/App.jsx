const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }

  const Part = ({ p }) => {
    return (
      <p>
        {p.name} {p.exercises}
      </p>
    )
  }

  const Content = ({ parts }) => {
    return (
      <div>
        <Part p={parts[0]} />
        <Part p={parts[1]} />
        <Part p={parts[2]} />
      </div>
    )
  }

  const Total = ({ parts }) => {
    return (
      <p>
        Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    )
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App