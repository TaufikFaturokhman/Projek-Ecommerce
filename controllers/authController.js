const { users, user_address, permissions, roles } = require("../models");
const prisma = require("../libs/prisma");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(5)

    return bcrypt.hash(password, salt)
}

module.exports = {
    addRole: async(req, res) => {
        try {
            const createdRole = await roles.create({
                data: {
                    name: req.body.name,
                }
            })
            res.status(201).json(createdRole);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }

    },
    createPermission: async(req, res) => {
        try {
            const createdPermission = await permissions.create({
                data: {
                    module: req.body.module,
                    access: req.body.access,
                    role_id: parseInt(req.body.role_id)

                }
            })
            res.status(201).json(createdPermission);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    createUser: async(req, res) => {
        try {
            const createdUser = await users.create({
                data: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: await cryptPassword(req.body.password),
                    phone: req.body.phone,
                    gender: req.body.gender,
                    dateOfBirth: req.body.dateOfBirth,
                    role_id: parseInt(req.body.role_id),
                    addresses: {
                        create: {
                            name: req.body.name,
                            country: req.body.country,
                            address: req.body.address,
                            province: req.body.province,
                            province_id: parseInt(req.body.province_id),
                            city: req.body.city,
                            city_id: parseInt(req.body.city_id),
                            district: req.body.district,
                            district_id: parseInt(req.body.district_id),
                            subDistrict: req.body.subDistrict,
                            sub_district_id: parseInt(req.body.sub_district_id),
                            postalCode: req.body.postalCode
                        }
                    }
                }
            })
            res.status(201).json(createdUser);
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" });
        }
    },
    loginUser: async(req, res) => {
        const findUser = await users.findFirst({
            where: {
                email: req.body.email
            }
        })
        if (!findUser) {
            return res.status(404).json({
                error: 'User not exists'
            });
        }
        if (bcrypt.compareSync(req.body.password, findUser.password)) {
            const token = jwt.sign({ id: findUser.id }, 'secret_key', { expiresIn: '6h' })

            return res.status(200).json({
                data: {
                    token
                }
            })
        }
        return res.status(403).json({
            error: 'Invalid Password'
        })
    },

    getUser: async(req, res) => {
        try {
            const data = await users.findMany({
                include: {
                    addresses: true
                }
            });
            if (data) {
                return res.status(200).json({
                    data
                });
            }
            return res.status(500).json({
                success: false
            });
        } catch (err) {
            console.error(`Error updating the data product : ${err}`);
            return res.status(500).json({
                error: `erorr`
            });
        }
    },
    getUserById: async(req, res) => {
        try {
            const id = parseInt(req.params.id);
            const data = await users.findUnique({
                where: { id: id },
                include: {
                    addresses: true
                }
            });
            if (data) {
                return res.status(200).json({
                    data
                });
            }
            return res.status(500).json({
                success: false
            });
        } catch (err) {
            console.error(`Error updating the data product : ${err}`);
            return res.status(500).json({
                error: `erorr`
            });
        }
    },

    updateUser: async(req, res) => {
        try {
            const id = parseInt(req.params.id);
            const process = await users.update({
                where: {
                    id: id
                },
                data: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: await cryptPassword(req.body.password),
                    phone: req.body.phone,
                    gender: req.body.gender,
                    dateOfBirth: req.body.dateOfBirth,
                    role_id: parseInt(req.body.role_id),
                    addresses: {
                        create: {
                            name: req.body.name,
                            country: req.body.country,
                            address: req.body.address,
                            province: req.body.province,
                            province_id: parseInt(req.body.province_id),
                            city: req.body.city,
                            city_id: parseInt(req.body.city_id),
                            district: req.body.district,
                            district_id: parseInt(req.body.district_id),
                            subDistrict: req.body.subDistrict,
                            sub_district_id: parseInt(req.body.sub_district_id),
                            postalCode: req.body.postalCode
                        }
                    }
                }
            });
            if (process) {
                return res.status(200).json({
                    success: "success to updating the data"
                });
            }
            return res.status(500).json({
                success: false
            });
        } catch (err) {
            console.error(`Error updating the data product : ${err}`);
            return res.status(500).json({
                error: `An error occurred while updating the data product`
            });
        }
    },
    deleteUser: async(req, res) => {
        try {
            const id = parseInt(req.params.id);
            const data = await users.delete({
                where: { id: id },
                include: {
                    addresses: true
                }
            });
            if (data) {
                return res.status(200).json({
                    data
                });
            }
            return res.status(500).json({
                success: false
            });
        } catch (err) {
            console.error(`Error updating the data product : ${err}`);
            return res.status(500).json({
                error: `erorr`
            });
        }
    },
}