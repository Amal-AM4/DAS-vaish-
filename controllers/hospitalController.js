const jwt = require("jsonwebtoken");
const prisma = require("../config/database");

require('dotenv').config();
const CODE = process.env.JSON_KEY;

async function hospitalLogin (req, res) {
    res.render('hospital/login');
}

async function hospitalReg (req, res) {
    try {
        res.render('hospital/register',);
    } catch (error) {
        console.error(error);
    }
}

async function hospitalRegData (req, res) {
    try {
        const { name, phone, email, place, password } = req.body;
        const addHosData = await prisma.Hospital.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                place: place,
                password: password
            }
        });

        console.log('Hospital is added');
        res.redirect('/hospital/login');
    } catch (error) {
        console.error(error);
    }
}

async function home(req, res) {
    try {
        const hosData = req.hospital;
        const pk = hosData.hospitalId;
        console.log(hosData);
        
        // Fetch employee details along with their associated job category
        const hos = await prisma.Hospital.findUnique({
            where: { id: pk }
        });

        res.render('hospital/index', { data: hos })
    } catch (error) {
        console.error(error);
    }
}

// handle emp login requests
async function hospitalLoginProcess (req, res) {
    try {
        const { email, password } = req.body;
        
        const hos = await prisma.Hospital.findUnique({
            where: {
                email: email
            }
        });

        if (!hos) {
            return res.status(404).json({ message: "Emp not found"});
        }

        let isPassVaild = false;

        if ((hos.password) === password) {
            isPassVaild = true;
        }

        if (!isPassVaild) {
            return res.status(401).json({message: "Invaild password"})
        }

        const token = jwt.sign({ hospitalId: hos.id }, CODE, { expiresIn: '1h' });

        res.cookie("hospitalToken", token, { httpOnly: true });

        res.redirect('/hospital/index');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
}

async function hospitalLogout (req, res) {  
    res.clearCookie('hospitalToken');
    return res.redirect('/hospital/login');
}


module.exports = {
    hospitalLogin, hospitalReg, hospitalRegData,
    hospitalLoginProcess, hospitalLogout,
    home,
}