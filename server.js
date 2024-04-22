const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const fs = require('fs');
const cors = require('cors')
require('dotenv').config();


app.use(cors(
    {
        origin: [],
        methods: ["POST","GET"],
        credentials:true
    }
));


const port = process.env.PORT || 8000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Serve static files
app.use(express.static(path.join(__dirname, 'hangman')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the main HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "hangman", "index.html"));
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Function to hash a password
async function hashPassword(password) {
    try {
        const saltRounds = 10; // Number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Error hashing password');
    }
}

// Function to compare a password with its hash
async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error comparing password:', error);
        throw new Error('Error comparing password');
    }
}

// Route to handle form submission
app.post("/", async (req, res) => {
    console.log("Received form data:", req.body);
    const { username, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);

    console.log("username:", username, "hashed password:", hashedPassword);

    try {
        // Check if username already exists
        const { data: existingUsers, error: fetchError } = await supabase
            .from('player')
            .select('*')
            .eq('username', username);

        if (fetchError) {
            console.error('Error fetching existing user:', fetchError.message);
            return res.status(500).send('Internal Server Error');
        }

        if (existingUsers.length > 0) {
            // Username already exists, send alert to client
            console.log('Username already exists:', username);
            return res.status(400).send('Username already exists');
        }

        // Username doesn't exist, proceed with inserting new record
        const { error: insertError } = await supabase
            .from('player')
            .insert([{ username, password: hashedPassword }]);

        if (insertError) {
            console.error('Error inserting data:', insertError.message);
            return res.status(500).send('Internal Server Error');
        }

        console.log('Data inserted successfully for:', username);
        res.status(200).send('Signup successful');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query the database to check if the user exists
        const { data: users, error: fetchError } = await supabase
            .from('player')
            .select('username, password')
            .eq('username', username)
            .single();

        if (fetchError) {
            console.error('Error fetching user:', fetchError.message);
            return res.status(500).send('Internal Server Error');
        }

        if (!users || users.length === 0) {
            // User not found
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Compare the hashed password
        const { password: hashedPassword } = users;
        const match = await comparePassword(password, hashedPassword);

        if (match) {
            // Login successful
            console.log('Login successful for:', username);
            res.status(200).json({ success: true, username });
        } else {
            // Incorrect password
            console.log('Incorrect password for:', username);
            res.status(401).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle updating user stats
app.post("/updatestat", async (req, res) => {
    const { username, outcome } = req.body;

    try {
        // Check if the user exists
        const { data: users, error: fetchError } = await supabase
            .from('player')
            .select('*')
            .eq('username', username)
            .single();

        if (fetchError) {
            console.error('Error fetching user:', fetchError.message);
            return res.status(500).send('Internal Server Error');
        }

        if (!users || users.length === 0) {
            // User not found
            return res.status(404).json({ error: "User not found" });
        }

        // Increment wins or losses based on the result
        const { win, loss } = users;
        let updatedData;
        if (outcome === 1) {
            updatedData = await supabase
                .from('player')
                .update({ win: win + 1 })
                .eq('username', username);
        } else if (outcome === 0) {
            updatedData = await supabase
                .from('player')
                .update({ loss: loss + 1 })
                .eq('username', username);
        }

        if (updatedData.error) {
            console.error('Error updating stats:', updatedData.error.message);
            return res.status(500).send('Internal Server Error');
        }

        // Send success response
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error updating stats:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle fetching user profiles
app.post("/getprofile", async (req, res) => {
    const { username } = req.body;

    try {
        const { data: users, error: fetchError } = await supabase
            .from('player')
            .select('*')
            .eq('username', username)
            .single();

        if (fetchError) {
            console.error('Error fetching user profile:', fetchError.message);
            return res.status(500).send('Internal Server Error');
        }

        if (!users || users.length === 0) {
            // User not found
            return res.status(404).json({ error: "User not found" });
        }

        const { win, loss, avatar_path } = users;
        res.status(200).json({
            success: true,
            username,
            win,
            loss,
            avatarPath: avatar_path
        });
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle avatar upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'hangman/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/uploadavatar', upload.single('avatar'), async (req, res) => {
    const { username } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        // Check if the user exists
        const { data: users, error: fetchError } = await supabase
            .from('player')
            .select('*')
            .eq('username', username)
            .single();

        if (fetchError) {
            console.error('Error fetching user:', fetchError.message);
            return res.status(500).send('Internal Server Error');
        }

        if (!users || users.length === 0) {
            // User not found
            return res.status(404).json({ error: "User not found" });
        }

        const currentAvatarPath = users.avatar_path;
        if (currentAvatarPath) {
            // Delete the current avatar file
            const currentAvatarFullPath = path.join(__dirname, 'hangman', currentAvatarPath.substring(1));
            fs.unlink(currentAvatarFullPath, (err) => {
                if (err) {
                    console.error('Error deleting current avatar:', err);
                    // Handle error as needed
                } else {
                    console.log('Current avatar deleted successfully');
                }
            });
        }

        // Update the avatar path in the database
        const relativePath = `/uploads/${file.filename}`;
        const { error: updateError } = await supabase
            .from('player')
            .update({ avatar_path: relativePath })
            .eq('username', username);

        if (updateError) {
            console.error('Error updating avatar path:', updateError.message);
            return res.status(500).send('Internal Server Error');
        }

        res.status(200).json({ success: true, avatarPath: relativePath });
    } catch (error) {
        console.error('Error uploading avatar:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
