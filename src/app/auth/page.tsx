import { titleFont } from '@/config/font';
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
     <h1>Hello world</h1>
     <h1 className={titleFont.className}>hello world</h1>
    </main>
  );
}
