import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-10 min-h-screen items-center justify-center">
        <div className="box"><Link href="/dashboard">Go to Dashboard</Link></div>
        <div className="box"><Link href="/about">About</Link></div>
        <div className="box"><Link href="/dashboard/settings">Settings</Link></div> 
    </div>   
  );
}
