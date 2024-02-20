import Image from 'next/image'
import Link from 'next/link'
import Right from './ui/Right'

function Hero() {
  return (
    <section className="hero mt-6 mb-16">
      <div className=" max-h-[450px] max-w-[450px]">
        <Image
          src={"/event-hero.png"}
          height={0}
          width={375}
          alt={"hero"}
        />
      </div>
      <div className="py-8 px-10 mr-5 md:py-12 col-span-1 text-left ">
        <h1 className="text-2xl font-semibold">
          <span className="text-5xl">Amaze</span>
          <br />
          Everyone's Event with <br />
          <span className="text-primary">ELAVOR's Organizers</span>
        </h1>
        <p className="my-4 text-gray-500 text-sm text-justify ">
          ELAVOR is the greatest and most proper to all the events. You can get
          any package EASILY and SAFETY  for your event.
        </p>
        <div className="flex gap-4 text-sm justify-left">
          <Link
            type="button"
            href={"/menu"}
            className="bg-primary flex gap-1 items-center uppercase text-white px-3 py-2 rounded-full hover:bg-third hover:text-second"
          >
            Check All
            <Right />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero