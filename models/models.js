import * as db from '../data/db.js';

export const getInscritos = async () =>
{
    const text = "SELECT * FROM skaters";
    const result = await db.query(text);
    return result;
}

export const getInscrito = async (data) =>
{
    const { email } = data;
    const text = "SELECT * FROM skaters WHERE email = $1";
    const values = [email];
    const result = await db.query(text, values);
    return result;
}

export const createInscrito = async (data) =>
{
    const { email, nombre, password, experiencia, especialidad, foto, estado } = data;
    const text = "INSERT INTO skaters(email,nombre,password,anos_experiencia,especialidad,foto,estado) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    const values = [email,nombre,password,experiencia,especialidad,foto,false];
    const result = await db.query(text, values);
    return result;
}

export const updateInscrito = async (data) =>
{
    const { email, nombre, password, experiencia, especialidad } = data;
    const text = "UPDATE skaters SET nombre=$1, password=$2, anos_experiencia=$3, especialidad=$4 WHERE email = $5";
    const values = [nombre, password, experiencia, especialidad, email];
    const result = await db.query(text, values);
    return result;
}

export const deleteInscrito = async (data) =>
{
    const { email } = data;
    const text = "DELETE FROM skaters WHERE email = $1";
    const values = [email];
    const result = await db.query(text, values);
    return result;
}

export const updateInscritoStatus = async (data) => 
{
    const { estado, id } = data;
    const text = 'UPDATE skaters SET estado = $1 WHERE id = $2';
    const values = [estado, id];
    const result = await db.query(text, values);
    return result;
}