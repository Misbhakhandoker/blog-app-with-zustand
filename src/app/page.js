import { redirect } from "next/navigation";

function Home() {
  const GoToBlog = null
  if(GoToBlog == null) redirect('blog')
  return <div>hello</div>;
}

export default Home;
