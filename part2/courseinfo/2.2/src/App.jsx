const Course =({course})=>{
  const Header=({name})=><h1>{name}</h1>;

  const Part=({part})=>{
    return(
    <p>
      {part.name}  {part.exercises}
    </p>);
  };

  const Content=({parts})=>(
    <div>
      {parts.map((part)=>(
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
   
  const Total = ({ parts }) => {
  let total = 0;
  for (let i = 0; i < parts.length; i++) {
    total += parts[i].exercises;
  }

  return (
    <p><strong>total of {total} exercises</strong></p>
  );
};


  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };

  return <Course course={course} />
};

export default App;
