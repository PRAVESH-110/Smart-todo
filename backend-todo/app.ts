import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/route.todo';


const app= express();
app.use(express.json());
app.use(cors());
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;