'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        setIsSubmitting(false);

        alert('お問い合わせありがとうございます。3営業日以内にご返信いたします。');
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'メールアドレス',
            content: 'contact@example.com',
            description: '24時間受付中'
        },
        {
            icon: Phone,
            title: '電話番号',
            content: '03-1234-5678',
            description: '平日 9:00-18:00'
        },
        {
            icon: MapPin,
            title: '所在地',
            content: '東京都渋谷区',
            description: '〒150-0000'
        }
    ];

    const faqItems = [
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
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    お問い合わせ
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    ご質問やご要望がございましたら、お気軽にお問い合わせください。
                    専門スタッフが迅速にサポートいたします。
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <MessageSquare className="w-6 h-6 text-primary" />
                                お問い合わせフォーム
                            </CardTitle>
                            <CardDescription>
                                下記フォームにご記入の上、送信ボタンを押してください。
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                                            お名前 <span className="text-destructive">*</span>
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="山田太郎"
                                            className="border-border focus:border-primary focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                                            メールアドレス <span className="text-destructive">*</span>
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="example@email.com"
                                            className="border-border focus:border-primary focus:ring-primary"
                                      />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                                        件名 <span className="text-destructive">*</span>
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="お問い合わせの件名をご記入ください"
                                        className="border-border focus:border-primary focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                                        メッセージ <span className="text-destructive">*</span>
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="お問い合わせ内容を詳しくご記入ください"
                                        className="border-border focus:border-primary focus:ring-primary resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                            送信中...
                                        </>
                                    ) : (
                                      <>
                                            <Send className="w-4 h-4 mr-2" />
                                            送信する
                                      </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                        
                {/* Contact Info & FAQ */}
                <div className="space-y-8">
                    {/* Contact Information */}
                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="text-xl">連絡先情報</CardTitle>
                            <CardDescription>
                                その他の連絡方法
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{info.title}</h4>
                                            <p className="text-foreground font-medium">{info.content}</p>
                                            <p className="text-sm text-muted-foreground">{info.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                      
                    {/* Response Time */}
                    <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <Clock className="w-6 h-6 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">返信時間</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                お問い合わせいただいた内容には、通常3営業日以内にご返信いたします。
                            </p>
                            <Badge variant="outline" className="bg-background/50">
                                迅速対応
                            </Badge>
                        </CardContent>
                    </Card>
                      
                    {/* FAQ */}
                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="text-xl">よくある質問</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {faqItems.map((item, index) => (
                                <div key={index} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                                    <h4 className="font-semibold text-foreground mb-2">{item.question}</h4>
                                    <p className="text-muted-foreground text-sm">{item.answer}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
