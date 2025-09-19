export class VercelTemplateService {
  static generatePortfolioHTML(profileData: any): string {
    const name = profileData.fullName || profileData.full_name || 'Portfolio';
    const headline = profileData.headline || 'Professional Portfolio';
    const summary = profileData.summary || 'Welcome to my portfolio';
    const email = profileData.email || '';
    const phone = profileData.phone || '';
    const location = profileData.location || '';
    const avatar = profileData.avatar_url || '';
    const github = profileData.github || '';
    const linkedin = profileData.linkedin || '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Portfolio</title>
    <meta name="description" content="${summary.substring(0, 160)}">
    <meta name="author" content="${name}">
    <meta property="og:title" content="${name} - Portfolio">
    <meta property="og:description" content="${summary.substring(0, 160)}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${name} - Portfolio">
    <meta name="twitter:description" content="${summary.substring(0, 160)}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/framer-motion@11/dist/framer-motion.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
    </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    ${avatar ? `<img src="${avatar}" alt="${name}" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg">` : ''}
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">${name}</h1>
                        <p class="text-gray-600">${headline}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    ${email ? `<a href="mailto:${email}" class="text-blue-600 hover:text-blue-800 font-medium">Contact</a>` : ''}
                    ${github ? `<a href="${github}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-800">GitHub</a>` : ''}
                    ${linkedin ? `<a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-800">LinkedIn</a>` : ''}
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- About Section -->
        <section class="mb-16">
            <div class="bg-white rounded-2xl shadow-lg p-8 card-hover">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">About</h2>
                <p class="text-lg text-gray-600 leading-relaxed mb-6">${summary}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${email ? `<div class="flex items-center space-x-3">
                        <span class="text-gray-500 font-medium">Email:</span>
                        <a href="mailto:${email}" class="text-blue-600 hover:text-blue-800">${email}</a>
                    </div>` : ''}
                    ${phone ? `<div class="flex items-center space-x-3">
                        <span class="text-gray-500 font-medium">Phone:</span>
                        <a href="tel:${phone}" class="text-blue-600 hover:text-blue-800">${phone}</a>
                    </div>` : ''}
                    ${location ? `<div class="flex items-center space-x-3">
                        <span class="text-gray-500 font-medium">Location:</span>
                        <span class="text-gray-900">${location}</span>
                    </div>` : ''}
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        ${profileData.skills && profileData.skills.length > 0 ? `
        <section class="mb-16">
            <div class="bg-white rounded-2xl shadow-lg p-8 card-hover">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">Skills</h2>
                <div class="flex flex-wrap gap-3">
                    ${profileData.skills.map((skill: any) => 
                        `<span class="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">${skill.name || skill}</span>`
                    ).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Experience Section -->
        ${profileData.experiences && profileData.experiences.length > 0 ? `
        <section class="mb-16">
            <div class="bg-white rounded-2xl shadow-lg p-8 card-hover">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">Experience</h2>
                <div class="space-y-6">
                    ${profileData.experiences.map((exp: any) => `
                        <div class="border-l-4 border-blue-500 pl-6">
                            <h3 class="text-xl font-semibold text-gray-900">${exp.position || exp.title || 'Position'}</h3>
                            <p class="text-lg text-blue-600 font-medium">${exp.company || exp.name || 'Company'}</p>
                            <p class="text-gray-600">${exp.start_date && exp.end_date ? `${exp.start_date} - ${exp.end_date}` : exp.duration || 'Current'}</p>
                            ${exp.summary ? `<p class="text-gray-700 mt-2">${exp.summary}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Education Section -->
        ${profileData.educations && profileData.educations.length > 0 ? `
        <section class="mb-16">
            <div class="bg-white rounded-2xl shadow-lg p-8 card-hover">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">Education</h2>
                <div class="space-y-6">
                    ${profileData.educations.map((edu: any) => `
                        <div class="border-l-4 border-green-500 pl-6">
                            <h3 class="text-xl font-semibold text-gray-900">${edu.institution || edu.name || 'Institution'}</h3>
                            <p class="text-lg text-green-600 font-medium">${edu.area || edu.studyType || 'Degree'}</p>
                            <p class="text-gray-600">${edu.start_date && edu.end_date ? `${edu.start_date} - ${edu.end_date}` : edu.duration || 'Current'}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Projects Section -->
        ${profileData.projects && profileData.projects.length > 0 ? `
        <section class="mb-16">
            <div class="bg-white rounded-2xl shadow-lg p-8 card-hover">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">Projects</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${profileData.projects.map((project: any) => `
                        <div class="border border-gray-200 rounded-lg p-6 card-hover">
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">${project.name || project.title || 'Project'}</h3>
                            <p class="text-gray-600 mb-4">${project.description || project.summary || 'Project description'}</p>
                            ${project.url ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 font-medium">View Project →</a>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Contact Section -->
        <section class="mb-16">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
                <h2 class="text-3xl font-bold mb-6">Get In Touch</h2>
                <p class="text-lg mb-6">Ready to work together? Let's connect!</p>
                <div class="flex flex-wrap gap-4">
                    ${email ? `<a href="mailto:${email}" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Email Me</a>` : ''}
                    ${github ? `<a href="${github}" target="_blank" rel="noopener noreferrer" class="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">GitHub</a>` : ''}
                    ${linkedin ? `<a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">LinkedIn</a>` : ''}
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-lg font-semibold mb-2">${name}</p>
            <p class="text-gray-400 mb-4">${headline}</p>
            <div class="flex justify-center space-x-6 mb-6">
                ${email ? `<a href="mailto:${email}" class="text-gray-400 hover:text-white transition-colors">Email</a>` : ''}
                ${github ? `<a href="${github}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">GitHub</a>` : ''}
                ${linkedin ? `<a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">LinkedIn</a>` : ''}
            </div>
            <p class="text-gray-500">© 2025 ${name}. Made with ❤️</p>
        </div>
    </footer>

    <script>
        // Add some basic interactivity
        document.addEventListener('DOMContentLoaded', function() {
            // Add smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });
    </script>
</body>
</html>`;
  }
}
