import mongoose, { Schema, Document } from 'mongoose';

interface IChangeLog extends Document {
    entity: string; // Nombre de la entidad modificada (e.g., 'gyms', 'combats')
    entityId: mongoose.Types.ObjectId; // ID del documento modificado
    userId: mongoose.Types.ObjectId; // ID del usuario que hizo el cambio
    changes: Record<string, any>; // Datos modificados
    createdAt: Date; // Fecha del cambio
}

const ChangeLogSchema = new Schema<IChangeLog>({
    entity: { type: String, required: true },
    entityId: { type: Schema.Types.ObjectId, required: true, refPath: 'entity' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    changes: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IChangeLog>('ChangeLog', ChangeLogSchema);