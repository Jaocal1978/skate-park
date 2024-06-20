import { Router } from "express";
import { getInscrito, createInscrito } from '../models/models.js';
import jwt from 'jsonwebtoken';
import path from 'node:path'

const router = Router();

router.post("/login", async (req, res) =>
{
    try 
    {
        const data = req.body;
        const inscrito = await getInscrito(data);

        if(inscrito.rowCount == 0)
        {
            res.status(404).json(
            {
                message: 'User no existe o password incorrecto'
            })
        }
        else if(data.password != inscrito.rows[0].password)
        {
            res.status(400).json(
            {
                message: 'User no existe o password incorrecto'
            })
        }
        else
        {
            const payload = {
                id: inscrito.rows[0].id,
                email: inscrito.rows[0].email,
                nombre: inscrito.rows[0].nombre,
                experiencia: inscrito.rows[0].anos_experiencia,
                especialidad: inscrito.rows[0].especialidad,
                estado: inscrito.rows[0].estado
            }

            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, { expiresIn: '1d'});
            res.json(
            {
                token: token
            })
        }
    } 
    catch (error) 
    {
        res.status(500).json({
            message: 'Internal Server Error'
        })
        console.error(error)
    }
});

router.post("/registro", async (req, res) =>
{
    try 
    {
        const { email } = req.body;
        const data = req.body;
        const inscrito = await getInscrito({email});
        console.log(inscrito);

        if(inscrito.rowCount > 0)
        {
            res.status(401).json(
            {
                message: 'El usuario ya existe'
            })
        }
        else
        {
            const file = req.files.foto

            const fotoUrl = path.join(import.meta.dirname, "../assets/img", file.name);
            const dbUrl = path.join("/assets/img", file.name);
            console.log(dbUrl);
            file.mv(fotoUrl);

            data.foto = dbUrl;

            const result = await createInscrito(data);

            const secret = process.env.JWT_SECRET
            const payload = {
                email: data.email,
                nombre: data.nombre,
                experiencia: data.experiencia,
                especialidad: data.especialidad,
            }

            const token = jwt.sign(payload, secret, {expiresIn: '1d'});

            res.json(
            {
                token: token,
                message: 'Skater creado'
            })
        }
    } 
    catch (error) 
    {
        res.status(500).json(
        {
            message: 'Error interno de servidor'
        })
        console.error(error)
    }
})

export { router }