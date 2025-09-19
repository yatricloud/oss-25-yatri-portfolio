import React from 'react'
import { motion } from 'framer-motion'

interface ProfileData {
  fullName?: string;
  headline?: string;
  summary?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  github?: string;
  linkedin?: string;
  experiences?: any[];
  educations?: any[];
  skills?: any[];
  projects?: any[];
}

function App() {
  // Get profile data from environment variables
  const userId = import.meta.env.VITE_USER_ID;
  const profileDataStr = import.meta.env.VITE_PROFILE_DATA;
  
  let profileData: ProfileData = {};
  try {
    profileData = JSON.parse(profileDataStr || '{}');
  } catch (error) {
    console.error('Error parsing profile data:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {profileData.avatar_url && (
                <img
                  src={profileData.avatar_url}
                  alt={profileData.fullName || 'Profile'}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profileData.fullName || 'Portfolio'}
                </h1>
                <p className="text-gray-600">
                  {profileData.headline || 'Professional Portfolio'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {profileData.email && (
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Contact
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About</h2>
            {profileData.summary && (
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {profileData.summary}
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileData.email && (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500">Email:</span>
                  <a href={`mailto:${profileData.email}`} className="text-blue-600 hover:text-blue-800">
                    {profileData.email}
                  </a>
                </div>
              )}
              {profileData.phone && (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500">Phone:</span>
                  <a href={`tel:${profileData.phone}`} className="text-blue-600 hover:text-blue-800">
                    {profileData.phone}
                  </a>
                </div>
              )}
              {profileData.location && (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-gray-900">{profileData.location}</span>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        {profileData.skills && profileData.skills.length > 0 && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill.name || skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Experience Section */}
        {profileData.experiences && profileData.experiences.length > 0 && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience</h2>
              <div className="space-y-6">
                {profileData.experiences.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position || exp.title}</h3>
                    <p className="text-lg text-blue-600 font-medium">{exp.company || exp.name}</p>
                    <p className="text-gray-600">
                      {exp.start_date && exp.end_date 
                        ? `${exp.start_date} - ${exp.end_date}`
                        : exp.duration || 'Current'
                      }
                    </p>
                    {exp.summary && (
                      <p className="text-gray-700 mt-2">{exp.summary}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Projects Section */}
        {profileData.projects && profileData.projects.length > 0 && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profileData.projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.name || project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {project.description || project.summary}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <motion.footer
          className="text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <p>© 2025 {profileData.fullName || 'Portfolio'}. Made with ❤️</p>
        </motion.footer>
      </main>
    </div>
  )
}

export default App
