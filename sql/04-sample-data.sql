-- =====================================================
-- YATRI PORTFOLIO - SAMPLE DATA
-- =====================================================
-- This file contains sample data for testing the portfolio
-- Run this after all tables are created (01, 02, 03)

-- =====================================================
-- SAMPLE PROFILE DATA
-- =====================================================

-- Insert sample profile (replace with actual user ID)
-- Note: You'll need to replace the user_id with an actual authenticated user ID
-- This is just an example - in practice, this data comes from resume uploads

-- Sample profile data structure (commented out - uncomment and modify as needed)
/*
insert into public.profiles (
  user_id,
  full_name,
  headline,
  summary,
  email,
  phone,
  location,
  website,
  github,
  linkedin,
  resume_json
) values (
  'your-user-id-here', -- Replace with actual user ID
  'Yatharth Chauhan',
  'AI Engineer & Software Developer',
  'Passionate AI engineer with expertise in machine learning, full-stack development, and cloud technologies. I love building intelligent solutions that solve real-world problems and empower communities through technology.',
  'yatharth@example.com',
  '+1 (555) 123-4567',
  'San Francisco, CA',
  'https://yatharth.dev',
  'https://github.com/YatharthChauhan2362',
  'https://linkedin.com/in/yatharth-chauhan',
  '{
    "basics": {
      "name": "Yatharth Chauhan",
      "label": "AI Engineer & Software Developer",
      "email": "yatharth@example.com",
      "phone": "+1 (555) 123-4567",
      "location": {
        "city": "San Francisco",
        "region": "CA",
        "countryCode": "US"
      },
      "website": "https://yatharth.dev",
      "summary": "Passionate AI engineer with expertise in machine learning, full-stack development, and cloud technologies."
    },
    "work": [
      {
        "company": "Tech Corp",
        "position": "Senior AI Engineer",
        "startDate": "2022-01",
        "endDate": "present",
        "summary": "Leading AI model development and deployment for enterprise clients.",
        "responsibilities": [
          "35% model accuracy improvement",
          "60% faster inference time",
          "Led team of 5 engineers"
        ]
      }
    ],
    "education": [
      {
        "institution": "University of Technology",
        "area": "Computer Science",
        "studyType": "Bachelor",
        "startDate": "2018-09",
        "endDate": "2022-05",
        "gpa": "3.8"
      }
    ],
    "skills": [
      {
        "name": "Programming Languages",
        "keywords": ["Python", "JavaScript", "TypeScript", "Java", "C++"]
      },
      {
        "name": "AI/ML",
        "keywords": ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLP"]
      },
      {
        "name": "Web Development",
        "keywords": ["React", "Node.js", "Express", "MongoDB", "PostgreSQL"]
      }
    ]
  }'::jsonb
);
*/

-- =====================================================
-- SAMPLE EXPERIENCE DATA
-- =====================================================

-- Sample experience entries (commented out - uncomment and modify as needed)
/*
insert into public.experiences (
  user_id,
  company,
  position,
  start_date,
  end_date,
  summary,
  highlights,
  location,
  order_index
) values 
(
  'your-user-id-here', -- Replace with actual user ID
  'Tech Corp',
  'Senior AI Engineer',
  '2022-01',
  'present',
  'Leading AI model development and deployment for enterprise clients.',
  ARRAY['35% model accuracy improvement', '60% faster inference time', 'Led team of 5 engineers'],
  'San Francisco, CA',
  0
),
(
  'your-user-id-here', -- Replace with actual user ID
  'StartupXYZ',
  'Machine Learning Engineer',
  '2020-06',
  '2021-12',
  'Built predictive models for financial markets and real-time data systems.',
  ARRAY['92% prediction accuracy', '1M+ transactions/sec pipeline', 'Automated model retraining'],
  'New York, NY',
  1
);
*/

-- =====================================================
-- SAMPLE EDUCATION DATA
-- =====================================================

-- Sample education entries (commented out - uncomment and modify as needed)
/*
insert into public.educations (
  user_id,
  institution,
  area,
  study_type,
  start_date,
  end_date,
  score,
  courses,
  order_index
) values 
(
  'your-user-id-here', -- Replace with actual user ID
  'University of Technology',
  'Computer Science',
  'Bachelor of Science',
  '2018-09',
  '2022-05',
  '3.8 GPA',
  ARRAY['Machine Learning', 'Data Structures', 'Algorithms', 'Database Systems'],
  0
);
*/

-- =====================================================
-- SAMPLE SKILLS DATA
-- =====================================================

-- Sample skills entries (commented out - uncomment and modify as needed)
/*
insert into public.skills (
  user_id,
  name,
  keywords,
  level,
  order_index
) values 
(
  'your-user-id-here', -- Replace with actual user ID
  'Programming Languages',
  ARRAY['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'],
  'Expert',
  0
),
(
  'your-user-id-here', -- Replace with actual user ID
  'AI/ML',
  ARRAY['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NLP'],
  'Expert',
  1
),
(
  'your-user-id-here', -- Replace with actual user ID
  'Web Development',
  ARRAY['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
  'Advanced',
  2
);
*/

-- =====================================================
-- SAMPLE PROJECTS DATA
-- =====================================================

-- Sample projects entries (commented out - uncomment and modify as needed)
/*
insert into public.projects (
  user_id,
  name,
  description,
  url,
  github_url,
  technologies,
  featured,
  order_index
) values 
(
  'your-user-id-here', -- Replace with actual user ID
  'AI-Powered Portfolio',
  'A dynamic portfolio website with AI-driven content management and real-time GitHub integration.',
  'https://portfolio.yatharth.dev',
  'https://github.com/YatharthChauhan2362/portfolio',
  ARRAY['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
  true,
  0
),
(
  'your-user-id-here', -- Replace with actual user ID
  'ML Trading Bot',
  'Machine learning algorithm for automated cryptocurrency trading with 85% accuracy.',
  'https://trading-bot.example.com',
  'https://github.com/YatharthChauhan2362/trading-bot',
  ARRAY['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Binance API'],
  true,
  1
);
*/

-- =====================================================
-- SAMPLE GITHUB URLS
-- =====================================================

-- Sample GitHub URLs (commented out - uncomment and modify as needed)
/*
insert into public.github_urls (
  user_id,
  url,
  description
) values 
(
  'your-user-id-here', -- Replace with actual user ID
  'https://github.com/YatharthChauhan2362',
  'Main GitHub profile with all repositories'
);
*/
