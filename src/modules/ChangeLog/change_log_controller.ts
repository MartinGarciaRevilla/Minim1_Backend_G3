import { Request, Response } from 'express';
import ChangeLog from './ChangeLog_models.js';

// Obtener todos los registros de historial con paginación
export const getAllChangeLogsHandler = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const skip = (page - 1) * pageSize;

        const logs = await ChangeLog.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize);

        const totalLogs = await ChangeLog.countDocuments();
        const totalPages = Math.ceil(totalLogs / pageSize);

        res.status(200).json({ logs, totalLogs, totalPages, currentPage: page });
    } catch (error: any) {
        res.status(500).json({ message: 'Error interno en el servidor', error });
    }
};

// Obtener un registro de historial por ID
export const getChangeLogByIdHandler = async (req: Request, res: Response) => {
    try {
        const log = await ChangeLog.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: 'Registro de historial no encontrado' });
        }
        res.json(log);
    } catch (error: any) {
        res.status(500).json({ message: 'Error interno en el servidor', error });
    }
};

// Crear un nuevo registro de historial
export const createChangeLogHandler = async (req: Request, res: Response) => {
    try {
        const { entity, entityId, userId, changes } = req.body;

        const newLog = new ChangeLog({ entity, entityId, userId, changes });
        await newLog.save();

        res.status(201).json(newLog);
    } catch (error: any) {
        res.status(500).json({ message: 'Error interno en el servidor', error });
    }
};

// Actualizar un registro de historial
export const updateChangeLogHandler = async (req: Request, res: Response) => {
    try {
        const updatedLog = await ChangeLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLog) {
            return res.status(404).json({ message: 'Registro de historial no encontrado' });
        }
        res.json(updatedLog);
    } catch (error: any) {
        res.status(500).json({ message: 'Error interno en el servidor', error });
    }
};

// Eliminar un registro de historial
export const deleteChangeLogHandler = async (req: Request, res: Response) => {
    try {
        const log = await ChangeLog.findByIdAndDelete(req.params.id);
        if (!log) {
            return res.status(404).json({ message: 'Registro de historial no encontrado' });
        }
        res.json({ message: 'Registro de historial eliminado correctamente' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error interno en el servidor', error });
    }
};