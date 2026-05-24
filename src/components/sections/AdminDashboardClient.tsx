"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import {
  updateLeadStatusAction,
  updateLeadNotesAction,
  deleteLeadAction
} from "@/actions/admin";

interface Lead {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  businessType: string | null;
  services: string | null;
  goals: string | null;
  status: string;
  notes: string | null;
  createdAt: Date;
}

interface Subscriber {
  id: string;
  email: string;
  createdAt: Date;
}

interface AdminDashboardClientProps {
  initialLeads: Lead[];
  initialSubscribers: Subscriber[];
  onLogout: () => void;
}

export default function AdminDashboardClient({
  initialLeads,
  initialSubscribers,
  onLogout
}: AdminDashboardClientProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [activeTab, setActiveTab] = useState<"leads" | "subscribers">("leads");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Note editing state
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesBuffer, setNotesBuffer] = useState("");

  const [isPending, startTransition] = useTransition();

  // Handlers for Lead manipulation
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    startTransition(async () => {
      const res = await updateLeadStatusAction(leadId, newStatus);
      if (res.success) {
        setLeads(prev =>
          prev.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleNotesSave = async (leadId: string) => {
    startTransition(async () => {
      const res = await updateLeadNotesAction(leadId, notesBuffer);
      if (res.success) {
        setLeads(prev =>
          prev.map(l => (l.id === leadId ? { ...l, notes: notesBuffer || null } : l))
        );
        setEditingNotesId(null);
        toast.success("Notes updated successfully");
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead? This action cannot be undone.")) {
      return;
    }

    startTransition(async () => {
      const res = await deleteLeadAction(leadId);
      if (res.success) {
        setLeads(prev => prev.filter(l => l.id !== leadId));
        toast.success("Lead deleted successfully");
      } else {
        toast.error(res.message);
      }
    });
  };

  // Subscriber helpers
  const handleCopyEmails = () => {
    const emailsList = subscribers.map(s => s.email).join("\n");
    navigator.clipboard.writeText(emailsList);
    toast.success(`${subscribers.length} subscriber emails copied to clipboard!`);
  };

  // Filtering calculations
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.goals && lead.goals.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const newLeadsCount = leads.filter(l => l.status === "New").length;

  return (
    <div className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-10 py-12 flex flex-col gap-8">
      
      {/* Header Panel */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads Hub</h1>
          <p className="text-gray-500 text-sm mt-1">Review and manage inbound briefs and subscribers</p>
        </div>
        <button
          onClick={onLogout}
          className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 text-red-600 hover:text-red-700 transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </header>

      {/* Metrics Summary Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-black shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Leads</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{leads.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">New Inquiries</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{newLeadsCount}</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l8-4a2 2 0 011.78 0l8 4A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.25 0l-2.25 1.5" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Subscribers</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{subscribers.length}</p>
          </div>
        </div>
      </section>

      {/* Tabs Control */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("leads")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors cursor-pointer ${
            activeTab === "leads"
              ? "border-black text-black"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          Contact Leads ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors cursor-pointer ${
            activeTab === "subscribers"
              ? "border-black text-black"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          Newsletter Subscribers ({subscribers.length})
        </button>
      </div>

      {/* Main Section */}
      {activeTab === "leads" ? (
        <div className="flex flex-col gap-6">
          
          {/* Controls Bar */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:max-w-md relative">
              <input
                type="text"
                placeholder="Search leads by name, email, goals..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-gray-900"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="h-11 px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-900 focus:outline-none focus:border-black"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Leads Grid */}
          {filteredLeads.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
              <p className="text-gray-400 text-sm font-medium">No leads found matching current filters.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredLeads.map(lead => (
                <article
                  key={lead.id}
                  className={`bg-white rounded-3xl border shadow-sm p-6 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-6 items-start transition-all ${
                    lead.status === "New" ? "border-blue-200 bg-blue-50/10" : "border-gray-100"
                  }`}
                >
                  
                  {/* Lead Info (4 cols) */}
                  <div className="md:col-span-4 flex flex-col gap-3 w-full border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium">
                        {new Date(lead.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                      {lead.status === "New" && (
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          New
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{lead.contactName}</h3>
                      <p className="text-sm font-semibold text-gray-500 mt-1">{lead.businessName}</p>
                    </div>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-xs font-semibold text-gray-900 hover:underline inline-flex items-center gap-1 mt-1 break-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {lead.email}
                    </a>
                    {lead.businessType && (
                      <div className="mt-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 self-start">
                        <span className="font-bold">Type:</span> {lead.businessType}
                      </div>
                    )}
                  </div>

                  {/* Lead Request Details (5 cols) */}
                  <div className="md:col-span-5 flex flex-col gap-4 w-full">
                    {lead.services && (
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                          Services Needed
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {lead.services.split(", ").map(s => (
                            <span
                              key={s}
                              className="text-xs bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full font-medium"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                        Goals &amp; Details
                      </span>
                      <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-100 max-h-[140px] overflow-y-auto whitespace-pre-wrap">
                        {lead.goals || "No details provided"}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Notes (3 cols) */}
                  <div className="md:col-span-3 flex flex-col gap-4 w-full h-full justify-between">
                    
                    {/* Status Select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Status Action
                      </label>
                      <select
                        value={lead.status}
                        onChange={e => handleStatusChange(lead.id, e.target.value)}
                        className={`w-full h-10 px-2.5 border rounded-xl text-xs font-semibold focus:outline-none ${
                          lead.status === "New"
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : lead.status === "Contacted"
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : lead.status === "In Progress"
                            ? "bg-purple-50 border-purple-200 text-purple-700"
                            : "bg-green-50 border-green-200 text-green-700"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    {/* Notes Box */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Admin Notes
                      </label>
                      
                      {editingNotesId === lead.id ? (
                        <div className="flex flex-col gap-1.5">
                          <textarea
                            value={notesBuffer}
                            onChange={e => setNotesBuffer(e.target.value)}
                            placeholder="Add client follow-up details..."
                            className="w-full p-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black min-h-[60px]"
                            rows={3}
                          />
                          <div className="flex gap-1.5 self-end">
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="px-2 py-1 text-[10px] border border-gray-200 rounded text-gray-500 hover:bg-gray-50 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleNotesSave(lead.id)}
                              className="px-2.5 py-1 text-[10px] bg-black text-white rounded font-medium hover:bg-gray-800 cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setEditingNotesId(lead.id);
                            setNotesBuffer(lead.notes || "");
                          }}
                          className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-dashed border-gray-200 hover:border-gray-400 hover:bg-gray-100/50 transition-all cursor-pointer min-h-[40px] flex items-center"
                        >
                          <p className="line-clamp-2 leading-relaxed">
                            {lead.notes || "Click to add admin notes..."}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Delete Lead Button */}
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="self-end mt-2 flex items-center gap-1 text-[10px] text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Inquiry
                    </button>

                  </div>

                </article>
              ))}
            </div>
          )}

        </div>
      ) : (
        /* Subscribers Tab */
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Newsletter Emails</h2>
              <p className="text-xs text-gray-500 mt-0.5">List of verified newsletter subscribers</p>
            </div>
            {subscribers.length > 0 && (
              <button
                onClick={handleCopyEmails}
                className="px-5 py-2 bg-black text-white text-xs font-semibold rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy All Emails
              </button>
            )}
          </div>

          {subscribers.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm font-medium">
              No subscribers yet.
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
                    <th className="py-3.5 px-4">#</th>
                    <th className="py-3.5 px-4">Email Address</th>
                    <th className="py-3.5 px-4 text-right">Subscribed Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {subscribers.map((sub, i) => (
                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-gray-400 text-xs">{i + 1}</td>
                      <td className="py-4 px-4 font-semibold text-gray-900 select-all">{sub.email}</td>
                      <td className="py-4 px-4 text-right text-gray-400 text-xs font-medium">
                        {new Date(sub.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
