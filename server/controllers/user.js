const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = class UserController {
    static async register(req, res, next) {
        try {
            const input = {
                email: req.body.email,
                password: req.body.password,
                hobbies: req.body.hobbies
            }, result = await User.create(input);
            
            res.status(201).json({
                result
            });
        } catch (error) {
            next({
                code: 400,
                method: 'register',
                generatedError: error // Butuh middleware error handler, kasus tidak bisa diinput terlibat dengan constraint data saja;
            });
        }

    }

    static async login(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user) {
                const chck = await bcrypt.compare(req.body.password, user.password);

                if (chck) {
                    const token = jwt.sign({
                        id: user.id,
                        username: user.email,
                    }, process.env.JWT_SECRET);

                    res.status(200).json({ 
                        token: token 
                    });
                } else {
                    next({
                        code: 401,
                        method: 'login',
                        msg: 'Incorrect email or password'
                    })
                }
            } else {
                next({
                    code: 401,
                    method: 'login',
                    msg: 'Incorrect email or password'
                });
            }
        } catch (error) {
            next({
                method: 'register',
                generatedError: error // Butuh middleware error handler, lebih baik dirubah
            });
        }
    }

    static async getNews(req, res, next) {
        /* Method untuk mendapatkan 
        dan mengirimkan news sesuai 
        req.userLogin.hobbies */
    }
}