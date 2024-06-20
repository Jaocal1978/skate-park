import { Router } from "express";
import { getInscritos } from "../models/models.js";
import { Authorization } from "../middlewares/Authorization.js"
const router  = Router()

//Todos
router.get("/", async (req, res) => 
{
    const inscritos = await getInscritos();

    for (let i = 0; i < inscritos.rows.length; i++) 
    {
        if(inscritos.rows[i].estado == false)
        {
            inscritos.rows[i].estado = "En Revisión";
        }
        else
        {
             inscritos.rows[i].estado = "Aceptado";
        }
    }
    
    res.render("home", {
        inscritos: inscritos.rows
    })
})

// Login
router.get("/logins", async(req, res) => 
{
    res.render("logins")
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