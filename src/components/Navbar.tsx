import Link from 'next/link';
import { Icons } from './Icons';

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="w-10 h-10" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            LeagueReddit
          </p>
        </Link>

        {/* search bar */}
      </div>
    </div>
  );
};

export default Navbar;
