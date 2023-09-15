import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/sidebar";
import { checkSubscription } from "@/lib/subscription";
import { getApiLimitCount } from "@/lib/api-limit";
import Image from "next/image"
import Link from "next/link";
import { Montserrat } from "next/font/google";

// export const dynamic = "force-dynamic"

const font = Montserrat({ weight: '600', subsets: ['latin'] });

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (

    <div className="backdrop-blur-3xl bg-black">
      {/* <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900"> */}
      <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      {/* </div> */}
      <div className="flex justify-between mx-10 pt-6">
        <Link href="/" className="flex items-center">
          <Image width={48} height={48} alt="Logo" src="/logo3.png" />
          <h1 className={cn("text-2xl font-bold text-white", font.className)}>
            Naisei
          </h1>
        </Link>
        <Navbar />
      </div>
      <main
      // className=""
      >

        {children}
      </main>
    </div >
  );
}

export default DashboardLayout;
