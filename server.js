const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const corsOptions = {
    origin: ['http://localhost:4000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const apiRouter = express.Router();
apiRouter.post('/accounts/authenticate', (req, res) => {
    try {
        // Temporary authentication logic
        const { email, password } = req.body;
        if (email && password) {
            res.json({
                id: '1',
                email: email,
                token: 'dummy-token'
            });
        } else {
            res.status(400).json({ message: 'Email and password are required' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, 'dist/frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/frontend/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

const PORT = process.env.PORT || 3000;s
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('CORS enabled for:', corsOptions.origin);
}); 