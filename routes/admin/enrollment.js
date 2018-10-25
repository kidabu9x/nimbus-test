const express = require('express');
const router = express.Router();
const CONFIG = require('../../config.json');
// Course Model
const Enrollment = require('../../models/Enrollment');
const Member = require('../../models/Member');
const Classes = require('../../models/Class');
const Lession = require('../../models/Lession');
// Test Result Model

// ----------------------------------API for admin----------------------------
// @route   GET api/admin/enrollments
// @desc    Get enrollments
// @access  Public
router.get('/', (req, res) => {
    Enrollment.find(req.query)
        .sort({
            'createAt' : 1
        })
        .then(enrolls => res.json(enrolls));
});

// @route   GET api/admin/enrollments/count
// @desc    Get an enrollments
// @access  Public
router.get('/count', (req, res) => {
    Enrollment.countDocuments(req.query)
        .then(count => res.json(count));
});

// @route   Post api/admin/enrollments
// @desc    Create enrollment
// @access  Public
router.post('/', (req, res) => {
    let newEnrollment = new Enrollment({
        class_id: req.body.class_id,
        member_id : req.body.member_id
    });
    newEnrollment.save()
        .then(enroll => res.status(200).json(enroll))
        .catch(err => res.status(404).json(null));
});

// @route   Post api/admin/enrollments
// @desc    Create enrollment
// @access  Public
router.post('/send-email', (req, res) => {
    Enrollment.findById(req.body._id)
        .then(enroll => {
            Member.findById(enroll.member_id)
                .then(member => {
                    Classes.findById(enroll.class_id)
                        .then(cl => {
                            Lession.find({
                                class_id: cl._id
                            })
                                .sort({
                                    'start_hour' : 1
                                })
                                .then(lessions => {
                                    const moment = require("moment");
                                    const daysOfWeek = ["Chủ nhật", "2", "3", "4", "5", "6", "7"];
                                    let schedules = [];
                                    lessions.forEach(lession => {
                                        let startHour = moment(lession.start_hour).format("HH[h]mm");
                                        let endHour = moment(lession.end_hour).format("HH[h]mm");
                                        let day = daysOfWeek[new Date(lession.start_hour).getDay()];
                                        let index = schedules.findIndex(e => e.learning_hour == `${startHour} - ${endHour}`);
                                        if (index > -1) {
                                            if (schedules[index].learning_days.indexOf(day) == -1) {
                                                schedules[index].learning_days.push(day);
                                            }
                                        } else {
                                            schedules.push({
                                                learning_hour : `${startHour} - ${endHour}`,
                                                learning_days  : [day]
                                            });
                                        }
                                    });
                                    for (let shedule of schedules) {
                                        let 
                                    }
                                    res.json(schedules);

                                    // const nodemailer = require("nodemailer");
                                    // var gmailTransporter = nodemailer.createTransport({
                                    //     service: "gmail",
                                    //     auth: {
                                    //         type: 'OAuth2',
                                    //         user: CONFIG.gmail.client_user,
                                    //         clientId: CONFIG.gmail.client_id,
                                    //         clientSecret: CONFIG.gmail.client_secret,
                                    //         refreshToken: CONFIG.gmail.refresh_token,
                                    //         accessToken: CONFIG.gmail.access_token,
                                    //     }
                                    // });
                                    // const hbs = require('nodemailer-express-handlebars');
                                    // var options = {
                                    //     viewEngine: {
                                    //         extname: '.hbs',
                                    //         layoutsDir: 'views/email/',
                                    //         defaultLayout : 'template',
                                    //         partialsDir : 'views/partials/'
                                    //     },
                                    //     viewPath: 'views/email/',
                                    //     extName: '.hbs'
                                    // };
                                    // gmailTransporter.use('compile', hbs(options));
                                    // var mailOptions = {
                                    //     from: "Nimbus - Computer School <duongnk.nimbus@gmail.com>", // sender address
                                    //     to: member.email, // list of receivers
                                    //     subject: "[NIMBUS - TIN HỌC MOS/IC3] XÁC NHẬN ĐĂNG KÍ KHÓA HỌC IC3 THÁNG 12", // Subject line
                                    //     template: 'email.body',
                                    //     context: {
                                    //         "className": cl.name,
                                    //         "groupFb": cl.fb_group_url
                                    //     }
                                    // }
                                    // gmailTransporter.sendMail(mailOptions, function(err, response) {
                                    //     if (err) {

                                    //     }
                                    //     gmailTransporter.close();
                                    //     res.json(mailOptions);
                                    // });
                                })
                            ;
                            
                            // send mail with defined transport object
                            // gmailTransporter.sendMail(mailOptions, function(error, response){
                            //     console.log(error);
                            //     console.log("response", response);
                            // });
                        })
                });
        });
});

// @route   Put api/admin/enrollments/:id
// @desc    Update a lession
// @access  Public
router.put('/:id', (req, res) => {
    Enrollment.findById(req.params.id)
        .then(enroll => {
            enroll.class_id = req.body.teacher_id;
            enroll.member_id = req.body.member_id;

            enroll.emailed.status       = req.body.emailed.status;
            enroll.emailed.sender_id    = req.body.emailed.sender_id;
            enroll.emailed.sent_at      = req.body.emailed.sent_at;
            enroll.emailed.is_confirmed = req.body.emailed.is_confirmed;

            enroll.called.status        = req.body.called.status;
            enroll.called.caller_id     = req.body.called.caller_id;
            enroll.called.called_at     = req.body.called.called_at;
            enroll.called.is_confirmed  = req.body.called.is_confirmed;

            enroll.paid.status          = req.body.paid.status;
            enroll.paid.collector_id    = req.body.paid.collector_id;
            enroll.paid.collected_at    = req.body.paid.collected_at;
            enroll.paid.amount          = req.body.paid.amount;

            enroll.description = req.body.description;
            enroll.note = req.body.note;
            
            enroll.save(doc => res.json(doc));
        });
});

// @route   Delete api/admin/enrollments/:id
// @desc    Delete a lession
// @access  Public
router.delete('/:id', (req, res) => {
    Enrollment.findOneAndRemove({
        _id : req.params.id
    })
        .then(lession => {
            res.json(lession);
        });
});

module.exports = router;