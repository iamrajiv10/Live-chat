const mongoose = require('mongoose');

const url = `mongodb+srv://iamrajiv10:pJTPw9cPjMi48d9D@chat-app-admin.muwgpxf.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedtopology: true
}).then(() => console.log("MongoDB connected")).catch((e) => console.log('Error',e))