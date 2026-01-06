"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useUserSearch } from "@/hooks/useUserSearch";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
    Mail,
  Search,
  UserIcon,
  X,
} from "lucide-react";

import {
  Input,
} from "@/components/ui/input";
import { InlineSpinner } from "./LoadingSpinner";

type UserSearchProps = {
  onSelectUser: (user: Doc<"users">) => void;
  placeholder?: string;
  className?: string;
};

function UserSearch({
  onSelectUser,
  placeholder = "Search users by name or email...",
  className,
}:
 UserSearchProps) {
  const { searchTerm, setSearchTerm, searchResults, isLoading } =
    useUserSearch();

  const { user } = useUser();

  // Filter out the current logged-in user from search results
  const filteredResults =
    searchResults?.filter(
      (searchUser) => searchUser.userId !== user?.id
    ) || [];

  const handleSelectUser = (user: (typeof searchResults)[0]) => {
    onSelectUser(user);
    setSearchTerm(""); // Clear search after selection
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {searchTerm && (
  <button
    onClick={clearSearch}
    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
    <X className="h-4 w-4" />
  </button>
)}
      </div>
       {/* Search Results */}
      {searchTerm.trim() && (
        <div className="mt-2 rounded-lg border border-border bg-card shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <InlineSpinner size="sm" />
                <span>Searching...</span>
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <UserIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>
                No users found matching &quot;{searchTerm}&quot;
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredResults.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleSelectUser(user)}
                  className={cn(
                    "w-full px-4 py-3 text-left hover:bg-accent transition-colors",
                    "focus:outline-none focus:bg-accent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <Image
                        src={user.imageUrl}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
                      />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {user.name}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    <div className="shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserSearch;
