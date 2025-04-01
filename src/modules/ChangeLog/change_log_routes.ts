import express from 'express';
import {
    getAllChangeLogsHandler,
    getChangeLogByIdHandler,
    createChangeLogHandler,
    updateChangeLogHandler,
    deleteChangeLogHandler
} from '../ChangeLog/change_log_controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/change-logs:
 *   get:
 *     summary: Obtiene todos los registros de cambios
 *     description: Retorna una lista de registros de cambios con paginación.
 *     tags:
 *       - Change Logs
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           enum: [10, 25, 50]
 *           default: 10
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/change-logs', getAllChangeLogsHandler);

/**
 * @openapi
 * /api/change-logs/{id}:
 *   get:
 *     summary: Obtiene un registro de cambios por ID
 *     description: Retorna los detalles de un registro de cambios específico.
 *     tags:
 *       - Change Logs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get('/change-logs/:id', getChangeLogByIdHandler);

/**
 * @openapi
 * /api/change-logs:
 *   post:
 *     summary: Crea un nuevo registro de cambios
 *     description: Añade un nuevo registro de cambios.
 *     tags:
 *       - Change Logs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entity:
 *                 type: string
 *                 description: Nombre de la entidad modificada (e.g., 'gyms', 'combats').
 *               entityId:
 *                 type: string
 *                 description: ID del documento modificado.
 *               userId:
 *                 type: string
 *                 description: ID del usuario que realizó el cambio.
 *               changes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                       description: Campo modificado.
 *                     oldValue:
 *                       type: string
 *                       description: Valor anterior del campo.
 *                     newValue:
 *                       type: string
 *                       description: Nuevo valor del campo.
 *     responses:
 *       201:
 *         description: Registro de cambios creado exitosamente
 */
router.post('/change-logs', createChangeLogHandler);

/**
 * @openapi
 * /api/change-logs/{id}:
 *   put:
 *     summary: Actualiza un registro de cambios por ID
 *     description: Modifica los detalles de un registro de cambios específico.
 *     tags:
 *       - Change Logs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               changes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                     oldValue:
 *                       type: string
 *                     newValue:
 *                       type: string
 *     responses:
 *       200:
 *         description: Registro de cambios actualizado exitosamente
 */
router.put('/change-logs/:id', updateChangeLogHandler);

/**
 * @openapi
 * /api/change-logs/{id}:
 *   delete:
 *     summary: Elimina un registro de cambios por ID
 *     description: Elimina un registro de cambios específico de la base de datos.
 *     tags:
 *       - Change Logs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de cambios eliminado exitosamente
 */
router.delete('/change-logs/:id', deleteChangeLogHandler);

export default router;