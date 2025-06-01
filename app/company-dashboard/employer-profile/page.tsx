import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Phone,
  Users,
  Award,
  Heart,
  Lightbulb,
  Shield,
  Zap,
} from "lucide-react"

export default function page() {
  return (
    <main className="container mx-auto py-6 px-0 md:px-6 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl lg:text-4xl font-bold mb-2">TechCorp Solutions</h1>
                  <p className="text-base lg:text-xl text-muted-foreground mb-4">
                    Innovative technology solutions for the modern enterprise
                  </p>
                  
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-muted-foreground">Employees</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">15</div>
                    <div className="text-sm text-muted-foreground">Years</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">1000+</div>
                    <div className="text-sm text-muted-foreground">Clients</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">25</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Building2 className="mr-3 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Founded</div>
                    <div className="text-sm text-muted-foreground">2009</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-3 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Headquarters</div>
                    <div className="text-sm text-muted-foreground">San Francisco, CA</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="mr-3 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Company Size</div>
                    <div className="text-sm text-muted-foreground">500-1000 employees</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-3 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Website</div>
                    <div className="text-sm text-muted-foreground">www.techcorp.com</div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">contact@techcorp.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Awards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Best Tech Company 2024</div>
                    <div className="text-xs text-muted-foreground">Tech Innovation Awards</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Top Employer 2023</div>
                    <div className="text-xs text-muted-foreground">Great Place to Work</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Innovation Leader</div>
                    <div className="text-xs text-muted-foreground">Industry Excellence</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="culture">Culture</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>About TechCorp Solutions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    TechCorp Solutions is a leading technology company specializing in innovative software development,
                    cloud solutions, and artificial intelligence. Founded in 2009, we have grown from a small startup to
                    a global enterprise serving over 1,000 clients across 25 countries.
                  </p>
                  <p>
                    Our mission is to empower businesses through cutting-edge technology solutions that drive growth,
                    efficiency, and innovation. We believe in the transformative power of technology and are committed
                    to delivering exceptional value to our clients while fostering a culture of continuous learning and
                    innovation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-6 w-6 text-yellow-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">Innovation</h3>
                        <p className="text-sm text-muted-foreground">
                          We constantly push boundaries and embrace new technologies to solve complex challenges.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-blue-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">Integrity</h3>
                        <p className="text-sm text-muted-foreground">
                          We conduct business with honesty, transparency, and ethical practices in everything we do.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Heart className="h-6 w-6 text-red-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">Collaboration</h3>
                        <p className="text-sm text-muted-foreground">
                          We believe in the power of teamwork and foster an inclusive, supportive environment.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="h-6 w-6 text-purple-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">Excellence</h3>
                        <p className="text-sm text-muted-foreground">
                          We strive for excellence in every project and continuously improve our processes and
                          solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Our Services</CardTitle>
                  <CardDescription>Comprehensive technology solutions tailored to your business needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">Cloud Solutions</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground mb-3">
                          Scalable cloud infrastructure and migration services to modernize your business operations.
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            AWS
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Azure
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            GCP
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">Custom Software</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground mb-3">
                          Bespoke software development solutions designed to meet your specific business requirements.
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            Web Apps
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Mobile
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            APIs
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">AI & Machine Learning</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground mb-3">
                          Intelligent automation and data analytics solutions to drive business insights and efficiency.
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            NLP
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Computer Vision
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Predictive Analytics
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">Digital Transformation</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground mb-3">
                          End-to-end digital transformation consulting to modernize your business processes and
                          technology stack.
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            Strategy
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Implementation
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Support
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Leadership Team</CardTitle>
                  <CardDescription>Meet the visionaries leading TechCorp Solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="text-center space-y-3">
                      <Avatar className="h-20 w-20 mx-auto">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="CEO" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">John Smith</h3>
                        <p className="text-sm text-muted-foreground">Chief Executive Officer</p>
                        <p className="text-xs text-muted-foreground mt-1">15+ years in tech leadership</p>
                      </div>
                    </div>
                    <div className="text-center space-y-3">
                      <Avatar className="h-20 w-20 mx-auto">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="CTO" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Sarah Johnson</h3>
                        <p className="text-sm text-muted-foreground">Chief Technology Officer</p>
                        <p className="text-xs text-muted-foreground mt-1">AI/ML expert, former Google</p>
                      </div>
                    </div>
                    <div className="text-center space-y-3">
                      <Avatar className="h-20 w-20 mx-auto">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="COO" />
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Michael Brown</h3>
                        <p className="text-sm text-muted-foreground">Chief Operating Officer</p>
                        <p className="text-xs text-muted-foreground mt-1">Operations & scaling specialist</p>
                      </div>
                    </div>
                    <div className="text-center space-y-3">
                      <Avatar className="h-20 w-20 mx-auto">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="CFO" />
                        <AvatarFallback>ED</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Emily Davis</h3>
                        <p className="text-sm text-muted-foreground">Chief Financial Officer</p>
                        <p className="text-xs text-muted-foreground mt-1">Finance & strategy expert</p>
                      </div>
                    </div>
                    <div className="text-center space-y-3">
                      <Avatar className="h-20 w-20 mx-auto">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="CPO" />
                        <AvatarFallback>DW</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">David Wilson</h3>
                        <p className="text-sm text-muted-foreground">Chief Product Officer</p>
                        <p className="text-xs text-muted-foreground mt-1">Product innovation leader</p>
                      </div>
                    </div>
                    <div className="text-center space-y-3">
                      <Avatar className="h-20 w-20 mx-auto">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="CHRO" />
                        <AvatarFallback>LT</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Lisa Taylor</h3>
                        <p className="text-sm text-muted-foreground">Chief Human Resources Officer</p>
                        <p className="text-xs text-muted-foreground mt-1">People & culture champion</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="culture" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Company Culture</CardTitle>
                  <CardDescription>Building an inclusive and innovative workplace</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Work-Life Balance</h3>
                      <p className="text-sm text-muted-foreground">
                        Flexible working hours, remote work options, and unlimited PTO to ensure our team maintains a
                        healthy work-life balance.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Professional Development</h3>
                      <p className="text-sm text-muted-foreground">
                        Annual learning budget, conference attendance, and internal mentorship programs to support
                        continuous growth.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Diversity & Inclusion</h3>
                      <p className="text-sm text-muted-foreground">
                        Committed to building a diverse team with employee resource groups and inclusive hiring
                        practices.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Innovation Time</h3>
                      <p className="text-sm text-muted-foreground">
                        20% time for personal projects and innovation, encouraging creativity and experimentation.
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-3">Benefits & Perks</h3>
                    <div className="grid gap-2 md:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Health Insurance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Stock Options</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Gym Membership</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Free Meals</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Parental Leave</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Team Retreats</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Latest News & Updates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <article className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>December 15, 2024</span>
                      </div>
                      <h3 className="font-semibold mb-2">TechCorp Announces New AI Research Lab</h3>
                      <p className="text-sm text-muted-foreground">
                        We're excited to announce the opening of our new AI Research Lab in partnership with leading
                        universities to advance machine learning research.
                      </p>
                    </article>
                    <article className="border-l-4 border-green-500 pl-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>November 28, 2024</span>
                      </div>
                      <h3 className="font-semibold mb-2">Q3 Results: 40% Revenue Growth</h3>
                      <p className="text-sm text-muted-foreground">
                        Strong quarterly performance driven by increased demand for cloud solutions and AI services
                        across all market segments.
                      </p>
                    </article>
                    <article className="border-l-4 border-purple-500 pl-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>November 10, 2024</span>
                      </div>
                      <h3 className="font-semibold mb-2">Expansion into European Markets</h3>
                      <p className="text-sm text-muted-foreground">
                        Opening new offices in London and Berlin to better serve our growing European client base and
                        expand our global presence.
                      </p>
                    </article>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Contact Sales</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
