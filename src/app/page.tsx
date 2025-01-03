import Blogposts from "@/components/blogposts";
import CommentSection from "@/components/Comments";
import BlogHeroSection from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <BlogHeroSection />
      <Blogposts/>
      <CommentSection/>
    </main>
  )
}