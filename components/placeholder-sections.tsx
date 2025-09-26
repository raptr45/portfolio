"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              About
            </Badge>
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate full-stack developer with expertise in modern web
              technologies
            </p>
          </motion.div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <p className="text-lg leading-relaxed text-center">
              I&apos;m a dedicated full-stack developer who loves creating innovative
              solutions and bringing ideas to life through code. With experience
              in both frontend and backend technologies, I enjoy building
              scalable applications that provide exceptional user experiences.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              Portfolio
            </Badge>
            <h2 className="text-3xl font-bold mb-4">My Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of projects I&apos;ve worked on
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg mb-4" />
                <h3 className="font-semibold mb-2">Project {i}</h3>
                <p className="text-sm text-muted-foreground">
                  Description of project {i} and the technologies used.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
