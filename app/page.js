import Login from "./login/page";
import Link from "next/link";

export default function Home() {
  return (
    <>
      We are in home page
      <Link href="/login">
        <button style={{backgroundColor: 'green', color: 'white'}}>Login</button>
      </Link>
    </>
  );
}
