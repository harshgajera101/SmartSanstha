// frontend/src/components/dashboard/Bookmarks.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Card } from "../common/Card";

interface BookmarkItem {
  articleNumber: string;
  partName?: string;
}

interface BookmarksProps {
  bookmarks: BookmarkItem[];
}

export const Bookmarks: React.FC<BookmarksProps> = ({ bookmarks }) => {
  const navigate = useNavigate();

  const handleBookmarkClick = (bookmark: BookmarkItem) => {
    navigate(`/learn/article/${bookmark.articleNumber}`, {
      state: {
        articleNumber: bookmark.articleNumber,
        partName: bookmark.partName,
      },
    });
  };

  return (
    <Card className="flex flex-col h-[400px]"> {/* Fixed height for the card */}
      {/* Fixed Header */}
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <Bookmark className="w-6 h-6 text-orange-400" />
        <h2 className="text-xl font-bold text-white">Bookmarks</h2>
      </div>

      {/* Scrollable Body Area */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {bookmarks.length === 0 ? (
          <p className="text-slate-500 text-sm italic">
            You haven't bookmarked any articles yet.
          </p>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((b, index) => (
              <div
                key={index}
                onClick={() => handleBookmarkClick(b)}
                className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl hover:bg-slate-800 transition-all cursor-pointer group"
              >
                {/* Bookmark Icon */}
                <div className="w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookmarkCheck className="w-5 h-5 text-white" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm truncate">
                    Article {b.articleNumber}
                  </div>

                  {b.partName && (
                    <div className="text-xs text-slate-500 truncate">
                      {b.partName}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};