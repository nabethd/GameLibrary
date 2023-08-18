import { app } from './app';
import { initMongoDB } from './mongoDB/init';

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const init = async () => {
    await initMongoDB();
    // await bulkInsert();
};

init();
