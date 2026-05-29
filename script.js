const coursesData = [
    {
        id: 1, tag: '-30%', icon: 'fa-regular fa-face-smile', title: 'Giao Tiếp Cơ Bản: Từ Ngại Nói Đến Tự Tin',
        desc: 'Phá vỡ rào cản tâm lý, bắt chuyện tự nhiên. Dành cho người hướng nội muốn làm chủ cuộc trò chuyện.',
        price: '2.450.000₫', oldPrice: '3.500.000₫', hours: 24, students: 1240
    },
    {
        id: 2, tag: 'HOT', icon: 'fa-solid fa-person-chalkboard', title: 'Nghệ Thuật Thuyết Trình Đỉnh Cao',
        desc: 'Làm chủ sân khấu, cấu trúc bài thuyết trình thu hút và sử dụng ngôn ngữ cơ thể để truyền cảm hứng.',
        price: '3.200.000₫', oldPrice: '4.500.000₫', hours: 32, students: 850
    },
    {
        id: 3, tag: 'NEW', icon: 'fa-solid fa-briefcase', title: 'Giao Tiếp Công Sở & Phỏng Vấn',
        desc: 'Kỹ năng ứng xử thông minh nơi công sở, đàm phán thuyết phục và chinh phục nhà tuyển dụng.',
        price: '1.950.000₫', oldPrice: '2.500.000₫', hours: 18, students: 520
    }
];

const app = {
    init: function() {
        // Tự động kiểm tra cấu trúc DOM để render trang phù hợp
        if (document.getElementById('courseList')) {
            this.renderCourses();
        }
        if (document.getElementById('detailTitle')) {
            this.renderCourseDetail();
        }
        
        // Đóng modal khi click ra ngoài vùng xám
        window.onclick = function(event) {
            if (event.target.classList.contains('modal-overlay')) {
                event.target.classList.remove('show');
            }
        }
    },

    // Render danh sách khóa học ở trang courses.html
    renderCourses: function() {
        const container = document.getElementById('courseList');
        container.innerHTML = '';
        
        coursesData.forEach(course => {
            container.innerHTML += `
                <div class="course-card" onclick="window.location.href='detail.html?id=${course.id}'">
                    <div class="course-img">
                        <div class="course-tag">${course.tag}</div>
                        <i class="${course.icon}"></i>
                    </div>
                    <div class="course-body">
                        <div class="course-meta">
                            <span style="color: #fbbf24;"><i class="fa-solid fa-star"></i> 4.9</span>
                            <span><i class="fa-solid fa-clock"></i> ${course.hours} Giờ</span>
                        </div>
                        <h3>${course.title}</h3>
                        <p>${course.desc}</p>
                        <div class="course-footer">
                            <div>
                                <span style="text-decoration: line-through; color: #94a3b8; font-size: 13px; display:block;">${course.oldPrice}</span>
                                <span class="price">${course.price}</span>
                            </div>
                            <span style="color: var(--primary); font-weight: 700;">Chi tiết &rarr;</span>
                        </div>
                    </div>
                </div>
            `;
        });
    },

    // Đổ dữ liệu động vào trang detail.html dựa theo ID trên URL (?id=1, ?id=2)
    renderCourseDetail: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = parseInt(urlParams.get('id')) || 1; // Mặc định lấy bài số 1 nếu lỗi
        const course = coursesData.find(c => c.id === courseId);
        
        if(!course) return;

        document.getElementById('detailTitle').innerText = course.title;
        document.getElementById('detailDesc').innerText = course.desc;
        document.getElementById('detailPrice').innerText = course.price;
        document.getElementById('detailOldPrice').innerText = course.oldPrice;
        document.getElementById('detailStudents').innerText = course.students;
        document.getElementById('detailHours').innerText = course.hours;
        document.getElementById('detailIcon').innerHTML = `<i class="${course.icon}"></i>`;
    },

    // Hệ thống Modal hệ thống popup đăng nhập / tư vấn
    openModal: function(type) {
        if(type === 'login') {
            document.getElementById('authModal').classList.add('show');
            this.switchAuthTab('login');
        } else if(type === 'consult') {
            document.getElementById('consultModal').classList.add('show');
        }
    },
    closeModal: function(modalId) {
        document.getElementById(modalId).classList.remove('show');
    },
    switchAuthTab: function(tab) {
        document.getElementById('tabLogin').classList.remove('active');
        document.getElementById('tabRegister').classList.remove('active');
        document.getElementById('formLogin').style.display = 'none';
        document.getElementById('formRegister').style.display = 'none';

        if(tab === 'login') {
            document.getElementById('tabLogin').classList.add('active');
            document.getElementById('formLogin').style.display = 'block';
        } else {
            document.getElementById('tabRegister').classList.add('active');
            document.getElementById('formRegister').style.display = 'block';
        }
    },

    addToCart: function() {
        this.showToast('Đã thêm khóa học vào giỏ hàng!');
    },
    showToast: function(msg) {
        const toast = document.getElementById('toastBox');
        document.getElementById('toastMsg').innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

// Đợi DOM load xong hoàn toàn thì kích hoạt app
document.addEventListener('DOMContentLoaded', () => app.init());