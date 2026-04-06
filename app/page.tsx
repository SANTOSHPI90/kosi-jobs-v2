"use client";
import React, { useState } from 'react';
import { MapPin, Calendar, ExternalLink, Briefcase, X, Search, Building2, ShieldCheck } from 'lucide-react';
import INITIAL_JOBS from '../jobs.json';

export default function KosiJobHub() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState('All');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredJobs = INITIAL_JOBS.filter(job => {
    const locMatch = filter === 'All' || job.location.includes(filter);
    const secMatch = sectorFilter === 'All' || job.sector === sectorFilter;
    const searchMatch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                        job.department.toLowerCase().includes(search.toLowerCase());
    return locMatch && secMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans">
      {/* HEADER */}
      <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
              <Building2 className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black text-white italic tracking-tighter">KOSI<span className="text-blue-500">CAREERS</span></h1>
          </div>
          <div className="hidden sm:flex gap-4">
             <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck size={12}/> UPDATED: APRIL 2026
             </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* SEARCH & FILTERS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" placeholder="Search Role or Company..." 
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Districts</option>
            <option value="Madhepura">Madhepura</option>
            <option value="Saharsa">Saharsa</option>
            <option value="Supaul">Supaul</option>
          </select>
          <select 
            onChange={(e) => setSectorFilter(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Sectors</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* JOB GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div 
              key={job.id} onClick={() => setSelectedJob(job)}
              className="group bg-slate-900/40 border border-white/5 p-6 rounded-3xl hover:bg-slate-800/60 hover:border-blue-500/40 transition-all cursor-pointer shadow-2xl flex flex-col justify-between h-[280px]"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest ${job.sector === 'Government' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {job.sector}
                  </span>
                  <span className="text-slate-500 text-[10px] flex items-center gap-1"><Calendar size={12}/> {job.lastDate}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">{job.title}</h3>
                <p className="text-slate-400 text-sm mt-2 font-medium">{job.department}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-1 text-xs text-slate-300"><MapPin size={14}/> {job.location}</div>
                <div className="text-blue-500 group-hover:translate-x-1 transition-transform font-bold text-xs uppercase tracking-widest">Apply →</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
          <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-white/5 relative">
              <button onClick={() => setSelectedJob(null)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full"><X/></button>
              <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
              <p className="text-blue-400 font-bold text-sm mt-1">{selectedJob.department}</p>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm">
                <div><h4 className="text-slate-500 font-bold uppercase text-[10px]">Eligibility</h4><p>{selectedJob.eligibility}</p></div>
                <div><h4 className="text-slate-500 font-bold uppercase text-[10px]">Required</h4><ul className="list-disc list-inside">{selectedJob.documents.map((d,i)=><li key={i}>{d}</li>)}</ul></div>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl space-y-4">
                <div><h4 className="text-slate-500 font-bold uppercase text-[10px]">Salary</h4><p className="text-emerald-400 font-bold text-xl">{selectedJob.salary}</p></div>
                <a href={selectedJob.officialLink} target="_blank" className="block w-full bg-blue-600 text-center py-3 rounded-xl font-bold hover:bg-blue-500 transition-all">Visit Official Site</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}