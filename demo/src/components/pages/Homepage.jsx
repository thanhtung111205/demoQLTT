import React from 'react';
import { Button } from 'antd';
import { CheckCircle, Award, Zap, Star, Users, BookOpen, MapPin, Phone, Mail } from 'lucide-react'; 
import FeatureCard from '../ui/FeatureCard';
import ScrollAnimateWrapper from '../ui/ScrollAnimateWrapper';

// --- Dữ liệu giả lập ---
const featuresData = [
  { icon: CheckCircle, title: 'Cam Kết Đầu Ra', description: 'Đảm bảo kiến thức vững chắc và kinh nghiệm thực chiến ngay sau khi tốt nghiệp.' },
  { icon: Award, title: 'Giảng Viên Chuyên Gia', description: 'Đội ngũ giảng viên là lập trình viên cấp cao tại các tập đoàn công nghệ lớn.' },
  { icon: Zap, title: 'Công Nghệ Mới Nhất', description: 'Chương trình học luôn được cập nhật với các công nghệ và xu hướng mới nhất.' },
];

const testimonialsData = [
  { id: 1, name: "Nguyễn Văn A", course: "Frontend Master", rating: 5, quote: "Khóa học tuyệt vời! Kiến thức thực tế và giảng viên nhiệt tình. Tôi đã tìm được việc làm ngay sau khi tốt nghiệp." },
  { id: 2, name: "Trần Thị B", course: "Backend Node.js", rating: 4, quote: "Chương trình được cập nhật liên tục, rất sát với yêu cầu của thị trường công nghệ hiện tại." },
  { id: 3, name: "Lê Văn C", course: "Python Data", rating: 5, quote: "Môi trường học tập năng động, tôi đã cải thiện kỹ năng lập trình lên rất nhiều trong thời gian ngắn." },
];

const featuredCoursesData = [
    { id: 1, name: "ReactJS & NextJS Toàn Tập", price: "8.900.000", students: 500, icon: BookOpen },
    { id: 2, name: "Python API & Data Science", price: "7.500.000", students: 320, icon: BookOpen },
    { id: 3, name: "DevOps & AWS Cloud", price: "10.000.000", students: 180, icon: BookOpen },
];

const bestSellingBooks = [
    { id: 1, title: "Clean Code: Cẩm nang Lập trình", author: "Robert C. Martin", sales: 1200 },
    { id: 2, title: "Design Patterns (GoF)", author: "Gamma et al.", sales: 850 },
    { id: 3, title: "Lập trình Web Nâng Cao", author: "OCEAN Team", sales: 980 },
];



const Homepage = () => {
  return (
    <main className="overflow-hidden"> {/* Đảm bảo không có overflow ngang */}
      {/* 1. Hero Section (Banner) - Nâng cấp background gradient và hiệu ứng text */}
      <section 
        className="relative flex flex-col items-center justify-center h-[600px] px-6 py-24 text-center text-white 
                   bg-gradient-to-br from-primary-dark to-primary-light via-primary-DEFAULT 
                   overflow-hidden"
      >
        {/* Lớp phủ hiệu ứng */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-purple-900/30"></div>
        
        <div className="relative z-10 animate-in fade-in zoom-in duration-1000 delay-200">
            <h1 
              className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6 
                         drop-shadow-lg animate-in fade-in-up delay-300 duration-700"
            >
              Nâng Tầm Kỹ Năng Cùng <br className="hidden md:block"/>
              <span className="text-secondary-light">OCEAN Center</span>
            </h1>
            
            <p className="mb-10 text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto 
                          animate-in fade-in-up delay-500 duration-700">
              Khám phá các khóa học công nghệ hàng đầu, được thiết kế để bạn trở thành chuyên gia.
            </p>
            
            <Button 
              type="primary" 
              size="large" 
              className="bg-secondary-DEFAULT border-none hover:!bg-secondary-light h-14 px-8 text-xl font-semibold 
                         shadow-xl rounded-full transform hover:scale-105 transition-all duration-300
                         animate-in zoom-in delay-700 duration-500"
            >
              Khám Phá Khóa Học Ngay!
            </Button>
        </div>
      </section>

      {/* 2. Feature Section (Lý Do Chọn) */}
      <ScrollAnimateWrapper animationClass="opacity-100 translate-y-0" delay={0}>
        <section className="max-w-7xl px-6 py-20 mx-auto bg-white -mt-16 relative z-20 rounded-xl shadow-2xl">
          <h2 className="mb-14 text-4xl font-bold text-center text-gray-800 animate-in fade-in-up duration-700">
            Lý Do Hàng Ngàn Học Viên Tin Tưởng
          </h2>
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {featuresData.map((feature, index) => (
              <ScrollAnimateWrapper 
                  key={index} 
                  animationClass="opacity-100 translate-y-0" 
                  delay={index * 150} 
                  threshold={0.3}
              >
                <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
                    <feature.icon size={48} className="text-primary-DEFAULT mb-6 mx-auto" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">{feature.title}</h3>
                    <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              </ScrollAnimateWrapper>
            ))}
          </div>
        </section>
      </ScrollAnimateWrapper>

      {/* 3. Section Giả Lập Nội Dung Dài */}
      <ScrollAnimateWrapper animationClass="opacity-100 translate-y-0" delay={0}>
        <section className="max-w-7xl px-6 py-24 mx-auto text-center bg-gradient-to-b from-gray-100 to-white mt-16 rounded-xl shadow-inner">
          <h2 className="mb-8 text-4xl font-bold text-gray-800">
            Kiến Thức Toàn Diện, Thực Chiến Vượt Trội
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
            Với các chương trình đào tạo chuyên sâu, OCEAN Center giúp bạn xây dựng nền tảng vững chắc và phát triển kỹ năng chuyên môn.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-center h-40">
                  <BookOpen size={36} className="text-primary-DEFAULT mb-4" />
                  <p className="font-semibold text-lg">Lập Trình Web Frontend</p>
              </div>
              <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-center h-40">
                  <Zap size={36} className="text-secondary-DEFAULT mb-4" />
                  <p className="font-semibold text-lg">Lập Trình Backend (Node/Python)</p>
              </div>
              <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-center h-40">
                  <CheckCircle size={36} className="text-accent-DEFAULT mb-4" />
                  <p className="font-semibold text-lg">DevOps & Cloud</p>
              </div>
          </div>
        </section>
      </ScrollAnimateWrapper>
      
      {/* 4. Đánh Giá Người Dùng (Testimonials) */}
      <ScrollAnimateWrapper animationClass="opacity-100 translate-y-0" delay={0}>
        <section className="max-w-7xl px-6 py-20 mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 mt-16 rounded-xl shadow-inner">
            <h2 className="mb-14 text-4xl font-bold text-center text-primary-DEFAULT">
                💬 Học Viên Đã Chia Sẻ
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                {testimonialsData.map((t, index) => (
                    <ScrollAnimateWrapper 
                        key={t.id} 
                        animationClass="opacity-100 translate-y-0" 
                        delay={index * 150}
                        threshold={0.3}
                    >
                        <div 
                            className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-secondary-DEFAULT 
                                       hover:shadow-xl transition duration-300 transform hover:-translate-y-2 relative"
                        >
                            {/* Icon trích dẫn */}
                            <svg className="absolute top-4 left-4 text-gray-200 opacity-50" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M.059 1.15c.162-.1.353-.146.544-.146H4.21c.56 0 1.05.286 1.393.732.264.34.402.664.444.896H5.43c-.457-.367-.81-.74-1.077-1.144-.183-.27-.37-.417-.552-.47-.183-.053-.366-.053-.55-.053H.994c-.456 0-.81.367-1.076.733-.183.27-.37.417-.552.47-.183.053-.366.053-.55-.053H.059Zm9.5 0c.162-.1.353-.146.544-.146H13.71c.56 0 1.05.286 1.393.732.264.34.402.664.444.896h-.37c-.457-.367-.81-.74-1.077-1.144-.183-.27-.37-.417-.552-.47-.183-.053-.366-.053-.55-.053h-.44c-.456 0-.81.367-1.076.733-.183.27-.37.417-.552.47-.183.053-.366-.053-.55-.053H9.559Z"/>
                            </svg>
                            <p className="italic text-gray-700 mb-4 h-24 overflow-hidden leading-relaxed relative z-10">
                                "{t.quote}"
                            </p>
                            <div className="flex mb-3 text-yellow-500 justify-center">
                                {[...Array(t.rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" className="mx-0.5" />)}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                                <p className="font-bold text-gray-900 text-lg">{t.name}</p>
                                <p className="text-sm text-indigo-500">Khóa học: {t.course}</p>
                            </div>
                        </div>
                    </ScrollAnimateWrapper>
                ))}
            </div>
        </section>
      </ScrollAnimateWrapper>

      {/* 5. Khóa Học Nổi Bật - Thiết kế card đẹp mắt hơn */}
      <ScrollAnimateWrapper animationClass="opacity-100 translate-y-0" delay={0}>
        <section className="px-6 py-20 bg-gradient-to-tl from-indigo-50 to-blue-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="mb-14 text-4xl font-bold text-center text-gray-800">
                    🚀 Khám Phá Các Khóa Học Hàng Đầu
                </h2>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {featuredCoursesData.map((course, index) => (
                        <ScrollAnimateWrapper 
                            key={course.id} 
                            animationClass="opacity-100 translate-y-0" 
                            delay={index * 150}
                            threshold={0.3}
                        >
                            <div 
                                className="relative p-8 bg-white rounded-xl shadow-xl border-t-4 border-accent-DEFAULT 
                                           hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
                            >
                                <course.icon className="text-accent-DEFAULT mb-5 mx-auto" size={40} />
                                <h3 className="text-2xl font-semibold mb-2 text-gray-900 text-center">{course.name}</h3>
                                <p className="text-secondary-DEFAULT font-bold text-xl mb-4 text-center">{course.price} VND</p>
                                <p className="text-sm text-gray-500 flex items-center justify-center mb-6">
                                    <Users size={18} className="mr-2 text-indigo-500" /> {course.students} học viên đã tham gia
                                </p>
                                <Button 
                                    type="primary" 
                                    className="mt-4 w-full bg-primary-DEFAULT hover:!bg-primary-light h-12 text-lg rounded-full"
                                >
                                    Xem Chi Tiết
                                </Button>
                            </div>
                        </ScrollAnimateWrapper>
                    ))}
                </div>
            </div>
        </section>
      </ScrollAnimateWrapper>

      {/* 6. Sách Bán Chạy */}
      <ScrollAnimateWrapper animationClass="opacity-100 translate-y-0" delay={0}>
        <section className="max-w-7xl px-6 py-20 mx-auto">
            <h2 className="mb-14 text-4xl font-bold text-center text-darkblue">
                📚 Sách Công Nghệ Bán Chạy Nhất
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {bestSellingBooks.map((book, index) => (
                    <ScrollAnimateWrapper 
                        key={book.id} 
                        animationClass="opacity-100 translate-y-0" 
                        delay={index * 100}
                        threshold={0.4}
                    >
                        <div 
                            className="flex items-center p-6 bg-white border border-gray-200 rounded-xl shadow-md 
                                       hover:shadow-lg transition duration-300 transform hover:scale-[1.01]"
                        >
                            <div className="text-4xl font-extrabold mr-5 text-secondary-DEFAULT">{index + 1}.</div>
                            <div>
                                <p className="font-semibold text-xl text-gray-900 mb-1">{book.title}</p>
                                <p className="text-sm text-gray-600">Tác giả: {book.author}</p>
                                <p className="text-xs text-green-700 mt-2 font-medium">Đã bán: {book.sales.toLocaleString()} bản</p>
                            </div>
                        </div>
                    </ScrollAnimateWrapper>
                ))}
            </div>
        </section>
      </ScrollAnimateWrapper>
      
      {/* 7 Section Tích Hợp Google Maps (Giả lập) */}
      <ScrollAnimateWrapper animationClass="opacity-100 translate-y-0" delay={0} threshold={0.2}>
        <section className="px-6 py-20 bg-gradient-to-tr from-gray-200 to-gray-50 mt-16 rounded-t-xl shadow-inner">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <h2 className="mb-8 text-4xl font-bold text-gray-800">
                        📍 Ghé Thăm OCEAN Center
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 max-w-md md:max-w-none">
                        Chúng tôi luôn sẵn lòng chào đón bạn. Hãy liên hệ để được tư vấn chi tiết về các khóa học.
                    </p>
                    <div className="space-y-4 text-left inline-block md:block">
                        <p className="flex items-center text-gray-700 text-lg">
                            <MapPin size={24} className="mr-3 text-primary-DEFAULT" /> 
                            123 Đường Lập Trình, Quận Công Nghệ, TP. HCM
                        </p>
                        <p className="flex items-center text-gray-700 text-lg">
                            <Phone size={24} className="mr-3 text-primary-DEFAULT" /> 
                            +84 987 654 321
                        </p>
                        <p className="flex items-center text-gray-700 text-lg">
                            <Mail size={24} className="mr-3 text-primary-DEFAULT" /> 
                            info@oceancenter.edu.vn
                        </p>
                    </div>
                </div>
                
                {/* Giả lập Google Maps */}
                <div className="w-full h-80 bg-gray-300 rounded-xl shadow-xl overflow-hidden">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.006945038933!2d106.6905587140939!3d10.790930492323285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e2111d4e07%3A0x6a0f7e1e6b3b2c6e!2zVmluY29tIE1hbGwgxJDhu6ljIELhuq1j!5e0!3m2!1svi!2s!4v1678891234567!5m2!1svi!2s" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location"
                    ></iframe>
                </div>
            </div>
        </section>
      </ScrollAnimateWrapper>
    </main>
  );
};

export default Homepage;
