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
   
  


  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <p><strong>total of {course.parts.reduce((s,p) => s+p.exercises,0)} exercises </strong></p>
      
      
    </div>
  );
};


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        { name: 'Fundamentals of React', exercises: 10, id: 1 },
        { name: 'Using props to pass data', exercises: 7, id: 2 },
        { name: 'State of a component', exercises: 14, id: 3 },
        { name: 'Redux', exercises: 11, id: 4 },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        { name: 'Routing', exercises: 3, id: 1 },
        { name: 'Middlewares', exercises: 7, id: 2 },
      ],
    },
  ];

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;