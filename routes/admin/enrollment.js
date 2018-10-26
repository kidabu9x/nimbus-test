const express = require('express');
const router = express.Router();
const CONFIG = require('../../config.json');
// Course Model
const Member = require('../../models/Member');
const Course = require('../../models/Course');
const Classes = require('../../models/Class');
const Enrollment = require('../../models/Enrollment');
const Lession = require('../../models/Lession');
const Subject = require('../../models/Subject');
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
        member_id : req.body.member_id,
        paid: {
            amount : req.body.amount ? req.body.paid.amount : 0
        }
    });
    newEnrollment.save()
        .then(enroll => res.status(200).json(enroll))
        .catch(err => res.status(404).json(null));
});

// @route   Post api/admin/enrollments
// @desc    Create enrollment
// @access  Public
router.post('/send-email', async (req, res) => {
    let enroll      = await Enrollment.findById(req.body._id);
    let member      = await Member.findById(enroll.member_id);
    let cl          = await Classes.findById(enroll.class_id);
    let lessions    = await Lession.find({class_id: cl._id}).sort({'start_hour' : 1});
    let subject     = await Subject.findById(cl.subject_id);
    let course      = await Course.findById(cl.course_id);

    const moment = require("moment");
    const daysOfWeek = ["Chủ nhật", "2", "3", "4", "5", "6", "7"];
    let schedules = [];
    lessions.forEach(lession => {
        let startHour = moment(lession.start_hour).format("HH[h]mm");
        let endHour = moment(lession.end_hour).format("HH[h]mm");
        let day = daysOfWeek[new Date(lession.start_hour).getDay()];
        day = day != 0 ? ("Thứ " + daysOfWeek[Number(day)]) : daysOfWeek[Number(day)];
        let index = schedules.findIndex(e => e.learning_hour == `${startHour}-${endHour}`);
        if (index > -1) {
            if (schedules[index].learning_days.indexOf(day) == -1) {
                schedules[index].learning_days.push(day);
            }
        } else {
            schedules.push({
                learning_hour : `${startHour}-${endHour}`,
                learning_days  : [day]
            });
        }
    });
    schedules = schedules.map(e => {
        e.learning_days = e.learning_days.join(", ");
        return e;
    });
    let startDay = new Date(lessions[0].start_hour).getDay();
    let startDate = startDay > 0 ? "Thứ " + daysOfWeek[startDay] : daysOfWeek[startDay];
    startDate += " Ngày " + moment(lessions[0].start_hour).format("DD/MM");
    // res.json(schedules);

    const nodemailer = require("nodemailer");
    var gmailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: CONFIG.gmail.client_user,
            clientId: CONFIG.gmail.client_id,
            clientSecret: CONFIG.gmail.client_secret,
            refreshToken: CONFIG.gmail.refresh_token,
            accessToken: CONFIG.gmail.access_token,
        }
    });
    const hbs = require('nodemailer-express-handlebars');
    var options = {
        viewEngine: {
            extname: '.hbs',
            layoutsDir: 'views/email/',
            defaultLayout : 'template',
            partialsDir : 'views/partials/'
        },
        viewPath: 'views/email/',
        extName: '.hbs'
    };
    gmailTransporter.use('compile', hbs(options));
    var mailOptions = {
        from: "Nimbus - Computer School <duongnk.nimbus@gmail.com>", // sender address
        // to: member.email, // list of receivers
        to : "duongnk.deoco.nimbus.ok@gmail.com",
        subject: `[NIMBUS - TIN HỌC MOS/IC3] XÁC NHẬN ĐĂNG KÍ KHÓA HỌC ${subject.name} ${course.name}`, // Subject line
        template: "email.body",
        context: {
            "className": cl.name,
            "groupFb": cl.fb_group_url,
            "schedules" : schedules,
            "learningHour" : schedules[0].learning_hour,
            "learningDays" : schedules[0].learning_days,
            "startDate" : startDate,
            "numOfDays" : lessions.length,
            "confirmUrl" : `http://localhost:8080/confirm?type=$2y$12$9HpgirQURQVcfKxd0Ink3eGVn31F7lMuONGgLks4qY49V2n2zajFi&uid=${member._id}&eid=${enroll._id}&cid=${cl._id}&type=enroll`,
            "subjectName" : subject.name,
            "price" : formatPrice(enroll.paid.amount)
        }
    }
    gmailTransporter.sendMail(mailOptions, function(err, response) {
        if (err) {
            res.json({success : false});
        } else {
            gmailTransporter.close();
            enroll.emailed.sent_at = new Date(); 
            enroll.emailed.sender_id = req.body.sender_id ? req.body.sender_id : null;
            enroll.emailed.is_sent = true;
            enroll.save().then(doc => res.json({
                success: true,
                enroll: doc
            }));
        }
    });
    
});

// @route   Put api/admin/enrollments/:id
// @desc    Update a lession
// @access  Public
router.put('/:id', (req, res) => {
    Enrollment.findById(req.params.id)
        .then(enroll => {
            if (req.body.class_id) {
                enroll.class_id = req.body.class_id;
            }
            if (req.body.member_id) {
                enroll.member_id = req.body.member_id;
            }

            // Email
            if (req.body.email) {
                if (req.body.emailed.is_sent) {
                    enroll.emailed.is_sent       = req.body.emailed.is_sent;
                }
                if (req.body.emailed.sender_id) {
                    enroll.emailed.sender_id    = req.body.emailed.sender_id;
                }
                if (req.body.emailed.sent_at) {
                    enroll.emailed.sent_at    = req.body.emailed.sent_at;
                }
                if (req.body.emailed.is_confirmed) {
                    enroll.emailed.is_confirmed    = req.body.emailed.is_confirmed;
                }
            }

            // Called
            if (req.body.called) {
                if (req.body.called.is_called) {
                    enroll.called.is_called    = req.body.called.is_called;
                }
                if (req.body.called.caller_id) {
                    enroll.called.caller_id    = req.body.called.caller_id;
                }
                if (req.body.called.called_at) {
                    enroll.called.called_at    = req.body.called.called_at;
                }
                if (req.body.called.is_confirmed) {
                    enroll.called.is_confirmed = req.body.called.is_confirmed;
                }
            }

            // Paid money
            if (req.body.paid) {
                if (req.body.paid.is_collected) {
                    enroll.paid.is_collected = req.body.paid.is_collected;
                }
                if (req.body.paid.collector_id) {
                    enroll.paid.collector_id = req.body.paid.collector_id;
                }
                if (req.body.paid.collected_at) {
                    enroll.paid.collected_at = req.body.paid.collected_at;
                }
                if (req.body.paid.amount) {
                    enroll.paid.amount = req.body.paid.amount;
                }
            }
            

            // Test data
            if (req.body.tested) {
                if (req.body.tested.is_collected) {
                    enroll.tested.is_collected = req.body.tested.is_collected;
                }
                if (req.body.tested.collected_at) {
                    enroll.tested.collected_at = req.body.tested.collected_at;
                }
                if (req.body.tested.collector_id) {
                    enroll.tested.collector_id = req.body.tested.collector_id;
                }
                if (req.body.tested.amount) {
                    enroll.tested.amount = req.body.tested.amount;
                }
                if (req.body.tested.tested_at) {
                    enroll.tested.amount = req.body.tested.tested_at;
                }
                if (req.body.tested.score) {
                    enroll.tested.score = req.body.tested.score;
                }
            }
            
            // Description
            if (req.body.description) {
                enroll.description = req.body.description;
            }

            // Note
            if (req.body.note) {
                enroll.note = req.body.note;
            }
            
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

function formatPrice (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").concat('&#8363;');
}

module.exports = router;