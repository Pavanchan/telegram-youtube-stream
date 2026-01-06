"use client";

import { SignInButton, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";

import {
  MessageSquare,
  Video,
  Shield,
  Users,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-16 sm:px-6 text-center gap-24">

      {/* ================= HERO ================= */}
      <section className="max-w-4xl space-y-8 relative">
        <div className="absolute inset-0 -z-10 rounded-3xl blur-3xl scale-150 opacity-60 bg-linear-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20" />

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600">
            Connect instantly.
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-pink-600">
            Chat smarter.
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The modern messaging platform that combines lightning-fast chat
          and crystal-clear video calls in one seamless experience.
        </p>

        <SignedOut>
          <SignInButton mode="modal">
            <Button className="text-lg px-8 py-6 h-auto">
              Start Chatting Free
            </Button>
          </SignInButton>
        </SignedOut>
      </section>

      {/* ================= SOCIAL PROOF ================= */}
      <section>
        <p className="text-sm text-muted-foreground mb-4">
          Trusted by thousands of users worldwide
        </p>

        <div className="flex items-center justify-center gap-8 text-muted-foreground">
          <Stat value="50K+" label="Active Users" />
          <Divider />
          <Stat value="1M+" label="Messages Sent" />
          <Divider />
          <Stat value="99.9%" label="Uptime" />
        </div>
      </section>

      {/* ================= FEATURES HEADER ================= */}
      <section className="text-center max-w-2xl space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Everything you need to stay connected
        </h2>
        <p className="text-lg text-muted-foreground">
          Powerful features designed for seamless communication,
          whether you’re chatting with friends or collaborating with teams.
        </p>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        <FeatureCard
          icon={MessageSquare}
          title="Instant Messaging"
          description="Lightning-fast messages with real-time delivery."
        />
        <FeatureCard
          icon={Video}
          title="HD Video Calls"
          description="Crystal-clear video calls with one click."
        />
        <FeatureCard
          icon={Shield}
          title="Privacy First"
          description="End-to-end encryption keeps chats secure."
        />
        <FeatureCard
          icon={Users}
          title="Group Chats"
          description="Create and manage conversations effortlessly."
        />
        <FeatureCard
          icon={Zap}
          title="Lightning Fast"
          description="Optimized for speed across all devices."
        />
      </section>

      {/* ================= FINAL CTA CARD ================= */}
<section className="w-full flex justify-center pt-20">
  <div className="max-w-3xl w-full bg-muted/60 border rounded-2xl px-6 py-10 text-center space-y-6">
    <h3 className="text-2xl sm:text-3xl font-bold">
      Ready to transform your conversations?
    </h3>

    <p className="text-muted-foreground max-w-xl mx-auto">
      Join thousands of users who’ve already discovered a better way to
      communicate. Start your journey with Beam today — it’s completely free.
    </p>

    <SignedOut>
      <SignInButton mode="modal">
        <Button className="px-8 py-5 h-auto bg-black text-white hover:bg-black/90">
          Get Started Free
        </Button>
      </SignInButton>
    </SignedOut>

    <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground">
      <span className="flex items-center gap-2">
        <span className="text-green-500">●</span> No credit card required
      </span>
      <span className="flex items-center gap-2">
        <span className="text-green-500">●</span> Free forever plan
      </span>
      <span className="flex items-center gap-2">
        <span className="text-green-500">●</span> Setup in 30 seconds
      </span>
    </div>
  </div>
</section>


      {/* ================= FOOTER ================= */}
      {/* ================= FOOTER ================= */}
<footer className="w-full border-t mt-24 py-12 text-sm text-muted-foreground">
  <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8">

    <div className="flex flex-col sm:flex-row justify-between gap-6">
      <div>
        <h4 className="font-semibold text-foreground">Beam</h4>
        <p className="text-xs">The future of communication</p>
      </div>

      <div className="flex gap-6 text-xs">
        <a href="#" className="hover:text-foreground">Privacy Policy</a>
        <a href="#" className="hover:text-foreground">Terms of Service</a>
        <a href="#" className="hover:text-foreground">Support</a>
      </div>
    </div>

    <p className="text-xs text-muted-foreground/70">
      © 2025 Beam. This is a demo. We have no affiliation with any of the brands
      mentioned in the video. Beam usage is purely educational. If any
      infringement is found, please contact us and we will remove the content
      immediately.
    </p>

  </div>
</footer>

    </main>
  );
}

/* ================= HELPERS ================= */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-8 bg-border" />;
}
