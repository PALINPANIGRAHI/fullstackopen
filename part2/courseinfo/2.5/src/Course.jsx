const Course = ({ course }) => {
  const Header = ({ name }) => <h2>{name}</h2>;
  const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>;
};


  const Content = ({ parts }) => (
    <div>
      {parts.map(part => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );

  const Total = ({ parts }) => {
    let total = 0;
    for (let i = 0; i < parts.length; i++) {
      total += parts[i].exercises;
    }
    return <p><strong>total of {total} exercises</strong></p>;
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
