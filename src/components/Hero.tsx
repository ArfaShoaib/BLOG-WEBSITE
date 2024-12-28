'use client'
import React from 'react';
import { Search, Bookmark, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const BlogHeroSection = () => {
  return (
    <section className="relative bg-gray-300 dark:bg-gray-900">
      {/* Hero Container */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title and Description */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            Explore Ideas That 
            <span className="block text-blue-600 dark:text-blue-400">Shape Tomorrow</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover insightful articles, expert opinions, and the latest trends in technology, 
            lifestyle, and culture.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 h-12"
              />
            </div>
            <Button className="h-12 px-6">
              Search
            </Button>
          </div>

          {/* Featured Categories */}
          <div className="pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Popular Topics</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Technology', 'Lifestyle', 'Writing', 'Productivity', 'Culture'].map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats/Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: <TrendingUp className="h-6 w-6" />,
              title: "Weekly Readers",
              value: "50K+",
              description: "Engaged community members"
            },
            {
              icon: <Bookmark className="h-6 w-6" />,
              title: "Articles",
              value: "1000+",
              description: "In-depth content pieces"
            },
            {
              icon: <Search className="h-6 w-6" />,
              title: "Topics",
              value: "100+",
              description: "Diverse categories"
            }
          ].map((stat) => (
            <div key={stat.title} className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
    </section>
  );
};

export default BlogHeroSection;