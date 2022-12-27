const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
require("./db/conn");
const Register = require("./models/registers");
const { handlebars } = require("hbs");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.static(static_path));
app.get("/static", (req, res) => {
    res.render("static");
});
app.get("/dynamic", (req, res) => {
    imageList = [];
    imageList.push({ src: "icons/flask.png", name: "flask" });
    imageList.push({ src: "icons/javascript.png", name: "javascript" });
    imageList.push({ src: "icons/react.png", name: "react" });
    res.render("dynamic", { imageList: imageList });
});

app.use(express.static("images"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.get('/', (req, res) => {
    res.render("index");
});
app.get('/index', (req, res) => {
    res.render("index");
});
app.get('/register', (req, res) => {
    res.render("register");
});
app.post('/register', async (req, res) => {
    try {
        const pswd = req.body.psw;
        const cpswd = req.body.psw_repeat;
        if (pswd === cpswd){
        const registeremployee = new Register({
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            gender:req.body.gender,
            country_code: req.body.country_code,
            phone:req.body.phone,
            Current_Address: req.body.Current_Address,
            email: req.body.email,
            psw: req.body.psw,
            psw_repeat:req.body.psw_repeat
        })
        const registered = await registeremployee.save();
        res.status(201).render("index");
}else{
    res.send("password not matching");
}
    
}
    
    catch (error) {
    res.status(400).send(error);
}
});

app.listen(port, () => {
    console.log('server is running');
})