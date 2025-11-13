export default {
  title: 'お問い合わせ',
  description: 'ご質問やご要望がございましたら、お気軽にお問い合わせください。専門スタッフが迅速にサポートいたします。',
  form: {
    title: 'お問い合わせフォーム',
    description: '下記フォームにご記入の上、送信ボタンを押してください。',
    name: 'お名前',
    namePlaceholder: '山田太郎',
    email: 'メールアドレス',
    emailPlaceholder: 'example@email.com',
    subject: '件名',
    subjectPlaceholder: 'お問い合わせの件名をご記入ください',
    message: 'メッセージ',
    messagePlaceholder: 'お問い合わせ内容を詳しくご記入ください',
    submit: '送信する',
    submitting: '送信中...',
    submitSuccess: 'お問い合わせありがとうございます。3営業日以内にご返信いたします。',
  },
  contactInfo: {
    title: '連絡先情報',
    description: 'その他の連絡方法',
    email: 'メールアドレス',
    emailDescription: '24時間受付中',
    phone: '電話番号',
    phoneDescription: '平日 9:00-18:00',
    address: '所在地',
    addressDescription: '〒150-0000',
  },
  responseTime: {
    title: '返信時間',
    description: 'お問い合わせいただいた内容には、通常3営業日以内にご返信いたします。',
    badge: '迅速対応',
  },
  faq: {
    title: 'よくある質問',
    items: [
      {
        question: 'アプリの利用は無料ですか？',
        answer: 'はい、すべてのアプリを無料でご利用いただけます。'
      },
      {
        question: 'アカウント登録は必要ですか？',
        answer: 'いいえ、アカウント登録なしでご利用いただけます。'
      },
      {
        question: 'スマートフォンでも使えますか？',
        answer: 'はい、すべてのデバイスに対応しています。'
      }
    ]
  },
  required: '必須',
} as const;
