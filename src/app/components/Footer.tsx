
const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl  px-4 py-6 sm:px-6 lg:px-8">
        {/* Footer text */}
        <div className="flex flex-col items-center justify-between gap-2 text-center text-xs text-neutral-500 sm:flex-row sm:text-sm">
          <p>
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          <p>
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-right text-xs text-neutral-500 sm:text-sm">
          &copy; 2026 BazarDor- All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;