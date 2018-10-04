let app = require('express')();

let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


let mongoose = require('mongoose');

mongoose.connect(
    'mongodb://admin:node123@ds125912.mlab.com:25912/cursonode_pietro',
    { useNewUrlParser: true }
);

let ToDo = require('./models/todo');


const port = process.env.PORT || 5000;

app.get('/', function (req, res) {
    res.send("Server running");
})

app.get('/todo', function (req, res) {
    ToDo
        .find()
        .exec((err, todos) => {
            if (!err) {
                res.json({
                    success: true,
                    message: "ToDos buscados com sucesso!",
                    todos
                });
            } else {
                res.json({
                    success: false,
                    message: err.message,
                    todos: []
                });
            }
        });
});

app.post('/todo', async (req, res) => {

    try {
        let todo = new ToDo({ title: req.body.title });

        let savedTodo = await todo.save();

        res.json({
            success: true,
            message: "ToDo inserido com sucesso!",
            todo: savedTodo
        })

    } catch (err) {

        res.json({
            success: false,
            message: err.message,
        })
    }
});

app.put('/todo', async (req, res) => {
    try {
        
        let updatedTodo = await ToDo.updateOne({ _id: req.body._id }, { is_complete: req.body.is_complete });

        res.json({
            success: true,
            message: "ToDo alterado com sucesso!"
        });

    } catch (err) {

        res.json({
            success: false,
            message: err.message
        })
    }
})



app.listen(port, () => {
    console.log(`Running (port: ${port})`);
});

module.exports = app;
