import streamClient from "@/lib/stream";
import { Channel } from "stream-chat";

/**
 * Create or reuse an existing Stream chat channel
 */
export const useCreateNewChat = () => {
  const createNewChat = async ({
    members,
    createdBy,
    groupName,
  }: {
    members: string[];
    createdBy: string;
    groupName?: string;
  }): Promise<Channel> => {
    // More than 2 members = group chat
    const isGroupChat = members.length > 2;

    /**
     * ---------------------------------------------------------
     * 1️⃣ Check for existing 1–1 chat
     * ---------------------------------------------------------
     */
    if (!isGroupChat) {
      const existingChannel = await streamClient.queryChannels(
        {
          type: "messaging",
          members: { $eq: members }, // exact match
        },
        { created_at: -1 },
        { limit: 1 }
      );

      if (existingChannel.length > 0) {
        const channel = existingChannel[0];
        const channelMembers = Object.keys(channel.state.members);

        // Ensure exactly same two users
        if (
          channelMembers.length === 2 &&
          members.length === 2 &&
          members.every((member) => channelMembers.includes(member))
        ) {
          console.log("Existing 1-1 chat found");
          return channel;
        }
      }
    }

    /**
     * ---------------------------------------------------------
     * 2️⃣ Create new channel
     * ---------------------------------------------------------
     */
    const channelId = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    try {
      const channelData: {
        members: string[];
        created_by_id: string;
        name?: string;
      } = {
        members,
        created_by_id: createdBy,
      };

      // Group-specific metadata
      if (isGroupChat) {
        channelData.name =
          groupName || `Group chat (${members.length} members)`;
      }

      const channel = streamClient.channel(
        isGroupChat ? "team" : "messaging",
        channelId,
        channelData
      );

      await channel.watch({
        presence: true,
      });

      return channel;
    } catch (error) {
      console.error("Failed to create chat:", error);
      throw error;
    }
  };

  return {
    createNewChat,
  };
};
