"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [show, setShow] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUpdating(true);

    try {
      const formData = new FormData(e.currentTarget);

      const name = formData.get("name") as string;
      const image = formData.get("image") as string;

      if (!name.trim()) {
        toast.error("নাম লিখুন");
        return;
      }

      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      setShow(false);
    } catch (error) {
      console.error(error);
      toast.error("কিছু সমস্যা হয়েছে!");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleShowForm = () => {
    setShow((prev) => !prev);
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f4f8f4] px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="h-10 w-56 animate-pulse rounded-lg bg-neutral-200" />

          <div className="mt-8 h-40 animate-pulse rounded-2xl bg-white" />

          <div className="mt-8 h-80 animate-pulse rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f8f4] px-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-neutral-800">
            আপনার অ্যাকাউন্টে সাইন ইন করা নেই
          </h1>

          <Link
            href="/signin"
            className="mt-5 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f8f4] px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">আমার প্রোফাইল</h1>

          <p className="mt-2 text-neutral-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Card */}
        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* User Information */}
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <Link href="/profile">
                <div className="h-24 w-24 overflow-hidden rounded-2xl bg-neutral-100 ring-2 ring-neutral-200">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-green-600 text-3xl font-bold text-white">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </Link>

              {/* Name & Email */}
              <div>
                <h2 className="text-2xl font-semibold text-neutral-800">
                  {user.name}
                </h2>

                <p className="mt-1 text-lg text-neutral-500">{user.email}</p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              type="button"
              onClick={handleShowForm}
              className="rounded-lg border border-green-600 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-50"
            >
              {show ? "বন্ধ করুন" : "প্রোফাইল এডিট করুন"}
            </button>
          </div>
        </section>

        {/* Information Card */}
        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-neutral-800">তথ্য</h2>

          {!show ? (
            /* Normal Information */
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm font-medium text-neutral-500">নাম</p>

                <p className="mt-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-800">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-neutral-500">ইমেইল</p>

                <p className="mt-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-800">
                  {user.email}
                </p>
              </div>
            </div>
          ) : (
            /* Edit Form */
            <form onSubmit={handleUpdateProfile} className="mt-8 space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  নাম
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user.name || ""}
                  placeholder="আপনার নাম লিখুন"
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  ইমেইল
                </label>

                <input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-3 text-neutral-500"
                />
              </div>

              {/* Image URL */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  প্রোফাইল ছবির URL
                </label>

                <input
                  id="image"
                  name="image"
                  type="url"
                  defaultValue={user.image || ""}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Update */}
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
