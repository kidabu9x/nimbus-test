const express = require('express');
const router = express.Router();
const CONFIG = require('../../config.json');
// Course Model
const Enrollment = require('../../models/Enrollment');
const Member = require('../../models/Member');
const Classes = require('../../models/Class');
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
                            var nodemailer = require("nodemailer");
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
                            var html = `
                                <div class="nimbus-card">
                                    <img src="https://image.ibb.co/euYChU/Nimbus.png" style="display: block; margin: auto; width: 80px;">
                                    <p style="text-align: center; font-size: 20px; margin-top: 0;">Cảm ơn bạn đã đăng ký học !</p>
                                    <ul>
                                        <li style="margin-top: 5px; clear: both;">
                                            <span>Lớp học:</span>
                                            <span style="float: right; font-size: 16px;"><b>${cl.name}</b></span>
                                        </li>
                                        <li style="margin-top: 5px; clear: both;">
                                            <span>Khai giảng:</span>
                                            <span style="float: right; font-size: 16px;"><b>Ngày 23/10</b></span>
                                        </li>
                                        <li style="margin-top: 5px; clear: both;">
                                            <span>Lịch học:</span>
                                            <span style="float: right; font-size: 16px;"><b>18h00-21h00 thứ 3-6</b></span>
                                        </li>
                                        <li style="margin-top: 5px; clear: both;">
                                            <span>Địa điểm:</span>
                                            <span style="float: right; font-size: 16px;"><b>Số 15 ngõ 20 Trương Định, Hai Bà Trưng, Hà Nội.</b></span>
                                        </li>
                                        <li style="margin-top: 5px; clear: both;">
                                            <span>Dụng cụ:</span>
                                            <span style="float: right; font-size: 16px;"><b>Laptop cá nhân, vở ghi và bút.</b></span>
                                        </li>
                                        <li style="margin-top: 5px; clear: both;">
                                            <span>Group Facebook:</span>
                                            <span style="float: right; font-size: 16px;"><a target="_blank" href="${cl.fb_group_url}">Chi tiết</a></span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="nimbus-card">
                                    <p style=" text-align: center; font-size: 20px; margin-top: 0;">Nội quy lớp học</p>
                                    <ul>
                                        <li style="margin-top: 5px; clear: both;">
                                            <b>Cam kết đi học đầy đủ.</b>
                                            <br>
                                            Khóa học diễn ra liên tục trong 4 tuần. Nimbus cần các bạn thực hiện nghiêm túc việc đi học cũng như làm bài tập để đạt được kết quả thi tốt nhất.
                                        </li>
                                        <li style="margin-top: 5px; clear: both;">
                                            <b>Nộp học phí trong buổi học đầu tiên.</b>
                                            <br>
                                            Với việc thực hiện đầy đủ các ưu đãi đã được thông báo trên fan page, học phí các bạn phải đóng chỉ là 700k/khóa . Học phí này sẽ được đóng vào buổi học đầu tiên theo quy định của Nimbus . Ngoài lệ phí trên bên mình không thu thêm bất kỳ khoản phí nào trong quá trình học. Đây là học phí cần thiết để Nimbus có thể duy trì các khóa IC3 GS4 cũng như đảm bảo chất lượng học thi, phát triển các dự án trong tương lai dành cho các bạn tham gia Cộng đồng Nimbus.
                                        </li>
                                        <li style="margin-top: 5px; clear: both;">
                                            <b>Đăng ký thi.</b>
                                            <br>
                                            Như đã đề cập, các lớp MOS cộng đồng tại Nimbus hỗ trợ cho các bạn có nhu cầu THI CHỨNG CHỈ  MOS. Một điều may mắn là Nimbus được IIG Việt Nam đồng hành trong việc hỗ trợ đăng ký thi để các bạn không lo lắng việc phải đến tận IIG làm thủ tục. Vì vậy,các bạn có thể đăng ký thi qua Nimbus, IIG sẽ hỗ trợ bạn đúng ca rảnh trong ngày mà các bạn muốn. 
                                        </li>
                                    </ul>

                                    <p>Bạn vui lòng đọc kỹ các nội dung trong email và xác nhận tham gia học bằng cách bấm nút ở phía dưới.</p>

                                    <p>Mọi thắc mắc về khóa học, bạn có thể liên hệ với số hotline: 0969.849.603 hoặc Facebook group “NIMBUS – Tin học MOS/IC3”.</p>

                                    <p>Hẹn gặp lại bạn tại lớp học!</p>
                                </div>
                                <style>
                                    div[class$="nimbus-card"] {
                                        width: 50%;
                                        margin: 10px auto;
                                        border: 1px solid rgba(0,0,0, .2);
                                        padding: 40px;
                                        font-size: 14px;
                                    }
                                    @media only screen and (max-width: 600px) {
                                        div[class$="nimbus-card"] {
                                            width: 80%;
                                            padding: 20px;
                                        }
                                    }
                                </style>
                            `;
                            var mailOptions = {
                                from: "Nimbus - Computer School <duongnk.nimbus@gmail.com>", // sender address
                                to: member.email, // list of receivers
                                subject: "[NIMBUS - TIN HỌC MOS/IC3] XÁC NHẬN ĐĂNG KÍ KHÓA HỌC IC3 THÁNG 11", // Subject line
                                text: "Hello world ✔", // plaintext body
                                html: html // html body
                            }
                            // send mail with defined transport object
                            gmailTransporter.sendMail(mailOptions, function(error, response){
                                console.log(error);
                                console.log("response", response);
                            });
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