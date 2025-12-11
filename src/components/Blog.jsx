const posts = [
  { id: 1, title: "Articolo 1", content: "Contenuto dell'articolo 1" },
  { id: 2, title: "Articolo 2", content: "Contenuto dell'articolo 2" },
  { id: 3, title: "Articolo 3", content: "Contenuto dell'articolo 3" },
];

const Blog = () => {
  return (
    <section className="blog">
      <h2>Blog</h2>
      <div className="blog-posts">
        {posts.map((post) => (
          <div key={post.id} className="blog-post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
