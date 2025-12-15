const mongoose=require('mongoose')

if(process.argv.length<3){
    console.log('give password as an arguement')
}

const password=process.argv[2]

const url=`mongodb+srv://Phoneboook:${password}@cluster0.hvtajgp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema=new mongoose.Schema({
    id: String,
    name: String,
    number: String,
})

const Note =mongoose.model('Note',noteSchema)

const note=new Note({
    id: "5",
    name: "Sohail",
    number: "6371551027",
})

note.save().then(result=>{
    console.log('note saved!')
    mongoose.connection.close()
})