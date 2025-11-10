import Link from 'next/link';
import { ArrowRight, Zap, Shield, Smartphone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getScopedI18n } from '@/i18n/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Home({ params }: { params: { lang: string } }) {
	const th = await getScopedI18n('home.hero');
	const ts = await getScopedI18n('home.stats');
	const tf = await getScopedI18n('home.features');
	const tc = await getScopedI18n('home.cta');

  	const features = [
  	  	{
  	  	  	icon: Zap,
			title: tf('items.fast.title'),
			description: tf('items.fast.description')
  	  	},
  	  	{
  	  	  	icon: Shield,
			title: tf('items.secure.title'),
			description: tf('items.secure.description')
  	  	},
  	  	{
  	  	  	icon: Smartphone,
			title: tf('items.responsive.title'),
			description: tf('items.responsive.description')
  	  	}
  	];

  	const stats = [
		{ number: '20+', label: ts('tools') },
		{ number: '100%', label: ts('free') },
		{ number: '24/7', label: ts('available') }
  	];

  	return (
  	  	<div className="relative">
  	  	  	{/* Hero Section */}
  	  	  	<section className="relative overflow-hidden">
  	  	  	  	<div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-600/5 dark:via-purple-600/5 dark:to-pink-600/5" />
  	  	  	  	<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
  	  	  	  	  	<div className="text-center space-y-8">
  	  	  	  	  	  	<div className="space-y-4">
  	  	  	  	  	  	  	<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
								{th('title')}
  	  	  	  	  	  	  	  	<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
									{th('title_highlight')}
  	  	  	  	  	  	  	  	</span>
  	  	  	  	  	  	  	</h1>
  	  	  	  	  	  	  	<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
								{th('description')}
  	  	  	  	  	  	  	</p>
  	  	  	  	  	  	</div>

  	  	  	  	  	  	<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  	  	  	  	  	  	  	<Link href="/apps">
  	  	  	  	  	  	  	  	<Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group">
									{th('cta_primary')}
  	  	  	  	  	  	  	  	  	<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
  	  	  	  	  	  	  	  	</Button>
  	  	  	  	  	  	  	</Link>
  	  	  	  	  	  	  	<Button variant="outline" size="lg" className="text-lg px-8 py-6">
								{th('cta_secondary')}
  	  	  	  	  	  	  	</Button>
  	  	  	  	  	  	</div>

  	  	  	  	  	  	{/* Stats */}
  	  	  	  	  	  	<div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-16">
  	  	  	  	  	  	  	{stats.map((stat, index) => (
  	  	  	  	  	  	  	  	<div key={index} className="text-center">
  	  	  	  	  	  	  	  	  	<div className="text-2xl lg:text-3xl font-bold text-foreground">{stat.number}</div>
  	  	  	  	  	  	  	  	  	<div className="text-sm text-muted-foreground">{stat.label}</div>
  	  	  	  	  	  	  	  	</div>
  	  	  	  	  	  	  	))}
  	  	  	  	  	  	</div>
  	  	  	  	  	</div>
  	  	  	  	</div>
  	  	  	</section>
				  
  	  	  	{/* Features Section */}
  	  	  	<section className="py-24 bg-muted/30">
  	  	  	  	<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  	  	  	  	  	<div className="text-center space-y-4 mb-16">
  	  	  	  	  	  	<h2 className="text-3xl lg:text-4xl font-bold text-foreground">
							{tf('title')}
  	  	  	  	  	  	</h2>
  	  	  	  	  	  	<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							{tf('description')}
  	  	  	  	  	  	</p>
  	  	  	  	  	</div>

  	  	  	  	  	<div className="grid md:grid-cols-3 gap-8">
  	  	  	  	  	  	{features.map((feature, index) => {
  	  	  	  	  	  	  	const Icon = feature.icon;
  	  	  	  	  	  	  	return (
  	  	  	  	  	  	  	  	<Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
  	  	  	  	  	  	  	  	  	<CardHeader className="text-center pb-4">
  	  	  	  	  	  	  	  	  	  	<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
  	  	  	  	  	  	  	  	  	  	  	<Icon className="w-8 h-8 text-white" />
  	  	  	  	  	  	  	  	  	  	</div>
  	  	  	  	  	  	  	  	  	  	<CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
  	  	  	  	  	  	  	  	  	</CardHeader>
  	  	  	  	  	  	  	  	  	<CardContent className="text-center">
  	  	  	  	  	  	  	  	  	  	<CardDescription className="text-muted-foreground leading-relaxed">
  	  	  	  	  	  	  	  	  	  	  	{feature.description}
  	  	  	  	  	  	  	  	  	  	</CardDescription>
  	  	  	  	  	  	  	  	  	</CardContent>
  	  	  	  	  	  	  	  	</Card>
  	  	  	  	  	  	  	);
  	  	  	  	  	  	})}
  	  	  	  	  	</div>
  	  	  	  	</div>
  	  	  	</section>
				
  	  	  	{/* CTA Section */}
  	  	  	<section className="py-24">
  	  	  	  	<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
  	  	  	  	  	<Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden relative">
  	  	  	  	  	  	<div className="absolute inset-0 bg-black/10" />
  	  	  	  	  	  	<CardContent className="relative py-16 px-8">
  	  	  	  	  	  	  	<Star className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
  	  	  	  	  	  	  	<h2 className="text-3xl lg:text-4xl font-bold mb-4">
								{tc('title')}
  	  	  	  	  	  	  	</h2>
  	  	  	  	  	  	  	<p className="text-xl mb-8 text-blue-100">
								{tc('description')}
  	  	  	  	  	  	  	</p>
  	  	  	  	  	  	  	<Link href="/apps">
  	  	  	  	  	  	  	  	<Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-100">
									{tc('button')}
  	  	  	  	  	  	  	  	  	<ArrowRight className="ml-2 w-5 h-5" />
  	  	  	  	  	  	  	  	</Button>
  	  	  	  	  	  	  	</Link>
  	  	  	  	  	  	</CardContent>
  	  	  	  	  	</Card>
  	  	  	  	</div>
  	  	  	</section>
  	  	</div>
  	);
}