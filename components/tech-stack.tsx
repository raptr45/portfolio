"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { techStack } from "@/lib/tech-data";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export function TechStack() {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              Skills
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Tech Stack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I work with to build modern applications
            </p>
          </motion.div>
        </div>

        {/* Tech Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.map((category) => {
            const IconComponent = category.icon;

            return (
              <motion.div key={category.type} variants={itemVariants}>
                <Card className="h-full group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-balance">{category.type}</span>
                    </CardTitle>
                    <Separator className="mt-3" />
                  </CardHeader>

                  <CardContent>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {category.tech.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          variants={badgeVariants}
                          custom={skillIndex}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            variant="outline"
                            className="px-3 py-1.5 text-sm font-medium hover:bg-secondary/80 cursor-default transition-colors duration-200 flex items-center gap-2"
                          >
                            {skill.icon && (
                              <Image
                                src={skill.icon || "/placeholder.svg"}
                                alt={`${skill.name} icon`}
                                width={16}
                                height={16}
                                className="object-contain"
                              />
                            )}
                            {skill.name}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
