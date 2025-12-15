import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  QrCode,
  Smartphone,
  Users,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  BarChart3,
  Globe,
  Palette,
  Download,
} from "lucide-react"

export default function QRGeneratorLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-muted py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              Professional QR Solutions
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              Custom QR Codes for Your
              <span className="text-primary"> Digital Presence</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Create personalized client pages and generate custom QR codes that showcase your business details, social
              media, and contact information. Perfect for business cards, restaurants, and shops.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Your QR Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                View Examples
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                No Setup Required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Mobile Optimized
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Instant Generation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your custom QR code in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">1. Share Your Details</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Provide your business information, contact details, social media links, and any images you want to
                  include on your personalized page.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">2. We Create Your Page</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our system automatically generates a beautiful, mobile-friendly page with all your information
                  perfectly organized and optimized.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">3. Get Your QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Receive your custom QR code that links directly to your page. Use it on business cards, flyers, or
                  anywhere you want to share your information.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Perfect for Every Business</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From restaurants to retail shops, our QR codes work everywhere
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">1. Share Your Details</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Provide your business information, contact details, social media links, and any images you want to
                  include on your personalized page.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">2. We Create Your Page</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our system automatically generates a beautiful, mobile-friendly page with all your information
                  perfectly organized and optimized.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">3. Get Your QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Receive your custom QR code that links directly to your page. Use it on business cards, flyers, or
                  anywhere you want to share your information.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* QR Code Examples Gallery Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">QR Code Examples</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how our custom QR codes look in real-world applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <img
                  src="/elegant-business-card-with-qr-code-for-restaurant.jpg"
                  alt="Restaurant business card with QR code"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2">Restaurant Business Card</CardTitle>
                <CardDescription>
                  Elegant design featuring menu access, social media links, and contact information
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <img
                  src="/modern-retail-store-table-tent-with-qr-code-displa.jpg"
                  alt="Retail store QR code display"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2">Retail Store Display</CardTitle>
                <CardDescription>
                  Table tent showcasing product information, online store, and customer reviews
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <img
                  src="/professional-networking-event-badge-with-qr-code.jpg"
                  alt="Event networking badge with QR code"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2">Event Networking</CardTitle>
                <CardDescription>
                  Conference badge design with instant contact sharing and LinkedIn integration
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries We Serve Section with images */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by businesses across various industries for their digital presence needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5">
                <img
                  src="/modern-restaurant-interior-with-customers-scanning.jpg"
                  alt="Restaurant with QR codes"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">Restaurants</CardTitle>
                <CardDescription className="text-sm">Digital menus, social media, and contact info</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5">
                <img
                  src="/retail-clothing-store-with-qr-code-displays-and-sh.jpg"
                  alt="Retail store with QR codes"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">Retail</CardTitle>
                <CardDescription className="text-sm">Product info, online stores, and promotions</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5">
                <img
                  src="/professional-healthcare-clinic-waiting-room-with-q.jpg"
                  alt="Healthcare facility with QR codes"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">Healthcare</CardTitle>
                <CardDescription className="text-sm">Patient forms, contact info, and services</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5">
                <img
                  src="/modern-real-estate-office-with-qr-codes-for-proper.jpg"
                  alt="Real estate office with QR codes"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">Real Estate</CardTitle>
                <CardDescription className="text-sm">Property details, virtual tours, and contact</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section with visual elements */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Our QR Codes?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced features that set us apart from the competition
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mobile-First Design</h3>
                  <p className="text-muted-foreground">
                    Every page is optimized for mobile devices, ensuring your customers have a perfect experience on any
                    screen size.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    Our pages load instantly, keeping your customers engaged and reducing bounce rates significantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Analytics Included</h3>
                  <p className="text-muted-foreground">
                    Track scans, visitor behavior, and engagement metrics to understand your audience better.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl overflow-hidden">
                <img
                  src="/smartphone-displaying-beautiful-qr-code-landing-pa.jpg"
                  alt="QR code analytics dashboard on mobile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Basic</CardTitle>
                <div className="text-4xl font-bold mt-4">$19</div>
                <CardDescription className="text-base">Perfect for individuals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>1 Custom QR Code</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Mobile-Optimized Page</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Basic Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Email Support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-4xl font-bold mt-4">$39</div>
                <CardDescription className="text-base">Best for businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>5 Custom QR Codes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Custom Branding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Priority Support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Social Media Integration</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold mt-4">$99</div>
                <CardDescription className="text-base">For large organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Unlimited QR Codes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>White-Label Solution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>API Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Dedicated Support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Custom Integrations</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Advanced Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools to maximize your QR code effectiveness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Real-Time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Track scans, locations, devices, and user behavior with detailed analytics dashboards and reports.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Custom Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Personalize your QR codes with custom colors, logos, and branding to match your business identity.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Security & Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Enterprise-grade security with SSL encryption, password protection, and privacy-compliant analytics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Multi-Language Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Create pages in multiple languages to reach global audiences and provide localized experiences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Bulk Export</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Download QR codes in various formats (PNG, SVG, PDF) and sizes for print and digital use.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Dynamic Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Update your page content anytime without changing the QR code. Perfect for menus and promotions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about our QR code service</p>
          </div>

          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">How quickly will I receive my QR code?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Most QR codes are delivered within 24 hours. For rush orders, we offer same-day delivery for an
                  additional fee.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Can I update my information after the QR code is created?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Yes! With our Professional and Enterprise plans, you can update your page content anytime without
                  changing the QR code itself.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">What formats do you provide for the QR codes?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We provide high-resolution PNG files suitable for both print and digital use. Enterprise customers
                  also receive SVG and PDF formats.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds if I'm not satisfied?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We offer a 30-day money-back guarantee. If you're not completely satisfied with your QR code, we'll
                  provide a full refund.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Can I track how many people scan my QR code?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Yes! All plans include analytics. You can see scan counts, locations, devices used, and peak scanning
                  times through your dashboard.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">Join thousands of satisfied customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "This QR code solution transformed how we share our restaurant information. Customers love the instant
                  access to our menu and social media!"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-muted-foreground">Owner, Bella Vista Restaurant</div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "Perfect for networking events. Instead of fumbling with business cards, I just show my QR code and
                  people have all my information instantly."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold">Michael Rodriguez</div>
                <div className="text-sm text-muted-foreground">Marketing Director, TechFlow</div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "The setup was incredibly easy and the results look so professional. Our customers frequently
                  compliment our modern approach to sharing information."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold">Emma Thompson</div>
                <div className="text-sm text-muted-foreground">Boutique Owner, Style & Grace</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact/Order Form Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Get Started Today</h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and we'll create your custom QR code within 24 hours
            </p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Order Your Custom QR Code</CardTitle>
              <CardDescription className="text-center text-base">
                Provide your information and we'll handle the rest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business">Business/Organization Name</Label>
                  <Input id="business" placeholder="Enter business name" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Street address, City, State, ZIP" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social">Social Media Links</Label>
                <Textarea
                  id="social"
                  placeholder="Instagram: @yourhandle&#10;Facebook: facebook.com/yourpage&#10;Website: yourwebsite.com"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional">Additional Information</Label>
                <Textarea
                  id="additional"
                  placeholder="Any special requests, preferred colors, or additional details you'd like included..."
                  rows={3}
                />
              </div>

              <Button className="w-full text-lg py-6" size="lg">
                Create My QR Code - $29
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                * Required fields. Your QR code will be delivered within 24 hours via email.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <QrCode className="w-8 h-8" />
                <span className="text-xl font-bold">QR Pro</span>
              </div>
              <p className="text-background/80">
                Professional QR code solutions for modern businesses and individuals.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Services</h4>
              <ul className="space-y-2 text-background/80">
                <li>Custom QR Codes</li>
                <li>Digital Business Cards</li>
                <li>Restaurant Menus</li>
                <li>Event Networking</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-background/80">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <ul className="space-y-2 text-background/80">
                <li>hello@qrpro.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Available 9 AM - 6 PM EST</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 QR Pro. All rights reserved. Built with modern web technologies for optimal performance.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
