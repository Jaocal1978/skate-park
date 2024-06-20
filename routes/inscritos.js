import { Router } from "express";
import { getInscritos, deleteInscrito, updateInscrito, updateInscritoStatus, createInscrito } from "../models/models.js";

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
        const data = req.query;
        const result = await deleteInscrito(data)

        console.log(result);

        res.json(
        {
            message: `Usuario fue eliminado`
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

router.post("/", async (req, res) => 
{
    try 
    {
        const data = req.body
        const result = await createInscrito(data)

        res.json(
        {
            message: 'Success',
            inscrito: result.rows[0]
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