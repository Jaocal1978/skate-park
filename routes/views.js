import { Router } from "express";
import { getInscritos } from "../models/models.js";
import { Authorization } from "../middlewares/Authorization.js"
const router  = Router()

//Todos
router.get("/", async (req, res) => 
{
    const inscritos = await getInscritos()
    res.render("home", {
        inscritos: inscritos.rows
    })
})

// Login
router.get("/login", async(req, res) => 
{
    res.render("login")
})

//Registro
router.get("/registro", async(req, res) =>
{
    res.render("registro");
})

//datos
router.get("/datos", Authorization, async (req, res) =>
{
    const decoded = req.decoded;
    res.render("datos",
    {
        inscrito: decoded
    })
})

router.get("/admin", async (req, res) => 
{
    const inscritos = await getInscritos()
    res.render("admin", 
    {
        inscritos: inscritos.rows
    })
})

export { router }