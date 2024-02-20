import Image from "next/image"
import CustomLink from "./custom-link"
import { Copyright, CopyrightIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className=" bg-base-200">
      <div className="footer p-10  text-base-content">
        <aside>
          <Image src="/elavor.png" width={50} height={50} alt="Elavor Logo" />
          <p>ELAVOR Market Center<br/>Hive of Organizer Events since 2024</p>
        </aside> 
        <nav>
          <h6 className="footer-title">Package</h6> 
          <p className="footer-subtitle">Wedding</p>
          <p className="footer-subtitle">Music Concert</p>
          <p className="footer-subtitle">Branding</p>
          <p className="footer-subtitle">Birthday</p>
        </nav> 
        <nav>
          <h6 className="footer-title">Company</h6> 
          <p className="footer-subtitle">About us</p>
          <p className="footer-subtitle">Contact</p>
        </nav> 
        <nav>
          <h6 className="footer-title">Social</h6> 
          <div className="grid grid-flow-col gap-4 items-center">
            <CustomLink href="/"><Image src={"/instagram.png"} height={24} width={24} alt="Instagram"/></CustomLink>
            <CustomLink href="/"><Image src={"/youtube.png"} height={35} width={35} alt="Youtube"/></CustomLink>
            <CustomLink href="/"><Image src={"/twitter.png"} height={25} width={25} alt="Twitter"/></CustomLink>
          </div>
        </nav>      
      </div>
      <div className="flex items-center mb-5 justify-center text-center bg-base-200 text-[#737c99]" >
        <CopyrightIcon  size={25} color="#737c99"/>
        &nbsp; ELAVOR Inc. All rights reserved.<br/>
      </div>
    </footer>
    
  )
}
