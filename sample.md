
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VeloT Africa - Tech Training & Professional Development</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', sans-serif;
        }
        .logo-box {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #D97834 0%, #1F3A5C 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 24px;
        }
        .primary-color { color: #D97834; }
        .primary-bg { background-color: #D97834; }
        .secondary-color { color: #1F3A5C; }
        .secondary-bg { background-color: #1F3A5C; }
        .hover-primary:hover { background-color: #B85F27; }
        .program-card {
            border-left: 4px solid #D97834;
        }
    </style>
</head>
<body class="bg-gray-50">

    <!-- HEADER/NAVIGATION -->
    <header class="fixed top-0 z-50 w-full bg-white shadow-md">
        <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
            <!-- Logo -->
            <a href="#" class="flex items-center gap-3">
                <div class="logo-box">VT</div>
                <div>
                    <div class="font-bold text-lg secondary-color">VeloT Africa</div>
                    <div class="text-xs primary-color font-semibold">Accelerate Your Tech</div>
                </div>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden md:flex space-x-8 secondary-color font-medium">
                <a href="#home" class="hover:primary-color transition">Home</a>
                <a href="#programs" class="hover:primary-color transition">Programs</a>
                <a href="#why" class="hover:primary-color transition">Why Us</a>
                <a href="#contact" class="hover:primary-color transition">Contact</a>
            </div>

            <!-- Mobile Menu Button -->
            <button id="mobile-menu-button" class="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 secondary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </nav>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
            <div class="container mx-auto px-4 py-4 flex flex-col space-y-4 secondary-color font-medium">
                <a href="#home">Home</a>
                <a href="#programs">Programs</a>
                <a href="#why">Why Us</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="pt-20">

        <!-- HERO SECTION -->
        <section id="home" class="pt-24 pb-16 bg-gradient-to-r from-orange-600 to-orange-500">
            <div class="container mx-auto px-4 text-white">
                <h1 class="text-4xl md:text-5xl font-bold mb-6 text-center">Transform Your Tech Career</h1>
                <p class="text-xl text-center max-w-3xl mx-auto leading-relaxed mb-8">
                    Industry-leading tech training programs designed to equip you with the skills needed to thrive in Africa's fastest-growing tech ecosystem.
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <button class="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                        Get Started
                    </button>
                    <button class="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition">
                        Learn More
                    </button>
                </div>
            </div>
        </section>

        <!-- PROGRAMS SECTION -->
        <section id="programs" class="py-16 bg-white">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 secondary-color">Professional Programs</h2>
                <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">Comprehensive training designed to launch your career in tech</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <!-- Web Development -->
                    <div class="bg-gray-50 rounded-lg p-8 program-card hover:shadow-xl transition">
                        <div class="flex items-center gap-3 mb-4">
                            <h3 class="text-2xl font-bold secondary-color">Web Development</h3>
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded">Beginner</span>
                        </div>
                        <p class="text-gray-600 mb-6">Master modern web development with HTML5, CSS3, JavaScript, React, and Node.js. Build responsive and dynamic web applications.</p>
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Duration: 4 months</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Frontend & Backend Development</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>HTML5, CSS3, JavaScript, React, Node.js</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>3+ Real-world Projects</li>
                        </ul>
                        <div class="flex flex-wrap gap-3">
                            <span class="inline-block primary-bg text-white px-6 py-2 rounded-full font-semibold">$450</span>
                            <button class="inline-block secondary-bg text-white px-6 py-2 rounded-full hover-primary transition font-medium">Enroll Now</button>
                        </div>
                    </div>

                    <!-- Mobile App Development -->
                    <div class="bg-gray-50 rounded-lg p-8 program-card hover:shadow-xl transition">
                        <div class="flex items-center gap-3 mb-4">
                            <h3 class="text-2xl font-bold secondary-color">Mobile App Development</h3>
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded">Intermediate</span>
                        </div>
                        <p class="text-gray-600 mb-6">Build powerful mobile applications for iOS and Android using Flutter and React Native. Deploy apps to app stores.</p>
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Duration: 5 months</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>iOS & Android Development</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Flutter, React Native, Firebase</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>App Store Deployment</li>
                        </ul>
                        <div class="flex flex-wrap gap-3">
                            <span class="inline-block primary-bg text-white px-6 py-2 rounded-full font-semibold">$550</span>
                            <button class="inline-block secondary-bg text-white px-6 py-2 rounded-full hover-primary transition font-medium">Enroll Now</button>
                        </div>
                    </div>

                    <!-- Data Science & AI -->
                    <div class="bg-gray-50 rounded-lg p-8 program-card hover:shadow-xl transition">
                        <div class="flex items-center gap-3 mb-4">
                            <h3 class="text-2xl font-bold secondary-color">Data Science & AI</h3>
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded">Advanced</span>
                        </div>
                        <p class="text-gray-600 mb-6">Master data analysis, machine learning, and AI implementation. Learn Python, TensorFlow, and advanced analytics tools.</p>
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Duration: 6 months</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Machine Learning & AI</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Python, TensorFlow, SQL, Power BI</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Real-world ML Projects</li>
                        </ul>
                        <div class="flex flex-wrap gap-3">
                            <span class="inline-block primary-bg text-white px-6 py-2 rounded-full font-semibold">$650</span>
                            <button class="inline-block secondary-bg text-white px-6 py-2 rounded-full hover-primary transition font-medium">Enroll Now</button>
                        </div>
                    </div>

                    <!-- Cloud & DevOps -->
                    <div class="bg-gray-50 rounded-lg p-8 program-card hover:shadow-xl transition">
                        <div class="flex items-center gap-3 mb-4">
                            <h3 class="text-2xl font-bold secondary-color">Cloud & DevOps</h3>
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded">Intermediate</span>
                        </div>
                        <p class="text-gray-600 mb-6">Learn cloud infrastructure, containerization, and CI/CD pipelines. Master AWS, Docker, Kubernetes, and Jenkins.</p>
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Duration: 4 months</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Cloud Infrastructure & DevOps</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>AWS, Docker, Kubernetes, Jenkins</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>AWS Certification Prep</li>
                        </ul>
                        <div class="flex flex-wrap gap-3">
                            <span class="inline-block primary-bg text-white px-6 py-2 rounded-full font-semibold">$500</span>
                            <button class="inline-block secondary-bg text-white px-6 py-2 rounded-full hover-primary transition font-medium">Enroll Now</button>
                        </div>
                    </div>

                    <!-- Cybersecurity -->
                    <div class="bg-gray-50 rounded-lg p-8 program-card hover:shadow-xl transition">
                        <div class="flex items-center gap-3 mb-4">
                            <h3 class="text-2xl font-bold secondary-color">Cybersecurity</h3>
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded">Advanced</span>
                        </div>
                        <p class="text-gray-600 mb-6">Protect systems and data from threats. Learn ethical hacking, network security, and security compliance frameworks.</p>
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Duration: 5 months</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Ethical Hacking & Network Security</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>CEH, OSCP Prep Courses</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Hands-on Lab Environment</li>
                        </ul>
                        <div class="flex flex-wrap gap-3">
                            <span class="inline-block primary-bg text-white px-6 py-2 rounded-full font-semibold">$700</span>
                            <button class="inline-block secondary-bg text-white px-6 py-2 rounded-full hover-primary transition font-medium">Enroll Now</button>
                        </div>
                    </div>

                    <!-- UI/UX Design -->
                    <div class="bg-gray-50 rounded-lg p-8 program-card hover:shadow-xl transition">
                        <div class="flex items-center gap-3 mb-4">
                            <h3 class="text-2xl font-bold secondary-color">UI/UX Design</h3>
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded">Beginner</span>
                        </div>
                        <p class="text-gray-600 mb-6">Create stunning user experiences. Learn design principles, wireframing, prototyping with Figma, and user research.</p>
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Duration: 3 months</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Design Thinking & User Research</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Figma, Adobe XD, Prototyping</li>
                            <li class="flex items-center"><span class="primary-color mr-2 font-bold">✓</span>Portfolio Building</li>
                        </ul>
                        <div class="flex flex-wrap gap-3">
                            <span class="inline-block primary-bg text-white px-6 py-2 rounded-full font-semibold">$400</span>
                            <button class="inline-block secondary-bg text-white px-6 py-2 rounded-full hover-primary transition font-medium">Enroll Now</button>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- WHY CHOOSE US -->
        <section id="why" class="py-16 bg-gray-100">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 secondary-color">Why Choose VeloT Africa?</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-white rounded-lg p-8 text-center hover:shadow-lg transition border-t-4 border-orange-600">
                        <div class="text-4xl mb-4">👨‍🏫</div>
                        <h3 class="text-xl font-bold secondary-color mb-3">Industry Experts</h3>
                        <p class="text-gray-600">Learn from experienced professionals working at leading tech companies across Africa.</p>
                    </div>

                    <div class="bg-white rounded-lg p-8 text-center hover:shadow-lg transition border-t-4 border-orange-600">
                        <div class="text-4xl mb-4">🚀</div>
                        <h3 class="text-xl font-bold secondary-color mb-3">Hands-on Projects</h3>
                        <p class="text-gray-600">Build real-world applications and projects that you can showcase in your portfolio.</p>
                    </div>

                    <div class="bg-white rounded-lg p-8 text-center hover:shadow-lg transition border-t-4 border-orange-600">
                        <div class="text-4xl mb-4">💼</div>
                        <h3 class="text-xl font-bold secondary-color mb-3">Career Support</h3>
                        <p class="text-gray-600">Get job placement assistance, interview prep, and networking opportunities with top companies.</p>
                    </div>

                    <div class="bg-white rounded-lg p-8 text-center hover:shadow-lg transition border-t-4 border-orange-600">
                        <div class="text-4xl mb-4">⏰</div>
                        <h3 class="text-xl font-bold secondary-color mb-3">Flexible Learning</h3>
                        <p class="text-gray-600">Study at your own pace with online and in-person options that fit your schedule.</p>
                    </div>

                    <div class="bg-white rounded-lg p-8 text-center hover:shadow-lg transition border-t-4 border-orange-600">
                        <div class="text-4xl mb-4">🎓</div>
                        <h3 class="text-xl font-bold secondary-color mb-3">Recognized Certifications</h3>
                        <p class="text-gray-600">Earn industry-recognized certificates that boost your credentials and career prospects.</p>
                    </div>

                    <div class="bg-white rounded-lg p-8 text-center hover:shadow-lg transition border-t-4 border-orange-600">
                        <div class="text-4xl mb-4">🌍</div>
                        <h3 class="text-xl font-bold secondary-color mb-3">Tech Community</h3>
                        <p class="text-gray-600">Join a vibrant community of tech enthusiasts and professionals across Africa.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA SECTION -->
        <section class="py-16 primary-bg">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Launch Your Tech Career?</h2>
                <p class="text-xl text-white mb-8 max-w-2xl mx-auto">Join hundreds of African tech professionals who have transformed their careers with VeloT Africa.</p>
                <button class="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition">
                    Start Your Journey Today
                </button>
            </div>
        </section>

    </main>

    <!-- FOOTER -->
    <footer id="contact" class="secondary-bg text-white">
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <!-- About -->
                <div>
                    <h3 class="mb-4 font-bold text-lg">VeloT Africa</h3>
                    <div class="space-y-2 text-gray-300 text-sm">
                        <p>Accelerating Africa's Tech Revolution</p>
                        <p>Industry-leading training programs</p>
                        <p>Career transformation through tech skills</p>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h4 class="mb-4 text-lg font-semibold">Quick Links</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li><a href="#programs" class="hover:text-orange-400 transition">Programs</a></li>
                        <li><a href="#why" class="hover:text-orange-400 transition">Why Us</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition">Blog</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition">Resources</a></li>
                    </ul>
                </div>

                <!-- Legal -->
                <div>
                    <h4 class="mb-4 text-lg font-semibold">Legal</h4>
                    <ul class="space-y-2 text-gray-300 text-sm">
                        <li><a href="#" class="hover:text-orange-400 transition">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition">Terms & Conditions</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition">Refund Policy</a></li>
                        <li><a href="#" class="hover:text-orange-400 transition">Contact Us</a></li>
                    </ul>
                </div>

                <!-- Newsletter -->
                <div>
                    <h4 class="mb-4 text-lg font-semibold">Stay Updated</h4>
                    <p class="mb-4 text-gray-300 text-sm">Subscribe for tech tips and course updates.</p>
                    <form class="space-y-3">
                        <input type="email" placeholder="Your email" class="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-orange-400">
                        <button type="submit" class="w-full rounded-md primary-bg px-4 py-2 text-white hover-primary transition font-semibold">Subscribe</button>
                    </form>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="border-t border-gray-700 pt-8 text-center text-gray-300">
                <div class="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                    <p class="text-sm">&copy; 2026 VeloT Africa. All rights reserved.</p>
                    <div class="flex gap-4 text-sm">
                        <a href="#" class="hover:text-orange-400 transition">Twitter</a>
                        <a href="#" class="hover:text-orange-400 transition">LinkedIn</a>
                        <a href="#" class="hover:text-orange-400 transition">Facebook</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Mobile menu toggle
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });
    </script>

</body>
</html>