import mongoose from 'mongoose';
import dotenv from 'dotenv';
import emoji from 'node-emoji';

dotenv.config();
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
}, (error) => {
    if (error) { console.log(error) } else {
        console.log(emoji.get('fire'), 'Conectado a la bd');

    };
}).then().catch(error=>console.log(error))

export default mongoose 