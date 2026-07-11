"use client";

import { useState } from "react";
import {
  Pencil,
  Landmark,
  Fingerprint,
  KeyRound,
  ScanFace,
  HelpCircle,
  FileText,
  LogOut,
} from "lucide-react";

import NavRail from "@/components/layout/Navrail";
import ProfileHeader from "@/components/profile/ProfileHeader";
import MenuGroup from "@/components/profile/MenuGroup";
import MenuItem from "@/components/profile/MenuItem";
import ContributionHistoryPreview from "@/components/profile/ContributionHistoryPreview";
import EditProfileModal from "@/components/profile/EditProfileModal";
import ChangePinModal from "@/components/profile/ChangePinModal";
import LogoutConfirmModal from "@/components/profile/LogoutConfirmModal";
import { MOCK_PROFILE, type ProfileData } from "@/lib/profile";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(MOCK_PROFILE);
  const [editOpen, setEditOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [biometricOn, setBiometricOn] = useState(true);

  function handleLogout() {
    // In production: clear session / auth tokens, then redirect.
    setLogoutOpen(false);
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-white">
      <NavRail active="/profile" />

      <main className="mx-auto max-w-container px-4 pb-28 pt-6 sm:px-6 md:pl-28 md:pr-8 lg:pl-[15.5rem] lg:pr-10">
        <div>
          <p className="text-sm text-ink-muted">Account</p>
          <h1 className="text-xl font-bold tracking-tight text-ink">
            Profile
          </h1>
        </div>

        <div className="mt-5">
          <ProfileHeader profile={profile} onEdit={() => setEditOpen(true)} />
        </div>

        <div className="mt-6">
          <ContributionHistoryPreview />
        </div>

        <div className="mt-6">
          <MenuGroup title="Account">
            <MenuItem
              icon={Pencil}
              label="Edit profile"
              subtitle="Name, phone, email, business"
              onClick={() => setEditOpen(true)}
            />
            <MenuItem
              icon={Landmark}
              label="Linked bank accounts"
              href="/banking"
            />
            <MenuItem
              icon={Fingerprint}
              label="Link BVN"
              subtitle="Adds verified formal identity to your score"
              href="/verification/bvn"
            />
          </MenuGroup>
        </div>

        <div className="mt-6">
          <MenuGroup title="Security">
            <MenuItem
              icon={KeyRound}
              label="Change PIN"
              onClick={() => setPinOpen(true)}
            />
            <MenuItem
              icon={ScanFace}
              label="Biometric login"
              trailing={
                <ToggleSwitch checked={biometricOn} onChange={setBiometricOn} />
              }
            />
          </MenuGroup>
        </div>

        <div className="mt-6">
          <MenuGroup title="Support">
            <MenuItem icon={HelpCircle} label="Help & support" href="/support" />
            <MenuItem
              icon={FileText}
              label="Terms & privacy policy"
              href="/legal"
            />
          </MenuGroup>
        </div>

        <div className="mt-6 mb-6">
          <MenuGroup>
            <MenuItem
              icon={LogOut}
              label="Log out"
              destructive
              onClick={() => setLogoutOpen(true)}
            />
          </MenuGroup>
        </div>
      </main>

      {editOpen && (
        <EditProfileModal
          onClose={() => setEditOpen(false)}
        />
      )}
      {pinOpen && <ChangePinModal onClose={() => setPinOpen(false)} />}
      {logoutOpen && (
        <LogoutConfirmModal
          onClose={() => setLogoutOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}