import { useState, useEffect, useMemo } from "react";
import { SmilePlus } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const EMOJI_OPTIONS = ["👏", "🎉", "❤️", "🔥", "💯", "👀"];

function getStorageKey(assetId) {
  return `reactions_${assetId}`;
}

function getUserReactions(assetId) {
  try {
    return JSON.parse(localStorage.getItem(getStorageKey(assetId)) || "[]");
  } catch {
    return [];
  }
}

function setUserReactions(assetId, emojis) {
  localStorage.setItem(getStorageKey(assetId), JSON.stringify(emojis));
}

export default function ReactionBar({ assetId, initialReactions }) {
  const [reactions, setReactions] = useState(initialReactions || {});
  const [userReacted, setUserReacted] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    setUserReacted(getUserReactions(assetId));
  }, [assetId]);

  useEffect(() => {
    setReactions(initialReactions || {});
  }, [initialReactions]);

  const sortedReactions = useMemo(() => {
    return Object.entries(reactions)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);
  }, [reactions]);

  const toggleReaction = async (emoji) => {
    const alreadyReacted = userReacted.includes(emoji);
    const newCount = (reactions[emoji] || 0) + (alreadyReacted ? -1 : 1);
    const newReactions = { ...reactions };

    if (newCount <= 0) {
      delete newReactions[emoji];
    } else {
      newReactions[emoji] = newCount;
    }

    setReactions(newReactions);
    setPickerOpen(false);

    const newUserReacted = alreadyReacted
      ? userReacted.filter((e) => e !== emoji)
      : [...userReacted, emoji];
    setUserReacted(newUserReacted);
    setUserReactions(assetId, newUserReacted);

    try {
      await supabase
        .from("brand_assets")
        .update({ reactions: newReactions })
        .eq("id", assetId);
    } catch {}
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {sortedReactions.map(([emoji, count]) => (
        <button
          key={emoji}
          onClick={() => toggleReaction(emoji)}
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-sm transition-colors ${
            userReacted.includes(emoji)
              ? "border-brand-700/30 bg-brand-700/5 text-brand-700"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <span>{emoji}</span>
          <span className="text-xs font-medium">{count}</span>
        </button>
      ))}

      {/* Add reaction button */}
      <div className="relative">
        <button
          onClick={() => setPickerOpen(!pickerOpen)}
          className="inline-flex items-center gap-1 rounded-full border border-dashed border-gray-300 px-2.5 py-1 text-sm text-gray-400 transition-colors hover:border-gray-400 hover:text-gray-600"
        >
          <SmilePlus size={14} />
        </button>

        {pickerOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setPickerOpen(false)}
            />
            <div className="absolute bottom-full left-0 z-50 mb-2 flex gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => toggleReaction(emoji)}
                  className={`rounded-md p-1.5 text-lg transition-colors hover:bg-gray-100 ${
                    userReacted.includes(emoji) ? "bg-brand-700/10" : ""
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
