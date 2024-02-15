const express = require('express');


// Connect DB
require('./db/connection');


//Import Files
const Users = require('./modals/Users');
const Conversations = require('./modals/conversation')


// app Use
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT || 8000;


// Routes
app.get('/', (req,res) => {
    res.send('Welcome');
})

app.listen(port, () => {
    console.log('listening on port' + port);
})

app.post('api/login', async (req, res) => {
    try{
        const {fullName, email , passoword} = req.body;

        if(!fullName   || !email || !passoword){
            res.status(400).send('please fill all required fields');
        }else {
            const isAlreadyExist = await Users.findOne({email});
            if(isAlreadyExist) {
                res.status(400).send('user already exists');
            }else {
                const newUser = new Users({ fullName, email, passowrd});
                newUser.save();
                return res.status(200).send({ data: newUser, msg: 'User saved successfully' });
            }
        }
    } catch (error) {

    }
});



app.post('/api/conversation', async (req,res) => {
    try {
        const {senderId, receverId} = req.body;
        const newconversation = new Conversations ({ members: [senderId, receverId]});
        await newconversation.save();
res.status(200).send({data: newconversation, msg:'Conversation created successfully'});
    } catch (error) {
        res.status(400).send(error)
    }
});

app.get('/api/conversation/:userId' , async (req, res) => {
    try{
        const userId = req.params.userId;
        const conversation = await Conversations.find({ members: {$in: [userId]}});
        res.status(200).json(conversation);
    } catch (error) {
        res.status(400).send(error);
    }
})