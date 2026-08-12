import { writeFileSync } from 'fs';
import { resolve } from 'path';

const baseUrl = 'https://technicaldrawers.co.ke';

const pages = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/products', changefreq: 'daily', priority: '0.9' },
    { path: '/about', changefreq: 'monthly', priority: '0.7' },
    { path: '/contact', changefreq: 'monthly', priority: '0.7' },
    { path: '/blog', changefreq: 'weekly', priority: '0.8' },
    { path: '/blog/calculator-guide', changefreq: 'monthly', priority: '0.7' },
    { path: '/blog/drawing-kit', changefreq: 'monthly', priority: '0.7' },
    { path: '/blog/engineering-tools', changefreq: 'monthly', priority: '0.7' },
    { path: '/blog/lab-coat-guide', changefreq: 'monthly', priority: '0.7' },
    { path: '/blog/life-sciences', changefreq: 'monthly', priority: '0.7' },
    { path: '/blog/set-squares', changefreq: 'monthly', priority: '0.7' },
    { path: '/blog/urban-planning', changefreq: 'monthly', priority: '0.7' }
];

// Add all product category pages
const categories = [
    'Scientific Calculators',
    'Engineering Drawing Equipment',
    'Measuring Instruments',
    'Hand Tools',
    'Electrical Tools',
    'Safety Equipment',
    'Stationery & Office Supplies',
    'Art & Drafting Supplies',
    'Textbooks & Reference'
];

categories.forEach(cat => {
    pages.push({
        path: `/products?category=${encodeURIComponent(cat)}`,
        changefreq: 'weekly',
        priority: '0.8'
    });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), sitemap);
console.log('✅ Sitemap generated!');
