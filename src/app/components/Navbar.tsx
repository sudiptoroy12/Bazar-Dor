import Image from "next/image";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Navbar = () => {
  return (
    <div className="w-full border-b border-neutral-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-green-600 p-2">
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor Logo"
              width={30}
              height={30}
              priority
            />
          </div>

          <span className="text-2xl font-bold">বাজার দর</span>
        </div>

        {/* Right side */}
        <UserInfo />
      </div>
    </div>
  );
};

export default Navbar;
