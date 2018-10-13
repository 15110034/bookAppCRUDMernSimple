import express from "express";
import bodyParser from "body-parser";
import { ConnectDatabase } from './Databases/Connect';
import bookRoutes from './routers/bookRouters';


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
ConnectDatabase();

const port = process.env.PORT || 5000 ;
app.use('/api/books',bookRoutes);

app.listen(port,()=>console.log(`server is listening on port ${port}`));
