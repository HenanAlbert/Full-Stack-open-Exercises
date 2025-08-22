const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => (
    <div>
        {parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
)

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Total = ({ total }) => <h2>total of {total} exercises</h2>
const Course = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </>
    )
}

export default Course;