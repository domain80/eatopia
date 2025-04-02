import type { IUserAccountDto } from '@/features/onboarding/auth/dto/userAccount.dto'

export const sampleDietitians: IUserAccountDto[] = [
  {
    id: 'diet-001',
    email: 'dr.ama@wholistika.com',
    firstName: 'Ama',
    lastName: 'Mensah',
    title: 'Dr.',
    jobTitle: 'Clinical Dietitian',
    interests: 'Weight Management, Sports Nutrition, Diabetes Care',
    about:
      'I help young adults achieve their fitness and weight loss goals using tried and proven 2-5 month plans tailored to the individual.',
    imageData: 'https://i.pravatar.cc/150?img=2',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-20'),
    medicalInfo: [
      {
        name: 'Specialization',
        summary: 'Weight Management and Metabolic Health',
      },
      {
        name: 'Certification',
        summary: 'Certified Diabetes Educator (CDE)',
      },
    ],
    workExperiences: [
      {
        title: 'Senior Clinical Dietitian',
        where: 'Korle Bu Teaching Hospital',
        startDate: new Date('2020-06-01'),
        endDate: null,
        currentlyWork: true,
        jobSummary:
          'Leading nutrition therapy programs for weight management and metabolic disorders',
      },
    ],
  },
  {
    id: 'diet-002',
    email: 'sarah.chen@wholistika.com',
    firstName: 'Sarah',
    lastName: 'Chen',
    title: 'Dr.',
    jobTitle: 'Sports Nutritionist',
    interests: 'Athletic Performance, Recovery Nutrition, Plant-based Diet',
    about:
      'Specialized in helping athletes optimize their nutrition for peak performance and recovery using evidence-based strategies.',
    imageData: 'https://i.pravatar.cc/150?img=5',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-18'),
    medicalInfo: [
      {
        name: 'Specialization',
        summary: 'Sports Nutrition and Performance',
      },
      {
        name: 'Certification',
        summary: 'Certified Sports Nutritionist (CISSN)',
      },
    ],
    workExperiences: [
      {
        title: 'Performance Nutritionist',
        where: 'Elite Sports Academy',
        startDate: new Date('2019-03-01'),
        endDate: null,
        currentlyWork: true,
        jobSummary:
          'Developing nutrition plans for professional athletes and managing team nutrition programs',
      },
    ],
  },
  {
    id: 'diet-003',
    email: 'james.wilson@wholistika.com',
    firstName: 'James',
    lastName: 'Wilson',
    title: 'Dr.',
    jobTitle: 'Pediatric Dietitian',
    interests: 'Child Nutrition, Food Allergies, Developmental Health',
    about:
      'Dedicated to helping children develop healthy eating habits and managing pediatric nutritional challenges.',
    imageData: 'https://i.pravatar.cc/150?img=8',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-15'),
    medicalInfo: [
      {
        name: 'Specialization',
        summary: 'Pediatric Nutrition',
      },
      {
        name: 'Certification',
        summary: 'Board Certified Specialist in Pediatric Nutrition',
      },
    ],
    workExperiences: [
      {
        title: 'Lead Pediatric Dietitian',
        where: "Children's Medical Center",
        startDate: new Date('2019-09-01'),
        endDate: null,
        currentlyWork: true,
        jobSummary:
          'Managing nutrition care for pediatric patients and conducting family nutrition education programs',
      },
    ],
  },
  {
    id: 'diet-004',
    email: 'maya.patel@wholistika.com',
    firstName: 'Maya',
    lastName: 'Patel',
    title: 'Dr.',
    jobTitle: 'Integrative Dietitian',
    interests: 'Holistic Nutrition, Gut Health, Autoimmune Conditions',
    about:
      'Combining traditional wisdom with modern nutritional science to create personalized healing protocols.',
    imageData: 'https://i.pravatar.cc/150?img=10',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-19'),
    medicalInfo: [
      {
        name: 'Specialization',
        summary: 'Integrative and Functional Nutrition',
      },
      {
        name: 'Certification',
        summary: 'Certified Nutrition Specialist (CNS)',
      },
    ],
    workExperiences: [
      {
        title: 'Functional Nutrition Specialist',
        where: 'Wellness Integration Center',
        startDate: new Date('2018-03-01'),
        endDate: null,
        currentlyWork: true,
        jobSummary:
          'Providing comprehensive nutrition therapy using functional medicine principles',
      },
    ],
  },
  {
    id: 'diet-005',
    email: 'carlos.rodriguez@wholistika.com',
    firstName: 'Carlos',
    lastName: 'Rodriguez',
    title: 'Dr.',
    jobTitle: 'Research Dietitian',
    interests: 'Clinical Research, Metabolic Health, Aging and Nutrition',
    about:
      'Leading research initiatives in nutritional interventions for chronic disease prevention and management.',
    imageData: 'https://i.pravatar.cc/150?img=12',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-17'),
    medicalInfo: [
      {
        name: 'Specialization',
        summary: 'Clinical Nutrition Research',
      },
      {
        name: 'Certification',
        summary: 'PhD in Nutritional Sciences',
      },
    ],
    workExperiences: [
      {
        title: 'Senior Research Dietitian',
        where: 'National Institute of Nutrition',
        startDate: new Date('2017-06-01'),
        endDate: null,
        currentlyWork: true,
        jobSummary:
          'Conducting clinical trials and research in nutritional interventions for chronic diseases',
      },
    ],
  },
]
