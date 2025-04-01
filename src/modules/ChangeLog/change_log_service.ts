import ChangeLog from './ChangeLog_models.js';

export const getAllChangeLogs = async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const logs = await ChangeLog.find().sort({ createdAt: -1 }).skip(skip).limit(pageSize);
    const totalLogs = await ChangeLog.countDocuments();
    return {
        logs,
        totalLogs,
        totalPages: Math.ceil(totalLogs / pageSize),
        currentPage: page,
    };
};

export const getChangeLogById = async (id: string) => {
    return await ChangeLog.findById(id);
};

export const createChangeLog = async (data: any) => {
    const newLog = new ChangeLog(data);
    return await newLog.save();
};

export const deleteChangeLog = async (id: string) => {
    return await ChangeLog.findByIdAndDelete(id);
};

export const updateChangeLog = async (id: string, data: any) => {
    return await ChangeLog.findByIdAndUpdate(id, data, { new: true });
};
