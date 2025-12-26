import React from "react";
import { MessageSquare } from "lucide-react";

const AdminCompanyQa = () => {
  return (
    <div className="pt-16 pb-8 px-4 lg:pl-60 w-screen space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white shadow-lg px-6 py-6">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_left,_#fff_0,_transparent_35%),radial-gradient(circle_at_bottom_right,_#fff_0,_transparent_30%)]" />
        <div className="relative space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">
            Admin · Company Q&A
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">Company Q/A</h1>
          <p className="text-sm text-white/80 max-w-2xl">
            Curate company questions, answers, and interview prep content.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center space-y-3 shadow-sm">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-200">
          <MessageSquare size={22} />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Q&A management coming soon
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Wire this to your company Q&A API to add, edit, and organize interview
          questions.
        </p>
      </div>
    </div>
  );
};

export default AdminCompanyQa;
