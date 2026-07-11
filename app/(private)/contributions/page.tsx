"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Inbox, Archive, Users } from "lucide-react";

import NavRail from "@/components/layout/Navrail";
import TabBar from "@/components/contributions/TabBar";
import ContributionCard from "@/components/contributions/ContributionCard";
import RequestCard from "@/components/contributions/RequestCard";
import EmptyState from "@/components/contributions/EmptyState";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { acceptRequest, declineRequest } from "@/store/slices/contributionsSlice";

type TabKey = "active" | "requests" | "history";

export default function ContributionsPage() {
  const [tab, setTab] = useState<TabKey>("active");
  const dispatch = useAppDispatch();

  const contributions = useAppSelector((s) => s.contributions.contributions);
  const requests = useAppSelector((s) => s.contributions.requests);

  const active = contributions.filter(
    (c) => c.status === "active" || c.status === "pending_start",
  );
  const history = contributions.filter(
    (c) => c.status === "completed" || c.status === "cancelled",
  );

  function handleAccept(id: string) {
    // In production: call the API to accept, then let the response repopulate contributions.
    dispatch(acceptRequest(id));
  }

  function handleDecline(id: string) {
    dispatch(declineRequest(id));
  }

  return (
    <div className="min-h-screen bg-white">
      <NavRail active="/contributions" />

      <main className="mx-auto max-w-container px-4 pb-28 pt-6 sm:px-6 md:pl-28 md:pr-8 lg:pl-[15.5rem] lg:pr-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-muted">Savings circles</p>
            <h1 className="text-xl font-bold tracking-tight text-ink">
              Contributions
            </h1>
          </div>
          <Link
            href="/contributions/new"
            className="flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            New
          </Link>
        </div>

        <div className="mt-5">
          <TabBar
            active={tab}
            onChange={(k) => setTab(k as TabKey)}
            tabs={[
              { key: "active", label: "Active", count: active.length },
              { key: "requests", label: "Requests", count: requests.length },
              { key: "history", label: "History" },
            ]}
          />
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {tab === "active" &&
            (active.length ? (
              active.map((c) => <ContributionCard key={c.id} c={c} />)
            ) : (
              <EmptyState
                icon={Users}
                title="No active contributions yet"
                subtitle="Create one or accept a pending request to get started."
              />
            ))}

          {tab === "requests" &&
            (requests.length ? (
              requests.map((r) => (
                <RequestCard
                  key={r.id}
                  request={r}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                />
              ))
            ) : (
              <EmptyState
                icon={Inbox}
                title="No pending requests"
                subtitle="Invitations to join a contribution will show up here."
              />
            ))}

          {tab === "history" &&
            (history.length ? (
              history.map((c) => <ContributionCard key={c.id} c={c} />)
            ) : (
              <EmptyState
                icon={Archive}
                title="No past contributions"
                subtitle="Completed and cancelled contributions will appear here."
              />
            ))}
        </div>
      </main>
    </div>
  );
}