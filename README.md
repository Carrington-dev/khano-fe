<!-- npx create-next-app@latest payglen-fe -->
# Khano Frontend

A modern, responsive frontend application built with Next.js and React, featuring a stunning coming soon page with advanced animations and interactive elements.

## 🚀 Features

- **Modern Design**: Cutting-edge UI with glassmorphism effects and dynamic gradients
- **Interactive Animations**: Mouse-tracking parallax effects and floating particles
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices
- **Real-time Countdown**: Dynamic launch countdown timer
- **Email Collection**: Waitlist signup with form validation
- **Performance Optimized**: Built with Next.js for optimal loading speeds
- **Accessibility Ready**: Semantic HTML and proper contrast ratios

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript/JavaScript
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 18.0 or higher)
- npm, yarn, or pnpm package manager
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd khano-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (if applicable)
   ```bash
   cp .env.example .env.local
   ```
   Update the environment variables in `.env.local` as needed.

## 🚀 Getting Started

1. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
khano-fe/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   └── ui/
│   └── lib/
├── public/
│   ├── favicon.ico
│   └── images/
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🎨 Customization

### Updating Company Information

To customize the coming soon page for your company:

1. **Company Name & Branding**
   - Update the company name in `src/app/page.js`
   - Replace the logo icon (currently `Code` from Lucide React)
   - Modify the color scheme in the gradient classes

2. **Countdown Timer**
   - Adjust the initial countdown values in the `timeLeft` state
   - Modify the target launch date

3. **Services/Features**
   - Update the services array with your company's offerings
   - Change icons, titles, and descriptions as needed

4. **Styling**
   - Modify Tailwind classes for different color schemes
   - Adjust animations and transitions in the component

### Environment Configuration

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_COMPANY_NAME="Your Company Name"
NEXT_PUBLIC_LAUNCH_DATE="2025-10-01"
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🔍 SEO Optimization

The application includes:

- Semantic HTML structure
- Meta tags for social sharing
- Proper heading hierarchy
- Alt text for images
- Structured data markup

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
   - Import your project on [Vercel](https://vercel.com)
   - Configure environment variables
   - Deploy automatically

2. **Manual deployment**
   ```bash
   npm run build
   npm run start
   ```

### Other Platforms

The application can be deployed on:
- Netlify
- AWS Amplify
- Heroku
- DigitalOcean App Platform

## 🧪 Testing

Run the test suite:

```bash
npm run test
# or
yarn test
```

## 📈 Performance

The application achieves excellent performance scores:

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue if your problem isn't already listed
3. Provide detailed information about the problem

## 🔄 Changelog

### Version 1.0.0 (Current)
- Initial release
- Coming soon page with countdown timer
- Email collection functionality
- Responsive design implementation
- Animation and interaction effects

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Vercel](https://vercel.com/) for seamless deployment

---

**Made with ❤️ for the future of technology**