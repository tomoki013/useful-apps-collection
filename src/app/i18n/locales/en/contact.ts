export default {
  title: 'Contact Us',
  description: 'If you have any questions or requests, please feel free to contact us. Our professional staff will promptly assist you.',
  form: {
    title: 'Contact Form',
    description: 'Please fill out the form below and press the submit button.',
    name: 'Name',
    namePlaceholder: 'John Doe',
    email: 'Email Address',
    emailPlaceholder: 'example@email.com',
    subject: 'Subject',
    subjectPlaceholder: 'Please enter the subject of your inquiry',
    message: 'Message',
    messagePlaceholder: 'Please enter the details of your inquiry',
    submit: 'Submit',
    submitting: 'Submitting...',
    submitSuccess: 'Thank you for your inquiry. We will reply within 3 business days.',
  },
  contactInfo: {
    title: 'Contact Information',
    description: 'Other ways to contact us',
    email: 'Email Address',
    emailDescription: 'Available 24/7',
    phone: 'Phone Number',
    phoneDescription: 'Weekdays 9:00-18:00',
    address: 'Address',
    addressDescription: 'Shibuya-ku, Tokyo',
  },
  responseTime: {
    title: 'Response Time',
    description: 'We will typically respond to your inquiry within 3 business days.',
    badge: 'Prompt Support',
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'Is it free to use the apps?',
        answer: 'Yes, all apps are available for free.'
      },
      {
        question: 'Do I need to register an account?',
        answer: 'No, you can use the apps without registering an account.'
      },
      {
        question: 'Can I use it on my smartphone?',
        answer: 'Yes, it is compatible with all devices.'
      }
    ]
  },
  required: 'Required',
} as const;
