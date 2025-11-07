'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScopedI18n } from '@/i18n/client';

const ContactPage = () => {
    const ts = useScopedI18n('contact_page');
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

        alert(ts('form.success_message'));
    };

    const contactInfo = [
        {
            icon: Mail,
            title: ts('info.email.title'),
            content: ts('info.email.content'),
            description: ts('info.email.description')
        },
        {
            icon: Phone,
            title: ts('info.phone.title'),
            content: ts('info.phone.content'),
            description: ts('info.phone.description')
        },
        {
            icon: MapPin,
            title: ts('info.address.title'),
            content: ts('info.address.content'),
            description: ts('info.address.description')
        }
    ];

    const faqItems = [
        {
            question: ts('faq.items.q1.question'),
            answer: ts('faq.items.q1.answer')
        },
        {
            question: ts('faq.items.q2.question'),
            answer: ts('faq.items.q2.answer')
        },
        {
            question: ts('faq.items.q3.question'),
            answer: ts('faq.items.q3.answer')
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    {ts('title')}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {ts('description')}
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <MessageSquare className="w-6 h-6 text-primary" />
                                {ts('form.title')}
                            </CardTitle>
                            <CardDescription>
                                {ts('form.description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                                            {ts('form.name')} <span className="text-destructive">*</span>
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder={ts('form.name_placeholder')}
                                            className="border-border focus:border-primary focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                                            {ts('form.email')} <span className="text-destructive">*</span>
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder={ts('form.email_placeholder')}
                                            className="border-border focus:border-primary focus:ring-primary"
                                      />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                                        {ts('form.subject')} <span className="text-destructive">*</span>
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder={ts('form.subject_placeholder')}
                                        className="border-border focus:border-primary focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                                        {ts('form.message')} <span className="text-destructive">*</span>
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder={ts('form.message_placeholder')}
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
                                            {ts('form.submitting')}
                                        </>
                                    ) : (
                                      <>
                                            <Send className="w-4 h-4 mr-2" />
                                            {ts('form.submit')}
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
                            <CardTitle className="text-xl">{ts('info.title')}</CardTitle>
                            <CardDescription>
                                {ts('info.description')}
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
                                <h3 className="text-lg font-semibold text-foreground">{ts('response_time.title')}</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                {ts('response_time.description')}
                            </p>
                            <Badge variant="outline" className="bg-background/50">
                                {ts('response_time.badge')}
                            </Badge>
                        </CardContent>
                    </Card>
                      
                    {/* FAQ */}
                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="text-xl">{ts('faq.title')}</CardTitle>
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
