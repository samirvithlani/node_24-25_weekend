const roleModel = require('../models/RoleModel');

const createRole = async (req, res) => {

    try {
        const savedRole = await roleModel.create(req.body);
        res.json({
            message: "Role created successfully",
            data: savedRole
        })
    }catch (error) {
        res.json({
            message: error.message
        })
    }
}

const getAllRoles = async (req, res) => {
    try {
        const roles = await roleModel.find();
        res.json({
            message: "Roles fetched successfully",
            data: roles
        })
    }catch (error) {
        res.json({
            message: error.message
        })
    }
}
module.exports = {
    createRole,
    getAllRoles
}