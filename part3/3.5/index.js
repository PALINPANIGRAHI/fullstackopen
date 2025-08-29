const express=require('express')
const app=express()
app.use(express.json())

let persons=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
//to print in the frontend
app.get('/info',(request,response)=>{
    const date=new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`)
})
//to create an array in json format
app.get('/api/persons',(requset,response)=>{
    response.json(persons)
})
//to display all the info in the backend through id also
app.get('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    const person=persons.find(p=>p.id===id)
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})
//delte data
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id.toString()
  const initialLength = persons.length

  persons = persons.filter(person => person.id !== id)

  if (persons.length < initialLength) {
    response.status(204).end()
  } else {
    response.status(404).send({ error: 'Person not found' })
  }
})
//add data
function getId(max){
    return Math.floor(Math.random()*max);
}

app.post('api/persons',(request,response)=>{
    const body=request.body

  if(!body.name){
    return response.status(400).json({
      error : "Content Missing"
    })
  }

  const person= {
    name: body.name,
    
    number: body.number,
    id: getId(),
  }

  persons = persons.concat(person)

  response.json(person)
})


const PORT=3001
app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`)
})
