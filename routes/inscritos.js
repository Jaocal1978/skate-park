import { Router } from "express";
import { getInscritos, deleteInscrito, updateInscrito, updateInscritoStatus } from "../models/models.js";

const router = Router();

router.get("/", async (req, res) => 
{
    try 
    {
        const result = await getInscritos()
        res.json({
            inscritos: result.rows
        })
    } 
    catch (error) 
    {
        console.error(error)
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

router.delete("/", async (req, res) => 
{
    try 
    {
        const data = req.query
        const result = await deleteInscrito(data)

        res.json(
        {
            message: `Usuario con email ${data.email}, fue eliminado`
        })
    } 
    catch (error) 
    {
        res.status(500).json(
        {
            message: 'Internal Server Error'
        })
        console.error(error)
    }
})

router.put("/", async (req, res) => 
{
    try 
    {
        const data = req.body
        const result = await updateInscrito(data)

        console.log("RESULT", result)
        res.json(
        {
            message: 'Usuario Skater Actualizado',
            inscrito: result.rows
        })
    } 
    catch (error) 
    {
        res.status(500).json(
        {
            message: 'Error interno del servidor'
        })
        console.error(error)
    }
})

router.put("/status", async (req, res) => 
{
    try 
    {
        const data = req.body
        const result = await updateInscritoStatus(data)

        res.json(
        {
            message: "Estatus actualizado."
        })
    } 
    catch (error) 
    {
        res.status(500).json(
        {
            message: 'Internal Server Error'
        })
        console.error(error)
    }
})

export { router }